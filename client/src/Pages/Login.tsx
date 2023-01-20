/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable camelcase */
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import color from '../color';
import { Background, Box, LeftDiv, RightDiv } from '../Components/Box';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { PawIconSVG } from '../Components/PawIconSVG';
import jwt_decode from 'jwt-decode';
const { brown, red } = color;

// 전체 화면
interface Info {
  petName: string;
  petId: number;
  exp: number;
  roles: any;
  sub: string;
  code: number;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>('');
  const [petId, setPetId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [idErrorMessage, setIdErrorMessage] = useState<string>('');
  const [pwErrorMessage, setPwErrorMessage] = useState<string>('');
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const userIdHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setId((e.target as HTMLInputElement).value);
    // console.log((e.target as HTMLInputElement).value);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((e.target as HTMLInputElement).value);
    // console.log((e.target as HTMLInputElement).value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    printErrorMessage();

    const body = {
      loginId: id,
      password: password,
    };

    if (id !== '' && password !== '') {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/login`, body);
        const jwtToken = response.headers.authorization as string;
        const jwtToken_decode = jwt_decode(jwtToken) as Info;
        // @ts-ignore
        const petid = jwtToken_decode.petId as string;
        const code = jwtToken_decode.code as number;
        setPetId(petid.toString());
        console.log('petId', petId);
        const refreshToken = response.headers.refresh as string;
        localStorage.setItem('Authorization', jwtToken);
        localStorage.setItem('Refresh', refreshToken);
        localStorage.setItem('code', code.toString());
        localStorage.setItem('petId', petid);
        navigate('/map');
        // window.location.reload();
      } catch (error) {
        console.error('Error', error);
        setPwErrorMessage('아이디 혹은 비밀번호가 일치하지 않습니다.');
        if (pwRef.current) {
          pwRef.current.focus(); // pw에 포커스
          pwRef.current.value = ''; // 값 초기화
        }
      }
    }
  };

  const printErrorMessage = () => {
    if (id === '') {
      setIdErrorMessage('아이디를 입력해주세요.');
      idRef.current && idRef.current.focus(); // id에 포커스
    } else {
      setIdErrorMessage('');
    }

    if (password === '') {
      setPwErrorMessage('비밀번호를 입력해주세요.');
      pwRef.current && pwRef.current.focus(); // pw에 포커스
    } else {
      setPwErrorMessage('');
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
          <form onSubmit={submitHandler}>
            <InputsDiv>
              <InputDiv>
                <Input type='text' placeholder='아이디' onChange={userIdHandler} ref={idRef} />
                <MessageDiv>{idErrorMessage}</MessageDiv>
              </InputDiv>
              <InputDiv>
                <Input
                  type='password'
                  placeholder='비밀번호'
                  onChange={passwordHandler}
                  ref={pwRef}
                />
                <MessageDiv>{pwErrorMessage}</MessageDiv>
              </InputDiv>
            </InputsDiv>
            <ButtonDiv>
              <Button text='로그인' />
            </ButtonDiv>
          </form>
          <SignUpA href='/signup'>회원가입</SignUpA>
        </RightDiv>
      </Box>
    </Container>
  );
};

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

const InputsDiv = styled.div`
  display: flex;
  flex-direction: column;
  input:last-child {
    margin-bottom: 0px;
  }
`;

const ButtonDiv = styled.div`
  margin-top: 22px;
`;

const SignUpA = styled.a`
  margin-top: 21px;
  color: ${brown};
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const InputDiv = styled.div`
  position: relative;
`;

const MessageDiv = styled.div`
  width: 102%;
  font-size: 14px;
  font-weight: 500;
  color: ${red};
  position: absolute;
  top: 73%;
  text-align: center;
`;

export default Login;
