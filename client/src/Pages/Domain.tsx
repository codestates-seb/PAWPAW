import React, { useState } from 'react';
import Header from '../Components/Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div``;

const Body = styled.div`
  padding-top: 50px;
`;

const Domain: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // 나중에 false로 수정하기
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Header />
        <Body>
          <div>
            <button onClick={() => navigate('/login')}>로그인</button>
            <button onClick={() => navigate('/signup')}>회원가입</button>
            <button onClick={() => navigate('/userinfo')}>사용자 상세 정보 입력</button>
            <button onClick={() => navigate('/userinfoedit')}>사용자 정보 수정</button>
            <button onClick={() => navigate('/map')}>맵</button>
            <button onClick={() => navigate('/modal')}>모달</button>
            <button onClick={() => navigate('/mypage')}>마이페이지</button>
            <button onClick={() => navigate('/post')}>글 작성</button>
          </div>
        </Body>
      </Container>
    </>
  );
};

export default Domain;
