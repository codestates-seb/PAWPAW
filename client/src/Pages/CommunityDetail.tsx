import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import color from '../color';
import axios from 'axios';
import headers from '../util/headers';
import Header from '../Components/Header';

const CommunityDetail: React.FC = () => {
  const postId = useParams();
  console.log(postId);
  return (
    <>
      <Header />
      <Container>{postId.id}</Container>
    </>
  );
};
export default CommunityDetail;

const Container = styled.div`
  width: 100%;
  padding-top: 50px;
  display: flex;
  flex-direction: row;
`;
