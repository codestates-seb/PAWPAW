import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Map } from 'react-kakao-maps-sdk';
import { Icon } from '@iconify/react';
import color from '../color';
import Header from '../Components/Header';
import MapFilter from './MapFilter';
import Marker from './Marker';
import { addressToCode } from '../util/ConvertAddress';
import { getCenter, getAll, getMyPick, getFilter } from '../util/MapFilterApi';
const { coral, brown } = color;
const code = localStorage.getItem('code') as string;

export interface IProps {
  id: number;
  category: string;
  name: string;
  latitude: number;
  longitude: number;
  code: number;
  bookmark: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export interface ICurLocation {
  lat: number;
  lng: number;
}

const HomeMap = () => {
  const { kakao } = window;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 클릭 여부
  const [selected, setSelected] = useState<string>('all'); // 선택한 필터
  const [data, setData] = useState<IProps[] | null>(null); // 데이터

  const [currentLocation, setCurrentLocation] = useState<ICurLocation>({ lat: 0, lng: 0 }); // 현재 위치 좌표
  const [address, setAddress] = useState<string | undefined>(code); // 현재 위치의 주소 코드 ex. 11680

  const [newLocation, setNewLocation] = useState(currentLocation); // 이동한 위치 좌표
  const [fullAddress, setFullAddress] = useState<string[]>([]); // 이동한 위치의 주소 ex. ['서울', '강남구' '...']
  const [isLocationChanged, setIsLocationChanged] = useState<boolean>(false); // 이동했는지 여부

  // 가장 처음 렌더링 시 딱 한번만 실행되는 useEffect
  useEffect(() => {
    if (address) {
      getCenter(address).then((res) => setCurrentLocation(res));
      getAll(address);
    }
  }, []);

  // selected, address, isModalOpen이 업데이트될 때마다 실행되는 useEffect
  useEffect(() => {
    if (address) {
      if (selected === 'all') {
        getAll(address).then((res) => setData(res));
      } else if (selected === 'mypick') {
        getMyPick().then((res) => {
          setData(res);
        });
      } else {
        getFilter(address, selected).then((res) => setData(res));
      }
    }
  }, [selected, address, isModalOpen]);
  if (localStorage.getItem('check') !== '1') {
    localStorage.setItem('check', '1');
    window.location.reload();
  } else {
    // localStorage.removeItem('check');
  }
  // 응급조치 ㅠㅡㅜ
  // 좌표를 주소로 변환해주는 함수
  const getAddress = (lat: number, lng: number) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(lat, lng);
    const callback = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        setFullAddress(result[0].address.address_name.split(' '));
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  // 마우스 드래그 이벤트가 감지될 때마다 실행되는 함수
  // isLocationChange를 true로 바꾸고, 현재 지도의 중심 좌표를 newLocation으로 업데이트한다.
  const dragHandler = (map: any) => {
    setIsLocationChanged(true);
    setNewLocation({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });

    getAddress(newLocation.lat, newLocation.lng);
  };

  // 현재 위치에서 검색하기 버튼을 눌렀을 때 실행되는 함수
  // newLocation을 currentLocation으로 업데이트하고, fullAddress에 기반해 address를 업데이트한다.
  const updateCurrentLocation = () => {
    setCurrentLocation(newLocation);

    // 만약 서울시라면,
    if (fullAddress[0] === '서울') {
      // 구를 코드로 변환하여 address 상태에 저장한다.
      setAddress(addressToCode(fullAddress[1]));
      setIsLocationChanged(false);
    } else {
      console.log('서비스 지역이 아닙니다');
    }
  };

  return (
    <Container>
      <Header />
      {/* 맵 */}
      {address && (
        <>
          <Map
            className='map'
            center={currentLocation}
            style={{ width: '100%', height: '100%' }}
            level={4}
            onDragEnd={(map) => dragHandler(map)}
          >
            {/* 장소 마커 */}
            {data &&
              data.map((el) => {
                return (
                  <Marker
                    key={el.id}
                    {...el}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                  />
                );
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
        </>
      )}
    </Container>
  );
};

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
