import React from 'react';
import color from '../../color';
import styled from 'styled-components';
import { MapMarker, Map, MapInfoWindow, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Icon } from '@iconify/react';

const CampMarker = () => {
    return (
    <IconBox className='pos'>
          <Icon icon="material-symbols:camping" color="#93c246" style={{ fontSize: '23px' }} />
    </IconBox>
  );
};

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1px;
`

export default CampMarker;
