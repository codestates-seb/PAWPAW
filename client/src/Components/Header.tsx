import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import color from '../util/color';

const { ivory, brown, yellow } = color;
const petId = localStorage.getItem('petId');

const Header = () => {
  const navigate = useNavigate();

  const goToMap = () => {
    const jwtToken = localStorage.getItem('Authorization');
    if (jwtToken !== null) {
      navigate('/map');
    } else {
      navigate('/');
    }
  };

  const goToMyPage = () => {
    const jwtToken = localStorage.getItem('Authorization');
    if (jwtToken !== null) {
      navigate(`/mypage/${petId}`);
    } else {
      navigate('/');
    }
  };

  const goToCommunity = () => {
    const jwtToken = localStorage.getItem('Authorization');
    if (jwtToken !== null) {
      navigate('/community');
    } else {
      navigate('/');
    }
  };

  return (
    <Container>
      <LeftBox>
        <LogoImg onClick={goToMap} />
      </LeftBox>

      <RightBox>
        <IconSpan onClick={goToMap}>
          <Icon icon='material-symbols:map' style={{ fontSize: '35px' }} />
        </IconSpan>
        <IconSpan onClick={goToCommunity}>
          <Icon icon='gridicons:posts' style={{ fontSize: '35px' }} />
        </IconSpan>
        <IconSpan onClick={goToMyPage}>
          <Icon icon='mdi:user-circle' style={{ fontSize: '35px' }} />
        </IconSpan>
      </RightBox>
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  height: 50px;
  background-color: ${ivory};
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 100;
`;
const LeftBox = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const LogoImg = styled.img`
  height: 50px;
  cursor: pointer;
  content: url('https://ifh.cc/g/5zP1VD.png');
  &:hover {
    content: url('https://ifh.cc/g/4ffBQ7.png');
  }
`;

const RightBox = styled.button`
  all: unset;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconSpan = styled.span`
  margin: 0px 8px;
  color: ${brown};
  cursor: pointer;
  &:hover {
    color: ${yellow};
  }
`;

export default Header;
