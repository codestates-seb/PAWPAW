import MapFilter from './MapFilter';
import React, { useEffect, useState } from 'react';
import color from '../color';
import styled from 'styled-components';
import { Map } from 'react-kakao-maps-sdk';
import Header from '../Components/Header';
import Marker from './Marker';
import { data } from '../dummydata';
import { Icon } from '@iconify/react';
import { addressToCode } from '../util/ConvertAddress';

const { coral, brown } = color;

const Container = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    position: absolute;
  }

  .map {
    position: absolute;
  }
`;

export interface IProps {
  detail: {
    tag: string;
    title: string;
    lat: number;
    lng: number;
    id: number;
  };
  filter: {
    selected: string;
    setSelected: (classname: string) => void;
  };
}

function HomeMap() {
  const { kakao } = window;
  const [selected, setSelected] = useState<string>('all');
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.57657, lng: 126.982066 });
  const [address, setAddress] = useState<string | null>(null);
  const [newLocation, setNewLocation] = useState(currentLocation);
  const [isLocationChanged, setIsLocationChanged] = useState<boolean>(false);
  let filteredData;

  // selected === 'all'인 경우, 모든 데이터를 보여준다.
  if (selected === 'all') {
    filteredData = data;
    // 그 외의 경우, selected와 일치하는 tag만 보여준다.
  } else {
    filteredData = data.filter((el) => el.tag === selected);
  }

  // 좌표를 주소로 변환해주는 함수
  const getAddress = (lat: number, lng: number) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(lat, lng);
    const callback = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  // 마우스 드래그 이벤트가 감지될 때마다 실행되는 함수
  const dragHandler = (map: any) => {
    setIsLocationChanged(true);
    setNewLocation({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });
  };

  // 현재 위치에서 검색하기 버튼을 눌렀을 때, currentLocation, address를 업데이트하는 함수
  const updateCurrentLocation = () => {
    setCurrentLocation(newLocation);
    getAddress(currentLocation.lat, currentLocation.lng);
    if (address) {
      const city = address.slice(0, 2);
      const district = address.split(' ')[1];
      if (city === '서울') {
        console.log(district, addressToCode(district));
        setIsLocationChanged(false);
      } else {
        console.log('서비스 지역이 아닙니다');
      }
    }
  };

  return (
    <Container>
      <Header />
      {/* 맵 */}
      <Map
        className='map'
        center={currentLocation}
        style={{ width: '100%', height: '100%' }}
        level={6}
        onDragEnd={(map) => dragHandler(map)}
      >
        {/* 장소 마커 */}
        {filteredData.map((el, idx) => {
          return <Marker key={idx} {...el} />;
        })}
      </Map>

      {/* 필터 버튼 */}
      <MapFilter selected={selected} setSelected={setSelected} />

      {/* 현재 위치에서 검색하기 버튼 */}
      {isLocationChanged && (
        <RefreshBtn onClick={updateCurrentLocation}>
          <span>현재 위치에서 검색하기</span>
          <Icon icon='mi:refresh' color='white' style={{ fontSize: '25px' }} />
        </RefreshBtn>
      )}
    </Container>
  );
}

const RefreshBtn = styled.button`
  border: none;
  border-radius: 30px;
  padding: 17px 38px;
  color: white;
  background-color: ${brown};
  font-weight: bold;
  font-size: 20px;
  position: absolute;
  bottom: 10%;
  left: 40%;
  z-index: 100;
  cursor: pointer;

  display: flex;
  align-items: center;

  span {
    margin-right: 8px;
  }

  &:hover {
    background-color: ${coral};
  }
`;

export default HomeMap;
