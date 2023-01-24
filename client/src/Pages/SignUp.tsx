import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import color from '../color';
import { Background, Box, LeftDiv, RightDiv } from '../Components/Box';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { PawIconSVG } from '../Components/PawIconSVG';

const { ivory, brown } = color;
const url = process.env.REACT_APP_API_ROOT;
// 전체 화면
const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// Background, Box, LeftDiv, RightDiv import

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

const InputDiv = styled.div`
  div:last-child input {
    margin-bottom: 0px;
  }
`;

const ButtonDiv = styled.div`
  margin-top: 45px;
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

const OpenedEyeSVG = (
  <svg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M8.49992 3.1875C4.95825 3.1875 1.93367 5.39042 0.708252 8.5C1.93367 11.6096 4.95825 13.8125 8.49992 13.8125C12.0416 13.8125 15.0662 11.6096 16.2916 8.5C15.0662 5.39042 12.0416 3.1875 8.49992 3.1875ZM8.49992 12.0417C6.54492 12.0417 4.95825 10.455 4.95825 8.5C4.95825 6.545 6.54492 4.95833 8.49992 4.95833C10.4549 4.95833 12.0416 6.545 12.0416 8.5C12.0416 10.455 10.4549 12.0417 8.49992 12.0417ZM8.49992 6.375C7.32409 6.375 6.37492 7.32417 6.37492 8.5C6.37492 9.67583 7.32409 10.625 8.49992 10.625C9.67575 10.625 10.6249 9.67583 10.6249 8.5C10.6249 7.32417 9.67575 6.375 8.49992 6.375Z'
      fill='#7D5A5A'
    />
  </svg>
);

const ClosedEyeSVG = (
  <svg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M15.4427 9.84157C15.515 9.97165 15.553 10.1192 15.553 10.2694C15.553 10.4196 15.5149 10.5672 15.4426 10.6972C15.3703 10.8273 15.2663 10.9353 15.1412 11.0103C15.016 11.0853 14.874 11.1248 14.7295 11.1247C14.5847 11.1263 14.4421 11.0874 14.3166 11.0122C14.1912 10.937 14.0874 10.8281 14.0163 10.697L12.8984 8.68675C12.2689 9.09626 11.5912 9.41971 10.8821 9.6491L11.2387 11.7449C11.2585 11.8554 11.2568 11.9689 11.234 12.0788C11.2111 12.1887 11.1675 12.2928 11.1056 12.385C11.0437 12.4772 10.9648 12.5557 10.8734 12.6159C10.7821 12.6761 10.6801 12.7168 10.5735 12.7357L10.4295 12.75C10.2364 12.7497 10.0495 12.6789 9.90155 12.5499C9.75361 12.4209 9.65403 12.2419 9.62023 12.0443L9.27047 9.9984C8.8975 10.0481 8.52177 10.0719 8.14575 10.0697C7.76757 10.0681 7.38977 10.0443 7.01417 9.9984L6.66441 12.0443C6.63062 12.2419 6.53103 12.4209 6.38309 12.5499C6.23515 12.6789 6.04827 12.7497 5.85516 12.75L5.71114 12.7357C5.60452 12.7168 5.50257 12.6761 5.41123 12.6159C5.31989 12.5557 5.24098 12.4772 5.17908 12.385C5.11718 12.2928 5.07353 12.1887 5.05067 12.0788C5.02781 11.9689 5.02619 11.8554 5.04591 11.7449L5.40253 9.6491C4.69563 9.41966 4.02023 9.09619 3.39311 8.68675L2.26839 10.7112C2.19559 10.8409 2.0915 10.9485 1.96641 11.0235C1.84132 11.0986 1.69957 11.1383 1.55515 11.139C1.41061 11.1402 1.26844 11.1007 1.14367 11.0249C1.04996 10.9688 0.967815 10.894 0.901926 10.8049C0.836036 10.7157 0.787698 10.6139 0.759673 10.5054C0.731648 10.3968 0.724487 10.2835 0.738598 10.1721C0.75271 10.0606 0.787819 9.95317 0.841916 9.85583L2.06951 7.64599C1.6541 7.26241 1.27095 6.84269 0.924213 6.39138C0.848457 6.30536 0.79042 6.20416 0.753667 6.09398C0.716914 5.98381 0.702221 5.86698 0.710491 5.75069C0.718762 5.63439 0.749821 5.52108 0.80176 5.41772C0.853699 5.31436 0.925421 5.22312 1.01252 5.14963C1.09962 5.07613 1.20026 5.02192 1.30825 4.99032C1.41624 4.95873 1.52931 4.95042 1.6405 4.9659C1.7517 4.98139 1.85867 5.02034 1.95486 5.08037C2.05104 5.1404 2.1344 5.22023 2.19981 5.31497C3.28339 6.70503 5.18993 8.35884 8.14575 8.35884C11.1016 8.35884 13.0081 6.70503 14.0917 5.31497C14.1571 5.22023 14.2405 5.1404 14.3366 5.08037C14.4328 5.02034 14.5398 4.98139 14.651 4.9659C14.7622 4.95042 14.8753 4.95873 14.9833 4.99032C15.0912 5.02192 15.1919 5.07613 15.279 5.14963C15.3661 5.22312 15.4378 5.31436 15.4897 5.41772C15.5417 5.52108 15.5727 5.63439 15.581 5.75069C15.5893 5.86698 15.5746 5.98381 15.5378 6.09398C15.5011 6.20416 15.443 6.30536 15.3673 6.39138C15.019 6.84344 14.6359 7.26541 14.222 7.65312L15.4427 9.84157Z'
      fill='#7D5A5A'
    />
  </svg>
);

const SignUp: FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [petName, setPetName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const navigate = useNavigate();

  const petNameHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPetName((e.target as HTMLInputElement).value);
    console.log((e.target as HTMLInputElement).value);
  };
  const userIdHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setId((e.target as HTMLInputElement).value);
    console.log((e.target as HTMLInputElement).value);
  };
  const pwHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword((e.target as HTMLInputElement).value);
    console.log((e.target as HTMLInputElement).value);
  };
  const pwconfirmHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordConfirm((e.target as HTMLInputElement).value);
    console.log((e.target as HTMLInputElement).value);
  };
  const idValidationHandler = async () => {
    if (id === '') {
      alert('아이디를 입력해야 합니다.');
    } else {
      try {
        const response = await axios.get(`${url}/pets/check/${id}`);
        const value = response.data as boolean;
        console.log(value);
        console.log(response);
        console.log(response.data);
        console.log(id);
        // 타입 설정에 대해서 고민 필요
        // response 일지 response.status 이것도 아니면 response.body일지는 통신해보면서 정하기
        if (response.data === false) {
          alert('유효한 아이디 입니다.');
        } else if (response.data === true) {
          alert('중복된 아이디 입니다.');
        }
        // 비동기 에러 날 것 같으면 .then 사용
      } catch (error) {
        console.error('Error', error);
        alert(error);
      }
    }
  };
  const goNextPage = () => {
    if (id === '') {
      alert('아이디를 입력해야 합니다.');
    } else if (password === '') {
      alert('비밀번호를 입력해야 합니다.');
    } else if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      navigate('/userinfo', { state: { id: id, password: password, petname: petName } });
    }
  };
  return (
    <Container>
      <Background />
      <Box>
        {/* 왼쪽 영역 */}
        <LeftDiv>
          <IconDiv>
            <PawIconSVG width='120' height='119' viewBox='0 0 120 119' fill={ivory} />
          </IconDiv>
        </LeftDiv>

        {/* 오른쪽 영역 */}
        <RightDiv>
          <TextDiv>회원가입</TextDiv>

          <InputDiv>
            <Input type='text' placeholder='반려동물 이름' onChange={petNameHandler} />
            <IdDiv>
              <Input
                type='text'
                placeholder='아이디'
                paddingRight='60px'
                onChange={userIdHandler}
              />
              <ConfirmSpan onClick={idValidationHandler}>중복확인</ConfirmSpan>
            </IdDiv>

            <PasswordDiv>
              <Input
                type={passwordVisible ? 'text' : 'password'}
                placeholder='비밀번호'
                paddingRight='35px'
                onChange={pwHandler}
              />
              <SvgSpan onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? OpenedEyeSVG : ClosedEyeSVG}
              </SvgSpan>
            </PasswordDiv>
            <PasswordDiv>
              <Input
                type={passwordVisible ? 'text' : 'password'}
                placeholder='비밀번호 확인'
                paddingRight='35px'
                onChange={pwconfirmHandler}
              />
              <SvgSpan onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? OpenedEyeSVG : ClosedEyeSVG}
              </SvgSpan>
            </PasswordDiv>
          </InputDiv>

          <ButtonDiv>
            <Button text='회원가입' onClick={goNextPage} />
          </ButtonDiv>
        </RightDiv>
      </Box>
    </Container>
  );
};

export default SignUp;
