import { Icon } from '@iconify/react';
import { useEffect, useMemo, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import Header from '../Components/Header';
import color from '../util/color';
import { addressToCode, codeToAddress } from '../util/ConvertAddress';
import { getAll, getCenter, getFilter, getMyPick } from '../util/MapFilterApi';
import MapFilter from './MapFilter';
import Marker from './Marker';

const { coral, brown } = color;
const code = localStorage.getItem('code') as string;

export interface Data {
  id: number;
  category: string;
  name: string;
  latitude: number;
  longitude: number;
  code: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CurrentLocation {
  lat: number;
  lng: number;
}

const HomeMap = () => {
  const { kakao } = window;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('all');
  const [data, setData] = useState<Data[] | null>(null);

  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>({ lat: 0, lng: 0 });
  const [address, setAddress] = useState<string | undefined>(code);

  const [newLocation, setNewLocation] = useState(currentLocation);
  const [fullAddress, setFullAddress] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState<string | undefined>(undefined);
  const [isLocationChanged, setIsLocationChanged] = useState<boolean>(false);

  useEffect(() => {
    if (address) {
      getCenter(address).then((res) => setCurrentLocation(res));
    }
  }, []);

  useEffect(() => {
    if (address) {
      if (selected === 'all') {
        getAll(address).then((res) => setData(res));
      } else if (selected === 'mypick') {
        getMyPick().then((res) => {
          setData(res);
        });
      } else {
        getFilter(address, selected).then((res) => setData(res));
      }
    }
  }, [selected, address, isModalOpen]);

  if (localStorage.getItem('check') !== '1') {
    localStorage.setItem('check', '1');
    window.location.reload();
  }

  const getAddress = (lat: number, lng: number) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(lat, lng);
    const callback = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        setFullAddress(result[0].address.address_name.split(' '));
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  const dragHandler = (map: any) => {
    setNewAddress(fullAddress[1]);
    setNewLocation({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });

    getAddress(newLocation.lat, newLocation.lng);
  };

  const updateCurrentLocation = () => {
    setCurrentLocation(newLocation);

    if (fullAddress[0] === '서울') {
      setAddress(addressToCode(fullAddress[1]));
      setIsLocationChanged(false);
    } else {
      Swal.fire({
        icon: 'question',
        title: '서비스 지역이 아닙니다.',
        text: '현재 서비스는 서울에서만 제공되고 있어요😢',
        footer: '<a href="/map" className="swal">내 지역으로 돌아가기</a>',

        confirmButtonText: '<b>확인</b>',
        color: brown,
        confirmButtonColor: coral,
        padding: '40px 0px 30px 0px',
      });
    }
  };

  useMemo(() => {
    if (codeToAddress(Number(address)) !== fullAddress[0]) {
      setIsLocationChanged(true);
    } else {
      setIsLocationChanged(false);
    }
  }, [newAddress]);

  if (localStorage.getItem('count') === '1') {
    localStorage.removeItem('count');
    window.location.reload();
  }

  return (
    <Container>
      <Header />
      {address && (
        <>
          <Map
            className='map'
            center={currentLocation}
            style={{ width: '100%', height: '100%' }}
            level={4}
            onDragEnd={(map) => dragHandler(map)}
          >
            {data &&
              data.map((el) => {
                return (
                  <Marker
                    key={el.id}
                    {...el}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                  />
                );
              })}
          </Map>
          <MapFilter selected={selected} setSelected={setSelected} />
          {isLocationChanged && newAddress && (
            <RefreshBtn onClick={updateCurrentLocation}>
              <span>{newAddress}에서 검색하기</span>
              <Icon icon='mi:refresh' color='white' style={{ fontSize: '25px' }} />
            </RefreshBtn>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    position: absolute;
  }

  .map {
    position: absolute;
  }
`;

const RefreshBtn = styled.button`
  border: none;
  border-radius: 30px;
  padding: 17px 38px;
  color: white;
  background-color: ${brown};
  font-weight: bold;
  font-size: 20px;
  position: absolute;
  bottom: 10%;
  left: 40%;
  z-index: 100;
  cursor: pointer;

  display: flex;
  align-items: center;

  span {
    margin-right: 8px;
  }

  &:hover {
    background-color: ${coral};
  }
`;

export default HomeMap;
