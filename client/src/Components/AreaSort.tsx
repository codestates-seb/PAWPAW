import React, { useState } from 'react';
import styled from 'styled-components';

const Button = (el: string) => {
  const [newSwitch, setNewSwitch] = useState<boolean>(false);
  return newSwitch ? (
    <AreaNameCircleOn>
      <AreaButton onClick={() => setNewSwitch(!newSwitch)}>{el}</AreaButton>
    </AreaNameCircleOn>
  ) : (
    <AreaNameCircle>
      <AreaButton onClick={() => setNewSwitch(!newSwitch)}>{el}</AreaButton>
    </AreaNameCircle>
  );
};

const AreaSort: React.FC = () => {
  return (
    <>
      <AreaBox>
        <TextBox></TextBox>
        <RowBox>
          {Button('전체')}
          {Button('강남구')}
          {Button('강동구')}
          {Button('강북구')}
        </RowBox>
        <RowBox>
          {Button('강서구')}
          {Button('관악구')}
          {Button('광진구')}
          {Button('구로구')}
        </RowBox>
        <RowBox>
          {Button('금천구')}
          {Button('노원구')}
          {Button('도봉구')}
          {Button('동대문구')}
        </RowBox>
        <RowBox>
          {Button('동작구')}
          {Button('마포구')}
          {Button('서대문구')}
          {Button('서초구')}
        </RowBox>
        <RowBox>
          {Button('성동구')}
          {Button('성북구')}
          {Button('송파구')}
          {Button('양천구')}
        </RowBox>
        <RowBox>
          {Button('영등포구')}
          {Button('용산구')}
          {Button('은평구')}
          {Button('종로구')}
        </RowBox>
        <RowBox>
          {Button('중구')}
          {Button('중랑구')}
          <BlankCircle />
          <BlankCircle />
        </RowBox>
      </AreaBox>
    </>
  );
};

const AreaBox = styled.div`
  width: 380px;
  height: 700px;
  margin: 30px;
  padding: 22px;
  border: solid 1px black;
  border-radius: 20px;
  overflow: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 10px;
  }
`;
const RowBox = styled.div`
  display: flex;
`;
const TextBox = styled.div`
  width: 100%;
  height: 150px;
  background-color: gray;
`;
const AreaNameCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 35px;
  border: solid 3px #bfbfbf;
  margin: 0 10px 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BlankCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 35px;
  margin: 0 10px 10px 10px;
`;
const AreaButton = styled.button`
  all: unset;
  color: #7b7b7b;
  font-size: 12px;
  font-weight: bold;
`;
const AreaNameCircleOn = styled(AreaNameCircle)`
  background-color: #fff8f0;
`;

export default AreaSort;
