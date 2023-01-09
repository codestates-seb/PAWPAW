import React from 'react';
import styled from 'styled-components';
import color from '../color';

const { brown, bordergrey } = color;

type Props = {
  type: string;
  placeholder: string;
};

const StyledInput = styled.input`
  width: 233px;
  height: 50px;
  margin-bottom: 28px;
  padding: 12px 16px 7px 16px;
  border: 1px solid ${bordergrey};
  border-radius: 15px;
  color: ${brown};
  font-weight: bold;
  font-size: 18px;

  &::placeholder {
    color: ${brown};
  }
`;

const Input = ({ type, placeholder }: Props) => {
  return (
    <>
      <StyledInput type={type} placeholder={placeholder} />
    </>
  );
};

export default Input;
