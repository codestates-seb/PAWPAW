import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import axios from 'axios';
import headers from '../util/headers';
import Header from '../Components/Header';
import color from '../color';
import { getUserInfo, petLogout } from '../util/UserApi';
import { codeToAddress } from '../util/ConvertAddress';
import Cat from '../img/catface.png';
import Dog from '../img/dogface.png';

const { ivory, yellow, coral, red, darkgrey, brown, mediumgrey, bordergrey } = color;
const url = process.env.REACT_APP_API_ROOT;
const petId = localStorage.getItem('petId') as string;

// interface FormData {
//   profileImage: Blob | null;
// }

// interface ResponseData {
//   myPosts: Array<object>; // 수정 필요
//   pageInfo: any; // 수정 필요
//   petInfo: petInfo;
// }

// interface petInfo {
//   petName: string;
//   code: string;
//   profileImage: File | null;
//   age: number;
//   gender: 'MALE' | 'FEMALE';
//   species: 'CAT' | 'DOG';
// }

// interface Info {
//   petName: string;
//   isMale: 'MALE' | 'FEMALE';
//   isCat: 'CAT' | 'DOG';
//   age: number;
//   address: string | null;
// }

interface PostData {
  contents: string;
  createdAt: string;
  likesCnt: 10;
  petName: string;
  postId: number;
  title: string;
}
interface PostList {
  posts: PostData[] | null;
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  petInfo: {
    age: number;
    code: number;
    gender: 'MALE' | 'FEMALE';
    petId: number;
    petName: string;
    profileImage: string;
    species: 'CAT' | 'DOG';
  };
}

const Mypage = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState<PostList>({
    posts: [],
    pageInfo: {
      page: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
    },
    petInfo: {
      age: 0,
      code: 0,
      gender: 'MALE',
      petId: 0,
      petName: '',
      profileImage: '',
      species: 'CAT',
    },
  });

  useEffect(() => {
    getData();
    console.log('로딩 체크');
  }, []);

  async function getData() {
    await axios
      .get(`${url}/pets/${petId}`, { headers })
      .then((res) => {
        setPostData(res.data);
        console.log('res', res);
        console.log('res.data', res.data);
        console.log('postData', postData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const goEditPage = () => {
    navigate('/userinfoedit', {
      state: {
        petName: postData.petInfo.petName,
        code: postData.petInfo.code,
        age: postData.petInfo.age,
        isMale: postData.petInfo.gender,
        isCat: postData.petInfo.species,
        profileImage: postData.petInfo.profileImage,
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
    <>
      <Header />
      <Container>
        <ProfileContainerBox>
          <ProfileBox>
            <AvatarDiv>
              {postData.petInfo.profileImage ? (
                <img
                  className='profile'
                  src={postData.petInfo.profileImage}
                  style={{ margin: 'auto', width: '175px', height: '175px' }}
                ></img>
              ) : postData.petInfo.species === 'CAT' ? (
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
              <InfoNameBox>{postData.petInfo.petName}</InfoNameBox>
              <InfoAgeBox>{postData.petInfo.age}살</InfoAgeBox>
              <InfoGenderBox>
                {postData.petInfo.gender === 'MALE' ? (
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
              <InfoPosBox>{codeToAddress(postData.petInfo.code)}</InfoPosBox>
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
