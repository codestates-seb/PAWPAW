import React from 'react';
import Header from '../Components/Header';
import styled from 'styled-components';

const Community: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <LeftNav />
      </Container>
    </>
  );
};

export default Community;

const Container = styled.div`
  width: 100%;
  padding-top: 50px;
  display: flex;
  /* flex-direction: column;
  justify-content: center;
  margin: auto; */
`;
// 공간 확보를 위함 임시 파일

const LeftNav = styled.div`
  background-color: black;
  width: 350px;
  height: 100vh;
  position: relative;
`;
