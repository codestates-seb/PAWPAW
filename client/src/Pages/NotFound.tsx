import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

import color from '../color';
import Header from '../Components/Header';
const { yellow, brown, darkbrown } = color;

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <Header />
      <Body>
        <Box>
          <div>
            <ErrorSpan>404 Error</ErrorSpan>
            <ErrorSpan className='brown'>
              <Icon icon='foundation:paw' style={{ fontSize: '30px' }} />
              <Icon icon='foundation:paw' style={{ fontSize: '30px' }} />
              <Icon icon='foundation:paw' style={{ fontSize: '30px' }} />
            </ErrorSpan>
          </div>
          <MessageDiv>찾을 수 없는 페이지입니다!</MessageDiv>
          <HomeButton onClick={() => navigate('/')}>홈으로 이동</HomeButton>
        </Box>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  width: 100%;
  margin-top: 50px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const Box = styled.span`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorSpan = styled.span`
  font-size: 100px;
  font-family: Rubik Bubbles;
  color: ${yellow};

  &.brown {
    color: ${brown};
  }
`;

const MessageDiv = styled.div`
  margin: 30px 0px;
  font-size: 20px;
  font-weight: bold;
  color: ${brown};
`;

const HomeButton = styled.button`
  margin-top: 10px;
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  background-color: ${brown};
  cursor: pointer;

  &:hover {
    background-color: ${darkbrown};
  }
`;

export default NotFound;
