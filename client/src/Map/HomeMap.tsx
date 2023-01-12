import MapFilter from './MapFilter';
import React from 'react';
import color from '../color';
import styled from 'styled-components';
import { Map } from 'react-kakao-maps-sdk';
import Header from '../Components/Header';
import Marker from './Marker';
import { data } from '../dummydata';

const Container = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    position: absolute;
  }

  .map {
    margin-top: 50px;
    position: absolute;
  }
`;

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
