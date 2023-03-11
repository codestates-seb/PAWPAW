/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable camelcase */
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import color from '../util/color';
import { Background, Box, LeftDiv, RightDiv } from '../Components/Box';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { PawIconSVG } from '../Components/PawIconSVG';
const { ivory, coral, brown, red, darkbrown } = color;

interface UserData {
  0: string;
  1: string;
}

export interface Info {
  petName: string;
  petNameSpan: string;
  petId: number;
  exp: number;
  code: number;
  roles: UserData[] | null;
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
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((e.target as HTMLInputElement).value);
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
        const admin = jwtToken_decode.roles as unknown as UserData;
        setPetId(petid.toString());
        const refreshToken = response.headers.refresh as string;
        localStorage.setItem('Authorization', jwtToken);
        localStorage.setItem('Refresh', refreshToken);
        localStorage.setItem('petId', petid);
        localStorage.setItem('code', code.toString());
        if (admin[1] !== null) {
          localStorage.setItem('Admin', admin[1]);
        }
        navigate('/map');
      } catch (error: any) {
        console.error('Error', error);
        error.response.data.message === 'Withdraw member'
          ? Swal.fire({
              title: '탈퇴 회원',
              text: '탈퇴한 회원입니다. 로그인이 불가능합니다.',
              icon: 'warning',
              confirmButtonColor: red,
              confirmButtonText: '<b>확인</b>',
            })
          : setPwErrorMessage('아이디 혹은 비밀번호가 일치하지 않습니다.');
        if (pwRef.current) {
          pwRef.current.focus();
          pwRef.current.value = '';
        }
      }
    }
  };

  const printErrorMessage = () => {
    if (id === '') {
      setIdErrorMessage('아이디를 입력해주세요.');
      idRef.current && idRef.current.focus();
    } else {
      setIdErrorMessage('');
    }

    if (password === '') {
      setPwErrorMessage('비밀번호를 입력해주세요.');
      pwRef.current && pwRef.current.focus();
    } else {
      setPwErrorMessage('');
    }
  };

  const guestLoginHandler = () => {
    setId('guest1234');
    setPassword('1234');
  };

  return (
    <Container>
      <Background />
      <Box>
        <LeftDiv>
          <IntroDiv>
            <TitleBox>
              <TitleH1>PAW PAW</TitleH1>
              <TextDiv>
                반려동물과 함께라면 <br />
                어디든 갈 수 있어!
              </TextDiv>
            </TitleBox>
            <DeveloperDiv>
              <div>
                <NameSpan>
                  <span className='part'>Front</span>
                  <Icon icon='mdi:paw' style={{ fontSize: '15px' }} color='#FFDC84' />
                  <span className='name'>김수진 이건희 천지은</span>
                </NameSpan>
              </div>
              <div>
                <NameSpan>
                  <span className='part'>Back</span>
                  <Icon icon='mdi:paw' style={{ fontSize: '15px' }} color={brown} />
                  <span className='name'>김채원 김현동 오수빈</span>
                </NameSpan>
              </div>
            </DeveloperDiv>
          </IntroDiv>
        </LeftDiv>
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
            <GuestLoginBtn onClick={guestLoginHandler}>
              <Icon icon='material-symbols:login' fontSize={'20px'} />
              <TextSpan>게스트 로그인</TextSpan>
            </GuestLoginBtn>
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

const IntroDiv = styled.div`
  padding: 40px;
  width: 100%;
  height: 100%;
  color: ${ivory};
  font-weight: bold;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TitleH1 = styled.h1`
  margin: 10px 0px 10px 0px;
  font-size: 50px;
  font-family: Rubik Bubbles;
`;

const TextDiv = styled.div`
  width: 70%;
  height: 60%;
  font-size: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-weight: 800;
  line-height: 1.5;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DeveloperDiv = styled.div``;

const NameSpan = styled.span`
  display: flex;
  align-items: center;

  .part {
    width: 50px;
    font-family: Rubik Bubbles;
    font-weight: normal;
  }

  .name {
    margin-left: 15px;
    word-spacing: 5px;
  }
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

const GuestLoginBtn = styled.button`
  border: none;
  background: none;
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  color: ${brown};
  top: -25px;
  right: 5px;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
const TextSpan = styled.span`
  margin-left: 7px;
`;

export default Login;
