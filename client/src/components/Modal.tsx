import React from 'react';
import {
  MarkerIcon,
  TimeIcon,
  PhoneIcon,
  HomeIcon,
  ModalBookmarkIcon,
  ModalSample,
} from '../img/modal';
import color from '../color';
import styled from 'styled-components';

const { ivory, lightgrey, brown } = color;
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
  height: 600px;
  border: 1px solid black;
`;
const ModalReview = styled.div``;

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
          <ModalReview></ModalReview>
        </ModalReviewBox>
      </div>
    </Container>
  );
};

export default Modal;
