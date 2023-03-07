import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { Comment } from '../Pages/CommunityDetail';
import Swal from 'sweetalert2';
import color from '../util/color';
import { PostReviewUPDATE, PostReviewDELETE } from '../util/PostReviewApi';
import { Link } from 'react-router-dom';

type RProps = {
  comment: Comment;
  getData(): void;
  editingCommentId: number;
  setEditingCommentId(commentId: number): void;
};

const { ivory, brown, bordergrey, lightgrey, yellow, darkbrown } = color;
const petId = Number(localStorage.getItem('petId') as string);

const Review = ({ comment, getData, editingCommentId, setEditingCommentId }: RProps) => {
  const [newText, setNewText] = useState<string>('');

  const reviewEditHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewText((e.target as HTMLInputElement).value);
  };

  const reviewUpdateHandler = (commentId: number) => {
    if (newText === '') {
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
          PostReviewUPDATE(commentId, newText).then(() => getData());
          setEditingCommentId(0);
          setNewText('');
        }
      });
    }
  };

  const reviewEditCancelHandler = () => {
    setEditingCommentId(0);
    setNewText('');
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
        PostReviewDELETE(commentId).then(() => getData());
      }
    });
  };

  return (
    <Container>
      {comment.commentId !== editingCommentId ? (
        <>
          <UserBox>
            <UserImage src={comment.profileImageUrl} />
            <Link to={`/mypage/${comment.petId}`}>
              <UserName>{comment.petName}</UserName>
            </Link>
          </UserBox>
          <TextBox>
            <Text>
              {comment.content}
              {comment.petId === petId && (
                <EditDelButtons>
                  <button onClick={() => setEditingCommentId(comment.commentId)}>
                    <Icon icon='mdi:pencil' style={{ fontSize: '15px' }} />
                  </button>
                  <button onClick={() => reviewDeleteHandler(comment.commentId)}>
                    <Icon
                      icon='material-symbols:delete-outline-rounded'
                      style={{ fontSize: '15px' }}
                    />
                  </button>
                </EditDelButtons>
              )}
            </Text>
            <Date>{comment.createdAt}</Date>
          </TextBox>
        </>
      ) : (
        <>
          <UserBox>
            <UserImage src={comment.profileImageUrl} />
            <UserName>{comment.petName}</UserName>
          </UserBox>
          <InputTextBox>
            <InputBox>
              <Input
                type='text'
                placeholder={comment.content}
                onChange={reviewEditHandler}
                id='basereview'
              ></Input>
            </InputBox>
            <CheckButton onClick={() => reviewUpdateHandler(comment.commentId)}>
              <Icon icon='mdi:check-bold' color='#ffc57e' style={{ fontSize: '20px' }} />
            </CheckButton>
            <XButton onClick={reviewEditCancelHandler}>
              <Icon icon='mdi:cancel-bold' color='#f79483' style={{ fontSize: '22px' }} />
            </XButton>
          </InputTextBox>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  background-color: white;
  border-top: 1px solid ${bordergrey};
`;

const UserBox = styled.div`
  width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-size: cover;
`;

const UserName = styled.div`
  margin-top: 8px;
  color: ${brown};
  font-size: 14px;
  font-weight: Bold;

  &:hover {
    color: ${darkbrown};
  }
`;

const TextBox = styled.div`
  padding: 20px 15px 20px 10px;
  width: calc(100% - 70px);
  min-height: 110px;
`;

const Text = styled.div`
  width: 100%;
  height: 100%;
  color: ${brown};
  font-size: 14px;
  font-weight: 500;

  display: flex;
  justify-content: space-between;
`;

const Date = styled.div`
  text-align: end;
  color: ${lightgrey};
  font-size: 11px;
  margin-right: 7px;
`;

const InputBox = styled.div`
  flex-grow: 1;
  color: ${brown};
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input<Props>`
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
const CheckButton = styled.button`
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
const InputTextBox = styled.div`
  padding: 20px 15px 20px 10px;
  width: calc(100% - 70px);
  display: flex;
  align-items: center;
  min-height: 110px;
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

const XButton = styled.button`
  padding: 7px 10px;
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

type Props = {
  type: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default Review;
