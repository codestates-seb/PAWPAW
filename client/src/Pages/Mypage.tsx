import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { Icon } from '@iconify/react';
import axios from 'axios';
import headers from '../util/headers';
import Header from '../Components/Header';
import color from '../util/color';
import Profile from './Profile';
import MypagePost from '../Components/MypagePost';

const { brown } = color;
const url = process.env.REACT_APP_API_ROOT;

interface PostList {
  myPosts: PostData[] | null;
  pageInfo: PageInfo;
  petInfo: PetInfo;
}

export interface PostData {
  contents: string;
  createdAt: string;
  likesCnt: number;
  commentCnt: number;
  petName: string;
  postId: number;
  title: string;
}

interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface PetInfo {
  age: number;
  code: number;
  gender: 'MALE' | 'FEMALE';
  petId: number;
  petName: string;
  profileImage: string;
  species: 'CAT' | 'DOG';
}

const Mypage = () => {
  const params = useParams();
  const [postData, setPostData] = useState<PostList | null>(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await axios
      .get(`${url}/pets/${params.petId}`, { headers })
      .then((res) => {
        setPostData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <Header />
      <Container>
        <Profile petInfo={postData?.petInfo} />
        {postData?.myPosts && (
          <PostsContainer>
            <TitleDiv>
              <TitleSpan>작성한 글</TitleSpan>
              <Icon icon='mdi:paw' style={{ fontSize: '20px' }} />
            </TitleDiv>
            {postData?.myPosts.length === 0 ? (
              <EmptyMessage>작성한 글이 없어요 🐾</EmptyMessage>
            ) : (
              postData?.myPosts.map((post: PostData) => (
                <MypagePost key={post.postId} post={post} />
              ))
            )}
          </PostsContainer>
        )}
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

const PostsContainer = styled.div`
  padding: 20px;
`;

const TitleDiv = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
  color: ${brown};
  display: flex;
  align-items: center;
`;

const TitleSpan = styled.span`
  margin-right: 5px;
`;

const EmptyMessage = styled.div`
  padding-top: 100px;
  text-align: center;
  font-size: 14px;
  color: ${brown};
`;

export default Mypage;
