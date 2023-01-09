import React from 'react';
import {
  HeaderIcon,
  HeaderText,
  HeaderTabIcon,
  HeaderMapIcon,
  HeaderUserIcon,
} from '../img/header';
import color from '../color';
import styled from 'styled-components';
const { ivory } = color;
const Container = styled.header``;
const HeaderBox = styled.div`
  width: 100%;
  height: 70px;
  background-color: ${ivory};
  display: flex;
  flex-direction: row;
`;
const HeaderLeftBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 10px 0px 10px;
`;
const HeaderBlank = styled.div`
  width: 70%;
`;
const HeaderRightBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 12px 0px 12px;
`;
const HeaderIconImg = styled.img`
  width: 50px;
  height: 50px;
`;
const HeaderTextImg = styled.img`
  width: 145px;
  height: 45px;
`;
const HeaderMapImg = styled.img`
  width: 45px;
  height: 45px;
`;
const HeaderTabImg = styled.img`
  width: 33px;
  height: 27px;
`;
const HeaderUserImg = styled.img`
  width: 49px;
  height: 49px;
`;
const Header: React.FC = () => {
  return (
    <Container>
      <HeaderBox>
        <HeaderLeftBox>
          <HeaderIconImg src={HeaderIcon} />
        </HeaderLeftBox>
        <HeaderLeftBox>
          <HeaderTextImg src={HeaderText} />
        </HeaderLeftBox>
        <HeaderBlank />
        <HeaderRightBox>
          <HeaderMapImg src={HeaderMapIcon} />
        </HeaderRightBox>
        <HeaderRightBox>
          <HeaderTabImg src={HeaderTabIcon} />
        </HeaderRightBox>
        <HeaderRightBox>
          <HeaderUserImg src={HeaderUserIcon} />
        </HeaderRightBox>
      </HeaderBox>
    </Container>
  );
};

export default Header;
