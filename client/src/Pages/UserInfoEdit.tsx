/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable camelcase */
import { Icon } from '@iconify/react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { Background, Box, LeftDiv, RightDiv } from '../Components/Box';
import Button from '../Components/Button';
import Input from '../Components/Input';
import Cat from '../img/catface.png';
import Dog from '../img/dogface.png';
import color from '../util/color';
import { codeToAddress } from '../util/ConvertAddress';
import { petDelete } from '../util/UserApi';
import AddressModal from './AddressModal';
import { TokenInfo } from './Login';

const jwtToken = localStorage.getItem('Authorization');
const headers = {
  Authorization: jwtToken,
};

const { ivory, brown, yellow, darkivory, bordergrey, red } = color;
const url = process.env.REACT_APP_API_ROOT;
const petId = localStorage.getItem('petId');

interface FormData {
  profileImage: Blob | null;
}

interface Info {
  petName: string;
  isMale: 'MALE' | 'FEMALE';
  isCat: 'CAT' | 'DOG';
  age: number;
}

const UserInfoEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { petName, age, isMale, isCat, code, profileImage } = location.state;
  const [info, setInfo] = useState<Info>({
    petName: petName,
    isMale: isMale,
    isCat: isCat,
    age: age,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [fileImage, setFileImage] = useState<string>();
  const [address, setAddress] = useState<number | null>(code);
  const [formData, setFormData] = useState<FormData>({ profileImage: null });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const localStorageCode = localStorage.getItem('code');

  useMemo(() => {
    setAddress(Number(localStorageCode));
  }, [localStorageCode]);

  const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setFileImage(URL.createObjectURL(event.target.files[0]));
    const { name, files } = event.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const catHandler = () => {
    if (info.isCat === 'CAT') {
      setInfo({ ...info, isCat: 'DOG' });
    } else {
      setInfo({ ...info, isCat: 'CAT' });
    }
  };

  const ageHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInfo({ ...info, age: Number(e.target.value) });
  };

  const petNameHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInfo({ ...info, petName: e.target.value });
  };

  const deleteHandler = () => {
    Swal.fire({
      title: '정말 탈퇴하시겠습니까?',
      text: '탈퇴한 계정은 복구할 수 없으니 주의해주세요!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: red,
      cancelButtonColor: bordergrey,
      confirmButtonText: '<b>네, 확인했습니다.</b>',
      cancelButtonText: '<b>아니요</b>',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '탈퇴 완료',
          text: '회원 탈퇴가 성공적으로 처리되었습니다.',
          icon: 'success',
          confirmButtonColor: yellow,
          confirmButtonText: '<b>확인</b>',
        });
        petDelete(petId as string).then(() => navigate('/'));
      }
    });
  };

  const adminRequest = async (secretCode: string) => {
    try {
      const response = await axios.post(
        `${url}/pets/admin/${petId}`,
        {
          adminCode: secretCode,
        },
        { headers },
      );
      localStorage.removeItem('Authorization');
      localStorage.removeItem('Refresh');
      localStorage.removeItem('Admin');
      const jwtToken = response.headers.authorization as string;
      const refreshToken = response.headers.refresh as string;
      const jwtToken_decode = jwt_decode(jwtToken) as TokenInfo;
      const admin = jwtToken_decode.roles;
      localStorage.setItem('Authorization', jwtToken);
      localStorage.setItem('Refresh', refreshToken);
      if (admin !== null) {
        localStorage.setItem('Admin', admin[1].toString());
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  function admin() {
    Swal.fire({
      title: '관리자 권한 요청',
      text: '유효한 코드를 입력해 주세요',
      input: 'text',
      inputValue: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: red,
      cancelButtonColor: bordergrey,
      confirmButtonText: '<b>권한 요청</b>',
      cancelButtonText: '<b>취소</b>',
    }).then((result) => {
      if (result.value) {
        const code = result.value;
        {
          code === `${process.env.REACT_APP_ADMIN}`
            ? (Swal.fire({
                title: '권한 요청 완료',
                text: '관리자 권한 요청이 성공적으로 처리되었습니다.',
                icon: 'success',
                confirmButtonColor: yellow,
                confirmButtonText: '<b>확인</b>',
              }),
              adminRequest(code).then(() => navigate('/mypage')))
            : Swal.fire({
                title: '권한 요청 실패',
                text: '관리자 권한 요청이 실패했습니다.',
                icon: 'warning',
                confirmButtonColor: red,
                confirmButtonText: '<b>확인</b>',
              });
        }
      }
    });
  }

  const openAddressModal = () => {
    setIsOpen(!isOpen);
  };

  const updateHandler = async () => {
    if (info.petName && address) {
      const data = new FormData();
      data.append('petName', info.petName);
      data.append('age', info.age.toString());
      data.append('gender', info.isMale);
      data.append('species', info.isCat);
      data.append('code', address.toString());
      formData.profileImage ? data.append('profileImage', formData.profileImage) : '';

      try {
        await axios
          .patch(`${process.env.REACT_APP_API_ROOT}/pets/${petId}`, data, { headers })
          .then((res) => {
            localStorage.setItem('code', res.data.code);
          });
        navigate(`/mypage/${petId}`);
      } catch (error) {
        console.error('Error', error);
        alert(error);
      }
    }
  };

  return (
    <Container>
      <Background />
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
            ) : profileImage ? (
              <img
                className='userprofile'
                alt='sample'
                src={profileImage}
                style={{ margin: 'auto', width: '175px', height: '175px' }}
              />
            ) : info.isCat === 'CAT' ? (
              <img
                className='baseimojicat'
                src={Cat}
                style={{ width: '100px', height: '100px' }}
              ></img>
            ) : (
              <img
                className='baseimojidog'
                src={Dog}
                style={{ width: '100px', height: '100px' }}
              ></img>
            )}
          </AvatarDiv>
          <AvatarEditDiv>
            <label className='input-file-button' htmlFor='input-file'>
              {WhiteCirclePencilSVG}
            </label>
            <input
              type='file'
              id='input-file'
              name='profileImage'
              onChange={saveFileImage}
              style={{ display: 'none' }}
            />
          </AvatarEditDiv>
          <AvatarEditDiv className='invisible'>
            <label className='input-file-button' htmlFor='input-file'>
              {YellowCirclePencilSVG}
            </label>
            <input
              type='file'
              id='input-file'
              name='profileImage'
              onChange={saveFileImage}
              style={{ display: 'none' }}
            />
          </AvatarEditDiv>
          <NameDiv>
            {isEdit ? (
              <Input type='text' width={'150px'} placeholder={petName} onChange={petNameHandler} />
            ) : (
              <span className='name'>{info.petName}</span>
            )}
            <span className='icon' onClick={() => setIsEdit(!isEdit)}>
              <Icon icon='mdi:pencil' color='white' style={{ fontSize: '24px' }} />
            </span>
          </NameDiv>
        </LeftDiv>

        <RightDiv>
          <InputsDiv>
            <InputDiv>
              <Input type='text' placeholder={`${age}`} marginBottom='35px' onChange={ageHandler} />
              <SvgSpan>
                <Icon icon='mdi:pencil' color={brown} style={{ fontSize: '24px' }} />
              </SvgSpan>
            </InputDiv>
            <InputDiv>
              <Input
                type='text'
                readOnly={true}
                placeholder={address === null ? '어디에 사시나요?' : `${codeToAddress(address)}`}
                marginBottom='35px'
                openAddressModal={openAddressModal}
              />
              <SvgSpan onClick={openAddressModal}>
                <Icon icon='mdi:pencil' color={brown} style={{ fontSize: '24px' }} />
              </SvgSpan>
            </InputDiv>
          </InputsDiv>

          <GenderDiv isMale={info.isMale}>
            <TextSpan>성별</TextSpan>
            <IconButton onClick={() => setInfo({ ...info, isMale: 'MALE' })}>
              <Icon icon='mdi:gender-male' color='#6C92F2' style={{ fontSize: '48px' }} />
            </IconButton>
            <IconButton onClick={() => setInfo({ ...info, isMale: 'FEMALE' })}>
              <Icon icon='mdi:gender-female' color='#F87D7D' style={{ fontSize: '48px' }} />
            </IconButton>
          </GenderDiv>

          <TypeDiv>
            <TextSpan>저는...</TextSpan>
            <ToggleDiv>
              <CircleDiv
                onClick={catHandler}
                isCat={info.isCat}
                className={info.isCat === 'CAT' ? 'cat' : 'dog'}
              />
              <CatSpan onClick={catHandler} isCat={info.isCat}>
                <img src={Cat} style={{ width: '36px' }}></img>
              </CatSpan>
              <DogSpan onClick={catHandler} isCat={info.isCat}>
                <img src={Dog} style={{ width: '36px' }}></img>
              </DogSpan>
            </ToggleDiv>
          </TypeDiv>
          <ButtonDiv>
            <Button text='수정' onClick={updateHandler} />
            <DeleteButton onClick={deleteHandler}>회원 탈퇴</DeleteButton>
            <ManagerButton onClick={admin}>관리자 권한 요청</ManagerButton>
          </ButtonDiv>
        </RightDiv>
      </Box>
      {isOpen && <AddressModal address={address} setAddress={setAddress} setIsOpen={setIsOpen} />}
    </Container>
  );
};

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

