import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import color from '../color';
const { brown, yellow } = color;

const Nav: React.FC = () => {
  const [selected, setSelected] = useState('board');

  return (
    <Container>
      <Link to={'/community'}>
        <Menu
          className={selected === 'board' ? 'selected' : ''}
          onClick={() => setSelected('board')}
        >
          자유게시판
        </Menu>
      </Link>
      <Link to={'/addmarker'}>
        <Menu
          className={selected === 'addPlace' ? 'selected' : ''}
          onClick={() => setSelected('addPlace')}
        >
          장소 추가하기
        </Menu>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  padding: 37px 0px 0px 43px;
  border-right: 1px solid #d7d7d7;
  width: 235px;
  height: 100%;
`;

const Menu = styled.div`
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 192px;
  height: 60px;
  font-size: 20px;
  font-weight: bold;
  color: ${brown};
  position: relative;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${yellow};
  }

  &.selected::after {
    content: '';
    width: 6px;
    height: 100%;
    background-color: ${yellow};
    position: absolute;
    right: 0;
  }
`;

export default Nav;
