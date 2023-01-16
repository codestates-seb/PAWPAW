import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderText } from '../img/header';
import { HeaderTabSVG } from '../img/headerTabSVG';
import { Icon } from '@iconify/react';
import color from '../color';
import styled from 'styled-components';
const { ivory, brown, yellow } = color;
const Container = styled.header`
  width: 100%;
  height: 50px;
  background-color: ${ivory};
  display: flex;
  flex-direction: row;
  position: absolute;
  z-index: 100;
`;
const HeaderLeftBox = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;
const HeaderBlank = styled.div`
  width: 100%;
`;
const HeaderRightButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 7px 0 7px;
`;
const HeaderTextImg = styled.img`
  width: 109px;
  height: 41px;
`;
const Header: React.FC = () => {
  const [home, setHome] = useState<boolean>(false);
  const [map, setMap] = useState<boolean>(false);
  const [tab, setTab] = useState<boolean>(false);
  const [user, setUser] = useState<boolean>(false);
  const navigate = useNavigate();
  const mouseOverHomeHandler = () => {
    setHome(true);
  };
  const mouseOutHomeHandler = () => {
    setHome(false);
  };
  const mouseOverMapHandler = () => {
    setMap(true);
  };
  const mouseOutMapHandler = () => {
    setMap(false);
  };
  const mouseOverTabHandler = () => {
    setTab(true);
  };
  const mouseOutTabHandler = () => {
    setTab(false);
  };
  const mouseOverUserHandler = () => {
    setUser(true);
  };
  const mouseOutUserHandler = () => {
    setUser(false);
  };
  const goTo = () => {
    navigate('/MyPage');
  };
  return (
    <Container>
      <HeaderLeftBox onMouseOver={mouseOverHomeHandler} onMouseOut={mouseOutHomeHandler}>
        {home === false ? (
          <Icon icon='ph:paw-print-fill' style={{ fontSize: '40px' }} color={brown} />
        ) : (
          <Icon icon='ph:paw-print-fill' style={{ fontSize: '40px' }} color={yellow} />
        )}
      </HeaderLeftBox>
      <HeaderLeftBox>
        <HeaderTextImg src={HeaderText} />
      </HeaderLeftBox>
      <HeaderBlank />
      <HeaderRightButton onMouseOver={mouseOverMapHandler} onMouseOut={mouseOutMapHandler}>
        {map === false ? (
          <Icon icon='material-symbols:map' style={{ fontSize: '40px' }} color={brown} />
        ) : (
          <Icon icon='material-symbols:map' style={{ fontSize: '40px' }} color={yellow} />
        )}
      </HeaderRightButton>
      <HeaderRightButton onMouseOver={mouseOverTabHandler} onMouseOut={mouseOutTabHandler}>
        {tab === false ? (
          <HeaderTabSVG width='26' height='21' fill={brown} />
        ) : (
          <HeaderTabSVG width='26' height='21' fill={yellow} />
        )}
      </HeaderRightButton>
      <HeaderRightButton
        onMouseOver={mouseOverUserHandler}
        onMouseOut={mouseOutUserHandler}
        onClick={goTo}
      >
        {user === false ? (
          <Icon icon='mdi:user-circle' style={{ fontSize: '40px' }} color={brown} />
        ) : (
          <Icon icon='mdi:user-circle' style={{ fontSize: '40px' }} color={yellow} />
        )}
      </HeaderRightButton>
    </Container>
  );
};

export default Header;
