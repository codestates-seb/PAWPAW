import React, { useState } from 'react';
import styled from 'styled-components';
import color from '../color';
import { Map, Polygon } from 'react-kakao-maps-sdk';
import jsonData from '../seoul-geojson.json';
import Button from '../Components/Button';
import { PropTypes } from './UserInfo';

const { yellow, brown, ivory } = color;

const Container = styled.div`
  position: absolute;
  width: 800px;
  height: 571px;
  padding: 25px;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${ivory};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: absolute;
`;

const MapDiv = styled.div`
  border-radius: 10px;
  width: 750px;
  height: 521px;
  overflow: hidden;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 485px;
  right: 35px;
  z-index: 1;
`;

const NameSpan = styled.span<{ top: string; left: string }>`
  position: absolute;
  color: ${brown};
  font-size: 13px;
  font-weight: bold;
  z-index: 1;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  user-select: none;
  cursor: pointer;
`;

const AddressModal = ({ address, setAddress, setIsOpen }: PropTypes) => {
  const [areas, setAreas] = useState(jsonData.features); // 구 25개 배열

  // 마우스 호버시, 선택된 index의 지역의 isMouseover 속성을 true, 나머지 지역은 false로 바꾼다.
  const handleMouseOver = (idx: number) => {
    setAreas((areas) => [
      ...areas
        .filter((_, i) => i !== idx)
        .map((area) => {
          area.isMouseover = false;
          return area;
        }),
      {
        ...areas[idx],
        isMouseover: true,
      },
    ]);
  };

  // 마우스 out시,
  const handleMouseOut = (idx: number) => {
    setAreas((areas) => [
      ...areas.filter((_, i) => i !== idx),
      {
        ...areas[idx],
        isMouseover: false,
      },
    ]);
  };

  // 마우스 클릭시,
  const handleClick = (idx: number, code: number) => {
    setAreas((areas) => [
      ...areas
        .filter((_, i) => i !== idx)
        .map((area) => {
          area.isClicked = false;
          return area;
        }),
      {
        ...areas[idx],
        isClicked: true,
      },
    ]);
    setAddress(code);
  };

  // 선택 완료 버튼 클릭시, 주소가 기본값이 아니라면 제출한다.
  const submitAddress = () => {
    if (address !== 0) {
      setIsOpen(false);
    }
  };

  return (
    <Container>
      <MapDiv>
        <Map
          center={{
            // 지도의 중심좌표
            lat: 37.5591694,
            lng: 126.9882266,
          }}
          style={{ width: '100%', height: '550px' }}
          level={9}
          zoomable={false}
          disableDoubleClickZoom={true}
        >
          {areas.map((gu, idx) => {
            const code = Number(gu.properties.ADM_SECT_C); // 법정동코드
            const coords = gu.geometry.coordinates[0]; // 좌표들
            const path = coords.map((coord) => {
              return { lat: coord[1], lng: coord[0] };
            });

            return (
              <>
                <Polygon
                  key={code}
                  path={path}
                  strokeWeight={3} // 선의 두께
                  strokeColor={yellow} // 선의 색깔
                  strokeOpacity={0.8} // 선의 불투명도
                  strokeStyle={'solid'} // 선의 스타일
                  fillColor={gu.isMouseover || gu.isClicked ? `${yellow}` : 'white'} // 채우기 색깔
                  fillOpacity={0.8} // 채우기 불투명도
                  onMouseover={() => handleMouseOver(idx)}
                  onMouseout={() => handleMouseOut(idx)}
                  onClick={() => handleClick(idx, code)}
                />
              </>
            );
          })}
        </Map>
      </MapDiv>
      <ButtonDiv>
        <Button text='선택 완료' submitAddress={submitAddress} />
      </ButtonDiv>
      <NameSpan top={'101px'} left={'444px'}>
        도봉구
      </NameSpan>
      <NameSpan top={'157px'} left={'417px'}>
        강북구
      </NameSpan>
      <NameSpan top={'220px'} left={'417px'}>
        성북구
      </NameSpan>
      <NameSpan top={'250px'} left={'370px'}>
        종로구
      </NameSpan>
      <NameSpan top={'187px'} left={'300px'}>
        은평구
      </NameSpan>
      <NameSpan top={'262px'} left={'305px'}>
        서대문구
      </NameSpan>
      <NameSpan top={'290px'} left={'265px'}>
        마포구
      </NameSpan>
      <NameSpan top={'352px'} left={'268px'}>
        영등포구
      </NameSpan>
      <NameSpan top={'400px'} left={'190px'}>
        구로구
      </NameSpan>
      <NameSpan top={'360px'} left={'197px'}>
        양천구
      </NameSpan>
      <NameSpan top={'282px'} left={'150px'}>
        강서구
      </NameSpan>
      <NameSpan top={'387px'} left={'330px'}>
        동작구
      </NameSpan>
      <NameSpan top={'449px'} left={'323px'}>
        관악구
      </NameSpan>
      <NameSpan top={'460px'} left={'260px'}>
        금천구
      </NameSpan>
      <NameSpan top={'340px'} left={'370px'}>
        용산구
      </NameSpan>
      <NameSpan top={'290px'} left={'398px'}>
        중구
      </NameSpan>
      <NameSpan top={'305px'} left={'455px'}>
        성동구
      </NameSpan>
      <NameSpan top={'400px'} left={'475px'}>
        강남구
      </NameSpan>
      <NameSpan top={'434px'} left={'430px'}>
        서초구
      </NameSpan>
      <NameSpan top={'380px'} left={'555px'}>
        송파구
      </NameSpan>
      <NameSpan top={'305px'} left={'600px'}>
        강동구
      </NameSpan>
      <NameSpan top={'312px'} left={'520px'}>
        광진구
      </NameSpan>
      <NameSpan top={'250px'} left={'465px'}>
        동대문구
      </NameSpan>
      <NameSpan top={'225px'} left={'528px'}>
        중랑구
      </NameSpan>
      <NameSpan top={'130px'} left={'500px'}>
        노원구
      </NameSpan>
    </Container>
  );
};

export default AddressModal;