const AvatarDiv = styled.div`
  width: 175px;
  height: 175px;
  margin-top: 140px;
  border-radius: 50%;
  overflow: hidden;
  font-size: 100px;
  background-color: ${ivory};
  line-height: 180px;

  display: flex;
  justify-content: center;

  img {
    object-fit: cover;
  }
`;

const NameDiv = styled.div`
  margin-top: 28px;

  .icon {
    margin-left: 10px;
    cursor: pointer;
  }

  .name {
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    text-decoration: underline;
    color: white;
    display: inline-block;
  }
`;

const AvatarEditDiv = styled.div`
  position: absolute;
  top: 270px;
  right: 525px;

  &.invisible {
    display: none;
  }

  &:hover + .invisible {
    display: block;
  }

  label {
    cursor: pointer;
  }
`;

const InputsDiv = styled.div`
  margin-top: 73px;
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
    transform: translateX(2px);
  }

  &.dog {
    transform: translateX(104px);
  }
`;

const CatSpan = styled.span<{ isCat: string }>`
  font-size: 36px;
  position: absolute;
  top: 11px;
  left: 12px;
  cursor: pointer;
  user-select: none;
`;
const DogSpan = styled.span<{ isCat: string }>`
  font-size: 36px;
  position: absolute;
  top: 9px;
  right: 12px;
  cursor: pointer;
  user-select: none;
`;
const ButtonDiv = styled.div`
  margin-top: 45px;
  position: relative;
`;

const DeleteButton = styled.div`
  z-index: 9;
  color: white;
  font-size: 13px;
  font-weight: bold;
  position: absolute;
  top: 70px;
  left: -465px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
const ManagerButton = styled.div`
  z-index: 9;
  color: white;
  font-size: 13px;
  font-weight: bold;
  position: absolute;
  top: 70px;
  left: -390px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

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

export default UserInfoEdit;
