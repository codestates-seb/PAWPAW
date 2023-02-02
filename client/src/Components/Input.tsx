import React, { forwardRef } from 'react';
import styled from 'styled-components';
import color from '../util/color';

const { brown, bordergrey } = color;

type Props = {
  type: string;
  readOnly?: boolean;
  placeholder: string;
  paddingRight?: string;
  marginBottom?: string;
  width?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openAddressModal?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const StyledInput = styled.input<Props>`
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
  }: Props,
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

export default forwardRef(Input);
