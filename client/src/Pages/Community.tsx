import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Header from '../Components/Header';
import styled from 'styled-components';
import color from '../color';
import Pagination from 'react-js-pagination';
import { Icon } from '@iconify/react';
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
import headers from '../util/headers';
import Nav from '../Components/Nav';
import '../App.css';

const { darkgrey, brown, mediumgrey, bordergrey, ivory } = color;
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
  const [postData, setPostData] = useState<PostList>({
    posts: [],
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
      .get(`${url}/posts?page=${page}`, { headers })
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

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setPage(page);
    console.log(page);
  };

  const goToEditPage = () => {
    navigate('/post');
  };
  return (
    <>
      <Header />
      <Container>
        <Nav />
        <CommunityContainer>
          <CommunityBanner>자유게시판</CommunityBanner>
          {/* <SortButtonContainer></SortButtonContainer> */}
          <PostList>
            {postData.posts === null ? (
              <EmptyMessage>
                리뷰가 없어요.. <br />첫 번째 리뷰를 남겨주세요 🐾
              </EmptyMessage>
            ) : (
              postData.posts.map((el: any) => {
                return (
                  <PostBox key={el.id}>
                    <WriteBox>
                      <div className='top'>
                        <Link to={`/community/${el.id}`}>
                          <TitleBox>{el.title}</TitleBox>
                        </Link>
                        <DayBox>{el.createdAt}</DayBox>
                      </div>
                      <ContentBox
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(el.content, {
                            allowedTags: [],
                            allowedAttributes: false,
                          }),
                        }}
                      />
                    </WriteBox>
                    <LikeContainer>
                      <div>{el.petname}</div>
                      <div>
                        <Icon
                          icon='ph:paw-print-fill'
                          color='#FFBF71'
                          style={{ fontSize: '15px' }}
                        />
                        {el.likesCnt}
                      </div>
                    </LikeContainer>
                  </PostBox>
                );
              })
            )}
          </PostList>
        </CommunityContainer>
        <RightBlank>
          <EditButton onClick={goToEditPage}>
            <Icon icon='mdi:pencil' color='black' style={{ fontSize: '50px' }} />
          </EditButton>
        </RightBlank>
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
  margin-top: 30px;
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

const PostBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const LikeContainer = styled.div`
  margin-top: 20px;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const EditButton = styled.button`
  width: 80px;
  height: 80px;
  background-color: ${ivory};
  border-radius: 50px;
  border: 0px;
  box-shadow: 2px 2px 2px 2px gray;
  position: absolute;
  right: 80px;
  top: 70vh;
  @media (min-height: 1200px) {
    right: 100px;
    top: 55vh;
  }
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
  ],
  pageInfo: {
    page: 1,
    size: 15,
    totalElements: 0,
    totalPages: 10,
  },
};
