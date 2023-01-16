import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import UserImg from '../img/userimg.png';
import { Icon } from '@iconify/react';
import color from '../color';
import { useNavigate } from 'react-router';

const { darkgrey, brown, mediumgrey, bordergrey } = color;

const Mypage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Container>
        <ProfileContainerBox>
          <ProfileBox>
            <img className='profile' src={UserImg}></img>
          </ProfileBox>
          <InfoBox>
            <InfoTopBox>
              <InfoNameBox>귀염둥이</InfoNameBox>
              <InfoAgeBox>6세</InfoAgeBox>
              <InfoGenderBox>
                <Icon icon='mdi:gender-male' color='#6C92F2' style={{ fontSize: '20px' }} />
                <Icon icon='mdi:gender-female' color='#F87D7D' style={{ fontSize: '20px' }} />
              </InfoGenderBox>
              <EditBox>
                <button onClick={() => navigate('/userinfoedit')}>수정</button>
              </EditBox>
            </InfoTopBox>
            <InfoBottomBox>
              <InfoIconBox>
                <Icon icon='mdi:map-marker' color='#7d5a5a' style={{ fontSize: '20px' }} />
              </InfoIconBox>
              <InfoPosBox>떡잎 마을</InfoPosBox>
            </InfoBottomBox>
          </InfoBox>
        </ProfileContainerBox>
        <WriteContainerBox>
          <WriteTitleBox>작성한 리뷰</WriteTitleBox>
          <WriteBox>
            <div className='top'>
              <TitleBox>동물 병원 추천</TitleBox>
              <DayBox>2023.01.04</DayBox>
              <WriterBox>귀염둥이</WriterBox>
            </div>
            <ContentBox>저렴한 동물 병원 추천해주세요</ContentBox>
          </WriteBox>
          <WriteBox>
            <div className='top'>
              <TitleBox>동물 병원 추천</TitleBox>
              <DayBox>2023.01.04</DayBox>
              <WriterBox>귀염둥이</WriterBox>
            </div>
            <ContentBox>저렴한 동물 병원 추천해주세요</ContentBox>
          </WriteBox>
        </WriteContainerBox>
        <LogoutBox>
          <button>로그아웃</button>
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

const ProfileBox = styled.div`
  .profile {
    width: 207px;
  }
`;

const InfoBox = styled.div`
  margin-left: 30px;
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
  margin-right: 15px;
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const InfoGenderBox = styled.div`
  display: flex;
  align-items: center;
`;

const EditBox = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  button {
    border: none;
    height: 25px;
    width: 39px;
    color: ${darkgrey};
    border-radius: 5px;
    cursor: pointer;
  }
`;

const InfoBottomBox = styled.div`
  padding: 10px;
  display: flex;
`;

const InfoIconBox = styled.div`
  margin-top: 3px;
`;

const InfoPosBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-left: 5px;
`;

const WriteContainerBox = styled.div``;

const WriteTitleBox = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${brown};
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

const WriterBox = styled.div`
  color: ${darkgrey};
  font-weight: 600;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-left: auto;
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
    height: 25px;
    cursor: pointer;
  }
`;

export default Mypage;
