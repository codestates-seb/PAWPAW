import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Map } from 'react-kakao-maps-sdk';
import { Icon } from '@iconify/react';
import axios from 'axios';

import color from '../color';
import Header from '../Components/Header';
import MapFilter from './MapFilter';
import Marker from './Marker';
import { addressToCode } from '../util/ConvertAddress';
const jwtToken = localStorage.getItem('Authorization');
const { coral, brown } = color;

export interface IProps {
  infoMapId: number;
  category: string;
  name: string;
  latitude: number;
  longitude: number;
  code: number;
}

interface ICurLocation {
  lat: number;
  lng: number;
}

const HomeMap = () => {
  const { kakao } = window;
  const [selected, setSelected] = useState<string>('all'); // 선택한 필터
  const [data, setData] = useState<IProps[] | null>(null);

  const [currentLocation, setCurrentLocation] = useState<ICurLocation>({ lat: 0, lng: 0 }); // 현재 위치
  const [address, setAddress] = useState<string | undefined>(undefined); // 현재 위치의 주소 코드 ex. 11680

  const [fullAddress, setFullAddress] = useState<string[]>([]); // 이동한 위치의 주소 ex. ['서울', '강남구' '...']
  const [newLocation, setNewLocation] = useState(currentLocation); // 이동한 위치
  const [isLocationChanged, setIsLocationChanged] = useState<boolean>(false);

  let url = `${process.env.REACT_APP_API_ROOT}`;
  const petId = localStorage.getItem('petId') as string;
  const headers = {
    Authorization: jwtToken,
  };

  // 1. 가장 처음 렌더링 시 딱 한번만 실행되는 useEffect
  useEffect(() => {
    // petId로 유저 정보 GET해서 address를 받아온다.
    axios.get(`${url}/pets/${petId}`, { headers }).then((res) => {
      setAddress(res.data.code);
      setCurrentLocation({ lat: 37.496486063, lng: 127.028361548 });
      // setCurrentLocation({ lat: data.coord.latitude, lng: data.coord.longitude });

      // 불러온 address로 화면에 바로 렌더링
      axios
        .get(`${process.env.REACT_APP_API_ROOT}/maps/${res.data.code}`, { headers })
        .then((res) => {
          setData(res.data);
        });
    });
  }, []);

  // 2. selected(필터)나 address가 바뀔 때마다 실행되는 useEffect
  useEffect(() => {
    // 선택한 필터에 따른 url 분기
    if (selected === 'all') {
      url = `${url}/maps/${address}`;
    } else if (selected === 'mypick') {
      url = `${url}/maps/mypick`;
    } else {
      url = `${url}/maps/${address}/?filter=${selected.toUpperCase()}`;
    }

    // address가 undefined가 아닐 때만 GET 요청을 보내 데이터를 받아온다.
    if (address !== undefined) {
      axios.get(url, { headers }).then((res) => {
        setData(res.data);
      });
    }
  }, [selected, address]);

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
  // 1. isLocationChange를 true로 바꾸고, 현재 지도의 중심 좌표를 setNewLocation한다.
  const dragHandler = (map: any) => {
    setIsLocationChanged(true);
    setNewLocation({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });

    getAddress(newLocation.lat, newLocation.lng);
  };

  // 현재 위치에서 검색하기 버튼을 눌렀을 때 실행되는 함수
  // newLocation을 setCurrentLocation하고, fullAddress에 기반해 address를 업데이트하는 함수
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
            return <Marker key={el.infoMapId} {...el} />;
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
