import { Icon } from '@iconify/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import CommunityReview from '../Components/CommunityReview';
import Header from '../Components/Header';
import Nav from '../Components/Nav';
import { Comment } from '../Components/Review';
import load from '../img/paw.gif';
import color from '../util/color';
import headers from '../util/headers';
import { PostDELETE } from '../util/PostReviewApi';
import { PageInfo } from './Community';
import { PetInfo } from './Mypage';

const { ivory, darkivory, brown, bordergrey, lightgrey, mediumgrey, darkgrey, red, yellow } = color;
const url = process.env.REACT_APP_API_ROOT;
const petId = Number(localStorage.getItem('petId') as string);

export interface PostDetail {
  post: {
    authorId: number;
    content: string;
    createdAt: string;
    imageUrl: string | null;
    likeActive: boolean;
    likesCnt: number;
    petName: string;
    petStatus: string;
    postId: number;
    title: string;
  };
  comments: Comment[] | null;
}

export interface UserData {
  myPosts: UserData[] | null;
  pageInfo: PageInfo;
  petInfo: PetInfo;
}

const CommunityDetail = () => {
  const navigate = useNavigate();
  const [like, setLike] = useState(true);
  const [postDetail, setPostDetail] = useState<PostDetail | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const id = useParams();
  const postId = id.id;

  useEffect(() => {
    getData();
  }, [like]);

  async function getData() {
    await axios
      .get(`${url}/posts/${postId}`, { headers })
      .then((res) => {
        setPostDetail(res.data);
        setLike(res.data.post.likeActive);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    await axios
      .get(`${url}/pets/${petId}`, { headers })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const goToEdit = () => {
    navigate('/postedit', { state: { postId: postId } });
  };
  const likeUp = async () => {
    try {
      await axios.post(
        `${url}/posts/likes/${postId}`,
        {
          petId: petId,
          status: 1,
        },
        { headers },
      );
      setLike(true);
    } catch (error) {
      console.error('Error', error);
    }
  };
  const likeDown = async () => {
    try {
      await axios.post(
        `${url}/posts/likes/${postId}`,
        {
          petId: petId,
          status: 0,
        },
        { headers },
      );
      setLike(false);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const postDeleteHandler = () => {
    Swal.fire({
      title: '정말 삭제하시겠어요?',
      icon: 'warning',
      showCancelButton: true,
      color: brown,
      confirmButtonColor: yellow,
      cancelButtonColor: bordergrey,
      confirmButtonText: '<b>확인</b>',
      cancelButtonText: '<b>취소</b>',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '삭제되었습니다.',
          icon: 'error',
          color: brown,
          confirmButtonColor: yellow,
          confirmButtonText: '<b>확인</b>',
        });
        PostDELETE(Number(postId)).then(() => navigate('/community'));
      }
    });
  };

  return (
    <>
      <Container>
        <Header />
        <Body>
          <Nav type='board' />
          <PostContainer>
            <div>
              <Tag>자유</Tag>
              <Title>{postDetail?.post.title}</Title>
              <NameCreatedAtConatiner>
                <Link to={`/mypage/${postDetail?.post.authorId}`}>
                  <NameBox>{postDetail?.post.petName}</NameBox>
                </Link>
                <CreatedAtBox>{postDetail?.post.createdAt}</CreatedAtBox>
              </NameCreatedAtConatiner>
            </div>
            <ImageDiv>
              {postDetail?.post.imageUrl === null ? (
                <ImageTop src={load} />
              ) : (
                <ImageTop src={postDetail?.post.imageUrl[0]} />
              )}
            </ImageDiv>
            <EditorContainer>
              <ReactQuill value={postDetail?.post.content} readOnly={true} theme={'bubble'} />
            </EditorContainer>
            <FooterDiv>
              <ButtonsDiv>
                {like === true ? (
                  <LikeButton onClick={likeDown}>
                    <FixedIcon
                      icon='ph:paw-print-fill'
                      color={'#FFBF71'}
                      style={{ fontSize: '25px' }}
                    />
                    <LikeCnt>{postDetail?.post.likesCnt}</LikeCnt>
                  </LikeButton>
                ) : (
                  <LikeButton onClick={likeUp}>
                    <FixedIcon icon='ph:paw-print' color={'#'} style={{ fontSize: '25px' }} />
                    <LikeCnt>{postDetail?.post.likesCnt}</LikeCnt>
                  </LikeButton>
                )}
              </ButtonsDiv>
              {petId === postDetail?.post.authorId && (
                <ButtonsDiv>
                  <Button onClick={goToEdit}>수정</Button>
                  <DeleteButton onClick={postDeleteHandler}>삭제</DeleteButton>
                </ButtonsDiv>
              )}
            </FooterDiv>
            {postDetail && userData && (
              <CommunityReview
                getData={getData}
                postId={postId}
                postDetail={postDetail}
                userData={userData}
              />
            )}
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
  width: 1000px;
  height: 100%;
  flex-grow: 1;
`;
const Tag = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #aa8080;
`;
const Title = styled.div`
  margin-bottom: 8px;
  font-size: 30px;
  font-weight: bold;
  color: ${brown};

  &.body {
    margin-top: 20px;
  }
`;
const NameCreatedAtConatiner = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const NameBox = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding-left: 5px;
  margin-right: 20px;
  color: ${mediumgrey};

  &:hover {
    color: ${darkgrey};
  }
`;
const CreatedAtBox = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #969696;
`;

const EditorContainer = styled.div`
  .ql-editor {
    height: 100%;
    font-size: 18px;
  }

  .quill > .ql-container > .ql-editor.ql-blank::before {
    font-size: 18px;
    font-style: normal;
    color: ${lightgrey};
  }

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

const ImageTop = styled.img`
  margin: 15px 0px;
  max-width: 750px;
  border-radius: 20px;
  object-fit: cover;
`;

const ButtonsDiv = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  width: 46px;
  height: 33px;
  border: none;
  border-radius: 10px;
  color: ${brown};
  font-weight: bold;
  font-size: 15px;
  background-color: #f8f8f8;
  cursor: pointer;

  &:hover {
    background-color: #efefef;
  }
`;

const DeleteButton = styled(Button)`
  margin-left: 10px;
  color: ${red};
`;

const LikeButton = styled.button`
  padding: 10px 17px;
  border: none;
  border-radius: 15px;
  color: ${brown};
  background-color: ${ivory};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${darkivory};
  }
`;
const FixedIcon = styled(Icon)`
  position: absolute;
  margin-right: 20px;
`;
const LikeCnt = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding-top: 5px;
  margin-left: 20px;
`;
