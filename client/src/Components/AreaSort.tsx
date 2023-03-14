import React, { useState } from 'react';
import styled from 'styled-components';

const Button = (el: string, testSwitch: boolean, setTestSwitch: any) => {
  const [newSwitch, setNewSwitch] = useState<boolean>(false);
  return testSwitch ? (
    // 전체 버튼이 켜져 있을 때
    <AreaNameCircle>
      <AreaButton
        onClick={() => {
          setNewSwitch(true);
          setTestSwitch(false);
        }}
      >
        {el}
      </AreaButton>
    </AreaNameCircle>
  ) : newSwitch ? (
    <AreaNameCircleOn>
      <AreaButton onClick={() => setNewSwitch(false)}>{el}</AreaButton>
    </AreaNameCircleOn>
  ) : (
    <AreaNameCircle>
      <AreaButton onClick={() => setNewSwitch(true)}>{el}</AreaButton>
    </AreaNameCircle>
  );
};

const WholeButton = (el: string, testSwitch: boolean, setTestSwitch: any) => {
  return testSwitch ? (
    <AreaNameCircleOn>
      <AreaButton>{el}</AreaButton>
    </AreaNameCircleOn>
  ) : (
    <AreaNameCircle>
      <AreaButton onClick={() => setTestSwitch(true)}>{el}</AreaButton>
    </AreaNameCircle>
  );
};

const AreaSort: React.FC = () => {
  const [testSwitch, setTestSwitch] = useState<boolean>(true);
  return (
    <>
      <AreaBox>
        <TextBox></TextBox>
        <RowBox>
          {WholeButton('전체', testSwitch, setTestSwitch)}
          {Button('강남구', testSwitch, setTestSwitch)}
          {Button('강동구', testSwitch, setTestSwitch)}
          {Button('강북구', testSwitch, setTestSwitch)}
        </RowBox>
        <RowBox>
          {Button('강서구', testSwitch, setTestSwitch)}
          {Button('관악구', testSwitch, setTestSwitch)}
          {Button('광진구', testSwitch, setTestSwitch)}
          {Button('구로구', testSwitch, setTestSwitch)}
        </RowBox>
        <RowBox>
          {Button('금천구', testSwitch, setTestSwitch)}
          {Button('노원구', testSwitch, setTestSwitch)}
          {Button('도봉구', testSwitch, setTestSwitch)}
          {Button('동대문구', testSwitch, setTestSwitch)}
        </RowBox>
        <RowBox>
          {Button('동작구', testSwitch, setTestSwitch)}
          {Button('마포구', testSwitch, setTestSwitch)}
          {Button('서대문구', testSwitch, setTestSwitch)}
          {Button('서초구', testSwitch, setTestSwitch)}
        </RowBox>
        <RowBox>
          {Button('성동구', testSwitch, setTestSwitch)}
          {Button('성북구', testSwitch, setTestSwitch)}
          {Button('송파구', testSwitch, setTestSwitch)}
          {Button('양천구', testSwitch, setTestSwitch)}
        </RowBox>
        <RowBox>
          {Button('영등포구', testSwitch, setTestSwitch)}
          {Button('용산구', testSwitch, setTestSwitch)}
          {Button('은평구', testSwitch, setTestSwitch)}
          {Button('종로구', testSwitch, setTestSwitch)}
        </RowBox>
        <RowBox>
          {Button('중구', testSwitch, setTestSwitch)}
          {Button('중랑구', testSwitch, setTestSwitch)}
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
  width: 100%;
  height: 100%;
  text-align: center;
`;
const AreaNameCircleOn = styled(AreaNameCircle)`
  background-color: #fff8f0;
`;

export default AreaSort;
