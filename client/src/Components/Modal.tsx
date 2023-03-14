import { Icon } from '@iconify/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import color from '../util/color';
import headers from '../util/headers';
import ModalReview from './ModalReview';
import ModalReviewWrite from './ModalReviewWrite';

const { ivory, lightgrey, brown, bordergrey, yellow, mediumgrey } = color;
const url = process.env.REACT_APP_API_ROOT;
const petId = localStorage.getItem('petId') as string;

interface IReqData {
  petId: number;
  infoMapId: number;
}

interface Detail {
  infoUrl: string;
  name: string;
  mapAddress: string;
  category: string;
  operationTime: string;
  tel: string;
  homepage: string;
  myPick: boolean;
}

export interface Review {
  petId: number;
  commentId: number;
  profileImage: string;
  petName: string;
  contents: string;
  createdAt: string;
}

interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface MapData {
  details: Detail;
  reviews: Review[];
  pageInfo: PageInfo;
}

interface ModalProps {
  click: boolean;
  setClick: (classname: boolean) => void;
  title: string;
  id: number;
}

const Modal = ({ click, setClick, id }: ModalProps) => {
  const [editActivate, setEditActivate] = useState<number>(0);
  const [mapdata, setMapdata] = useState<MapData | null>(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await axios
      .get(`${url}/maps/details/${id}`, { headers })
      .then((res) => {
        setMapdata(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const bookmarkHandler = () => {
    const reqData: IReqData = {
      petId: Number(petId),
      infoMapId: id,
    };
    if (!mapdata?.details?.myPick) {
      addPlace(reqData).then(() => getData());
    } else {
      deletePlace(reqData).then(() => getData());
    }
  };

  async function addPlace(reqData: IReqData) {
    await axios.post(`${url}/maps/addplace`, JSON.stringify(reqData), { headers });
  }

  async function deletePlace(reqData: IReqData) {
    await axios.delete(`${url}/maps/cancel`, {
      data: reqData,
      headers,
    });
  }

  const closeBtnHandler = () => {
    setClick(!click);
  };

  const reviewActivateHandler = (commentId: number) => {
    setEditActivate(commentId);
  };

  return (
    <>
      {mapdata?.reviews && (
        <Container onClick={(e) => e.stopPropagation()}>
          {mapdata && (
            <FlexBox>
              <InfoDiv>
                <Image src={mapdata?.details?.infoUrl} />

                <InfoTitleBox>
                  <InfoTitle>{mapdata?.details?.name}</InfoTitle>
                  <InfoSubTitle>{mapdata?.details?.category}</InfoSubTitle>
                  <BookmarkButton onClick={bookmarkHandler}>
                    {mapdata?.details?.myPick ? (
                      <Icon icon='ic:round-star' color={yellow} style={{ fontSize: '30px' }} />
                    ) : (
                      <Icon
                        icon='ic:round-star-outline'
                        color={brown}
                        style={{ fontSize: '30px' }}
                      />
                    )}
                  </BookmarkButton>
                </InfoTitleBox>
                <InfoContentBox>
                  <Icon icon='mdi:map-marker' color={brown} style={{ fontSize: '30px' }} />
                  <InfoContent>{mapdata?.details?.mapAddress}</InfoContent>
                </InfoContentBox>
                <InfoContentBox>
                  <Icon
                    icon='ic:round-access-time-filled'
                    color={brown}
                    style={{ fontSize: '30px' }}
                  />
                  {mapdata?.details?.operationTime === null ? (
                    <NullData>이용시간을 알려주세요.</NullData>
                  ) : (
                    <InfoContent>{mapdata?.details?.operationTime}</InfoContent>
                  )}
                </InfoContentBox>
                <InfoContentBox>
                  <Icon icon='material-symbols:call' color={brown} style={{ fontSize: '30px' }} />
                  {mapdata?.details?.tel === null ? (
                    <NullData>전화번호를 알려주세요.</NullData>
                  ) : (
                    <InfoContent>{mapdata?.details?.tel}</InfoContent>
                  )}
                </InfoContentBox>
                <InfoContentBox>
                  <Icon icon='material-symbols:home' color={brown} style={{ fontSize: '30px' }} />
                  {mapdata?.details?.homepage === null ? (
                    <NullData>홈페이지를 알려주세요.</NullData>
                  ) : (
                    <div className='urlBox'>
                      <Linka href={mapdata?.details?.homepage} target='_blank'>
                        {mapdata?.details?.homepage}
                      </Linka>
                    </div>
                  )}
                </InfoContentBox>
              </InfoDiv>

              <ReviewBox>
                <ReviewTitle>리뷰</ReviewTitle>
                <Reviews>
                  {mapdata.reviews.length === 0 ? (
                    <EmptyMessage>
                      리뷰가 없어요.. <br />첫 번째 리뷰를 남겨주세요 🐾
                    </EmptyMessage>
                  ) : (
                    mapdata.reviews.map((review: Review) => (
                      <ModalReview
                        key={review.commentId}
                        review={review}
                        editActivate={editActivate}
                        setEditActivate={setEditActivate}
                        reviewActivateHandler={reviewActivateHandler}
                        getData={getData}
                      />
                    ))
                  )}
                </Reviews>
              </ReviewBox>

              <ModalReviewWrite getData={getData} id={id} />

              <CloseBox onClick={closeBtnHandler}>
                <Icon
                  className='close'
                  icon='material-symbols:arrow-back-ios-rounded'
                  color='#FFF8F0'
                  style={{ fontSize: '45px' }}
                />
              </CloseBox>
            </FlexBox>
          )}
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  width: 350px;
  height: 100vh;
  position: relative;
  z-index: 100;
  box-shadow: rgba(149, 157, 165, 0.8) 14px 0px 14px -14px;
  background-color: white;
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
  width: 350px;
  height: 226px;
  background-size: cover;
  object-fit: cover;
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

  .urlBox {
    width: 270px;
    display: flex;
    align-items: center;
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

const ReviewBox = styled.div`
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

const ReviewTitle = styled.div`
  color: ${brown};
  font-weight: 900;
  padding: 15px 19px;
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

const EmptyMessage = styled.div`
  margin-top: 35px;
  text-align: center;
  font-size: 14px;
  color: ${brown};
`;

const NullData = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${mediumgrey};
  margin-left: 13px;
  display: flex;
  align-items: center;
`;

const Linka = styled.a`
  font-size: 14px;
  font-weight: bold;
  color: ${yellow};
  margin-left: 13px;
  display: flex;
  align-items: center;
  text-decoration: underline;
  word-break: break-all;
`;

export default Modal;
