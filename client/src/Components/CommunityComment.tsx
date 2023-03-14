import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { PostDetail, UserData } from '../Pages/CommunityDetail';
import color from '../util/color';
import { PostReviewEdit } from '../util/PostReviewApi';
import Review, { InputProps } from './Review';

interface CommunityCommentProps {
  getData(): void;
  postId?: string;
  postDetail: PostDetail;
  userData: UserData;
}

const { yellow, brown, bordergrey, lightgrey, darkbrown } = color;

const CommunityComment = ({ getData, postId, postDetail, userData }: CommunityCommentProps) => {
  const [review, setReview] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<number>(0);

  const reviewHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setReview(e.target.value);
  };

  const reviewPostHandler = () => {
    if (review === '') {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        iconHtml: '⚠',
        title: '내용을 입력해주세요. ',
        color: brown,
        padding: '20px 0px 40px 0px',
        confirmButtonColor: yellow,
        confirmButtonText: '<b>확인</b>',
      });
      return;
    } else {
      PostReviewEdit(Number(postId), review).then(() => getData());
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
    }
  };

  return (
    <Container>
      <Title>댓글 {postDetail.comments?.length}</Title>
      {postDetail.comments && (
        <Reviews>
          {postDetail.comments.length === 0 ? (
            <EmptyMessage>
              댓글이 없어요.. <br />첫 번째 댓글을 남겨주세요 🐾
            </EmptyMessage>
          ) : (
            postDetail.comments.map((comment: any) => (
              <Review
                key={comment.commentId}
                comment={comment}
                getData={getData}
                editingCommentId={editingCommentId}
                setEditingCommentId={setEditingCommentId}
              />
            ))
          )}
        </Reviews>
      )}

      <ReviewWrite>
        <LeftBox>
          <ReviewUserImage src={userData.petInfo.profileImage} />
          <ReviewUserName>{userData.petInfo.petName}</ReviewUserName>
        </LeftBox>

        <RightBox>
          <InputBox>
            <Input
              type='text'
              value={review}
              placeholder='댓글을 남겨주세요. '
              onChange={reviewHandler}
            />
          </InputBox>
          <SubmitButton onClick={reviewPostHandler}>작성</SubmitButton>
        </RightBox>
      </ReviewWrite>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 10px;
  background-color: white;
`;

const Reviews = styled.div`
  height: calc(100vh - 537px - 50px - 100px);
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

const Title = styled.div`
  color: ${brown};
  font-size: 20px;
  font-weight: 800;
  padding: 15px 10px;
`;

const LeftBox = styled.div`
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

const InputBox = styled.div`
  flex-grow: 1;
  color: ${brown};
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input<InputProps>`
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
const SubmitButton = styled.button`
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
const RightBox = styled.div`
  padding: 10px;
  width: calc(100% - 70px);
  display: flex;
  align-items: center;
`;

const ReviewWrite = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  background-color: white;
  border-top: 1px solid ${bordergrey};
`;

const EmptyMessage = styled.div`
  margin-top: 35px;
  text-align: center;
  font-size: 14px;
  color: ${brown};
`;

export default CommunityComment;
