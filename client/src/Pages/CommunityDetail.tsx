import React, { useEffect, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import color from '../color';
import axios from 'axios';
import headers from '../util/headers';
import Header from '../Components/Header';
import Nav from '../Components/Nav';
import load from '../img/paw.gif';

const { yellow, brown, darkbrown, bordergrey, lightgrey, red } = color;
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
  comments: PostData[] | null;
  post: {
    content: string;
    createdAt: string;
    imageUrl: string | null;
    likeActive: boolean;
    likesCnt: number;
    petName: string;
    postId: number;
    title: string;
  };
}

const CommunityDetail: React.FC = () => {
  const [postDetail, setPostDetail] = useState<PostList>({
    comments: [],
    post: {
      content: '',
      createdAt: '',
      imageUrl: null,
      likeActive: false,
      likesCnt: 0,
      petName: '',
      postId: 0,
      title: '',
    },
  });
  const id = useParams();
  const postId = id.id;
  console.log(postId);
  useEffect(() => {
    getData();
    console.log('resetCheck');
  }, []);

  async function getData() {
    await axios
      .get(`${url}/posts/${postId}`, { headers })
      .then((res) => {
        setPostDetail(res.data);
        console.log('res', res);
        console.log('res.data', res.data);
        console.log('postData', postDetail);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  console.log(postDetail.post.imageUrl);

  const type = 'board';
  return (
    <>
      <Container>
        <Header />
        <Body>
          <Nav type={type} />
          <PostContainer>
            <div>
              <Title>자유</Title>
              <Title>{postDetail.post.title}</Title>
            </div>
            <EditorContainer>
              <ReactQuill value={postDetail.post.content} readOnly={true} theme={'bubble'} />
            </EditorContainer>
            <FooterDiv>
              <ImageDiv>
                {postDetail.post.imageUrl === null ? (
                  <Image src={load} />
                ) : (
                  <Image src={postDetail.post.imageUrl[0]} />
                )}
              </ImageDiv>
              <ButtonsDiv>
                <SubmitButton>등록</SubmitButton>
                <CancelButton>취소</CancelButton>
              </ButtonsDiv>
            </FooterDiv>
          </PostContainer>
        </Body>
      </Container>
    </>
  );
};
export default CommunityDetail;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  margin-top: 50px;
  flex-grow: 1;
  display: flex;
`;

const PostContainer = styled.div`
  padding: 50px 90px;
  width: 930px;
  height: 100%;
  flex-grow: 1;
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
  color: ${brown};

  &.body {
    margin-top: 20px;
  }
`;

const TitleInput = styled.input`
  margin-bottom: 20px;
  padding: 0px 11px;
  border: 1px solid ${bordergrey};
  border-radius: 5px;
  width: 750px;
  height: 50px;
  font-size: 20px;

  &::placeholder {
    color: ${lightgrey};
  }
`;

const EditorContainer = styled.div`
  .ql-editor {
    height: 500px;
    font-size: 18px;
  }

  // placeholder
  .quill > .ql-container > .ql-editor.ql-blank::before {
    font-size: 18px;
    font-style: normal;
    color: ${lightgrey};
  }

  // border
  .ql-toolbar {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-color: ${bordergrey};
  }
  .ql-container {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-color: ${bordergrey};
  }
`;

const FooterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ImageDiv = styled.div``;

const Image = styled.img`
  margin-top: 15px;
  max-width: 300px;
  max-height: 300px;
  border-radius: 20px;
  object-fit: cover;
`;

const EmptyDiv = styled.div`
  margin-top: 15px;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background-color: ${bordergrey};
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonsDiv = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  margin-right: 15px;
  width: 150px;
  height: 50px;
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  background-color: ${brown};
  cursor: pointer;

  &:hover {
    background-color: ${darkbrown};
  }
`;

const CancelButton = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 15px;
  color: ${red};
  font-weight: bold;
  font-size: 18px;
  background-color: #f8f8f8;
  cursor: pointer;

  &:hover {
    background-color: #efefef;
  }
`;
