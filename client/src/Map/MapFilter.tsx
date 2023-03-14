import { Icon } from '@iconify/react';
import React from 'react';
import styled from 'styled-components';
import color from '../util/color';

const { ivory, yellow } = color;

export interface MapFilterProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const MapFilter = ({ selected, setSelected }: MapFilterProps) => {
  const showFilteredMarkers = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const tag = target.classList[2];

    if (selected === tag) {
      setSelected('all');
    } else {
      setSelected(tag);
    }
  };

  return (
    <Container>
      <div className='absolute'>
        <div className='flex'>
          <FilterBox
            onClick={showFilteredMarkers}
            className={selected === 'park' ? 'park selected' : 'park'}
          >
            <IconBox>
              <Icon
                icon='material-symbols:park-rounded'
                style={{ fontSize: '25px' }}
                color='#5b8a72'
              />
            </IconBox>
            <Text className='park'>공원</Text>
          </FilterBox>
          <FilterBox
            onClick={showFilteredMarkers}
            className={selected === 'cafe' ? 'cafe selected' : 'cafe'}
          >
            <IconBox>
              <Icon icon='ph:coffee-fill' color='#7d5a5a' style={{ fontSize: '23px' }} />
            </IconBox>
            <Text className='cafe'>카페</Text>
          </FilterBox>
          <FilterBox
            onClick={showFilteredMarkers}
            className={selected === 'restaurant' ? 'restaurant selected' : 'restaurant'}
          >
            <IconBox>
              <Icon icon='fluent:food-24-filled' color='#fea572' style={{ fontSize: '23px' }} />
            </IconBox>
            <Text className='restaurant'>음식점</Text>
          </FilterBox>
          <FilterBox
            onClick={showFilteredMarkers}
            className={selected === 'camping' ? 'camping selected' : 'camping'}
          >
            <IconBox>
              <Icon icon='material-symbols:camping' color='#93c246' style={{ fontSize: '23px' }} />
            </IconBox>
            <Text className='camping'>캠핑</Text>
          </FilterBox>
          <FilterBox
            onClick={showFilteredMarkers}
            className={selected === 'pool' ? 'pool selected' : 'pool'}
          >
            <IconBox>
              <Icon icon='mdi:pool' color='#6cb2f2' style={{ fontSize: '26px' }} />
            </IconBox>
            <Text className='pool'>수영장</Text>
          </FilterBox>
          <FilterBox
            onClick={showFilteredMarkers}
            className={selected === 'hospital' ? 'hospital selected' : 'hospital'}
          >
            <IconBox>
              <Icon
                icon='ic:baseline-local-hospital'
                color='#ff6c6c'
                style={{ fontSize: '23px' }}
              />
            </IconBox>
            <Text className='hospital'>병원</Text>
          </FilterBox>
          <FilterBox
            onClick={showFilteredMarkers}
            className={selected === 'mypick' ? 'mypick selected' : 'mypick'}
          >
            <IconBox>
              <Icon
                className='star'
                icon='material-symbols:star-rounded'
                color='#fcb838'
                style={{ fontSize: '27px' }}
              />
            </IconBox>
            <Text className='mypick'>나의 장소</Text>
          </FilterBox>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  z-index: 100;
  top: 70px;
  left: calc(100vw - 605px);

  .absolute {
    position: absolute;
  }
  .flex {
    display: flex;
    background-color: ${ivory};
    border-radius: 7px;
    padding: 4px;
    box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px;
  }
`;

const FilterBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
  cursor: pointer;

  &.selected div {
    color: ${yellow};
  }

  &:hover div {
    color: ${yellow};
  }
`;

const IconBox = styled.div`
  padding: 1px;
  display: flex;
  text-align: center;
  pointer-events: none;

  .star {
    margin-top: -3px;
  }
`;

const Text = styled.div`
  text-align: center;
  font-weight: 700;
  padding: 1px;
  font-size: 14px;

  &.park {
    width: 40px;
  }
  &.cafe {
    width: 40px;
  }
  &.restaurant {
    width: 50px;
  }
  &.camping {
    width: 40px;
  }
  &.pool {
    width: 50px;
  }
  &.hospital {
    width: 40px;
  }
  &.mypick {
    width: 65px;
    margin-right: 5px;
  }
`;

export default MapFilter;
