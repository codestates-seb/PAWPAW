import React, { FC } from 'react';
import styled from 'styled-components';
import color from '../color';
import { Background, Box, LeftDiv, RightDiv } from '../Components/Box';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { PawIconSVG } from '../Components/PawIconSVG';

const { brown } = color;

// 전체 화면
const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// Background, Box, LeftDiv, RightDiv import

const TextDiv = styled.div`
  margin-top: 150px;
  font-size: 32px;
  font-weight: bold;
  color: white;
`;

const IconDiv = styled.div`
  margin-top: 87px;
  margin-bottom: 50px;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  input:last-child {
    margin-bottom: 0px;
  }
`;

const ButtonDiv = styled.div`
  margin-top: 50px;
`;

const SignUpA = styled.a`
  margin-top: 21px;
  color: ${brown};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Login: FC = () => {
  return (
    <Container>
      <Background />
      <Box>
        {/* 왼쪽 영역 */}
        <LeftDiv>
          <TextDiv>서비스 소개</TextDiv>
        </LeftDiv>

        {/* 오른쪽 영역 */}
        <RightDiv>
          <IconDiv>
            <PawIconSVG width='120' height='119' viewBox='0 0 120 119' fill={brown} />
          </IconDiv>

          <InputDiv>
            <Input type='text' placeholder='아이디' />
            <Input type='password' placeholder='비밀번호' />
          </InputDiv>

          <ButtonDiv>
            <Button text='로그인' />
          </ButtonDiv>
          <SignUpA>회원가입</SignUpA>
        </RightDiv>
      </Box>
    </Container>
  );
};

export default Login;
