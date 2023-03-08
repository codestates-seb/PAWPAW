import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/react';
import { petLogout } from '../util/UserApi';
import { codeToAddress } from '../util/ConvertAddress';
import { useNavigate, useParams } from 'react-router';
import Cat from '../img/catface.png';
import Dog from '../img/dogface.png';
import color from '../util/color';
import { PetInfo } from './Mypage';
const { ivory, yellow, red, darkgrey, brown } = color;
const petId = localStorage.getItem('petId') as string;

type PProps = {
  petInfo: PetInfo | undefined;
};

const Profile = ({ petInfo }: PProps) => {
  const navigate = useNavigate();
  const params = useParams();

  const goEditPage = () => {
    navigate('/userinfoedit', {
      state: {
        petName: petInfo?.petName,
        code: petInfo?.code,
        age: petInfo?.age,
        isMale: petInfo?.gender,
        isCat: petInfo?.species,
        profileImage: petInfo?.profileImage,
      },
    });
  };

  const logoutHandler = () => {
    Swal.fire({
      title: '로그아웃하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '<b>로그아웃</b>',
      cancelButtonText: '<b>취소</b>',
      color: brown,
      confirmButtonColor: yellow,
      cancelButtonColor: red,
      padding: '40px 0px 30px 0px',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '로그아웃 되었습니다.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          color: brown,
          padding: '20px 0px 40px 0px',
        });
        petLogout().then(() => navigate('/'));
      }
    });
  };

  return (
    <ProfileContainerBox>
      <ProfileBox>
        <AvatarDiv>
          {petInfo?.profileImage ? (
            <img
              className='profile'
              src={petInfo.profileImage}
              style={{ margin: 'auto', width: '175px', height: '175px' }}
            ></img>
          ) : petInfo?.species === 'CAT' ? (
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
      </ProfileBox>
      <InfoBox>
        <InfoTopBox>
          <InfoNameBox>{petInfo?.petName}</InfoNameBox>
          <InfoAgeBox>{petInfo?.age}살</InfoAgeBox>
          <InfoGenderBox>
            {petInfo?.gender === 'MALE' ? (
              <Icon icon='mdi:gender-male' color='#6C92F2' style={{ fontSize: '20px' }} />
            ) : (
              <Icon icon='mdi:gender-female' color='#F87D7D' style={{ fontSize: '20px' }} />
            )}
          </InfoGenderBox>
          {params.petId === petId && (
            <EditBox>
              <button onClick={goEditPage}>수정</button>
            </EditBox>
          )}
        </InfoTopBox>
        <InfoBottomBox>
          <InfoIconBox>
            <Icon icon='mdi:map-marker' color='#7d5a5a' style={{ fontSize: '20px' }} />
          </InfoIconBox>
          <InfoPosBox>{petInfo?.code && codeToAddress(petInfo.code)}</InfoPosBox>
        </InfoBottomBox>
        {params.petId === petId && (
          <LogoutBox>
            <button onClick={logoutHandler}>로그아웃</button>
          </LogoutBox>
        )}
      </InfoBox>
    </ProfileContainerBox>
  );
};

const ProfileContainerBox = styled.div`
  margin-top: 100px;
  height: 250px;
  color: ${brown};
  display: flex;
`;

const ProfileBox = styled.div``;

const AvatarDiv = styled.div`
  width: 175px;
  height: 175px;
  border-radius: 50%;
  overflow: hidden;
  font-size: 100px;
  background-color: ${ivory};
  line-height: 180px;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    object-fit: cover;
  }
`;

const InfoBox = styled.div`
  margin-left: 30px;
  width: 100%;
  padding: 30px;
`;

const InfoTopBox = styled.div`
  display: flex;
`;

const InfoNameBox = styled.div`
  font-weight: 700;
  font-size: 32px;
  margin-right: 20px;
`;

const InfoAgeBox = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const InfoGenderBox = styled.div`
  display: flex;
  align-items: center;
`;

const EditBox = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
  button {
    border: none;
    height: 25px;
    width: 39px;
    color: ${darkgrey};
    background-color: #f8f8f8;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #efefef;
      color: ${brown};
    }
  }
`;

const InfoBottomBox = styled.div`
  padding: 10px 0px;
  display: flex;
`;

const InfoIconBox = styled.div`
  margin-top: 3px;
`;

const InfoPosBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-left: 5px;
`;

const LogoutBox = styled.div`
  margin-left: 10px;
  height: 100px;
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  button {
    color: ${darkgrey};
    border: none;
    border-radius: 5px;
    background-color: #f8f8f8;
    width: 70px;
    height: 25px;
    cursor: pointer;

    &:hover {
      background-color: #efefef;
      color: ${brown};
    }
  }
`;

export default Profile;
