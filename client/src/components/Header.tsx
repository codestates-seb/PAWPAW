import React, { useState } from 'react';
import { HeaderText } from '../img/header';
import { HeaderTabSVG } from '../img/headerTabSVG';
import { Icon } from '@iconify/react';
import color from '../color';
import styled from 'styled-components';
const { ivory, brown, coral } = color;
const Container = styled.header`
  width: 100%;
  height: 70px;
  background-color: ${ivory};
  display: flex;
  flex-direction: row;
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
  margin: 0 10px 0 10px;
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
  return (
    <Container>
      <HeaderLeftBox onMouseOver={mouseOverHomeHandler} onMouseOut={mouseOutHomeHandler}>
        {home === false ? (
          <Icon icon='ph:paw-print-fill' style={{ fontSize: '50px' }} color={brown} />
        ) : (
          <Icon icon='ph:paw-print-fill' style={{ fontSize: '50px' }} color={coral} />
        )}
      </HeaderLeftBox>
      <HeaderLeftBox>
        <HeaderTextImg src={HeaderText} />
      </HeaderLeftBox>
      <HeaderBlank />
      <HeaderRightButton onMouseOver={mouseOverMapHandler} onMouseOut={mouseOutMapHandler}>
        {map === false ? (
          <Icon icon='material-symbols:map' style={{ fontSize: '50px' }} color={brown} />
        ) : (
          <Icon icon='material-symbols:map' style={{ fontSize: '50px' }} color={coral} />
        )}
      </HeaderRightButton>
      <HeaderRightButton onMouseOver={mouseOverTabHandler} onMouseOut={mouseOutTabHandler}>
        {tab === false ? (
          <HeaderTabSVG width='33' height='27' fill={brown} />
        ) : (
          <HeaderTabSVG width='33' height='27' fill={coral} />
        )}
      </HeaderRightButton>
      <HeaderRightButton onMouseOver={mouseOverUserHandler} onMouseOut={mouseOutUserHandler}>
        {user === false ? (
          <Icon icon='mdi:user-circle' style={{ fontSize: '50px' }} color={brown} />
        ) : (
          <Icon icon='mdi:user-circle' style={{ fontSize: '50px' }} color={coral} />
        )}
      </HeaderRightButton>
    </Container>
  );
};

export default Header;
