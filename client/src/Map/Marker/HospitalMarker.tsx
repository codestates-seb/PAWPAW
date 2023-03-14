import { Icon } from '@iconify/react';
import styled from 'styled-components';

const HospitalMarker = () => {
  return (
    <IconBox className='pos'>
      <Icon icon='ic:baseline-local-hospital' color='#ff6c6c' style={{ fontSize: '23px' }} />
    </IconBox>
  );
};

const IconBox = styled.div`
  display: flex;
  justify-content: center;
`;

export default HospitalMarker;
