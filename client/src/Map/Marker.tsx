import PropTypes from 'prop-types';
import { useState } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import Modal from '../Components/Modal';
import color from '../util/color';
import { Place } from '../types';
import Icons from './Icons';

const { brown, yellow } = color;

const Marker = ({
  id,
  category,
  name,
  latitude,
  longitude,
  isModalOpen,
  setIsModalOpen,
}: Place) => {
  const [click, setClick] = useState<boolean>(false);

  const selectHandler = () => {
    setClick(!click);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Container>
      <CustomOverlayMap position={{ lat: latitude, lng: longitude }}>
        <MarkContainer className={click ? 'active' : ''} onClick={selectHandler}>
          <WhiteCircleBox>
            <Icons category={category} />
          </WhiteCircleBox>
          <NameDiv>{name}</NameDiv>
        </MarkContainer>
      </CustomOverlayMap>
      {click && (
        <ModalBack onClick={selectHandler}>
          <Modal click={click} setClick={setClick} title={name} id={id} />
        </ModalBack>
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
  height: 38px;
  font-weight: 900;
  border-radius: 20px;
  color: white;
  background-color: ${brown};
  display: flex;
  align-items: center;
  cursor: pointer;

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
  border-radius: 50%;
  margin-left: 4px;
  background-color: white;
  width: 30px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameDiv = styled.div`
  padding-left: 10px;
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

export default Marker;
