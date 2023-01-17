import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import color from '../color';
import { Background, Box, LeftDiv, RightDiv } from '../Components/Box';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { Icon } from '@iconify/react';
import AddressModal from './AddressModal';
import { codeToAddress } from '../util/ConvertAddress';
import Cat from '../img/catface.png';
import Dog from '../img/dogface.png';


const { ivory, brown, yellow, darkivory, bordergrey } = color;
const url = '';
interface FormData {
  profileImage: Blob | null;
}

export interface IProps {
  address: number | null;
  setAddress: (address: number | null) => void;
  setIsOpen: (isOpen: boolean) => void;
}
const UserInfo: React.FC = () => {
  const [isMale, setIsMale] = useState<'MALE' | 'FEMALE'>('MALE');
  const [isCat, setIsCat] = useState<'CAT' | 'DOG'>('CAT');
  const [isAge, setIsAge] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({ profileImage: null });
  const location = useLocation();
  const id = location.state.id;
  const petname = location.state.petname;
  const password = location.state.password;
  const navigate = useNavigate();

  const [fileImage, setFileImage] = useState<string>();
  const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setFileImage(URL.createObjectURL(event.target.files[0]));
  };
  const ageHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsAge(Number(e.target.value));
    console.log((e.target as HTMLInputElement).value);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };
  const catHandler = () => {
    if (isCat === 'CAT') {
      setIsCat('DOG');
    } else {
      setIsCat('CAT');
    }
  };
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
  const submitHandler = async () => {
    if (!formData.profileImage) return;
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const data = new FormData();
    data.append('loginId', id);
    data.append('password', password);
    data.append('petName', petname);
    data.append('age', isAge.toString());
    // 나이는 숫자 타입으로
    data.append('species', 'CAT');
    // 'DOG','CAT'
    data.append('gender', isMale);
    // 'MALE','FEMALE'
    data.append('address', '1');
    // 주소값도 숫자 타입으로 지금은 1,2만 가능
    data.append('profileImage', formData.profileImage);
    console.log(data);
    console.log(formData);
    console.log(formData.profileImage);
    console.log(`file size = ${formData.profileImage.size} byte`);
    for (const key of data.keys()) {
      console.log(key);
    }
    for (const value of data.values()) {
      console.log(value);
    }
    if (isAge === 0) {
      alert('나이가 입력 되어야 합니다.');
    } else if (id === '' || password === '') {
      alert('입력되지 않은 값이 있습니다.');
    } else {
      try {
        await axios.post(`${url}/pets/signup`, data, { headers });
        navigate('/login');
        // 비동기 에러 날 것 같으면 .then 사용
      } catch (error) {
        console.error('Error', error);
        alert(error);
      }
    }
  };

  return (
    <Container>
      <Background ref={backgroundRef} />
      <Box>
        <LeftDiv>
          <AvatarDiv>
            {fileImage ? (
              <img
                className='userprofile'
                alt='sample'
                src={fileImage}
                style={{ margin: 'auto', width: '175px', height: '175px' }}
              />
            ) : isCat === 'DOG' ? (
              <img className='baseimojidog' src={Dog} style={{ width: '100px', height: '100px' }}></img>
            ) : (
              <img className='baseimojicat' src={Cat} style={{ width: '100px', height: '100px' }}></img>
            )}
          </AvatarDiv>
          <NameDiv>{petname}</NameDiv>
          <PlusDiv>
            <label className='input-file-button' htmlFor='input-file'>
              {WhitePlusSVG}
            </label>
            <input
              type='file'
              id='input-file'
              onChange={saveFileImage}
              style={{ display: 'none' }}
            />
          </PlusDiv>
          <PlusDiv className='invisible'>
            <label className='input-file-button' htmlFor='input-file'>
              {YellowPlusSVG}
            </label>
            <input
              type='file'
              id='input-file'
              onChange={saveFileImage}
              style={{ display: 'none' }}
            />
          </PlusDiv>
          <input type='file' id='input-file' style={{ display: 'none' }} />
        </LeftDiv>
        <RightDiv>
          <InputsDiv>
            <Input type='text' placeholder='나이' marginBottom='40px' onChange={ageHandler} />
            <InputDiv>
              <Input
                type='text'
                readOnly={true}
                placeholder={address === null ? '어디에 사시나요?' : `${codeToAddress(address)}`}
                openAddressModal={openAddressModal}
              />
              <SvgSpan onClick={openAddressModal}>
                <Icon icon='ic:baseline-search' color='#7d5a5a' style={{ fontSize: '23px' }} />
              </SvgSpan>
            </InputDiv>
          </InputsDiv>
          <GenderDiv isMale={isMale}>
            <TextSpan>성별</TextSpan>
            <IconButton onClick={() => setIsMale('MALE')}>
              <Icon icon='mdi:gender-male' color='#6C92F2' style={{ fontSize: '48px' }} />
            </IconButton>
            <IconButton onClick={() => setIsMale('FEMALE')}>
              <Icon icon='mdi:gender-female' color='#F87D7D' style={{ fontSize: '48px' }} />
            </IconButton>
          </GenderDiv>
          <TypeDiv>
            <TextSpan>저는...</TextSpan>
            <ToggleDiv>
              <CircleDiv
                onClick={catHandler}
                isCat={isCat}
                className={isCat === 'CAT' ? 'cat' : 'dog'} // isCat 상태가 true면 className이 cat, false면 dog가 된다.
              />
              <CatSpan onClick={catHandler} isCat={isCat}>
                <img src={Cat} style={{ width: '36px' }}></img>
              </CatSpan>
              <DogSpan onClick={catHandler} isCat={isCat}>
                <img src={Dog} style={{ width: '36px' }}></img>
              </DogSpan>
            </ToggleDiv>
          </TypeDiv>
          <ButtonDiv>
            <Button text='시작하기' onClick={submitHandler} />
          </ButtonDiv>
        </RightDiv>
      </Box>
      {isOpen && <AddressModal address={address} setAddress={setAddress} setIsOpen={setIsOpen} />}
    </Container>
  );
};

// 전체 화면
const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  .baseimojidog {
    margin-top: 30px;
  }
  .baseimojicat {
    margin-top: 35px;
  }
`;

// Background, Box, LeftDiv, RightDiv import

const AvatarDiv = styled.div`
  width: 175px;
  height: 175px;
  margin-top: 140px;
  border-radius: 50%;
  background-color: ${ivory};
  line-height: 180px;

  display: flex;
  justify-content: center;

  .userprofile {
    border-radius: 50%;
  }
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

const GenderDiv = styled.div<{ isMale: string }>`
  width: 233px;
  margin-bottom: 35px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  button:first-of-type {
    ${(props) => props.isMale === 'MALE' && `background-color: ${darkivory}`}
  }

  button:last-of-type {
    ${(props) => props.isMale === 'FEMALE' && `background-color: ${darkivory}`}
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

const CircleDiv = styled.div<{ isCat: string; className: string }>`
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

const CatSpan = styled.span<{ isCat: string }>`
  font-size: 36px;
  position: absolute;
  top: 9px;
  left: 12px;
  cursor: pointer;
  user-select: none;
`;
const DogSpan = styled.span<{ isCat: string }>`
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

export default UserInfo;
