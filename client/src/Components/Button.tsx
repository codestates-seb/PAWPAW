import React from 'react';
import styled from 'styled-components';
import color from '../util/color';
import { ButtonProps } from '../types';

const { brown, darkbrown } = color;

const Button = ({ text, onClick }: ButtonProps) => {
  return <StyledButton onClick={onClick}>{text} </StyledButton>;
};

const StyledButton = styled.button`
  width: 233px;
  height: 50px;
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  background-color: ${brown};
  cursor: pointer;

  &:hover {
    background-color: ${darkbrown};
  }
`;

export default Button;
