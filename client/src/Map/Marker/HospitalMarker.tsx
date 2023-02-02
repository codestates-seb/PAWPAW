import React from 'react';
import color from '../../util/color';
import styled from 'styled-components';
import { MapMarker, Map, MapInfoWindow, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Icon } from '@iconify/react';

const HospitalMarker = () => {
  return (
    <IconBox className='pos'>
      <Icon icon='ic:baseline-local-hospital' color='#ff6c6c' style={{ fontSize: '23px' }} />
    </IconBox>
  );
};

const IconBox = styled.div`
  display: flex;
  justify-content: center;
`;

export default HospitalMarker;
