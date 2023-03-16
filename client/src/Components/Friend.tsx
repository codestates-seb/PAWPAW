import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import color from '../util/color';

const { darkbrown } = color;

interface FriendProps {
  friend: {
    petId: number;
    profileImageUrl: string;
    petName: string;
    petAge: number;
    gender: string;
    addressName: string;
  };
}

const Friend: React.FC<FriendProps> = ({ friend }) => {
  const { profileImageUrl, petName, petAge, gender } = friend;
  return (
    <Container>
      <Image src={profileImageUrl}></Image>
      <InfoDiv>
        <NameSpan>{petName}</NameSpan>
        <AgeGenderSpan>
          <AgeSpan>{petAge}살</AgeSpan>
          <GenderSpan>
            {gender === 'Male' ? (
              <Icon icon='mdi:gender-male' color='#6C92F2' style={{ fontSize: '12px' }} />
            ) : (
              <Icon icon='mdi:gender-female' color='#6C92F2' style={{ fontSize: '12px' }} />
            )}
          </GenderSpan>
        </AgeGenderSpan>
      </InfoDiv>
    </Container>
  );
};

Friend.propTypes = {
  friend: PropTypes.shape({
    petId: PropTypes.number.isRequired,
    profileImageUrl: PropTypes.string.isRequired,
    petName: PropTypes.string.isRequired,
    petAge: PropTypes.number.isRequired,
    gender: PropTypes.oneOf(['Male', 'Female']).isRequired,
    addressName: PropTypes.string.isRequired,
  }).isRequired,
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
