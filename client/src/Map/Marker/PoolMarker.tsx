import { Icon } from '@iconify/react';
import styled from 'styled-components';

const PoolMarker = () => {
  return (
    <IconBox className='pos'>
      <Icon icon='mdi:pool' color='#6cb2f2' style={{ fontSize: '26px' }} />
    </IconBox>
  );
};

const IconBox = styled.div`
  display: flex;
  justify-content: center;
`;

export default PoolMarker;
