import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import color from '../util/color';

const { brown, darkbrown, lightgrey } = color;

function NoAuth() {
  const navigate = useNavigate();
  return (
    <Container>
      <MessageDiv>관리자 권한이 없어요 🐾</MessageDiv>
      <HomeButton onClick={() => navigate('/community')}>돌아가기</HomeButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MessageDiv = styled.div`
  color: ${lightgrey};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

const HomeButton = styled.button`
  margin-top: 40px;
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

export default NoAuth;
