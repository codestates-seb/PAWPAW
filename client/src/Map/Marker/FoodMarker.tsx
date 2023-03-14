import { Icon } from '@iconify/react';
import styled from 'styled-components';

const FoodMarker = () => {
  return (
    <IconBox className='pos'>
      <Icon icon='fluent:food-24-filled' color='#fea572' style={{ fontSize: '23px' }} />
    </IconBox>
  );
};

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 1px;
`;

export default FoodMarker;
