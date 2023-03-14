import { Icon } from '@iconify/react';
import styled from 'styled-components';

const CafeMarker = () => {
  return (
    <IconBox className='pos'>
      <Icon icon='ph:coffee-fill' color='#7d5a5a' style={{ fontSize: '23px' }} />
    </IconBox>
  );
};

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3px;
`;

export default CafeMarker;
