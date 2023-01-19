import React, { useState } from 'react';
import ModalSample from '../img/modalSample.svg';
import UserImg1 from '../img/UserImg1.png';
import color from '../color';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { CProps } from '../Map/Marker';
import { mapReviewEdit, mapReviewUPDATE, mapReviewDELETE } from '../util/MapApi';
const { ivory, lightgrey, brown, darkbrown, bordergrey, yellow } = color;
const petId = localStorage.getItem('petId') as string;

const Modal = ({ click, setClick, title }: CProps['clicks']) => {
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [review, setReview] = useState<string>('');
  const [editActivate, setEditActivate] = useState<number>(0);

  const bookmarkeHandler = () => {
    setBookmark(!bookmark);
  };

  const selectHandler = () => {
    setClick(!click);
  };

  const reviewHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setReview((e.target as HTMLInputElement).value);
    console.log((e.target as HTMLInputElement).value);
  };
  // const reviewid = 1;
  const infoMapId = 1;
  // 일단 자리만 만들어 두었습니다.
  const reviewPostHandler = () => {
    mapReviewEdit(infoMapId, review);
    // window.location.reload();
  };
  const reviewUpdateHandler = () => {
    mapReviewUPDATE(infoMapId, review);
    // window.location.reload();
  };
  const reviewDeleteHandler = (commentId: number) => {
    mapReviewDELETE(commentId);
  };
  const reviewActivateHandler = (commentId: number) => {
    setEditActivate(commentId);
    console.log(editActivate);
  };
  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <FlexBox>
        <InfoDiv>
          {/* 사진 */}
          <Image src={ModalSample} />

          {/* 이름 */}
          <InfoTitleBox>
            <InfoTitle>{title}</InfoTitle>
            <InfoSubTitle>공원</InfoSubTitle>
            <BookmarkButton onClick={bookmarkeHandler}>
              {bookmark === false ? (
                <Icon icon='ic:round-star-outline' color={brown} style={{ fontSize: '30px' }} />
              ) : (
                <Icon icon='ic:round-star' color={yellow} style={{ fontSize: '30px' }} />
              )}
            </BookmarkButton>
          </InfoTitleBox>

          {/* 정보 */}
          <InfoContentBox>
            <Icon icon='mdi:map-marker' color={brown} style={{ fontSize: '30px' }} />
            <InfoContent>서울 종로구 숭인동 58-149</InfoContent>
          </InfoContentBox>
          <InfoContentBox>
            <Icon icon='ic:round-access-time-filled' color={brown} style={{ fontSize: '30px' }} />
            <InfoContent>이용 시간을 알려주세요.</InfoContent>
          </InfoContentBox>
          <InfoContentBox>
            <Icon icon='material-symbols:call' color={brown} style={{ fontSize: '30px' }} />
            <InfoContent>02-0000-0000</InfoContent>
          </InfoContentBox>
          <InfoContentBox>
            <Icon icon='material-symbols:home' color={brown} style={{ fontSize: '30px' }} />
            <InfoAnchor>https://seoulpark.com</InfoAnchor>
          </InfoContentBox>
        </InfoDiv>
        {/* 리뷰 */}
        <ReviewBox>
          <ReviewTitle>리뷰</ReviewTitle>
          <Reviews>
            {dummydata.length !== 0 ? (
              dummydata.map((el: any, idx: number) => {
                return (
                  <Review key={idx}>
                    {el.commentId !== editActivate ? (
                      <ReviewWrite>
                        <ReviewUserBox>
                          <ReviewUserImage src={UserImg1} />
                          <ReviewUserName>{el.username}</ReviewUserName>
                        </ReviewUserBox>
                        <ReviewTextBox>
                          <ReviewText>{el.content}</ReviewText>
                          <ReviewDate>{el.date}</ReviewDate>
                        </ReviewTextBox>
                        {/* 본인 글에만 수정, 삭제 버튼 뜨도록 */}
                        {el.petId !== petId ? (
                          <div>
                            <button onClick={() => reviewDeleteHandler(el.commentId)}>
                              delete
                            </button>
                            <button onClick={() => reviewActivateHandler(el.commentId)}>
                              edit
                            </button>
                          </div>
                        ) : (
                          <div>good</div>
                        )}
                      </ReviewWrite>
                    ) : (
                      <ReviewWrite>
                        <ReviewUserBox>
                          <ReviewUserImage src={UserImg1} />
                          <ReviewUserName>{el.username}</ReviewUserName>
                        </ReviewUserBox>
                        <ReviewInputTextBox>
                          <ReviewInputBox>
                            <ReviewInput
                              type='text'
                              placeholder={el.content}
                              onChange={reviewHandler}
                            />
                          </ReviewInputBox>
                          <ReviewButton onClick={reviewPostHandler}>작성</ReviewButton>
                        </ReviewInputTextBox>
                      </ReviewWrite>
                    )}
                  </Review>
                );
              })
            ) : (
              <EmptyMessage>
                리뷰가 없어요.. <br />첫 번째 리뷰를 남겨주세요 🐾
              </EmptyMessage>
            )}
          </Reviews>
        </ReviewBox>
        {/* 리뷰 작성 */}
        <ReviewWrite>
          <ReviewUserBox>
            <ReviewUserImage src={UserImg1} />
            <ReviewUserName>유저 이름</ReviewUserName>
          </ReviewUserBox>
          <ReviewInputTextBox>
            <ReviewInputBox>
              <ReviewInput type='text' placeholder='이 공간이 어땠나요?' onChange={reviewHandler} />
            </ReviewInputBox>
            <ReviewButton onClick={reviewPostHandler}>작성</ReviewButton>
          </ReviewInputTextBox>
        </ReviewWrite>
        {/* 닫기 버튼 */}
        <CloseBox onClick={selectHandler}>
          <Icon
            className='close'
            icon='material-symbols:arrow-back-ios-rounded'
            color='#FFF8F0'
            style={{ fontSize: '45px' }}
          />
        </CloseBox>
      </FlexBox>
    </Container>
  );
};

