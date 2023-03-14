import { Icon } from '@iconify/react';
import styled from 'styled-components';

const MyMarker = () => {
  return (
    <IconBox className='pos'>
      <Icon icon='material-symbols:star-rounded' color='#fcb838' style={{ fontSize: '27px' }} />
    </IconBox>
  );
};

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3px;
`;

export default MyMarker;
