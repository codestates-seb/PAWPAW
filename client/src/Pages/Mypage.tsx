import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Icon } from '@iconify/react';

import Header from '../Components/Header';
import color from '../color';
import { getUserInfo, petLogout } from '../util/UserApi';
import { codeToAddress } from '../util/ConvertAddress';
import Cat from '../img/catface.png';
import Dog from '../img/dogface.png';

const { ivory, darkgrey, brown, mediumgrey, bordergrey } = color;

interface FormData {
  profileImage: Blob | null;
}

interface ResponseData {
  petName: string;
  code: string;
  profileImage: File | null;
  age: number;
  gender: 'MALE' | 'FEMALE';
  species: 'CAT' | 'DOG';
}

interface Info {
  petName: string;
  isMale: 'MALE' | 'FEMALE';
  isCat: 'CAT' | 'DOG';
  age: number;
  address: string | null;
}

const Mypage = () => {
  const navigate = useNavigate();
  const petId = localStorage.getItem('petId') as string;
  const { responseData, error } = getUserInfo(petId);
  const [info, setInfo] = useState<Info>({
    petName: 'test',
    isMale: 'MALE',
    isCat: 'CAT',
    age: 0,
    address: null,
  });
  const [formData, setFormData] = useState<FormData>({ profileImage: null });
  const [count, setCount] = useState<number>(0);

  if (!error && responseData && count === 0) {
    const { petName, code, profileImage, age, gender, species } = responseData as ResponseData;
    setInfo({ ...info, petName: petName, address: code, age: age, isMale: gender, isCat: species });
    setFormData({ profileImage: profileImage });
    setCount(count + 1);
  }

  const UserImg = formData.profileImage as unknown as string;
  const goEditPage = () => {
    navigate('/userinfoedit', {
      state: {
        petName: info.petName,
        code: info.address,
        age: info.age,
        isMale: info.isMale,
        isCat: info.isCat,
        profileImage: formData,
      },
    });
  };
  const logoutHandler = () => {
    if (!confirm('로그아웃 하시겠습니까?')) {
      alert('취소 되었습니다.');
    } else {
      petLogout().then(() => navigate('/'));
      alert('로그아웃 되었습니다.');
    }
  };

  return (
    <>
      <Header />
      <Container>
        <ProfileContainerBox>
          <ProfileBox>
            <AvatarDiv>
              {UserImg ? (
                <img
                  className='profile'
                  src={UserImg}
                  style={{ margin: 'auto', width: '175px', height: '175px' }}
                ></img>
              ) : info.isCat === 'CAT' ? (
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
              <InfoNameBox>{info.petName}</InfoNameBox>
              <InfoAgeBox>{info.age}살</InfoAgeBox>
              <InfoGenderBox>
                {info.isMale === 'MALE' ? (
                  <Icon icon='mdi:gender-male' color='#6C92F2' style={{ fontSize: '20px' }} />
                ) : (
                  <Icon icon='mdi:gender-female' color='#F87D7D' style={{ fontSize: '20px' }} />
                )}
              </InfoGenderBox>
              <EditBox>
                <button onClick={goEditPage}>수정</button>
              </EditBox>
            </InfoTopBox>
            <InfoBottomBox>
              <InfoIconBox>
                <Icon icon='mdi:map-marker' color='#7d5a5a' style={{ fontSize: '20px' }} />
              </InfoIconBox>
              <InfoPosBox>{codeToAddress(Number(info.address))}</InfoPosBox>
            </InfoBottomBox>
          </InfoBox>
        </ProfileContainerBox>
        <WriteContainerBox>
          <WriteTitleBox>
            <span>작성한 리뷰</span>
            <Icon icon='mdi:paw' style={{ fontSize: '20px' }} />
          </WriteTitleBox>
          <WriteBox>
            <div className='top'>
              <TitleBox>동물 병원 추천</TitleBox>
              <DayBox>2023.01.04</DayBox>
            </div>
            <ContentBox>저렴한 동물 병원 추천해주세요</ContentBox>
          </WriteBox>
          <WriteBox>
            <div className='top'>
              <TitleBox>동물 병원 추천</TitleBox>
              <DayBox>2023.01.04</DayBox>
            </div>
            <ContentBox>저렴한 동물 병원 추천해주세요</ContentBox>
          </WriteBox>
        </WriteContainerBox>
        <LogoutBox>
          <button onClick={logoutHandler}>로그아웃</button>
        </LogoutBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 930px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;

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

const WriteContainerBox = styled.div`
  padding: 20px;
`;

const WriteTitleBox = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${brown};
  display: flex;
  align-items: center;

  span {
    margin-right: 5px;
  }
`;

const WriteBox = styled.div`
  .top {
    display: flex;
    margin-top: 20px;
    margin-bottom: 8px;
  }
  border-bottom: 1px solid ${bordergrey};
  height: 170px;
`;

const TitleBox = styled.div`
  color: ${brown};
  font-weight: 600;
  font-size: 20px;
`;

const DayBox = styled.div`
  color: ${mediumgrey};
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const ContentBox = styled.div`
  color: ${darkgrey};
  font-size: 16px;
`;

const LogoutBox = styled.div`
  margin-left: auto;
  margin-top: 20px;
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

export default Mypage;
