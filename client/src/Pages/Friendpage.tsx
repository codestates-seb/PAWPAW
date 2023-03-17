import { Icon } from '@iconify/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import Header from '../Components/Header';
import MypagePost from '../Components/MypagePost';
import color from '../util/color';
import headers from '../util/headers';
import Profile from './Profile';
import { MyPageData, MyPagePost } from '../types';

const { brown } = color;
const url = process.env.REACT_APP_API_ROOT;

const Friendpage = () => {
  const params = useParams();
  const [myPageData, setMyPageData] = useState<MyPageData | null>(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await axios
      .get(`${url}/pets/${params.petId}`, { headers })
      .then((res) => {
        setMyPageData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  console.log(myPageData);
  return (
    <>
      <Header />
      <Container>
        <Profile petInfo={myPageData?.petInfo} />
        {myPageData?.myPosts && (
          <PostsContainer>
            <TitleDiv>
              <TitleSpan>작성한 글</TitleSpan>
              <Icon icon='mdi:paw' style={{ fontSize: '20px' }} />
            </TitleDiv>
            {myPageData?.myPosts.length === 0 ? (
              <EmptyMessage>작성한 글이 없어요 🐾</EmptyMessage>
            ) : (
              myPageData?.myPosts.map((post: MyPagePost) => (
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

export default Friendpage;
