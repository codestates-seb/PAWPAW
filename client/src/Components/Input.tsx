import React from 'react';
import styled from 'styled-components';
import color from '../color';

const { brown, bordergrey } = color;

type Props = {
  type: string;
  placeholder: string;
  paddingRight?: string;
  marginBottom?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StyledInput = styled.input<Props>`
  width: 233px;
  height: 50px;
  margin-bottom: ${(props) => (props.marginBottom ? '40px' : '28px')};
  padding: 12px 16px 7px 16px;
  padding-right: ${(props) => props.paddingRight};
  border: 1px solid ${bordergrey};
  border-radius: 15px;
  color: ${brown};
  font-weight: bold;
  font-size: 18px;

  &::placeholder {
    color: ${brown};
  }
`;

const Input = ({ type, placeholder, paddingRight, marginBottom, onChange }: Props) => {
  return (
    <>
      <StyledInput
        type={type}
        placeholder={placeholder}
        paddingRight={paddingRight}
        marginBottom={marginBottom}
        onChange={onChange}
      />
    </>
  );
};

export default Input;