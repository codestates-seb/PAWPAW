import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import styled from 'styled-components';
import color from '../color';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import headers from '../util/headers';
import '../App.css';

const { darkgrey, brown, mediumgrey, bordergrey } = color;
const url = process.env.REACT_APP_API_ROOT;
const petId = localStorage.getItem('petId') as string;

interface PostData {
  postId: number;
  petname: string;
  content: string;
  createdAt: string;
  likesCnt: 10;
}
interface PostList {
  post: PostData[] | null;
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

const Community: React.FC = () => {
  const [postData, setPostData] = useState<PostList>({
    post: [],
    pageInfo: {
      page: 1,
      size: 15,
      totalElements: 0,
      totalPages: 1,
    },
  });
  const [page, setPage] = useState(1);
  useEffect(() => {
    getData();
    console.log('리셋');
  }, [page]);

  async function getData() {
    await axios
      .get(`${url}/posts/page=${page * 15 - 14}&size=${page * 15}`, { headers })
      .then((res) => {
        setPostData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setPage(page);
    console.log(page);
  };
  return (
    <>
      <Header />
      <Container>
        <LeftNav />
        <CommunityContainer>
          <CommunityBanner>자유게시판</CommunityBanner>
          <SortButtonContainer></SortButtonContainer>
          <PostList>
            {dummy.post.length === 0 ? (
              <EmptyMessage>
                리뷰가 없어요.. <br />첫 번째 리뷰를 남겨주세요 🐾
              </EmptyMessage>
            ) : (
              dummy.post.map((el: any, idx: number) => {
                return (
                  <WriteBox key={idx}>
                    <div className='top'>
                      <TitleBox>{el.title}</TitleBox>
                      <DayBox>{el.createdAt}</DayBox>
                    </div>
                    <ContentBox>{el.content}</ContentBox>
                  </WriteBox>
                );
              })
            )}
          </PostList>
        </CommunityContainer>
        <RightBlank />
      </Container>
      <PageContainer>
        <Pagination
          activePage={page}
          itemsCountPerPage={15}
          totalItemsCount={dummy.pageInfo.totalPages * 15}
          pageRangeDisplayed={10}
          prevPageText={'‹'}
          nextPageText={'›'}
          onChange={handlePageChange}
        />
      </PageContainer>
    </>
  );
};

export default Community;

const Container = styled.div`
  width: 100%;
  padding-top: 50px;
  display: flex;
  flex-direction: row;
`;
// 공간 확보를 위함 임시 파일

const LeftNav = styled.div`
  width: 235px;
`;

const RightBlank = styled.div`
  width: 235px;
  height: 100%;
  position: relative;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const CommunityContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const CommunityBanner = styled.div`
  height: 8.5vh;
  color: ${brown};
  font-size: 32px;
  font-weight: bold;
  padding-left: 50px;
  display: flex;
  align-items: center;
`;
const SortButtonContainer = styled.div`
  height: 1.5vh;
`;
const PostList = styled.div`
  height: 100%;
  padding-left: 40px;
`;

const WriteBox = styled.div`
  .top {
    display: flex;
    margin-top: 20px;
    margin-bottom: 8px;
  }
  border-bottom: 1px solid ${bordergrey};
  height: 80px;
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

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${brown};
`;
const dummy = {
  post: [
    {
      postId: 1,
      petname: 'test1',
      title: 'test',
      content: 'test',
      createdAt: '2023-01-01',
      likesCnt: 0,
    },
    {
      postId: 2,
      petname: 'test2',
      title: 'test2',
      content: 'test2',
      createdAt: '2023-01-02',
      likesCnt: 2,
    },
    {
      postId: 3,
      petname: 'test3',
      title: 'test3',
      content: 'test3',
      createdAt: '2023-01-03',
      likesCnt: 3,
    },
    {
      postId: 4,
      petname: 'test4',
      title: 'test4',
      content: 'test4',
      createdAt: '2023-01-04',
      likesCnt: 4,
    },
    {
      postId: 5,
      petname: 'test5',
      title: 'test5',
      content: 'test5',
      createdAt: '2023-01-05',
      likesCnt: 5,
    },
    {
      postId: 6,
      petname: 'test6',
      title: 'test6',
      content: 'test6',
      createdAt: '2023-01-06',
      likesCnt: 6,
    },
    {
      postId: 7,
      petname: 'test7',
      title: 'test7',
      content: 'test7',
      createdAt: '2023-01-07',
      likesCnt: 7,
    },
    {
      postId: 8,
      petname: 'test8',
      title: 'test8',
      content: 'test8',
      createdAt: '2023-01-08',
      likesCnt: 8,
    },
    {
      postId: 9,
      petname: 'test9',
      title: 'test9',
      content: 'test9',
      createdAt: '2023-01-09',
      likesCnt: 9,
    },
    {
      postId: 10,
      petname: 'test10',
      title: 'test10',
      content: 'test10',
      createdAt: '2023-01-10',
      likesCnt: 10,
    },
    {
      postId: 11,
      petname: 'test11',
      title: 'test11',
      content: 'test11',
      createdAt: '2023-01-11',
      likesCnt: 11,
    },
    {
      postId: 12,
      petname: 'test12',
      title: 'test12',
      content: 'test12',
      createdAt: '2023-01-12',
      likesCnt: 12,
    },
    {
      postId: 13,
      petname: 'test13',
      title: 'test13',
      content: 'test13',
      createdAt: '2023-01-13',
      likesCnt: 13,
    },
    {
      postId: 14,
      petname: 'test14',
      title: 'test14',
      content: 'test14',
      createdAt: '2023-01-14',
      likesCnt: 14,
    },
    {
      postId: 15,
      petname: 'test15',
      title: 'test15',
      content: 'test15',
      createdAt: '2023-01-15',
      likesCnt: 15,
    },
  ],
  pageInfo: {
    page: 1,
    size: 15,
    totalElements: 0,
    totalPages: 10,
  },
};
