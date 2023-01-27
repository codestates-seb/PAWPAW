import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import axios from 'axios';
import Swal from 'sweetalert2';

import Header from '../Components/Header';
import Nav from '../Components/Nav';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Input from '../Components/Input';
import AddressModal from './AddressModal';
import { codeToAddress } from '../util/ConvertAddress';
import color from '../color';
import NoAuth from '../Components/NoAuth';

const { red, ivory, darkgrey, lightgrey, brown, darkbrown, yellow, bordergrey } = color;

const jwtToken = localStorage.getItem('Authorization');
const refreshToken = localStorage.getItem('Refresh');
const isAdmin = localStorage.getItem('Admin');

const headers = {
  'Content-Type': 'multipart/form-data',
  Authorization: jwtToken,
  Refresh: refreshToken,
};

interface IPos {
  lat: number;
  lng: number;
}

interface FormData {
  placeImage: Blob | null;
}

interface Info {
  name: string;
  code: number;
  category: string;
  homepage: string;
  mapAddress: string;
  latitude: number;
  longitude: number;
  operationTime: string;
  tel: string;
}

const AddMarker = () => {
  const TagEngArr = ['PARK', 'CAFE', 'RESTAURANT', 'CAMPING', 'POOL', 'HOSPITAL'];
  const TagArr = ['공원', '카페', '음식점', '캠핑', '수영장', '병원'];
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(-1);
  const [click, setClick] = useState(false);
  const [position, setPosition] = useState<IPos>();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({ placeImage: null });
  const [fileImage, setFileImage] = useState<string>();
  const [address, setAddress] = useState<number | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const homepageRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const mapaddressRef = useRef<HTMLInputElement>(null);
  const operationtimeRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);

  const [info, setInfo] = useState<Info>({
    name: '',
    code: 0,
    category: '',
    homepage: '',
    mapAddress: '',
    latitude: 0,
    longitude: 0,
    operationTime: '',
    tel: '',
  });

  const [addrErrorMessage, setAddrErrorMessage] = useState<string>('');
  const addrRef = useRef<HTMLInputElement>(null);
  const backgroundRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const openAddressModal = () => {
    setIsOpen(!isOpen);
  };

  const selectMenuHandler = (index: number) => {
    console.log(index);
    setCurrentTab(index);
    setClick(true);
    setInfo({ ...info, category: TagEngArr[index] });
    console.log('tag', TagEngArr[index]);
  };

  // 배경 클릭시 모달이 닫힌다.
  window.addEventListener('click', (e) => {
    if (e.target === backgroundRef.current) {
      setIsOpen(false);
    }
  });

  const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setFileImage(URL.createObjectURL(event.target.files[0]));
    const { name, files } = event.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    }
    console.log('formData', formData);
    console.log('formData.profileImage', formData.placeImage);
  };

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInfo({ ...info, name: e.target.value });
    console.log((e.target as HTMLInputElement).value);
  };
  const categoryHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInfo({ ...info, category: TagArr[currentTab] });
    console.log('tag', TagArr[currentTab]);
  };
  const homepageHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInfo({ ...info, homepage: e.target.value });
    console.log((e.target as HTMLInputElement).value);
  };
  const mapaddressHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInfo({ ...info, mapAddress: e.target.value });
    console.log((e.target as HTMLInputElement).value);
  };
  const operationtimeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInfo({ ...info, operationTime: e.target.value });
    console.log((e.target as HTMLInputElement).value);
  };
  const telHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInfo({ ...info, tel: e.target.value });
    console.log((e.target as HTMLInputElement).value);
  };

  const submitHandler = async () => {
    if (position && address) {
      setInfo({ ...info, latitude: position.lat, longitude: position.lng, code: address });
    }
    if (info.code !== 0 && address) {
      const data = new FormData();
      data.append('name', info.name);
      data.append('code', address.toString());
      data.append('category', info.category);
      data.append('homepage', info.homepage);
      data.append('mapAddress', info.mapAddress);
      data.append('latitude', info.latitude.toString());
      data.append('longitude', info.longitude.toString());
      data.append('operationTime', info.operationTime);
      data.append('tel', info.tel);

      if (formData.placeImage) {
        data.append('file', formData.placeImage);
      }

      console.log('info', info);

      for (const key of data.keys()) {
        console.log('key', key);
      }
      for (const value of data.values()) {
        console.log('value', value);
      }

      axios
        .post(`${process.env.REACT_APP_API_ROOT}/maps`, data, { headers })
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: '등록이 완료되었습니다.',
            confirmButtonText: '<b>확인</b>',
            color: brown,
            confirmButtonColor: yellow,
            padding: '40px 0px 30px 0px',
          });
          navigate('/community');
        })
        .catch((err) => {
          console.error('Error', err);
          alert(err);
        });
    }
  };

  const type = 'addplace';
  return (
    <WholeFlex>
      <Header />
      <Body>
        <Nav type={type} />
        <Container>
          {isAdmin ? (
            <>
              <TitleBox>
                <TitleTopBox>
                  <div>장소 이름</div>
                </TitleTopBox>
                <TitleBottomBox>
                  <TitleInputBox>
                    <input
                      type='text'
                      onChange={nameHandler}
                      placeholder='장소 이름을 작성해주세요.'
                      ref={nameRef}
                    ></input>
                  </TitleInputBox>
                </TitleBottomBox>
              </TitleBox>
              <PositionBox>
                <TitleTopBox>
                  <div>장소 위치</div>
                </TitleTopBox>
                <PosInfoBox>원하시는 장소를 선택해주세요.</PosInfoBox>
                {/* 지도 넣기 */}
                <Map
                  center={{
                    lat: 37.51239516092327,
                    lng: 126.98081682888493,
                  }}
                  style={{
                    width: '90%',
                    height: '500px',
                  }}
                  level={7} // 지도의 확대 레벨
                  onClick={(_t, mouseEvent) =>
                    setPosition({
                      lat: mouseEvent.latLng.getLat(),
                      lng: mouseEvent.latLng.getLng(),
                    })
                  }
                >
                  {position && <MapMarker position={position} />}
                </Map>
              </PositionBox>
              <PosSelectBox>
                <Title>지역</Title>
                <InputDiv>
                  <Input
                    type='text'
                    readOnly={true}
                    placeholder={
                      address === null ? '어디에 위치해있나요?' : `${codeToAddress(address)}`
                    }
                    openAddressModal={openAddressModal}
                    ref={addrRef}
                  />
                  <SvgSpan onClick={openAddressModal}>
                    <Icon icon='ic:baseline-search' color='#7d5a5a' style={{ fontSize: '23px' }} />
                  </SvgSpan>
                  <MessageDiv>{addrErrorMessage}</MessageDiv>
                </InputDiv>
                {isOpen && (
                  <AddressModal address={address} setAddress={setAddress} setIsOpen={setIsOpen} />
                )}
              </PosSelectBox>
              <Flex>
                <TagBox>
                  <Title>카테고리 (태그)</Title>
                  {TagArr.map((el, idx) => {
                    return (
                      <Tag
                        key={idx}
                        className={`${currentTab === idx ? 'focused' : ''} 
                      ${click ? '' : 'hide'} ${idx !== 5 ? '' : 'bord'}
                      ${idx === 0 ? 'radius-left' : ''} 
                      ${idx === 5 ? 'radius-right' : ''}
                      `}
                        onClick={() => {
                          selectMenuHandler(idx);
                          categoryHandler;
                        }}
                        ref={categoryRef}
                      >
                        {el}
                      </Tag>
                    );
                  })}
                </TagBox>
              </Flex>
              <Flex>
                <HomepageBox>
                  <Title>홈페이지 주소</Title>
                  <InputData
                    onChange={homepageHandler}
                    ref={homepageRef}
                    placeholder='ex. http://www.pawpaw.com'
                  />
                </HomepageBox>
              </Flex>
              <Flex>
                <ImageBox>
                  <Title>이미지</Title>
                  <form>
                    <label className='input-file-button' htmlFor='input-file'></label>
                    <input
                      type='file'
                      id='input-file'
                      name='placeImage'
                      className='ImgUpload'
                      onChange={saveFileImage}
                      ref={fileRef}
                    ></input>
                  </form>
                </ImageBox>
              </Flex>
              <Flex>
                <DetailAddrBox>
                  <Title>주소</Title>
                  <InputData
                    placeholder='ex. ○○시 ○○구 ○○○길 '
                    onChange={mapaddressHandler}
                    ref={mapaddressRef}
                  ></InputData>
                </DetailAddrBox>
              </Flex>
              <Flex>
                <TimeBox>
                  <Title>영업 시간</Title>
                  <InputData
                    placeholder='ex. 0900-2200'
                    onChange={operationtimeHandler}
                    ref={operationtimeRef}
                  ></InputData>
                </TimeBox>
              </Flex>
              <Flex>
                <NumberBox>
                  <Title>전화번호</Title>
                  <InputData
                    placeholder='ex. 02-0000-0000'
                    onChange={telHandler}
                    ref={telRef}
                  ></InputData>
                </NumberBox>
              </Flex>

              <BottomBox>
                <CancelBtn>취소</CancelBtn>
                <EnrollBtn onClick={submitHandler}>등록</EnrollBtn>
              </BottomBox>
            </>
          ) : (
            <NoAuth />
          )}
        </Container>
      </Body>
    </WholeFlex>
  );
};

