import React from 'react';
import color from '../../util/color';
import styled from 'styled-components';
import { MapMarker, Map, MapInfoWindow, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Icon } from '@iconify/react';

const FoodMarker = () => {
  return (
    <IconBox className='pos'>
      <Icon icon='fluent:food-24-filled' color='#fea572' style={{ fontSize: '23px' }} />
    </IconBox>
  );
};

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 1px;
`;

export default FoodMarker;
