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
`;

const NameDiv = styled.div`
  margin-top: 28px;
  font-size: 32px;
  font-weight: bold;
  color: white;
  text-decoration: underline;
`;

const NameEditSpan = styled.span`
  cursor: pointer;
`;

const AvatarEditDiv = styled.div`
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

const InputsDiv = styled.div`
  margin-top: 100px;
`;

const InputDiv = styled.div`
  position: relative;
`;

const SvgSpan = styled.span`
  position: absolute;
  top: 14px;
  right: 12px;
  cursor: pointer;
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

const WhiteCirclePencilSVG = (
  <svg width='45' height='45' viewBox='0 0 45 45' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='23' cy='22' r='14' fill='#7D5A5A' />
    <path
      d='M23 6C14.152 6 7 13.152 7 22C7 30.848 14.152 38 23 38C31.848 38 39 30.848 39 22C39 13.152 31.848 6 23 6ZM27.96 14.112C28.184 14.112 28.408 14.192 28.6 14.368L30.632 16.4C31 16.752 31 17.312 30.632 17.648L29.032 19.248L25.752 15.968L27.352 14.368C27.512 14.192 27.736 14.112 27.96 14.112ZM24.808 16.896L28.104 20.192L18.408 29.888H15.112V26.592L24.808 16.896V16.896Z'
      fill='#FFF8F0'
    />
  </svg>
);

const YellowCirclePencilSVG = (
  <svg width='45' height='45' viewBox='0 0 45 45' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='23' cy='22' r='14' fill='white' />
    <path
      d='M23 6C14.152 6 7 13.152 7 22C7 30.848 14.152 38 23 38C31.848 38 39 30.848 39 22C39 13.152 31.848 6 23 6ZM27.96 14.112C28.184 14.112 28.408 14.192 28.6 14.368L30.632 16.4C31 16.752 31 17.312 30.632 17.648L29.032 19.248L25.752 15.968L27.352 14.368C27.512 14.192 27.736 14.112 27.96 14.112ZM24.808 16.896L28.104 20.192L18.408 29.888H15.112V26.592L24.808 16.896V16.896Z'
      fill='#FFC57E'
    />
  </svg>
);

const WhitePencilSVG = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3043 2.75 17.863 2.75C18.421 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.571 21.275 6.113C21.2917 6.65433 21.1083 7.11667 20.725 7.5L19.3 8.925ZM4 21C3.71667 21 3.47933 20.904 3.288 20.712C3.096 20.5207 3 20.2833 3 20V17.175C3 17.0417 3.025 16.9127 3.075 16.788C3.125 16.6627 3.2 16.55 3.3 16.45L13.6 6.15L17.85 10.4L7.55 20.7C7.45 20.8 7.33767 20.875 7.213 20.925C7.08767 20.975 6.95833 21 6.825 21H4Z'
      fill='#FFF8F0'
    />
  </svg>
);

const BrownPencilSVG = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3043 2.75 17.863 2.75C18.421 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.571 21.275 6.113C21.2917 6.65433 21.1083 7.11667 20.725 7.5L19.3 8.925ZM4 21C3.71667 21 3.47933 20.904 3.288 20.712C3.096 20.5207 3 20.2833 3 20V17.175C3 17.0417 3.025 16.9127 3.075 16.788C3.125 16.6627 3.2 16.55 3.3 16.45L13.6 6.15L17.85 10.4L7.55 20.7C7.45 20.8 7.33767 20.875 7.213 20.925C7.08767 20.975 6.95833 21 6.825 21H4Z'
      fill='#7D5A5A'
    />
  </svg>
);

const UserInfoEdit: FC = () => {
  const [isMale, setIsMale] = useState(true);
  const [isCat, setIsCat] = useState(true);
  console.log(isMale);
  return (
    <Container>
      <Background />
      <Box>
        <LeftDiv>
          <AvatarDiv>{isCat ? '🐶' : '🐱'}</AvatarDiv>
          <AvatarEditDiv>{WhiteCirclePencilSVG}</AvatarEditDiv>
          <AvatarEditDiv className='invisible'>{YellowCirclePencilSVG}</AvatarEditDiv>
          <NameDiv>
            귀염둥이 <NameEditSpan>{WhitePencilSVG}</NameEditSpan>
          </NameDiv>
        </LeftDiv>

        <RightDiv>
          <InputsDiv>
            <InputDiv>
              <Input type='text' placeholder='나이' marginBottom='40px' />
              <SvgSpan>{BrownPencilSVG}</SvgSpan>
            </InputDiv>
            <InputDiv>
              <Input type='text' placeholder='어디에 사시나요?' />
              <SvgSpan>{BrownPencilSVG}</SvgSpan>
            </InputDiv>
          </InputsDiv>

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

export default UserInfoEdit;
