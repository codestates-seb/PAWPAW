import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import color from '../color';
import { Background, Box, LeftDiv, RightDiv } from '../Components/Box';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { PawIconSVG } from '../Components/PawIconSVG';
import axios from 'axios';
const { brown } = color;
const url = 'http://localhost:8080';
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
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const userIdHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = (e.target as HTMLInputElement).value;
    setUserId(newValue);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (e.target as HTMLInputElement).value;
    setPassword(newValue);
  };
  const submitHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/login`, {
        loginId: userId,
        password: password,
      });

      const jwtToken = response.headers.authorization as string;
      localStorage.setItem('Authorization', jwtToken);
      navigate('/map');
      // 지금은 map이 초기 화면 이니까
      window.location.reload();
    } catch (error) {
      alert(error);
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
          <Link to={'/signup'}>
            <SignUpA>회원가입</SignUpA>
          </Link>
        </RightDiv>
      </Box>
    </Container>
  );
};

export default Login;
