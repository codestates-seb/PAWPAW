import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import color from '../util/color';
import { mapReviewUPDATE, mapReviewDELETE } from '../util/MapApi';
import { IReview } from './Modal';

const { ivory, lightgrey, brown, darkbrown, bordergrey, yellow } = color;
const petId = Number(localStorage.getItem('petId') as string);

type MProps = {
  review: IReview;
  editActivate: number;
  setEditActivate(state: number): void;
  reviewActivateHandler(commentId: number): void;
  getData(): void;
};

const ModalReview = ({
  review,
  editActivate,
  setEditActivate,
  reviewActivateHandler,
  getData,
}: MProps) => {
  const [newText, setNewText] = useState<string>('');

  const reviewUpdateHandler = (commentId: number) => {
    if (newText === '') {
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
            padding: '20px 0px 40px 0px',
            showConfirmButton: false,
            timer: 1000,
          });
          mapReviewUPDATE(commentId, newText).then(() => getData());
          setEditActivate(0);
        }
      });
      setNewText('');
    }
  };

  const newTextHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewText((e.target as HTMLInputElement).value);
  };

  const reviewEditCancelHandler = () => {
    setEditActivate(0);
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
          padding: '20px 0px 40px 0px',
          showConfirmButton: false,
          timer: 1000,
        });
        mapReviewDELETE(commentId).then(() => getData());
      }
    });
  };

  return (
    <Container key={review.commentId}>
      {review.commentId !== editActivate ? (
        <ReviewWrite>
          <ReviewUserBox>
            <ReviewUserImage src={review.profileImage} />
            <ReviewUserName>{review.petName}</ReviewUserName>
          </ReviewUserBox>
          <ReviewTextBox>
            <ReviewText>
              {review.contents}
              {review.petId === Number(petId) ? (
                <EditDelButtons>
                  <button onClick={() => reviewActivateHandler(review.commentId)}>
                    <Icon icon='mdi:pencil' style={{ fontSize: '15px' }} />
                  </button>
                  <button onClick={() => reviewDeleteHandler(review.commentId)}>
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
            <ReviewDate>{review.createdAt}</ReviewDate>
          </ReviewTextBox>
        </ReviewWrite>
      ) : (
        <ReviewWrite>
          <ReviewUserBox>
            <ReviewUserImage src={review.profileImage} />
            <ReviewUserName>{review.petName}</ReviewUserName>
          </ReviewUserBox>
          <ReviewInputTextBox>
            <ReviewInputBox>
              <ReviewInput
                type='text'
                placeholder={review.contents}
                onChange={newTextHandler}
                id='basereview'
              ></ReviewInput>
            </ReviewInputBox>
            <ReviewButton onClick={() => reviewUpdateHandler(review.commentId)}>
              <Icon icon='mdi:check-bold' color='#ffc57e' style={{ fontSize: '20px' }} />
            </ReviewButton>
            <ReviewEditCancelButton onClick={reviewEditCancelHandler}>
              <Icon icon='mdi:cancel-bold' color='#f79483' style={{ fontSize: '22px' }} />
            </ReviewEditCancelButton>
          </ReviewInputTextBox>
        </ReviewWrite>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 350px;
  background-color: white;
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

export default ModalReview;
