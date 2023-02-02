import React from 'react';
import styled from 'styled-components';
import color from '../util/color';

const { brown, darkbrown } = color;

type Props = {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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

const Button = ({ text, onClick }: Props) => {
  return <StyledButton onClick={onClick}>{text} </StyledButton>;
};

export default Button;
