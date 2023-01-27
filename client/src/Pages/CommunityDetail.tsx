import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import color from '../color';
import axios from 'axios';
import headers from '../util/headers';
import Header from '../Components/Header';
import Nav from '../Components/Nav';
import load from '../img/paw.gif';
import {
  PostReviewEdit,
  PostReviewUPDATE,
  PostReviewDELETE,
  PostDELETE,
} from '../util/PostReviewApi';

const { ivory, darkivory, brown, bordergrey, lightgrey, red, yellow, darkbrown } = color;
const url = process.env.REACT_APP_API_ROOT;
const petId = Number(localStorage.getItem('petId') as string);

interface UserData {
  contents: string;
  createdAt: string;
  likesCnt: 10;
  petName: string;
  postId: number;
  title: string;
}
interface UserList {
  myPosts: UserData[] | null;
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  petInfo: {
    age: number;
    code: number;
    gender: 'MALE' | 'FEMALE';
    petId: number;
    petName: string;
    profileImage: string;
    species: 'CAT' | 'DOG';
  };
}

interface PostData {
  commentId: number;
  petId: number;
  petName: string;
  content: string;
  profileImageUrl: string | null;
  createdAt: string;
}
interface PostList {
  post: {
    authorId: number;
    postId: number;
    title: string;
    content: string;
    imageUrl: string | null;
    petName: string;
    createdAt: string;
    likesCnt: number;
    likeActive: boolean;
  };
  comments: PostData[] | null;
}

