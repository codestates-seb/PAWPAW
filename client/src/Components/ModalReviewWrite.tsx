import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { getUserInfo } from '../util/UserApi';
import { mapReviewPOST } from '../util/MapApi';
import color from '../util/color';
const petId = localStorage.getItem('petId') as string;

const { yellow, lightgrey, brown, darkbrown, bordergrey } = color;

interface ResponseData {
  petInfo: petInfo;
}

interface petInfo {
  petName: string | null;
  profileImage: File | null;
}

interface FormData {
  profileImage: Blob | null;
}

type MProps = {
  getData(): void;
  id: number;
};

const ModalReviewWrite = ({ getData, id }: MProps) => {
  const [review, setReview] = useState<string>('');
  const { responseData, error } = getUserInfo(petId);
  const [userInfo, setUserInfo] = useState<petInfo>({
    petName: null,
    profileImage: null,
  });

  const [formData, setFormData] = useState<FormData>({ profileImage: null });
  const [count, setCount] = useState<number>(0);

  if (!error && responseData && count === 0) {
    const { petInfo } = responseData as ResponseData;
    const { petName, profileImage } = petInfo;
    setUserInfo({ ...userInfo, petName });
    setFormData({ profileImage });
    setCount(count + 1);
  }

  const UserImg = formData.profileImage as unknown as string;

  const reviewInputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setReview((e.target as HTMLInputElement).value);
  };

  const reviewPostHandler = () => {
    if (review === '') {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        iconHtml: '⚠',
        title: '내용을 입력해주세요. ',
        color: brown,
        padding: '20px 0px 40px 0px',
        confirmButtonColor: yellow,
        confirmButtonText: '<b>확인</b>',
      });
      return;
    } else {
      mapReviewPOST(id, review).then(() => getData());
      Swal.fire({
        position: 'center',
        icon: 'warning',
        iconHtml: '🐾',
        title: '작성되었습니다.',
        color: brown,
        padding: '20px 0px 40px 0px',
        showConfirmButton: false,
        timer: 1000,
      });
      setReview('');
    }
  };

  return (
    <ReviewWrite>
      <ReviewUserBox>
        <ReviewUserImage src={UserImg} />
        <ReviewUserName>{userInfo.petName}</ReviewUserName>
      </ReviewUserBox>
      <ReviewInputTextBox>
        <ReviewInputBox>
          <ReviewInput
            type='text'
            value={review}
            placeholder='이 공간이 어땠나요?'
            onChange={reviewInputHandler}
          />
        </ReviewInputBox>
        <ReviewButton onClick={reviewPostHandler}>작성</ReviewButton>
      </ReviewInputTextBox>
    </ReviewWrite>
  );
};

const ReviewWrite = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  background-color: white;
`;

const ReviewUserBox = styled.div`
  width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ReviewUserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-size: cover;
`;

const ReviewUserName = styled.div`
  margin-top: 8px;
  color: ${brown};
  font-size: 14px;
  font-weight: Bold;
`;

const ReviewTextBox = styled.div`
  padding: 20px 15px 20px 10px;
  width: calc(100% - 70px);
  min-height: 80px;
`;

const ReviewInputBox = styled.div`
  flex-grow: 1;
  color: ${brown};
  font-size: 14px;
  font-weight: 500;
`;

type Props = {
  type: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ReviewInput = styled.input<Props>`
  padding: 10px;
  width: 100%;
  height: 50px;
  font-size: 14px;
  color: ${brown};
  border: 1px solid ${bordergrey};
  border-radius: 15px;
  resize: none;

  &:focus {
    outline: 1px solid ${bordergrey};
  }
  &::placeholder {
    color: ${lightgrey};
  }
`;

const ReviewButton = styled.button`
  margin-left: 4px;
  margin-right: 4px;
  padding: 7px 10px;
  font-weight: bold;
  background: ${brown};
  border-radius: 12px;
  border: 0;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${darkbrown};
  }
`;

const ReviewInputTextBox = styled.div`
  padding: 10px;
  width: calc(100% - 70px);
  display: flex;
  align-items: center;
`;

export default ModalReviewWrite;
