import { useRef } from 'react';
import * as React from 'react';
import color from '../color';
import styled from 'styled-components';
import { Map } from 'react-kakao-maps-sdk';
import MapFilter from './MapFilter';

const Container = styled.div`
  position: relative;

  .map {
    position: absolute;
  }
`;

function HomeMap() {
  return (
    <Container>
      {/* <Map
        className='map'
        center={{ lat: 37.57657, lng: 126.982066 }}
        style={{ width: '1440px', height: '900px' }}
        level={6}
      ></Map> */}
      <MapFilter />
    </Container>
  );
}

export default HomeMap;
