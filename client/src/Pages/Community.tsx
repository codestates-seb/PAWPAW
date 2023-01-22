import React from 'react';
import Header from '../Components/Header';
import styled from 'styled-components';

const Community:React.FC = () => {return (
    <Container>
        <Header/>
    </Container>
  );
};

export default Community;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;