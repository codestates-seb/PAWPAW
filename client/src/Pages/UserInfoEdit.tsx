import React, { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import color from '../color';
import { Background, Box, LeftDiv, RightDiv } from '../Components/Box';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { Icon } from '@iconify/react';
import AddressModal from './AddressModal';
import { codeToAddress } from '../util/ConvertAddress';
import { petDelete } from '../util/UserApi';
import Cat from '../img/catface.png';
import Dog from '../img/dogface.png';

const { ivory, brown, yellow, darkivory, bordergrey, red } = color;
const jwtToken = localStorage.getItem('Authorization');
const refreshToken = localStorage.getItem('Refresh');
const url = process.env.REACT_APP_API_ROOT;

interface FormData {
  profileImage: Blob | null;
}
interface Info {
  petName: string;
  isMale: 'MALE' | 'FEMALE';
  isCat: 'CAT' | 'DOG';
  age: number;
  address: string | null;
}

const UserInfoEdit: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const petName = location.state.petName;
  const age = location.state.age as number;
  const gender = location.state.gender;
  const species = location.state.species;
  const code = location.state.code;
  const profileImage = location.state.profileImage;
  // const imgUrl = profileImage.profileImage;
  // const files = new File([imgUrl], `${imgUrl}`, { type: 'image/png' });
  // console.log(files);
  const [renderCount, setRenderCount] = useState<number>(0);
  const [isPetName, setIsPetName] = useState<string>(petName);
  const [isOpen, setIsOpen] = useState(false);
  const [fileImage, setFileImage] = useState<string>();
  const [isMale, setIsMale] = useState<'MALE' | 'FEMALE'>(gender);
  const [isCat, setIsCat] = useState<'CAT' | 'DOG'>(species);
  const [isAge, setIsAge] = useState<number>(age);
  const [address, setAddress] = useState<number | null>(code);
  const [formData, setFormData] = useState<FormData>({ profileImage: null });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const petId: string | null = localStorage.getItem('petId');
  // if (renderCount === 0) {
  //   setRenderCount(renderCount + 1);
  //   setFormData({ ...formData, ['profileImage']: files });
  //   console.log('여긴가', formData);
  // }
  const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setFileImage(URL.createObjectURL(event.target.files[0]));
    const { name, files } = event.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    }
    console.log('formData', formData);
    console.log('formData.profileImage', formData.profileImage);
  };

  const catHandler = () => {
    if (isCat === 'CAT') {
      setIsCat('DOG');
    } else {
      setIsCat('CAT');
    }
    console.log(isCat);
  };

  const ageHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsAge(Number(e.target.value));
    console.log((e.target as HTMLInputElement).value);
  };

  const petNameHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsPetName((e.target as HTMLInputElement).value);
    console.log((e.target as HTMLInputElement).value);
  };

  const deleteHandler = () => {
    petDelete(petId as string);
  };

  const openAddressModal = () => {
    setIsOpen(!isOpen);
  };

  const updateHandler = async () => {
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: jwtToken,
      Refresh: refreshToken,
    };

    const data = new FormData();
    data.append('petName', isPetName);
    data.append('age', isAge.toString());
    data.append('gender', gender);
    data.append('species', species);
    data.append('code', '11680');
    formData.profileImage !== null
      ? data.append('profileImage', formData.profileImage)
      : console.log('img전송x', formData.profileImage);
    console.log(data);
    console.log(formData);
    console.log(formData.profileImage);

    for (const key of data.keys()) {
      console.log(key);
    }
    for (const value of data.values()) {
      console.log(value);
    }
    try {
      await axios.patch(`${url}/pets/${petId}`, data, { headers });
      navigate('/mypage');
      // 비동기 에러 날 것 같으면 .then 사용
    } catch (error) {
      console.error('Error', error);
      alert(error);
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
            ) : isCat === 'DOG' ? (
              <img
                className='baseimojidog'
                src={Dog}
                style={{ width: '100px', height: '100px' }}
              ></img>
            ) : (
              <img
                className='baseimojicat'
                src={Cat}
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
              <span className='name'>{petName}</span>
            )}
            <span className='icon' onClick={() => setIsEdit(!isEdit)}>
              <Icon icon='mdi:pencil' color='white' style={{ fontSize: '24px' }} />
            </span>
          </NameDiv>
        </LeftDiv>

        <RightDiv>
          <InputsDiv>
            <InputDiv>
              <Input
                type='text'
                placeholder={`${age} 살`}
                marginBottom='40px'
                onChange={ageHandler}
              />
              <SvgSpan>
                <Icon icon='mdi:pencil' color={brown} style={{ fontSize: '24px' }} />
              </SvgSpan>
            </InputDiv>
            <InputDiv>
              <Input
                type='text'
                readOnly={true}
                placeholder={address === null ? '어디에 사시나요?' : `${codeToAddress(address)}`}
                openAddressModal={openAddressModal}
              />
              <SvgSpan onClick={openAddressModal}>
                <Icon icon='mdi:pencil' color={brown} style={{ fontSize: '24px' }} />
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
            <Button text='수정' onClick={updateHandler} />
          </ButtonDiv>
        </RightDiv>
      </Box>
      <DeleteButton onClick={deleteHandler} />
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
`;

const DeleteButton = styled.div`
  z-index: 999;
  color: ${red};
  font-size: 15px;
  font-weight: Bold;
  left: 1000px;
  top: 1000px;
  cursor: pointer;
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
