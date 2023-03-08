import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../Components/Header';
import styled from 'styled-components';
import color from '../util/color';
import Pagination from 'react-js-pagination';
import { Icon } from '@iconify/react';
import axios from 'axios';
import headers from '../util/headers';
import Nav from '../Components/Nav';
import '../App.css';
import FriendRecommend from '../Components/FriendRecommend';
import CommunityPost from '../Components/CommunityPost';
import SortModal from '../Components/SortModal';

const { yellow, brown, darkbrown, ivory } = color;
const url = process.env.REACT_APP_API_ROOT;

export interface PostData {
  id: number;
  petName: string;
  petId: number;
  title: string;
  content: string;
  createdAt: string;
  likesCnt: number;
  commentCnt: number;
}

interface PostList {
  posts: PostData[] | null;
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

const Community: React.FC = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState<PostList | null>(null);
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<string>('newest');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, [page, sorting]);

  async function getData() {
    await axios
      .get(`${url}/posts?page=${page}&sort=${sorting}`, { headers })
      .then((res) => {
        setPostData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setPage(page);
  };

  return (
    <Container>
      <Header />
      <Body>
        <Nav type='board' />
        <CommunityContainer>
          <CommunityBanner>자유게시판</CommunityBanner>
          {page === 1 && <FriendRecommend />}
          <SortButtonBox>
            <SortButton onClick={() => setIsOpen(!isOpen)}>
              <span className='text'>
                {isOpen
                  ? '정렬'
                  : sorting === 'newest'
                  ? '최신순'
                  : sorting === 'likes'
                  ? '인기순'
                  : '댓글 많은 순'}
              </span>
              <span className='icon'>
                {isOpen ? (
                  <Icon icon='octicon:triangle-up-16' />
                ) : (
                  <Icon icon='octicon:triangle-down-16' />
                )}
              </span>
            </SortButton>
            {isOpen && <SortModal setSorting={setSorting} setIsOpen={setIsOpen} />}
          </SortButtonBox>
          <PostList>
            {postData?.posts === null ? (
              <EmptyMessage>
                글이 없어요.. <br />첫 번째 글을 남겨주세요 🐾
              </EmptyMessage>
            ) : (
              postData?.posts.map((post: PostData) => <CommunityPost key={post.id} post={post} />)
            )}
          </PostList>

          <PageContainer>
            <Pagination
              activePage={page}
              itemsCountPerPage={15}
              totalItemsCount={
                postData?.pageInfo.totalPages ? postData?.pageInfo.totalPages * 15 : 15
              }
              pageRangeDisplayed={10}
              prevPageText={'‹'}
              nextPageText={'›'}
              onChange={handlePageChange}
            />
          </PageContainer>
        </CommunityContainer>
        <PostWriteBtn onClick={() => navigate('/post')}>
          <Icon icon='mdi:pencil' color={brown} style={{ fontSize: '25px' }} />
        </PostWriteBtn>
      </Body>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Body = styled.div`
  margin-top: 50px;
  flex-grow: 1;
  display: flex;
`;

const CommunityContainer = styled.div`
  padding: 50px 90px;
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CommunityBanner = styled.div`
  margin-bottom: 20px;
  color: ${brown};
  font-size: 32px;
  font-weight: 800;
  display: flex;
  align-items: center;

  &:hover {
    color: ${darkbrown};
  }
`;

const SortButtonBox = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const SortButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 700;
  color: ${brown};
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: ${darkbrown};
  }

  .icon {
    display: flex;
    align-items: center;
  }
`;

const PostList = styled.div`
  margin-top: 10px;
  height: 100%;
`;

const PageContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PostWriteBtn = styled.button`
  width: 50px;
  height: 50px;
  background-color: ${ivory};
  border-radius: 50px;
  border: 0px;
  box-shadow: rgba(149, 157, 165, 0.3) 0px 2px 5px 1px;
  position: fixed;
  right: 5%;
  bottom: 5%;
  cursor: pointer;

  &:hover {
    background-color: ${yellow};
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${brown};
`;

export default Community;
