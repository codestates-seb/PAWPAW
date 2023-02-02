import React, { FC, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';

import color from '../util/color';
import { Background, Box, LeftDiv, RightDiv } from '../Components/Box';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { PawIconSVG } from '../Components/PawIconSVG';
const { ivory, yellow, brown, red } = color;

const SignUp: FC = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [petName, setPetName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const [isUniqueId, setIsUniqueId] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState({
    nameErrorMessage: '',
    idErrorMessage: '',
    pwErrorMessage: '',
    pwCnfmErrorMessage: '',
  });
  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const pwCnfmRef = useRef<HTMLInputElement>(null);

  const petNameHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPetName((e.target as HTMLInputElement).value);
  };

  const userIdHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setId((e.target as HTMLInputElement).value);
  };

  const pwHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword((e.target as HTMLInputElement).value);
  };

  const pwconfirmHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordConfirm((e.target as HTMLInputElement).value);
  };

  const idValidationHandler = async () => {
    const notAllowedChar = id.search(/[`ㄱ-ㅎ|ㅏ-ㅣ|가-힣~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (id === '') {
      idRef.current && idRef.current.focus();
      setErrorMessage((prev) => {
        return { ...prev, idErrorMessage: '아이디를 입력해주세요.' };
      });
      return;
    } else if (notAllowedChar > 0) {
      setErrorMessage((prev) => {
        return { ...prev, idErrorMessage: '아이디는 영문, 숫자만 입력할 수 있습니다.' };
      });
      return;
    } else {
      setErrorMessage((prev) => {
        return { ...prev, idErrorMessage: '' };
      });
    }
    {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/pets/check/${id}`);
        const value = response.data as boolean;
        if (response.data === false) {
          setIsUniqueId(true);
          setErrorMessage((prev) => {
            return { ...prev, idErrorMessage: '사용 가능한 아이디입니다.' };
          });
          Swal.fire({
            title: '유효한 아이디입니다.',
            confirmButtonText: '<b>사용하기</b>',
            color: brown,
            confirmButtonColor: yellow,
            padding: '40px 0px 30px 0px',
          });
        } else if (response.data === true) {
          setIsUniqueId(false);
          setErrorMessage((prev) => {
            return { ...prev, idErrorMessage: '중복된 아이디입니다.' };
          });
          Swal.fire({
            icon: 'error',
            title: '중복된 아이디입니다.',
            confirmButtonText: '<b>확인</b>',
            color: brown,
            confirmButtonColor: yellow,
          });
        }
      } catch (error) {
        console.error('Error', error);
        alert(error);
      }
    }
  };

  const goNextPage = () => {
    printErrorMessage();
    if (
      errorMessage.nameErrorMessage === '' &&
      errorMessage.idErrorMessage === '' &&
      errorMessage.pwErrorMessage === '' &&
      errorMessage.pwCnfmErrorMessage === '' &&
      isUniqueId
    ) {
      navigate('/userinfo', { state: { id: id, password: password, petname: petName } });
    }
  };

  const printErrorMessage = () => {
    if (petName === '') {
      nameRef.current && nameRef.current.focus();
      setErrorMessage((prev) => {
        return { ...prev, nameErrorMessage: '반려동물의 이름을 입력해주세요.' };
      });
    } else {
      setErrorMessage((prev) => {
        return { ...prev, nameErrorMessage: '' };
      });
    }

    if (id === '') {
      idRef.current && idRef.current.focus();
      setErrorMessage((prev) => {
        return { ...prev, idErrorMessage: '아이디를 입력해주세요.' };
      });
    } else if (!isUniqueId) {
      idRef.current && idRef.current.focus();
      setErrorMessage((prev) => {
        return { ...prev, idErrorMessage: '아이디 중복확인을 해주세요.' };
      });
    } else {
      setErrorMessage((prev) => {
        return { ...prev, idErrorMessage: '' };
      });
    }

    if (password === '') {
      pwRef.current && pwRef.current.focus();
      setErrorMessage((prev) => {
        return { ...prev, pwErrorMessage: '비밀번호를 입력해주세요.' };
      });
    } else {
      setErrorMessage((prev) => {
        return { ...prev, pwErrorMessage: '' };
      });
    }

    if (password !== passwordConfirm) {
      setErrorMessage((prev) => {
        pwCnfmRef.current && pwCnfmRef.current.focus();
        return { ...prev, pwCnfmErrorMessage: '비밀번호가 일치하지 않습니다.' };
      });
    } else {
      setErrorMessage((prev) => {
        return { ...prev, pwCnfmErrorMessage: '' };
      });
    }
  };

  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      goNextPage();
    }
  };

  return (
    <Container>
      <Background />
      <Box>
        <LeftDiv>
          <IconDiv>
            <PawIconSVG width='120' height='119' viewBox='0 0 120 119' fill={ivory} />
          </IconDiv>
        </LeftDiv>
        <RightDiv>
          <TextDiv>회원가입</TextDiv>
          <InputsDiv>
            <InputDiv>
              <Input
                type='text'
                placeholder='반려동물 이름'
                onChange={petNameHandler}
                ref={nameRef}
              />
              <MessageDiv>{errorMessage.nameErrorMessage}</MessageDiv>
            </InputDiv>
            <IdDiv>
              <Input
                type='text'
                placeholder='아이디'
                paddingRight='60px'
                onChange={userIdHandler}
                ref={idRef}
              />
              <ConfirmSpan onClick={idValidationHandler}>중복확인</ConfirmSpan>
              <MessageDiv>{errorMessage.idErrorMessage}</MessageDiv>
            </IdDiv>
            <PasswordDiv>
              <Input
                type={passwordVisible ? 'text' : 'password'}
                placeholder='비밀번호'
                paddingRight='35px'
                onChange={pwHandler}
                ref={pwRef}
              />
              <MessageDiv>{errorMessage.pwErrorMessage}</MessageDiv>
              <SvgSpan onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? (
                  <Icon
                    icon='ic:baseline-remove-red-eye'
                    color={brown}
                    style={{ fontSize: '17px' }}
                  />
                ) : (
                  <Icon icon='ph:eye-closed-bold' color={brown} style={{ fontSize: '17px' }} />
                )}
              </SvgSpan>
            </PasswordDiv>
            <PasswordDiv>
              <Input
                type={passwordVisible ? 'text' : 'password'}
                placeholder='비밀번호 확인'
                paddingRight='35px'
                onChange={pwconfirmHandler}
                onKeyUp={enterHandler}
                ref={pwCnfmRef}
              />
              <MessageDiv>{errorMessage.pwCnfmErrorMessage}</MessageDiv>
              <SvgSpan onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? (
                  <Icon
                    icon='ic:baseline-remove-red-eye'
                    color={brown}
                    style={{ fontSize: '17px' }}
                  />
                ) : (
                  <Icon icon='ph:eye-closed-bold' color={brown} style={{ fontSize: '17px' }} />
                )}
              </SvgSpan>
            </PasswordDiv>
          </InputsDiv>
          <ButtonDiv>
            <Button text='회원가입' onClick={goNextPage} />
          </ButtonDiv>
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

const IconDiv = styled.div`
  margin-top: 87px;
`;

const TextDiv = styled.div`
  margin-top: 60px;
  margin-bottom: 45px;
  font-size: 24px;
  font-weight: bold;
  color: ${brown};
`;

const InputsDiv = styled.div``;

const ButtonDiv = styled.div`
  margin-top: 17px;
`;

const IdDiv = styled.div`
  position: relative;
`;

const ConfirmSpan = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #aa8080;
  position: absolute;
  top: 19px;
  right: 12px;
  cursor: pointer;
  &:hover {
    color: ${brown};
  }
`;

const PasswordDiv = styled.div`
  position: relative;
`;

const SvgSpan = styled.span`
  position: absolute;
  top: 17px;
  right: 12px;
  cursor: pointer;
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

export default SignUp;
