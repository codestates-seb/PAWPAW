import { Icon } from '@iconify/react';
import styled from 'styled-components';
import color from '../util/color';

const { darkbrown } = color;

const Friend = () => {
  return (
    <Container>
      <Image src='https://i0.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1020%2C1020&ssl=1'></Image>
      <InfoDiv>
        <NameSpan>냥냥이</NameSpan>
        <AgeGenderSpan>
          <AgeSpan>1살,</AgeSpan>
          <GenderSpan>
            <Icon icon='mdi:gender-male' color='#6C92F2' style={{ fontSize: '12px' }} />
          </GenderSpan>
        </AgeGenderSpan>
      </InfoDiv>
    </Container>
  );
};

const Container = styled.div``;

const Image = styled.img`
  border-radius: 50%;
  width: 70px;
  height: 70px;
  object-fit: cover;
`;

const InfoDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0px 10px;
`;

const NameSpan = styled.span`
  margin-bottom: 3px;
  font-size: 14px;
  font-weight: bold;
  color: ${darkbrown};
`;

const AgeGenderSpan = styled.span`
  font-size: 12px;
  color: ${darkbrown};
  display: flex;
  background-color: white;
  border-radius: 5px;
  padding: 3px 5px;
`;
const AgeSpan = styled.span`
  margin-right: 3px;
`;
const GenderSpan = styled.span`
  display: flex;
  align-items: center;
`;

export default Friend;
