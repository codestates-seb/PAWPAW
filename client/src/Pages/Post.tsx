import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from '../Components/Header';
import Nav from '../Components/Nav';
import color from '../color';
import Editor from '../Components/Editor';
import headers from '../util/headers';
const { brown, darkbrown, bordergrey, lightgrey, red } = color;
const petId = localStorage.getItem('petId');

export interface IPost {
  petId: string | null;
  title: string;
  contents: string;
  tag: string;
}

const Post: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [data, setData] = useState<IPost>({
    petId: petId,
    title: '',
    contents: '',
    tag: '자유',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setData({ ...data, title: title, contents: contents });

    if (data.petId && data.title && data.contents) {
      const formData = new FormData();
      formData.append('petId', data.petId);
      formData.append('title', data.title);
      formData.append('contents', data.contents);
      formData.append('tag', data.tag);

      for (const key of formData.keys()) {
        console.log(key);
      }
      for (const value of formData.values()) {
        console.log(value);
      }

      axios
        .post(`${process.env.REACT_APP_API_ROOT}/posts`, formData, { headers })
        .then((res) => {
          console.log(res);
          // navigate('/');
        })
        .catch((err) => alert(err));
    }
  };

  const cancelHandler = () => {
    navigate('/');
  };

  return (
    <Container>
      <Header />
      <Body>
        <Nav />
        <PostContainer>
          <div>
            <Title>제목</Title>
            <TitleInput
              value={title}
              onChange={onChange}
              type='text'
              placeholder='제목을 작성해주세요'
            />
          </div>
          <div>
            <Title className='body'>본문</Title>
          </div>
          <Editor data={data} setContents={setContents} />
          <ButtonsDiv>
            <SubmitButton onClick={submitHandler}>등록</SubmitButton>
            <CancelButton onClick={cancelHandler}>취소</CancelButton>
          </ButtonsDiv>
        </PostContainer>
      </Body>
    </Container>
  );
};

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

export default Post;