const CommunityDetail: React.FC = () => {
  const navigate = useNavigate();
  const [like, setLike] = useState(true);
  const [review, setReview] = useState<string>('');
  const [editActivate, setEditActivate] = useState<number>(0);
  const [editReview, setEditReview] = useState<string>('');
  const [userData, setUserData] = useState<UserList>({
    myPosts: [],
    pageInfo: {
      page: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
    },
    petInfo: {
      age: 0,
      code: 0,
      gender: 'MALE',
      petId: 0,
      petName: '',
      profileImage: '',
      species: 'CAT',
    },
  });
  const [postDetail, setPostDetail] = useState<PostList>({
    post: {
      authorId: 0,
      content: '',
      createdAt: '',
      imageUrl: null,
      likeActive: false,
      likesCnt: 0,
      petName: '',
      postId: 0,
      title: '',
    },
    comments: [],
  });
  const id = useParams();
  const postId = id.id;

  useEffect(() => {
    getData();
    console.log('resetCheck');
  }, [like]);

  async function getData() {
    await axios
      .get(`${url}/posts/${postId}`, { headers })
      .then((res) => {
        setPostDetail(res.data);
        setLike(postDetail.post.likeActive);
        console.log('value', postDetail.post.likeActive);
        console.log('res', res);
        console.log('res.data', res.data);
        console.log('postData', postDetail);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getUserData();
    console.log('로딩 체크');
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
  console.log(postDetail.post.imageUrl);

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

  const reviewDeleteHandler = (commentId: number) => {
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
        PostReviewDELETE(commentId).then(() => window.location.reload());
      }
    });
  };
  const reviewActivateHandler = (petId: number) => {
    setEditActivate(petId);
    console.log(editActivate);
  };
  const reviewUpdateHandler = (commentId: number) => {
    if (editReview === '') {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        iconHtml: '⚠',
        title: '내용을 입력해주세요. ',
        color: brown,
        padding: '20px 0px 40px 0px',
      });
      return;
    } else {
      Swal.fire({
        title: '정말 수정하시겠어요?',
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
            title: '수정되었습니다.',
            icon: 'success',
            color: brown,
            confirmButtonColor: yellow,
            confirmButtonText: '<b>확인</b>',
          });
          PostReviewUPDATE(commentId, editReview);
          setEditActivate(0);
          setEditReview('');
          window.location.reload();
        }
      });
    }
  };
  const editReviewHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditReview((e.target as HTMLInputElement).value);
    console.log('editreviewhandler', (e.target as HTMLInputElement).value);
  };
  const reviewEditCancelHandler = () => {
    setEditActivate(0);
    setEditReview('');
  };

  const reviewHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setReview((e.target as HTMLInputElement).value);
    console.log('reviewhandler', (e.target as HTMLInputElement).value);
  };

  const reviewPostHandler = () => {
    PostReviewEdit(Number(postId), review);
    if (review === '') {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        iconHtml: '⚠',
        title: '내용을 입력해주세요. ',
        color: brown,
        padding: '20px 0px 40px 0px',
      });
      return;
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        iconHtml: '🐾',
        title: '작성되었습니다.',
        color: brown,
        padding: '20px 0px 40px 0px',
        showConfirmButton: false,
        timer: 1500,
      });
      setReview('');
      window.location.reload();
    }
  };

  const type = 'board';
  return (
    <>
      <Container>
        <Header />
        <Body>
          <Nav type={type} />
          <PostContainer>
            <div>
              <Tag>자유</Tag>
              <Title>{postDetail.post.title}</Title>
              <NameCreatedAtConatiner>
                <NameBox>{postDetail.post.petName}</NameBox>
                <CreatedAtBox>{postDetail.post.createdAt}</CreatedAtBox>
              </NameCreatedAtConatiner>
            </div>
            <ImageDiv>
              {postDetail.post.imageUrl === null ? (
                <ImageTop src={load} />
              ) : (
                <ImageTop src={postDetail.post.imageUrl[0]} />
              )}
            </ImageDiv>
            <EditorContainer>
              <ReactQuill value={postDetail.post.content} readOnly={true} theme={'bubble'} />
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
                    <LikeCnt>{postDetail.post.likesCnt}</LikeCnt>
                  </LikeButton>
                ) : (
                  <LikeButton onClick={likeUp}>
                    <FixedIcon icon='ph:paw-print' color={'#'} style={{ fontSize: '25px' }} />
                    <LikeCnt>{postDetail.post.likesCnt}</LikeCnt>
                  </LikeButton>
                )}
              </ButtonsDiv>
              {petId !== postDetail.post.authorId ? (
                ''
              ) : (
                <ButtonsDiv>
                  <Button onClick={goToEdit}>수정</Button>
                  <DeleteButton onClick={postDeleteHandler}>삭제</DeleteButton>
                </ButtonsDiv>
              )}
            </FooterDiv>
            <ReviewContainer>
              <ReviewBox>
                <ReviewTitle>댓글 {postDetail.comments?.length}</ReviewTitle>
                {postDetail.comments === null ? (
                  <ImageTop src={load} />
                ) : (
                  <Reviews>
                    {postDetail.comments.length === 0 ? (
                      <EmptyMessage>
                        댓글이 없어요.. <br />첫 번째 댓글을 남겨주세요 🐾
                      </EmptyMessage>
                    ) : (
                      postDetail.comments.map((el: any) => {
                        return (
                          <Review key={el.commentId}>
                            {el.commentId !== editActivate ? (
                              <ReviewWrite>
                                <ReviewUserBox>
                                  <ReviewUserImage src={el.profileImageUrl} />
                                  <ReviewUserName>{el.petname}</ReviewUserName>
                                </ReviewUserBox>
                                <ReviewTextBox>
                                  <ReviewText>
                                    {el.content}
                                    {/* 본인 글에만 수정, 삭제 버튼 뜨도록 */}
                                    {el.petId === petId ? (
                                      <EditDelButtons>
                                        <button onClick={() => reviewActivateHandler(el.commentId)}>
                                          <Icon icon='mdi:pencil' style={{ fontSize: '15px' }} />
                                        </button>
                                        <button onClick={() => reviewDeleteHandler(el.commentId)}>
                                          <Icon
                                            icon='material-symbols:delete-outline-rounded'
                                            style={{ fontSize: '15px' }}
                                          />
                                        </button>
                                      </EditDelButtons>
                                    ) : (
                                      ''
                                    )}
                                  </ReviewText>
                                  <ReviewDate>{el.createdAt}</ReviewDate>
                                </ReviewTextBox>
                              </ReviewWrite>
                            ) : (
                              <ReviewWrite>
                                <ReviewUserBox>
                                  <ReviewUserImage src={el.profileImageUrl} />
                                  <ReviewUserName>{el.petName}</ReviewUserName>
                                </ReviewUserBox>
                                <ReviewInputTextBox>
                                  <ReviewInputBox>
                                    <ReviewInput
                                      type='text'
                                      placeholder={el.contents}
                                      onChange={editReviewHandler}
                                      id='basereview'
                                    ></ReviewInput>
                                  </ReviewInputBox>
                                  <ReviewButton onClick={() => reviewUpdateHandler(el.commentId)}>
                                    <Icon
                                      icon='mdi:check-bold'
                                      color='#ffc57e'
                                      style={{ fontSize: '20px' }}
                                    />
                                  </ReviewButton>
                                  <ReviewEditCancelButton onClick={reviewEditCancelHandler}>
                                    <Icon
                                      icon='mdi:cancel-bold'
                                      color='#f79483'
                                      style={{ fontSize: '22px' }}
                                    />
                                  </ReviewEditCancelButton>
                                </ReviewInputTextBox>
                              </ReviewWrite>
                            )}
                          </Review>
                        );
                      })
                    )}
                  </Reviews>
                )}
                <ReviewWrite>
                  <ReviewUserBox>
                    <ReviewUserImage src={userData.petInfo.profileImage} />
                    <ReviewUserName>{userData.petInfo.petName}</ReviewUserName>
                  </ReviewUserBox>
                  <ReviewInputTextBox>
                    <ReviewInputBox>
                      <ReviewInput
                        type='text'
                        placeholder='이 공간이 어땠나요?'
                        onChange={reviewHandler}
                      />
                    </ReviewInputBox>
                    <ReviewButton onClick={reviewPostHandler}>작성</ReviewButton>
                  </ReviewInputTextBox>
                </ReviewWrite>
              </ReviewBox>
            </ReviewContainer>
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
  color: #969696;
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

