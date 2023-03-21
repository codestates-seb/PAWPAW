import { Icon } from '@iconify/react';
import styled from 'styled-components';

interface IconsProps {
  category: string;
}

const Icons = ({ category }: IconsProps) => {
  switch (category) {
    case '카페':
      return (
        <IconBox>
          <Icon icon='ph:coffee-fill' color='#7d5a5a' style={{ fontSize: '22px' }} />
        </IconBox>
      );
    case '공원':
      return (
        <IconBox className='park'>
          <Icon icon='material-symbols:park-rounded' style={{ fontSize: '25px' }} color='#5b8a72' />
        </IconBox>
      );
    case '음식점':
      return (
        <IconBox>
          <Icon icon='fluent:food-24-filled' color='#fea572' style={{ fontSize: '23px' }} />
        </IconBox>
      );
    case '수영장':
      return (
        <IconBox>
          <Icon icon='mdi:pool' color='#6cb2f2' style={{ fontSize: '26px' }} />
        </IconBox>
      );
    case '캠핑':
      return (
        <IconBox>
          <Icon icon='material-symbols:camping' color='#93c246' style={{ fontSize: '23px' }} />
        </IconBox>
      );
    case '병원':
      return (
        <IconBox>
          <Icon icon='ic:baseline-local-hospital' color='#ff6c6c' style={{ fontSize: '23px' }} />
        </IconBox>
      );
    case '나의장소':
      return (
        <IconBox>
          <Icon icon='material-symbols:star-rounded' color='#fcb838' style={{ fontSize: '27px' }} />
        </IconBox>
      );
    default:
      return <></>;
  }
};

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -0.5px;
`;

export default Icons;
