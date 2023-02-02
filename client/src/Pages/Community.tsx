import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Header from '../Components/Header';
import styled from 'styled-components';
import color from '../util/color';
import Pagination from 'react-js-pagination';
import { Icon } from '@iconify/react';
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
import headers from '../util/headers';
import Nav from '../Components/Nav';
import '../App.css';

const { yellow, darkgrey, brown, darkbrown, mediumgrey, bordergrey, ivory } = color;
const url = process.env.REACT_APP_API_ROOT;

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
  }, [page]);

  async function getData() {
    await axios
      .get(`${url}/posts?page=${page}`, { headers })
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

  const goToEditPage = () => {
    navigate('/post');
  };

  const type = 'board';

  return (
    <>
      <Container>
        <Header />
        <Body>
          <Nav type={type} />
          <CommunityContainer>
            <CommunityBanner>자유게시판</CommunityBanner>
            <PostList>
              {postData.posts === null ? (
                <EmptyMessage>
                  글이 없어요.. <br />첫 번째 글을 남겨주세요 🐾
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
                      <RightBox>
                        <NameDiv>{el.petName}</NameDiv>
                        <LikeContainer>
                          <Icon
                            className='icon'
                            icon='ph:paw-print-fill'
                            color='#FFBF71'
                            style={{ fontSize: '15px' }}
                          />
                          <span>{el.likesCnt}</span>
                        </LikeContainer>
                      </RightBox>
                    </PostBox>
                  );
                })
              )}
            </PostList>
            <PageContainer>
              <Pagination
                activePage={page}
                itemsCountPerPage={15}
                totalItemsCount={postData.pageInfo.totalPages * 15}
                pageRangeDisplayed={10}
                prevPageText={'‹'}
                nextPageText={'›'}
                onChange={handlePageChange}
              />
            </PageContainer>
          </CommunityContainer>
          <EditButton onClick={goToEditPage}>
            <Icon icon='mdi:pencil' color={brown} style={{ fontSize: '25px' }} />
          </EditButton>
        </Body>
      </Container>
    </>
  );
};

export default Community;

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
  margin-bottom: 40px;
  color: ${brown};
  font-size: 32px;
  font-weight: 800;
  display: flex;
  align-items: center;

  &:hover {
    color: ${darkbrown};
  }
`;
const SortButtonContainer = styled.div`
  height: 1.5vh;
`;
const PostList = styled.div`
  height: 100%;
`;

const PostBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${bordergrey};
`;

const WriteBox = styled.div`
  max-width: 795px;
  min-height: 160px;
  padding: 10px;
  .top {
    display: flex;
    margin-top: 20px;
    margin-bottom: 8px;
  }
  height: 80px;
  flex-grow: 1;
`;

const TitleBox = styled.div`
  color: ${brown};
  font-weight: 600;
  font-size: 20px;

  &:hover {
    color: #dfb895;
  }
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

const RightBox = styled.div`
  padding: 15px 10px;
  height: 30px;
  line-height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NameDiv = styled.div`
  margin-right: 3px;
  padding: 0px 5px;
  height: 30px;
  color: ${darkgrey};
  font-weight: bold;
  white-space: nowrap;
`;

const LikeContainer = styled.div`
  height: 30px;
  border-radius: 10px;
  background-color: ${ivory};
  padding: 15px 7px;

  display: flex;
  align-items: center;

  .icon {
    margin-right: 5px;
  }

  span {
    font-size: 14px;
  }
`;

const PageContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const EditButton = styled.button`
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

  /* @media (min-height: 1200px) {
    right: 100px;
    top: 55vh;
  } */

  &:hover {
    background-color: ${yellow};
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${brown};
`;
