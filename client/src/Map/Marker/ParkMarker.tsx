import React from 'react';
import color from '../../color';
import styled from 'styled-components';
import { MapMarker, Map, MapInfoWindow, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Icon } from '@iconify/react';

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2px;
`;

const ParkMarker = () => {
  return (
    <IconBox>
      <Icon
        className='pos'
        icon='material-symbols:park-rounded'
        style={{ fontSize: '25px' }}
        color='#5b8a72'
      />
    </IconBox>
  );
};

export default ParkMarker;
