import React from 'react';
import styled from 'styled-components';
import color from '../util/color';

const { coral, ivory } = color;

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('https://ifh.cc/g/RlGckZ.jpg');
  background-size: cover;
  filter: blur(7px);
  position: absolute;
`;

export const Box = styled.div`
  width: 800px;
  height: 571px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: absolute;

  display: flex;
`;

export const LeftDiv = styled.div`
  background-color: ${coral};

  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const RightDiv = styled.div`
  background-color: ${ivory};

  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;
