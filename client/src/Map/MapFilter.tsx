import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import color from '../color';

const { ivory } = color;

const MapFilter = () => {
  return (
    <Container>
      <div className='absolute'>
        <div className='flex'>
          <FilterBox>
            <IconBox>
              <Icon
                icon='material-symbols:park-rounded'
                style={{ fontSize: '25px' }}
                color='#5b8a72'
              />
            </IconBox>
            <Text className='park'>공원</Text>
          </FilterBox>
          <FilterBox>
            <IconBox>
              <Icon icon='ph:coffee-fill' color='#7d5a5a' style={{ fontSize: '23px' }} />
            </IconBox>
            <Text className='cafe'>카페</Text>
          </FilterBox>
          <FilterBox>
            <IconBox>
              <Icon icon='fluent:food-24-filled' color='#fea572' style={{ fontSize: '23px' }} />
            </IconBox>
            <Text className='food'>음식점</Text>
          </FilterBox>
          <FilterBox>
            <IconBox>
              <Icon icon='material-symbols:camping' color='#93c246' style={{ fontSize: '23px' }} />
            </IconBox>
            <Text className='camp'>캠핑</Text>
          </FilterBox>
          <FilterBox>
            <IconBox>
              <Icon icon='mdi:pool' color='#6cb2f2' style={{ fontSize: '26px' }} />
            </IconBox>
            <Text className='pool'>수영장</Text>
          </FilterBox>
          <FilterBox>
            <IconBox>
              <Icon
                icon='ic:baseline-local-hospital'
                color='#ff6c6c'
                style={{ fontSize: '23px' }}
              />
            </IconBox>
            <Text className='hospital'>병원</Text>
          </FilterBox>
          <FilterBox>
            <IconBox>
              <Icon
                className='star'
                icon='material-symbols:star-rounded'
                color='#fcb838'
                style={{ fontSize: '27px' }}
              />
            </IconBox>
            <Text className='my'>나의 장소</Text>
          </FilterBox>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 600px;
  height: 800px;
  background-color: gray;

  .absolute {
    margin: 10px 10px 10px 10px;
    position: absolute;
  }
  .flex {
    display: flex;
    background-color: ${ivory};
    border-radius: 7px;
    padding: 4px;
  }

  .park {
    width: 40px;
  }
  .cafe {
    width: 40px;
  }
  .food {
    width: 50px;
  }
  .camp {
    width: 40px;
  }
  .pool {
    width: 50px;
  }
  .hospital {
    width: 40px;
  }
  .my {
    width: 72px;
    margin-right: 5px;
  }
`;

const FilterBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 4px;
`;

const IconBox = styled.div`
  padding: 1px;
  display: flex;
  text-align: center;

  .star {
    margin-top: -3px;
  }
`;

const Text = styled.div`
  text-align: center;
  font-weight: 700;
  padding: 1px;
  font-size: 14px;
`;

export default MapFilter;
