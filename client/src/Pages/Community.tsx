import { Icon } from '@iconify/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import '../App.css';
import CommunityPost from '../Components/CommunityPost';
import FriendRecommend from '../Components/FriendRecommend';
import Header from '../Components/Header';
import Nav from '../Components/Nav';
import SearchBar from '../Components/SearchBar';
import AreaSort from '../Components/AreaSort';
import { addressToCode } from '../util/ConvertAddress';
import SortModal from '../Components/SortModal';
import color from '../util/color';
import headers from '../util/headers';
import { PostData, PostList } from '../types';

const { yellow, brown, darkbrown, ivory } = color;
const url = process.env.REACT_APP_API_ROOT;

const Community = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState<PostList | null>(null);
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<string>('newest');
  const [areaSorting, setAreaSorting] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isArea, setIsArea] = useState<boolean>(false);
  console.log('test');
  useEffect(() => {
    getData();
  }, [page, sorting, areaSorting]);

  async function getData() {
    let test = '';
    for (const el of areaSorting) {
      test = test + '&code=' + addressToCode(el);
      console;
    }
    if (areaSorting.length === 0) {
      await axios
        .get(`${url}/posts?page=${page}&sort=${sorting}`, { headers })
        .then((res) => {
          setPostData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      await axios
        .get(`${url}/posts?page=${page}&sort=${sorting}${test}`, { headers })
        .then((res) => {
          setPostData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setPage(page);
  };

  const search = (searchType: string, searchContent: string) => {
    axios
      .get(
        `${url}/posts?page=${page}&sort=${sorting}&searchType=${searchType}&searchContent=${searchContent}`,
        { headers },
      )
      .then((res) => {
        setPostData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <Header />
      <Body>
        <Nav type='board' />
        <CommunityContainer>
          <CommunityBanner>자유게시판</CommunityBanner>
          {page === 1 && <FriendRecommend />}
          <ButtonContainer>
            <LeftButtonContainer>
              <MapIcon icon='mdi:map-check' color='#7d5a5a' width='35' height='35' />
              <AreaSortButtonBox>
                <AreaSortButton onClick={() => setIsArea(!isArea)}>
                  보고싶은 동내 설정
                </AreaSortButton>
                {isArea ? (
                  <AreaSort
                    areaSorting={areaSorting}
                    setAreaSorting={setAreaSorting}
                    setIsArea={setIsArea}
                  />
                ) : (
                  ''
                )}
            </LeftButtonContainer>
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
          </ButtonContainer>
          
          <PostsContainer>
            {postData?.posts === null || postData?.posts.length === 0 ? (
              <EmptyMessage>검색 결과가 없어요..🐾</EmptyMessage>
            ) : (
              postData?.posts.map((post: PostData) => <CommunityPost key={post.id} post={post} />)
            )}
          </PostsContainer>

          <Footer>
            <SearchBar search={search} />
            <PageContainer>
              <Pagination
                activePage={page}
                itemsCountPerPage={15}
                totalItemsCount={
                  postData?.pageInfo.totalPages ? postData?.pageInfo.totalPages * 15 : 15
                }
                pageRangeDisplayed={10}
                prevPageText={'<'}
                nextPageText={'>'}
                onChange={handlePageChange}
              />
            </PageContainer>
          </Footer>
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
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LeftButtonContainer = styled.div`
  display: flex;
`;

const MapIcon = styled(Icon)`
  margin: 15px 5px 0 5px;
`;
const AreaSortButtonBox = styled.div`
  margin-top: 15px;
  border: 2px solid ${brown};
  border-radius: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border: 2px solid ${darkbrown};
  }
`;
const AreaSortButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 700;
  color: ${brown};
  cursor: pointer;

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

const PostsContainer = styled.div`
  margin-top: 10px;
  height: 100%;
`;

const PageContainer = styled.div`
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
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${brown};
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Community;
