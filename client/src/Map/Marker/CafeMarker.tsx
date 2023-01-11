import React from 'react';
import color from '../../color';
import styled from 'styled-components';
import { MapMarker, Map, MapInfoWindow, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Icon } from '@iconify/react';

const CafeMarker = () => {
    return (
    <IconBox className='pos'>
          <Icon icon='ph:coffee-fill' color='#7d5a5a' style={{ fontSize: '23px' }} />
    </IconBox>
  );
};

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3px;
`

export default CafeMarker;
