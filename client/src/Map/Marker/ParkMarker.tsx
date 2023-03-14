import { Icon } from '@iconify/react';
import styled from 'styled-components';

const ParkMarker = () => {
  return (
    <IconBox>
      <Icon
        className='pos'
        icon='material-symbols:park-rounded'
        style={{ fontSize: '25px' }}
        color='#5b8a72'
      />
    </IconBox>
  );
};

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2px;
`;

export default ParkMarker;
