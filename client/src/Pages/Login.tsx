import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import color from '../color';
import { Background, Box, LeftDiv, RightDiv } from '../Components/Box';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { PawIconSVG } from '../Components/PawIconSVG';
import axios from 'axios';
const { brown } = color;
const url = '';
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

const Login: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const userIdHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setId((e.target as HTMLInputElement).value);
    console.log((e.target as HTMLInputElement).value);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((e.target as HTMLInputElement).value);
    console.log((e.target as HTMLInputElement).value);
  };
  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body = {
      loginId: id,
      password: password,
    };
    if (id !== '' && password !== '') {
      try {
        const response = await axios.post(`${url}/login`, body);
        const jwtToken = response.headers.authorization as string;
        const refreshToken = response.headers.refresh as string;
        localStorage.setItem('Authorization', jwtToken);
        localStorage.setItem('Refresh', refreshToken);
        navigate('/map');
        // 지금은 map이 초기 화면 이니까
        window.location.reload();
      } catch (error) {
        console.error('Error', error);
        alert(error);
      }
    } else {
      alert('공란이 없어야 합니다');
    }
  };
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
            <Input type='text' placeholder='아이디' onChange={userIdHandler} />
            <Input type='password' placeholder='비밀번호' onChange={passwordHandler} />
          </InputDiv>

          <ButtonDiv>
            <Button text='로그인' onClick={submitHandler} />
          </ButtonDiv>
          <SignUpA href='/signup'>회원가입</SignUpA>
        </RightDiv>
      </Box>
    </Container>
  );
};

export default Login;
