/* eslint-disable react/prop-types */
import styled from 'styled-components';
import color from '../util/color';
import Friend from './Friend';

const { ivory, darkbrown, brown } = color;

interface FriendRecommendProps {
  friends?: {
    petId: number;
    profileImageUrl: string;
    petName: string;
    petAge: number;
    gender: 'MALE' | 'FEMALE';
    addressName: string;
  }[];
}

const FriendRecommend: React.FC<FriendRecommendProps> = ({ friends }) => {
  const recommendedFriends = friends?.slice(0, 7);
  const Length = recommendedFriends?.length !== 7 ? true : false;

  return (
    <Container>
      <TitleDiv>우리 동네 친구들 🐕🐈‍⬛</TitleDiv>
      <UsersDiv Length={Length}>
        {recommendedFriends === undefined || recommendedFriends?.length === 0 ? (
          <EmptyMessage>검색 결과가 없어요..🐾</EmptyMessage>
        ) : (
          recommendedFriends.map((friend) => <Friend key={friend.petId} friend={friend} />)
        )}
      </UsersDiv>
    </Container>
  );
};

// 같은 구 유저 데이터 받아와서 랜덤으로 7개 뽑아서 보여주기

const Container = styled.div`
  width: 100%;
  padding: 10px 20px;
  background-color: ${ivory};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const TitleDiv = styled.div`
  margin: 5px 0px 10px 0px;
  font-size: 18px;
  font-weight: bold;
  color: ${darkbrown};
`;

const UsersDiv = styled.div<{ Length: boolean }>`
  display: flex;
  justify-content: ${(Length) => (Length ? 'space-evenly' : 'space-between')};
`;

const EmptyMessage = styled.div`
  height: 116px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${brown};
`;

export default FriendRecommend;
