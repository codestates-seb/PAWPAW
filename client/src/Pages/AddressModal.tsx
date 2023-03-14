import { useEffect, useState } from 'react';
import { Map, Polygon } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import Button from '../Components/Button';
import color from '../util/color';
import jsonData from '../util/seoul-geojson.json';
import { AddressModalProps } from '../types';

const { yellow, brown, ivory } = color;

const AddressModal = ({ address, setAddress, setIsOpen }: AddressModalProps) => {
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
        <Button text='선택 완료' onClick={submitAddress} />
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
      <NameSpan top={'282px'} left={'153px'}>
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
