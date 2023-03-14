import { Icon } from '@iconify/react';
import styled from 'styled-components';

const CampMarker = () => {
  return (
    <IconBox className='pos'>
      <Icon icon='material-symbols:camping' color='#93c246' style={{ fontSize: '23px' }} />
    </IconBox>
  );
};

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1px;
`;

export default CampMarker;