const WholeFlex = styled.div`
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

const Container = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px 90px;

  input {
    height: 40px;
  }
`;

const TitleBox = styled.div``;

const TitleTopBox = styled.div`
  margin-bottom: 20px;
  color: ${brown};
  font-weight: 800;
  font-size: 25px;
`;

const TitleBottomBox = styled.div`
  input {
    width: 90%;
    padding-left: 11px;
    border: 1px solid ${bordergrey};
    border-radius: 5px;
    color: ${brown};
    font-weight: 500;
    font-size: 15px;

    &::placeholder {
      color: ${lightgrey};
    }
  }
`;

const TitleInputBox = styled.div``;

const PositionBox = styled.div`
  margin-top: 40px;
`;

const PosInfoBox = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  color: ${darkgrey};
`;

const PosSelectBox = styled.div`
  margin-top: 40px;
  display: flex;
`;

const InputDiv = styled.div`
  position: relative;

  input {
    margin-bottom: 0;
    font-size: 15px;
  }
`;

const SvgSpan = styled.span`
  position: absolute;
  top: 10px;
  right: 12px;
  cursor: pointer;
`;

const MessageDiv = styled.div`
  width: 102%;
  font-size: 14px;
  font-weight: 500;
  color: ${red};
  position: absolute;
  top: 69%;
  text-align: center;
