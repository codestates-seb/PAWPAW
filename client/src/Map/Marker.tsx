import React, { useState } from 'react';
import color from '../util/color';
import styled from 'styled-components';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import ParkMarker from './Marker/ParkMarker';
import CafeMarker from './Marker/CafeMarker';
import MyMarker from './Marker/MyMarker';
import HospitalMarker from './Marker/HospitalMarker';
import CampMarker from './Marker/CampMarker';
import FoodMarker from './Marker/FoodMarker';
import PropTypes from 'prop-types';
import PoolMarker from './Marker/PoolMarker';
import { IProps } from './HomeMap';
import Modal from '../Components/Modal';

const { brown, yellow } = color;

const Marker = ({
  id,
  category,
  name,
  latitude,
  longitude,
  isModalOpen,
  setIsModalOpen,
}: IProps) => {
  const [click, setClick] = useState<boolean>(false);

  const selectHandler = () => {
    setClick(!click);
    setIsModalOpen(!isModalOpen);
  };

  function renderSwitch(category: string) {
    switch (category) {
      case '카페':
        return <CafeMarker />;
      case '공원':
        return <ParkMarker />;
      case '음식점':
        return <FoodMarker />;
      case '수영장':
        return <PoolMarker />;
      case '캠핑':
        return <CampMarker />;
      case '병원':
        return <HospitalMarker />;
      case '나의장소':
        return <MyMarker />;
      default:
        return '';
    }
  }

  return (
    <Container>
      <CustomOverlayMap position={{ lat: latitude, lng: longitude }}>
        <MarkContainer className={click ? 'active' : ''} onClick={selectHandler}>
          <div className='center'>
            <WhiteCircleBox>{renderSwitch(category)}</WhiteCircleBox>
          </div>
          <ParkName>{name}</ParkName>
        </MarkContainer>
      </CustomOverlayMap>
      {click ? (
        <>
          <ModalBack onClick={selectHandler}>
            <Modal click={click} setClick={setClick} title={name} id={id} />
          </ModalBack>
        </>
      ) : (
        ''
      )}
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
  line-height: 40px;

  .center {
    display: flex;
    align-items: center;
  }

  &::after {
    border-top: 10px solid ${brown};
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 10px solid transparent;
    content: '';
    position: absolute;
    left: 47%;
    top: 95%;
  }

  // hover & 클릭 시 노란색
  &.active,
  &:hover {
    background-color: ${yellow};

    &::after {
      border-top: 10px solid ${yellow};
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 10px solid transparent;
      content: '';
      position: absolute;
      left: 47%;
      top: 100%;
    }
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
  user-select: none;
`;

const ModalBack = styled.div`
  position: fixed;
  z-index: 999;
  top: 50px;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalCloseBox = styled.div`
  position: fixed;
  z-index: 999;
  top: 476px;
  left: 350px;
  bottom: 0;
  right: 0;
  opacity: 0.8;
  .close {
    cursor: pointer;
  }
`;

export default Marker;
