import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import color from '../util/color';
import { Map, Polygon } from 'react-kakao-maps-sdk';
import jsonData from '../util/seoul-geojson.json';
import Button from '../Components/Button';
import { IProps } from './UserInfo';

const AddressModal = ({ address, setAddress, setIsOpen }: IProps) => {
  const [areas, setAreas] = useState(jsonData.features);
  const [clickedCode, setClickedCode] = useState<number | null>(null);

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

  const handleMouseOut = (idx: number) => {
    setAreas((areas) => [
      ...areas.filter((_, i) => i !== idx),
      {
        ...areas[idx],
        isMouseover: false,
      },
    ]);
  };

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
    setClickedCode(code);
  };

  const submitAddress = () => {
    setAddress(clickedCode);

    if (address !== null) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (address !== 0) {
      setAreas((areas) => [
        ...areas
          .filter((area) => Number(area.properties.ADM_SECT_C) === address)
          .map((selectedArea) => {
            selectedArea.isClicked = true;
            return selectedArea;
          }),
        ...areas
          .filter((area) => Number(area.properties.ADM_SECT_C) !== address)
          .map((unselectedArea) => {
            unselectedArea.isClicked = false;
            return unselectedArea;
          }),
      ]);
    }
  }, []);

  return (
    <Container>
      <MapDiv>
        <Map
          center={{
            lat: 37.5591694,
            lng: 126.9882266,
          }}
          style={{ width: '100%', height: '550px' }}
          level={9}
          zoomable={false}
          disableDoubleClickZoom={true}
          draggable={false}
        >
          {areas.map((gu, idx) => {
            const code = Number(gu.properties.ADM_SECT_C);
            const coords = gu.geometry.coordinates[0];
            const path = coords.map((coord) => {
              return { lat: coord[1], lng: coord[0] };
            });

            return (
              <>
                <Polygon
                  key={code}
                  path={path}
                  strokeWeight={3}
                  strokeColor={yellow}
                  strokeOpacity={0.8}
                  strokeStyle={'solid'}
                  fillColor={gu.isMouseover || gu.isClicked ? `${yellow}` : 'white'}
                  fillOpacity={0.8}
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
        <Button text='?????? ??????' onClick={submitAddress} />
      </ButtonDiv>
      <NameSpan top={'101px'} left={'444px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'157px'} left={'417px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'220px'} left={'417px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'250px'} left={'370px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'187px'} left={'300px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'262px'} left={'305px'}>
        ????????????
      </NameSpan>
      <NameSpan top={'290px'} left={'265px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'352px'} left={'268px'}>
        ????????????
      </NameSpan>
      <NameSpan top={'400px'} left={'190px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'360px'} left={'197px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'282px'} left={'153px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'387px'} left={'330px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'449px'} left={'323px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'460px'} left={'260px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'340px'} left={'370px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'290px'} left={'398px'}>
        ??????
      </NameSpan>
      <NameSpan top={'305px'} left={'455px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'400px'} left={'475px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'434px'} left={'430px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'380px'} left={'555px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'305px'} left={'600px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'312px'} left={'520px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'250px'} left={'465px'}>
        ????????????
      </NameSpan>
      <NameSpan top={'225px'} left={'528px'}>
        ?????????
      </NameSpan>
      <NameSpan top={'130px'} left={'500px'}>
        ?????????
      </NameSpan>
    </Container>
  );
};

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
  pointer-events: none;
`;

export default AddressModal;
