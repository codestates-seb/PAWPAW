import React from 'react';
import {
  MarkerIcon,
  TimeIcon,
  PhoneIcon,
  HomeIcon,
  ModalBookmarkIcon,
  ModalSample,
} from '../img/modal';
import UserImg1 from '../img/UserImg1.png';
import color from '../color';
import styled from 'styled-components';

const { ivory, lightgrey, brown, bordergrey } = color;

const Container = styled.div`
  width: 350px;
  height: 955px;
`;
const ModalInfoDiv = styled.div`
  width: 100%;
  background: ${ivory};
`;
const ModalInfoTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
const ModalInfoTitle = styled.div`
  text-align: center;
  font-size: 18px;
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
`;
const ModalInfoContentBox = styled.div`
  display: flex;
  height: 28px;
  margin: 15px 0 15px 0;
`;
const ModalInfoContentBottomBox = styled.div`
  display: flex;
  height: 28px;
  margin-top: 15px;
  border-bottom: 2px solid #bfbfbf;
`;
const ModalInfoContent = styled.div`
  font-size: 11px;
  color: ${brown};
  text-align: center;
  padding: 7px 0 3px 0;
  margin-left: 10px;
`;
const ModalReviewBox = styled.div`
  height: auto;
`;
const ModalReview = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
`;
const ModalReviewTitle = styled.div`
  color: ${brown};
  padding: 5px 0 0 10px;
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
`;
const ModalReviewDate = styled.div`
  text-align: end;
  color: ${lightgrey};
  font-size: 8px;
`;
const ModalReviewInputBox = styled.div`
  width: 223px;
  height: 100%;
  color: ${brown};
  padding-top: 20px;
  font-size: 14px;
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
const Modal: React.FC = () => {
  return (
    <Container>
      <div>
        <img src={ModalSample} />
        <ModalInfoDiv>
          <ModalInfoTitleBox>
            <ModalInfoTitle>맑은 공기 공원</ModalInfoTitle>
            <ModalInfoSubTitle>공원</ModalInfoSubTitle>
            <ModalBookmarkButton>
              <img src={ModalBookmarkIcon} />
            </ModalBookmarkButton>
          </ModalInfoTitleBox>
          <ModalInfoContentBox>
            <img src={MarkerIcon} />
            <ModalInfoContent>서울 종로구 숭인동 58-149</ModalInfoContent>
          </ModalInfoContentBox>
          <ModalInfoContentBox>
            <img src={TimeIcon} />
            <ModalInfoContent>이용 시간을 알려주세요.</ModalInfoContent>
          </ModalInfoContentBox>
          <ModalInfoContentBox>
            <img src={PhoneIcon} />
            <ModalInfoContent>02-0000-0000</ModalInfoContent>
          </ModalInfoContentBox>
          <ModalInfoContentBottomBox>
            <img src={HomeIcon} />
            <ModalInfoContent>https://seoulpark.com</ModalInfoContent>
          </ModalInfoContentBottomBox>
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
          <ModalReview>
            <ModalReviewUserBox>
              <ModalReviewUserImg src={UserImg1}></ModalReviewUserImg>
              <ModalReviewUserName>유저 이름</ModalReviewUserName>
            </ModalReviewUserBox>
            <ModalReviewTextBox>
              <ModalReviewInputBox>
                <ModalReviewInput type='text' placeholder='이 공간이 어땠나요?' />
              </ModalReviewInputBox>
            </ModalReviewTextBox>
          </ModalReview>
        </ModalReviewBox>
      </div>
    </Container>
  );
};

export default Modal;
