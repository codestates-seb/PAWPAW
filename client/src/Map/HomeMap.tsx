import MapFilter from './MapFilter';
import React, { useState } from 'react';
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
  filter: {
    selected: string;
    setSelected: (classname: string) => void;
  };
}

function HomeMap() {
  const [selected, setSelected] = useState<string>('all');
  let filteredData;

  // selected === 'all'인 경우, 모든 데이터를 보여준다.
  if (selected === 'all') {
    filteredData = data;
    // 그 외의 경우, selected와 일치하는 tag만 보여준다.
  } else {
    filteredData = data.filter((el) => el.tag === selected);
  }
  return (
    <Container>
      <Header />
      <Map
        className='map'
        center={{ lat: 37.57657, lng: 126.982066 }}
        style={{ width: '100%', height: '100%' }}
        level={6}
      >
        {filteredData.map((el, idx) => {
          return <Marker key={idx} {...el} />;
        })}
      </Map>
      <MapFilter selected={selected} setSelected={setSelected} />
    </Container>
  );
}

export default HomeMap;
