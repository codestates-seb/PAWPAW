import React, { FC, useState } from 'react';
import styled from 'styled-components';
import color from '../color';
import { Background, Box, LeftDiv, RightDiv } from '../Components/Box';
import Button from '../Components/Button';
import Input from '../Components/Input';

const { ivory, brown, yellow, darkivory, bordergrey } = color;

// 전체 화면
const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// Background, Box, LeftDiv, RightDiv import

const AvatarDiv = styled.div`
  width: 175px;
  height: 175px;
  margin-top: 140px;
  border-radius: 50%;
  font-size: 100px;
  background-color: ${ivory};
  line-height: 180px;

  display: flex;
  justify-content: center;
`;

const NameDiv = styled.div`
  margin-top: 28px;
  font-size: 32px;
  font-weight: bold;
  color: white;
`;

const PlusDiv = styled.div`
  position: absolute;
  top: 270px;
  right: 525px;
  cursor: pointer;

  &.invisible {
    display: none;
  }

  &:hover + .invisible {
    display: block;
  }
`;

const InputDiv = styled.div`
  margin-top: 100px;

  display: flex;
  flex-direction: column;
`;

const GenderDiv = styled.div<{ isMale: boolean }>`
  width: 233px;
  margin-bottom: 35px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  button:first-of-type {
    ${(props) => props.isMale && `background-color: ${darkivory}`}
  }

  button:last-of-type {
    ${(props) => !props.isMale && `background-color: ${darkivory}`}
  }
`;

const TypeDiv = styled.div`
  width: 233px;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const TextSpan = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${brown};
`;

const IconButton = styled.button`
  padding: 17px;
  background: none;
  border: none;
  border-radius: 18px;
  cursor: pointer;

  &:hover {
    background-color: ${darkivory};
  }
`;

const ToggleDiv = styled.div`
  width: 166px;
  height: 64px;
  border: 1px solid ${bordergrey};
  background-color: white;
  border-radius: 50px;
  position: relative;
`;

const CircleDiv = styled.div<{ isCat: boolean; className: string }>`
  width: 58px;
  height: 58px;
  border-radius: 50px;
  background-color: ${yellow};
  position: absolute;
  top: 2px;
  cursor: pointer;
  transition: all 0.6s;

  &.cat {
    transform: translateX(104px);
  }

  &.dog {
    transform: translateX(2px);
  }
`;

const CatSpan = styled.span<{ isCat: boolean }>`
  font-size: 36px;
  position: absolute;
  top: 9px;
  left: 12px;
  cursor: pointer;
  user-select: none;
`;
const DogSpan = styled.span<{ isCat: boolean }>`
  font-size: 36px;
  position: absolute;
  top: 7px;
  right: 12px;
  cursor: pointer;
  user-select: none;
`;

const MaleSVG = (
  <svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M18 18C20.58 18 23 18.82 24.94 20.22L35.16 10H26V6H42V22H38V12.82L27.78 23C29.18 25 30 27.4 30 30C30 33.1826 28.7357 36.2348 26.4853 38.4853C24.2348 40.7357 21.1826 42 18 42C14.8174 42 11.7652 40.7357 9.51472 38.4853C7.26428 36.2348 6 33.1826 6 30C6 26.8174 7.26428 23.7652 9.51472 21.5147C11.7652 19.2643 14.8174 18 18 18ZM18 22C15.8783 22 13.8434 22.8429 12.3431 24.3431C10.8429 25.8434 10 27.8783 10 30C10 32.1217 10.8429 34.1566 12.3431 35.6569C13.8434 37.1571 15.8783 38 18 38C20.1217 38 22.1566 37.1571 23.6569 35.6569C25.1571 34.1566 26 32.1217 26 30C26 27.8783 25.1571 25.8434 23.6569 24.3431C22.1566 22.8429 20.1217 22 18 22Z'
      fill='#6C92F2'
    />
  </svg>
);

const FemaleSVG = (
  <svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M24 8C27.1826 8 30.2348 9.26428 32.4853 11.5147C34.7357 13.7652 36 16.8174 36 20C36 25.94 31.68 30.88 26 31.84V36H30V40H26V44H22V40H18V36H22V31.84C16.32 30.88 12 25.94 12 20C12 16.8174 13.2643 13.7652 15.5147 11.5147C17.7652 9.26428 20.8174 8 24 8ZM24 12C21.8783 12 19.8434 12.8429 18.3431 14.3431C16.8429 15.8434 16 17.8783 16 20C16 22.1217 16.8429 24.1566 18.3431 25.6569C19.8434 27.1571 21.8783 28 24 28C26.1217 28 28.1566 27.1571 29.6569 25.6569C31.1571 24.1566 32 22.1217 32 20C32 17.8783 31.1571 15.8434 29.6569 14.3431C28.1566 12.8429 26.1217 12 24 12Z'
      fill='#F87D7D'
    />
  </svg>
);