const Container = styled.div`
  width: 350px;
  height: 100vh;
  position: relative;
  z-index: 100;
  box-shadow: rgba(149, 157, 165, 0.8) 14px 0px 14px -14px;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoDiv = styled.div`
  width: 100%;
  background: ${ivory};
  border-bottom: 1px solid ${bordergrey};
`;

const Image = styled.img`
  width: 100%;
  height: 226px;
  background-size: cover;
`;

const InfoTitleBox = styled.div`
  padding: 14px 0px 14px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoTitle = styled.div`
  color: ${brown};
  font-size: 18px;
  font-weight: Bold;
  margin-right: 10px;
`;

const InfoSubTitle = styled.div`
  font-size: 14px;
  margin-right: 10px;
  color: ${lightgrey};
`;

const BookmarkButton = styled.button`
  all: unset;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 3px;
  cursor: pointer;
`;
const InfoContentBox = styled.div`
  display: flex;
  padding: 11px 15px 11px 18px;

  &:last-child {
    margin-bottom: 3px;
  }
`;
const InfoContent = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${brown};
  margin-left: 13px;
  display: flex;
  align-items: center;
`;

const InfoAnchor = styled.a`
  font-size: 14px;
  font-weight: 500;
  color: #5b8a72;
  margin-left: 13px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: #357a57;
  }
`;

const ReviewBox = styled.div`
  background-color: white;
`;
const Reviews = styled.div`
  height: calc(
    100vh - 537px - 50px - 100px
  ); // 100vh - 위의 콘텐츠 높이 - 헤더 높이 - 리뷰 작성 박스 높이
  overflow-y: scroll;
`;

const Review = styled.div`
  width: 100%;
  min-height: 90px;
  display: flex;
`;

const ReviewTitle = styled.div`
  color: ${brown};
  font-weight: 900;
  padding: 15px 19px;
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
`;

const ReviewDate = styled.div`
  text-align: end;
  color: ${lightgrey};
  font-size: 11px;
  margin-right: 10px;
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
  margin-left: 8px;
  padding: 7px 10px;
  font-size: 14px;
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
  /* border-top: 1px solid ${bordergrey}; */
`;

const EmptyMessage = styled.div`
  margin-top: 35px;
  text-align: center;
  font-size: 14px;
  color: ${brown};
`;

const dummydata: any = [
  {
    username: '까미',
    content: '즐거워요',
    date: '2023-01-10',
    commentId: 1,
  },
  {
    username: '콩이',
    content: '강아지들이 많아요!',
    date: '2023-01-10',
    commentId: 2,
  },
  {
    username: '까미',
    content: '즐거워요',
    date: '2023-01-10',
    commentId: 3,
  },
  {
    username: '콩이',
    content: '강아지들이 많아요!',
    date: '2023-01-10',
    commentId: 4,
  },
  {
    username: '까미',
    content: '즐거워요',
    date: '2023-01-10',
    commentId: 5,
  },
  {
    username: '콩이',
    content: '강아지들이 많아요!',
    date: '2023-01-10',
    commentId: 6,
  },
];

export default Modal;