`;

const Flex = styled.div`
  margin-top: 40px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: ${brown};
  width: 170px;
  display: flex;
  align-items: center;
`;

const InputData = styled.input`
  padding-left: 11px;
  border: 1px solid ${bordergrey};
  border-radius: 5px;
  color: ${brown};
  font-weight: 500;
  font-size: 15px;
  width: 650px;

  &::placeholder {
    color: ${lightgrey};
  }
`;

const TagBox = styled.div`
  display: flex;

  .focused {
    background-color: ${yellow};
    color: ${brown};
  }
  .bord {
    border-right: 1px solid ${bordergrey};
  }
  .radius-left {
    border-radius: 5px 0 0 5px;
  }
  .radius-right {
    border-radius: 0px 5px 5px 0px;
  }
`;

const Tag = styled.div`
  font-size: 15px;
  font-weight: 600;
  padding: 10.4px 14px;
  cursor: pointer;
  color: ${brown};
  background-color: ${ivory};

  border-top: 1px solid ${bordergrey};
  border-left: 1px solid ${bordergrey};
  border-bottom: 1px solid ${bordergrey};

  &:hover {
    background-color: ${yellow};
  }
`;

const HomepageBox = styled.div`
  display: flex;
`;

const ImageBox = styled.div`
  display: flex;

  .input-img-button {
    display: flex;
    align-items: center;
    color: ${brown};
    background-color: ${ivory};
    height: 40px;
    padding: 0 5px 0 5px;
    width: 140px;
    border-radius: 5px;
    border: 1px solid ${bordergrey};
    font-weight: 600;
    cursor: pointer;
  }
`;

const DetailAddrBox = styled.div`
  display: flex;
`;

const TimeBox = styled.div`
  display: flex;
`;

const NumberBox = styled.div`
  display: flex;
`;

const BottomBox = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: row-reverse;
`;

const EnrollBtn = styled.button`
  background-color: ${brown};
  color: white;
  border: none;
  height: 50px;
  margin-right: 20px;
  border-radius: 15px;
  width: 80px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${darkbrown};
  }
`;

const CancelBtn = styled.button`
  background-color: #f8f8f8;
  color: ${red};
  border: none;
  border-radius: 15px;
  height: 50px;
  font-size: 15px;
  font-weight: bold;
  width: 60px;
  cursor: pointer;

  &:hover {
    background-color: #efefef;
  }
`;

export default AddMarker;