const WhitePlusSVG = (
  <svg width='38' height='38' viewBox='0 0 38 38' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='18.5' cy='19.5' r='13.5' fill='#7D5A5A' />
    <path
      d='M26.9167 20.5833H20.5834V26.9167H17.4167V20.5833H11.0834V17.4167H17.4167V11.0833H20.5834V17.4167H26.9167M19.0001 3.16667C16.9208 3.16667 14.8619 3.57621 12.9409 4.37191C11.0199 5.16761 9.27448 6.33389 7.80422 7.80415C4.8349 10.7735 3.16675 14.8007 3.16675 19C3.16675 23.1993 4.8349 27.2265 7.80422 30.1959C9.27448 31.6661 11.0199 32.8324 12.9409 33.6281C14.8619 34.4238 16.9208 34.8333 19.0001 34.8333C23.1993 34.8333 27.2266 33.1652 30.1959 30.1959C33.1653 27.2265 34.8334 23.1993 34.8334 19C34.8334 16.9207 34.4239 14.8618 33.6282 12.9408C32.8325 11.0199 31.6662 9.27441 30.1959 7.80415C28.7257 6.33389 26.9802 5.16761 25.0592 4.37191C23.1382 3.57621 21.0793 3.16667 19.0001 3.16667V3.16667Z'
      fill='#FFEEDB'
    />
  </svg>
);

const YellowPlusSVG = (
  <svg width='38' height='38' viewBox='0 0 38 38' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='18.5' cy='19.5' r='13.5' fill='white' />
    <path
      d='M26.9167 20.5833H20.5834V26.9167H17.4167V20.5833H11.0834V17.4167H17.4167V11.0833H20.5834V17.4167H26.9167M19.0001 3.16667C16.9208 3.16667 14.8619 3.57621 12.9409 4.37191C11.0199 5.16761 9.27448 6.33389 7.80422 7.80415C4.8349 10.7735 3.16675 14.8007 3.16675 19C3.16675 23.1993 4.8349 27.2265 7.80422 30.1959C9.27448 31.6661 11.0199 32.8324 12.9409 33.6281C14.8619 34.4238 16.9208 34.8333 19.0001 34.8333C23.1993 34.8333 27.2266 33.1652 30.1959 30.1959C33.1653 27.2265 34.8334 23.1993 34.8334 19C34.8334 16.9207 34.4239 14.8618 33.6282 12.9408C32.8325 11.0199 31.6662 9.27441 30.1959 7.80415C28.7257 6.33389 26.9802 5.16761 25.0592 4.37191C23.1382 3.57621 21.0793 3.16667 19.0001 3.16667V3.16667Z'
      fill='#FFC57E'
    />
  </svg>
);

const UserInfo: FC = () => {
  const [isMale, setIsMale] = useState(true);
  const [isCat, setIsCat] = useState(true);
  console.log(isMale);
  return (
    <Container>
      <Background />
      <Box>
        <LeftDiv>
          <AvatarDiv>{isCat ? '🐶' : '🐱'}</AvatarDiv>
          <NameDiv>귀염둥이</NameDiv>
          <PlusDiv>{WhitePlusSVG}</PlusDiv>
          <PlusDiv className='invisible'>{YellowPlusSVG}</PlusDiv>
        </LeftDiv>

        <RightDiv>
          <InputDiv>
            <Input type='text' placeholder='나이' marginBottom='40px' />
            <Input type='text' placeholder='어디에 사시나요?' />
          </InputDiv>

          <GenderDiv isMale={isMale}>
            <TextSpan>성별</TextSpan>
            <IconButton onClick={() => setIsMale(true)}>{MaleSVG}</IconButton>
            <IconButton onClick={() => setIsMale(false)}>{FemaleSVG}</IconButton>
          </GenderDiv>

          <TypeDiv>
            <TextSpan>저는...</TextSpan>
            <ToggleDiv>
              <CircleDiv
                onClick={() => setIsCat(!isCat)}
                isCat={isCat}
                className={isCat ? 'cat' : 'dog'} // isCat 상태가 true면 className이 cat, false면 dog가 된다.
              />
              <CatSpan onClick={() => setIsCat(!isCat)} isCat={isCat}>
                🐱
              </CatSpan>
              <DogSpan onClick={() => setIsCat(!isCat)} isCat={isCat}>
                🐶
              </DogSpan>
            </ToggleDiv>
          </TypeDiv>
        </RightDiv>
      </Box>
    </Container>
  );
};

export default UserInfo;
