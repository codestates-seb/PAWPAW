import React, { useState, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';

import Header from '../Components/Header';
import Nav from '../Components/Nav';
import color from '../color';
const { yellow, brown, darkbrown, bordergrey, lightgrey, red } = color;
const petId = localStorage.getItem('petId');
const jwtToken = localStorage.getItem('Authorization');
const refreshToken = localStorage.getItem('Refresh');
const headers = {
  'Content-Type': 'multipart/form-data',
  Authorization: jwtToken,
};

export interface IPost {
  petId: string | null;
  title: string;
  content: string;
}

const Post = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<IPost>({
    petId: petId,
    title: '',
    content: '',
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<any>(null);
  const formData = new FormData();

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, title: e.target.value });
  };

  const contentHandler = (e: string) => {
    setData({ ...data, content: e });
  };

  const imageHandler = () => {
    const input = document.createElement('input'); // input 태그를 동적으로 생성

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      if (input.files) {
        // 파일로 만들어 file 상태에 저장
        const file = input.files[0];
        setFile(file);

        // 에디터 아래에 이미지 띄우기
        const imageURL = URL.createObjectURL(file);
        setImageUrl(imageURL);
      }
    };
  };

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (data.petId && data.title && data.content) {
      formData.append('petId', data.petId);
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('file', file);

      for (const key of formData.keys()) {
        console.log(key);
      }
      for (const value of formData.values()) {
        console.log(value);
      }

      try {
        await axios
          .post(`${process.env.REACT_APP_API_ROOT}/posts`, formData, { headers })
          .then((res) => {
            console.log('성공', res);
            navigate('/community');
          });
      } catch (err) {
        console.log('에러', err);
        alert(err);
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: '제목과 본문을 입력해주세요.',
        confirmButtonText: '<b>확인</b>',
        color: brown,
        confirmButtonColor: yellow,
      });
    }
  };

  const cancelHandler = () => {
    navigate('/');
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['false', 'large', 'huge'] }],
          [{ align: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [
            {
              color: [
                '#000000',
                '#e60000',
                '#ff9900',
                '#ffff00',
                '#008a00',
                '#0066cc',
                '#9933ff',
                '#ffffff',
                '#facccc',
                '#ffebcc',
                '#ffffcc',
                '#cce8cc',
                '#cce0f5',
                '#ebd6ff',
                '#bbbbbb',
                '#f06666',
                '#ffc266',
                '#ffff66',
                '#66b966',
                '#66a3e0',
                '#c285ff',
                '#888888',
                '#a10000',
                '#b26b00',
                '#b2b200',
                '#006100',
                '#0047b2',
                '#6b24b2',
                '#444444',
                '#5c0000',
                '#663d00',
                '#666600',
                '#003700',
                '#002966',
                '#3d1466',
                'custom-color',
              ],
            },
            { background: [] },
          ],
          ['image', 'link'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  return (
    <Container>
      <Header />
      <Body>
        <Nav />
        <PostContainer>
          <div>
            <Title>제목</Title>
            <TitleInput
              value={data.title}
              onChange={titleHandler}
              type='text'
              placeholder='제목을 작성해주세요.'
            />
          </div>
          <div>
            <Title className='body'>본문</Title>
          </div>
          <EditorContainer>
            <ReactQuill
              onChange={contentHandler}
              modules={modules}
              placeholder='사진은 최대 1장만 첨부할 수 있어요.'
            />
          </EditorContainer>
          <FooterDiv>
            <ImageDiv>
              {imageUrl ? (
                <Image src={imageUrl.toString()} />
              ) : (
                <EmptyDiv>
                  <Icon
                    onClick={imageHandler}
                    icon='ic:baseline-plus'
                    color='white'
                    style={{ fontSize: '60px' }}
                  />
                </EmptyDiv>
              )}
            </ImageDiv>
            <ButtonsDiv>
              <SubmitButton onClick={submitHandler}>등록</SubmitButton>
              <CancelButton onClick={cancelHandler}>취소</CancelButton>
            </ButtonsDiv>
          </FooterDiv>
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

export default Post;
