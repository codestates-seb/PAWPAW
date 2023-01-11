import React, { useState } from 'react';
import color from '../color';
import styled from 'styled-components';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import ParkMarker from './Marker/ParkMarker';
import CafeMarker from './Marker/CafeMarker';
import MyMarker from './Marker/MyMarker';
import HospitalMarker from './Marker/HospitalMarker';
import CampMarker from './Marker/CampMarker';
import FoodMarker from './Marker/FoodMarker';
import PropTypes from 'prop-types';
import { IProps } from './Map';
import PoolMarker from './Marker/PoolMarker';

const { brown, yellow } = color;

const Marker = (detail: IProps['detail']) => {
  const [click, setClick] = useState(false);

  const selectHandler = () => {
    setClick(!click);
    console.log('click', click);
  };

  function renderSwitch(param: any) {
    switch (param) {
      case 'cafe':
        return <CafeMarker />;
      case 'park':
        return <ParkMarker />;
      case 'food':
        return <FoodMarker />;
      case 'pool':
        return <PoolMarker />;
      case 'camping':
        return <CampMarker />;
      case 'hospital':
        return <HospitalMarker />;
      case 'my':
        return <MyMarker />;
      default:
        return '';
    }
  }

  return (
    <Container>
      <CustomOverlayMap position={{ lat: detail.lat, lng: detail.lng }}>
        <MarkContainer className={click ? 'active' : ''} onClick={selectHandler}>
          <div className='center'>
            <WhiteCircleBox>{renderSwitch(detail.tag)}</WhiteCircleBox>
          </div>
          <ParkName>{detail.title}</ParkName>
        </MarkContainer>
      </CustomOverlayMap>
    </Container>
  );
};

Marker.propsTypes = {
  title: PropTypes.string.isRequired,
};

const Container = styled.div`
  .focus {
    background-color: ${yellow};
  }
`;

const MarkContainer = styled.div`
  display: flex;
  height: 38px;
  color: white;
  font-weight: 900;
  line-height: 38px;
  border-radius: 20px;
  background-color: ${brown};
  cursor: pointer;

  .center {
    display: flex;
    align-items: center;
  }

  &::after {
    border-top: 10px solid ${brown};
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
    content: '';
    position: absolute;
    left: 45%;
    top: 100%;

  }
  &.active::after{
      border-top: 10px solid ${yellow};
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
    content: '';
    position: absolute;
    left: 45%;
    top: 100%;
  }

  &.active {
    background-color: ${yellow};
  }
`;
const WhiteCircleBox = styled.div`
  background-color: white;
  border-radius: 50%;
  margin-left: 4px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const ParkName = styled.div`
  padding-right: 15px;
`;

export default Marker;
