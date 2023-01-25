import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import color from '../color';
import axios from 'axios';
import headers from '../util/headers';
import Header from '../Components/Header';

const url = process.env.REACT_APP_API_ROOT;
const petId = localStorage.getItem('petId') as string;

const CommunityDetail: React.FC = () => {
  const [postDetail, setPostDetail] = useState<object>({});
  const postId = useParams();
  console.log(postId);
  useEffect(() => {
    getData();
    console.log('resetCheck');
  }, []);

  async function getData() {
    await axios
      .get(`${url}/posts/${postId}`, { headers })
      .then((res) => {
        setPostDetail(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
