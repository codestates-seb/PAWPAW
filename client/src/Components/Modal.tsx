import React, { useState } from 'react';
import ModalSample from '../img/modalSample.svg';
import UserImg1 from '../img/UserImg1.png';
import color from '../color';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { CProps } from '../Map/Marker';

const { ivory, lightgrey, brown, bordergrey, coral } = color;

const Modal = ({ click, setClick, title }: CProps['clicks']) => {
  const [bookmark, setBookmark] = useState<boolean>(false);

  const bookmarkeHandler = () => {
    setBookmark(!bookmark);
  };

  const selectHandler = () => {
    setClick(!click);
  };

  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <FlexBox>
        <div className='flex'>
          <div className='one'>
              <ModalInfoDiv>
                <img className='img' src={ModalSample} />
                <ModalInfoTitleBox>
                  <ModalInfoTitle>{title}</ModalInfoTitle>
                  <ModalInfoSubTitle>공원</ModalInfoSubTitle>
                  <ModalBookmarkButton onClick={bookmarkeHandler}>
                    {bookmark === false ? (
                      <Icon
                        icon='ic:round-star-outline'
                        color={brown}
                        style={{ fontSize: '30px' }}
                      />
                    ) : (
                      <Icon icon='ic:round-star' color={coral} style={{ fontSize: '30px' }} />
                    )}
                  </ModalBookmarkButton>
                </ModalInfoTitleBox>
                <ModalInfoContentBox>
                  <Icon icon='mdi:map-marker' color={brown} style={{ fontSize: '30px' }} />
                  <ModalInfoContent>서울 종로구 숭인동 58-149</ModalInfoContent>
                </ModalInfoContentBox>
                <ModalInfoContentBox>
                  <Icon
                    icon='ic:round-access-time-filled'
                    color={brown}
                    style={{ fontSize: '30px' }}
                  />
                  <ModalInfoContent>이용 시간을 알려주세요.</ModalInfoContent>
                </ModalInfoContentBox>
                <ModalInfoContentBox>
                  <Icon icon='material-symbols:call' color={brown} style={{ fontSize: '30px' }} />
                  <ModalInfoContent>02-0000-0000</ModalInfoContent>
                </ModalInfoContentBox>
                <ModalInfoContentBox>
                  <Icon icon='material-symbols:home' color={brown} style={{ fontSize: '30px' }} />
                  <ModalInfoContent>https://seoulpark.com</ModalInfoContent>
                </ModalInfoContentBox>
              </ModalInfoDiv>
              <ModalReviewBox>
                <ModalReviewTitle>리뷰</ModalReviewTitle>
                <ModalReview>
                  <ModalReviewUserBox>
                    <ModalReviewUserImg src={UserImg1}></ModalReviewUserImg>
                    <ModalReviewUserName>유저 이름</ModalReviewUserName>
                  </ModalReviewUserBox>
                  <ModalReviewTextBox>
                    <ModalReviewText>좋아요!!!!!!!!!!!!!!!!!!!!</ModalReviewText>
                    <ModalReviewDate>2023-01-10</ModalReviewDate>
                  </ModalReviewTextBox>
                </ModalReview>
                <ModalReview>
                  <ModalReviewUserBox>
                    <ModalReviewUserImg src={UserImg1}></ModalReviewUserImg>
                    <ModalReviewUserName>유저 이름</ModalReviewUserName>
                  </ModalReviewUserBox>
                  <ModalReviewTextBox>
                    <ModalReviewText>좋아요!!!!!!!!!!!!!!!!!!!!</ModalReviewText>
                    <ModalReviewDate>2023-01-10</ModalReviewDate>
                  </ModalReviewTextBox>
                </ModalReview>
              </ModalReviewBox>
          </div>
          <ModalReviewWrite>
            <ModalReviewUserBox>
              <ModalReviewUserImg src={UserImg1}></ModalReviewUserImg>
              <ModalReviewUserName>유저 이름</ModalReviewUserName>
            </ModalReviewUserBox>
            <ModalReviewInputTextBox>
              <ModalReviewInputBox>
                <ModalReviewInput type='text' placeholder='이 공간이 어땠나요?' />
              </ModalReviewInputBox>
              <ModalReviewButton>작성</ModalReviewButton>
            </ModalReviewInputTextBox>
          </ModalReviewWrite>
        </div>
        <ModalCloseBox onClick={selectHandler}>
          <Icon
            className='close'
            icon='material-symbols:arrow-back-ios-rounded'
            color='#FFF8F0'
            style={{ fontSize: '45px' }}
          />
        </ModalCloseBox>
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
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
  .img {
    border-bottom: 1px solid ${bordergrey};
  }
  .flex {
    display: flex;
    justify-content: column;
    flex-direction: column;
    height: 100vh;
    background-color: ${ivory};
  }
  .one {
    flex: 1;
  }
`;

const FlexBox = styled.div`
  display: flex;
`;

const ModalInfoDiv = styled.div`
  width: 100%;
  height: 451px;
  background: ${ivory};
  border-bottom: 2px solid #bfbfbf;
`;
const ModalInfoTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
`;
const ModalInfoTitle = styled.div`
  text-align: center;
  color: ${brown};
  font-size: 18px;
  font-weight: Bold;
  margin-right: 10px;
`;
const ModalInfoSubTitle = styled.div`
  text-align: center;
  font-size: 14px;
  margin-right: 10px;
  color: ${lightgrey};
`;
const ModalBookmarkButton = styled.button`
  all: unset;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 3px;
`;
const ModalInfoContentBox = styled.div`
  display: flex;
  height: 28px;
  margin: 15px 0 15px 0;
  padding-left: 15px;
`;
const ModalInfoContent = styled.div`
  font-size: 14px;
  font-weight: Bold;
  color: ${brown};
  text-align: center;
  padding: 7px 0 3px 0;
  margin-left: 10px;
`;
const ModalReviewBox = styled.div`
  background-color: white;
`;
const ModalReview = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  border-bottom: 1px solid ${bordergrey};
  background-color: white;
`;
const ModalReviewTitle = styled.div`
  color: ${brown};
  padding: 10px 0 0 10px;
  font-weight: 900;
`;
const ModalReviewUserBox = styled.div`
  width: 88px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ModalReviewUserImg = styled.img`
  width: 30px;
  height: 30px;
`;
const ModalReviewUserName = styled.div`
  margin-top: 5px;
  color: ${brown};
  font-size: 14px;
  font-weight: Bold;
`;
const ModalReviewTextBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const ModalReviewText = styled.div`
  width: 262px;
  height: 90%;
  color: ${brown};
  padding-top: 15px;
  font-size: 14px;
  font-weight: 500;
`;
const ModalReviewDate = styled.div`
  text-align: end;
  color: ${lightgrey};
  font-size: 11px;
  margin-right: 10px;
  margin-bottom: 5px;
`;
const ModalReviewInputBox = styled.div`
  width: 213px;
  height: 100%;
  color: ${brown};
  padding-top: 20px;
  font-size: 14px;
  font-weight: 500;
  vertical-align: top;
`;
type Props = {
  type: string;
  placeholder: string;
};
const ModalReviewInput = styled.input<Props>`
  width: 100%;
  height: 50px;
  font-size: 14px;
  color: ${brown};
  border: 1px solid ${bordergrey};
  border-radius: 10px;
  &:focus {
    outline: 1px solid ${bordergrey};
  }
  &::placeholder {
    color: ${lightgrey};
  }
`;
const ModalReviewButton = styled.button`
  margin: 50px 0 20px 5px;
  font-size: 8px;
  font-weight: Bold;
  background: ${brown};
  border-radius: 8px;
  border: 0;
  color: white;
  cursor: pointer;
`;
const ModalReviewInputTextBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ModalCloseBox = styled.div`
  position: fixed;
  z-index: 999;
  top: 476px;
  left: 357px;
  bottom: 0;
  right: 0;
  opacity: 0.8;
  .close {
    cursor: pointer;
  }
`;

const ModalReviewWrite = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  background-color: white;
  margin-bottom: 35px;
`;

export default Modal;