const ReviewContainer = styled.div``;

const ReviewBox = styled.div`
  margin-top: 10px;
  background-color: white;
`;
const Reviews = styled.div`
  height: calc(
    100vh - 537px - 50px - 100px
  ); // 100vh - 위의 콘텐츠 높이 - 헤더 높이 - 리뷰 작성 박스 높이
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background-color: #dccdc8;
    border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #a9908d;
    border-radius: 100px;
  }
`;

const Review = styled.div`
  width: 100%;
  min-height: 90px;
  display: flex;
`;

const ReviewTitle = styled.div`
  color: ${brown};
  font-size: 20px;
  font-weight: 800;
  padding: 15px 10px;
`;

const ReviewUserBox = styled.div`
  width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ReviewUserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-size: cover;
`;

const ReviewUserName = styled.div`
  margin-top: 8px;
  color: ${brown};
  font-size: 14px;
  font-weight: Bold;
`;

const ReviewTextBox = styled.div`
  padding: 20px 15px 20px 10px;
  width: calc(100% - 70px);
  min-height: 80px;
`;

const ReviewText = styled.div`
  width: 100%;
  height: 100%;
  color: ${brown};
  font-size: 14px;
  font-weight: 500;

  display: flex;
  justify-content: space-between;
`;

const ReviewDate = styled.div`
  text-align: end;
  color: ${lightgrey};
  font-size: 11px;
  margin-right: 7px;
`;

const ReviewInputBox = styled.div`
  flex-grow: 1;
  color: ${brown};
  font-size: 14px;
  font-weight: 500;
`;

type Props = {
  type: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ReviewInput = styled.input<Props>`
  padding: 10px;
  width: 100%;
  height: 50px;
  font-size: 14px;
  color: ${brown};
  border: 1px solid ${bordergrey};
  border-radius: 15px;
  resize: none;

  &:focus {
    outline: 1px solid ${bordergrey};
  }
  &::placeholder {
    color: ${lightgrey};
  }
`;
const ReviewButton = styled.button`
  margin-left: 4px;
  margin-right: 4px;
  padding: 7px 10px;
  font-weight: bold;
  background: ${brown};
  border-radius: 12px;
  border: 0;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${darkbrown};
  }
`;
const ReviewInputTextBox = styled.div`
  padding: 10px;
  width: calc(100% - 70px);
  display: flex;
  align-items: center;
`;

const CloseBox = styled.div`
  position: fixed;
  z-index: 999;
  top: 48%;
  left: 357px;
  bottom: 0;
  right: 0;
  opacity: 0.8;
  .close {
    cursor: pointer;
  }
`;

const ReviewWrite = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  background-color: white;
  border-bottom: 1px solid ${bordergrey};
`;

const EmptyMessage = styled.div`
  margin-top: 35px;
  text-align: center;
  font-size: 14px;
  color: ${brown};
`;

const EditDelButtons = styled.div`
  display: flex;
  flex-direction: column;

  button {
    padding: 5px;
    border: transparent;
    border-radius: 5px;
    color: ${lightgrey};
    background: none;
    cursor: pointer;
    line-height: 0px;

    &:hover {
      color: ${yellow};
      background-color: ${ivory};
    }
  }
`;

const ReviewEditCancelButton = styled.button`
  padding: 7px 10px;
  /* margin: 4px; */
  font-weight: bold;
  background: ${ivory};
  border-radius: 12px;
  border: 1px solid ${bordergrey};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${darkbrown};
  }
`;
