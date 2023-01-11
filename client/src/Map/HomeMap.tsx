import MapFilter from './MapFilter';
import React from 'react';
import color from '../color';
import styled from 'styled-components';
import { Map } from 'react-kakao-maps-sdk';
import Header from '../Components/Header';
import Marker from './Marker';

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

const data = [
  {
    tag: 'cafe',
    title: '향기 좋은 카페',
    lat: 37.597689,
    lng: 126.977055,
  },
  {
    tag: 'park',
    title: '맑은 풀내음 공원',
    lat: 37.592689,
    lng: 126.977055,
  },
  {
    tag: 'food',
    title: '밥이 맛있는 집',
    lat: 37.587689,
    lng: 126.977055,
  },
  {
    tag: 'pool',
    title: '시원한 수영장',
    lat: 37.582689,
    lng: 126.977055,
  },
  {
    tag: 'camping',
    title: '캠핑장',
    lat: 37.577689,
    lng: 126.977055,
  },
  {
    tag: 'hospital',
    title: '안아픈 병원',
    lat: 37.572689,
    lng: 126.977055,
  },
  {
    tag: 'my',
    title: '나의 장소',
    lat: 37.567689,
    lng: 126.977055,
  },
];

export interface IProps {
  detail: {
    tag: string;
    title: string;
    lat: number;
    lng: number;
  };
}

function HomeMap() {
  return (
    <Container>
      <Header />
      <Map
        className='map'
        center={{ lat: 37.57657, lng: 126.982066 }}
        style={{ width: '100%', height: '100%' }}
        level={6}
      >
        {data.map((el, idx) => {
          return <Marker key={idx} {...el} />;
        })}
      </Map>
      <MapFilter />
    </Container>
  );
}

export default HomeMap;
