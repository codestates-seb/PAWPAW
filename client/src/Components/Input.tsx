import React, { forwardRef } from 'react';
import styled from 'styled-components';
import color from '../util/color';
import { InputProps } from '../types';

const { brown, bordergrey } = color;

const Input = (
  {
    type,
    readOnly,
    placeholder,
    paddingRight,
    marginBottom,
    width,
    onChange,
    onKeyUp,
    openAddressModal,
  }: InputProps,
  ref: any,
) => {
  return (
    <>
      <StyledInput
        type={type}
        readOnly={readOnly}
        placeholder={placeholder}
        paddingRight={paddingRight}
        marginBottom={marginBottom}
        width={width}
        onChange={onChange}
        onKeyUp={onKeyUp}
        onClick={openAddressModal}
        ref={ref}
      />
    </>
  );
};

const StyledInput = styled.input<InputProps>`
  width: ${(props) => (props.width ? props.width : '233px')};
  height: 50px;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '28px')};
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

export default forwardRef(Input);
