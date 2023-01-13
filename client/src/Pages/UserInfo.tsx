import React, { FC, useState, useRef } from 'react';
import styled from 'styled-components';
import color from '../color';
import { Background, Box, LeftDiv, RightDiv } from '../Components/Box';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { Icon } from '@iconify/react';
import AddressModal from './AddressModal';

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

const InputsDiv = styled.div`
  margin-top: 73px;

  display: flex;
  flex-direction: column;
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

const ButtonDiv = styled.div`
  margin-top: 45px;
`;

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

export interface IProps {
  address: number | null;
  setAddress: (address: number | null) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const UserInfo: FC = () => {
  const [isMale, setIsMale] = useState(true);
  const [isCat, setIsCat] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState<number | null>(null);

  const openAddressModal = () => {
    setIsOpen(!isOpen);
  };

  const backgroundRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  // 배경 클릭시 모달이 닫힌다.
  window.addEventListener('click', (e) => {
    if (e.target === backgroundRef.current) {
      setIsOpen(false);
    }
  });

  return (
    <Container>
      <Background ref={backgroundRef} />
      <Box>
        <LeftDiv>
          <AvatarDiv>{isCat ? '🐶' : '🐱'}</AvatarDiv>
          <NameDiv>귀염둥이</NameDiv>
          <PlusDiv>{WhitePlusSVG}</PlusDiv>
          <PlusDiv className='invisible'>{YellowPlusSVG}</PlusDiv>
        </LeftDiv>

        <RightDiv>
          <InputsDiv>
            <Input type='text' placeholder='나이' marginBottom='40px' />
            <InputDiv>
              <Input
                type='text'
                readOnly={true}
                placeholder={address === null ? '어디에 사시나요?' : `${convertAddress(address)}`}
                openAddressModal={openAddressModal}
              />
              <SvgSpan onClick={openAddressModal}>
                <Icon icon='ic:baseline-search' color='#7d5a5a' style={{ fontSize: '23px' }} />
              </SvgSpan>
            </InputDiv>
          </InputsDiv>

          <GenderDiv isMale={isMale}>
            <TextSpan>성별</TextSpan>
            <IconButton onClick={() => setIsMale(true)}>
              <Icon icon='mdi:gender-male' color='#6C92F2' style={{ fontSize: '48px' }} />
            </IconButton>
            <IconButton onClick={() => setIsMale(false)}>
              <Icon icon='mdi:gender-female' color='#F87D7D' style={{ fontSize: '48px' }} />
            </IconButton>
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
          <ButtonDiv>
            <Button text='시작하기' />
          </ButtonDiv>
        </RightDiv>
      </Box>
      {isOpen && <AddressModal address={address} setAddress={setAddress} setIsOpen={setIsOpen} />}
    </Container>
  );
};

export const convertAddress = (address: number) => {
  if (address !== null) {
    switch (address) {
      case 11680:
        return '강남구';
      case 11740:
        return '강동구';
      case 11305:
        return '강북구';
      case 11500:
        return '강서구';
      case 11620:
        return '관악구';
      case 11215:
        return '광진구';
      case 11530:
        return '구로구';
      case 11545:
        return '금천구';
      case 11350:
        return '노원구';
      case 11320:
        return '도봉구';
      case 11230:
        return '동대문구';
      case 11590:
        return '동작구';
      case 11440:
        return '마포구';
      case 11410:
        return '서대문구';
      case 11650:
        return '서초구';
      case 11200:
        return '성동구';
      case 11290:
        return '성북구';
      case 11710:
        return '송파구';
      case 11470:
        return '양천구';
      case 11560:
        return '영등포구';
      case 11170:
        return '용산구';
      case 11380:
        return '은평구';
      case 11110:
        return '종로구';
      case 11140:
        return '중구	';
      case 11260:
        return '중랑구';
    }
  }
};

export default UserInfo;
