import React from 'react';
import styled from 'styled-components';

const Button = (el: string) => {
  return <AreaButton onClick={() => console.log(`${el}`)}>{el}</AreaButton>;
};

const AreaSort: React.FC = () => {
  return (
    <>
      <AreaBox>
        <TextBox></TextBox>
        <RowBox>
          <AreaNameCircle>{Button('전체')}</AreaNameCircle>
          <AreaNameCircle>{Button('강남구')}</AreaNameCircle>
          <AreaNameCircle>{Button('강동구')}</AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>강북구</AreaButton>
          </AreaNameCircle>
        </RowBox>
        <RowBox>
          <AreaNameCircle>
            <AreaButton>강서구</AreaButton>
          </AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>관악구</AreaButton>
          </AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>광진구</AreaButton>
          </AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>구로구</AreaButton>
          </AreaNameCircle>
        </RowBox>
        <RowBox>
          <AreaNameCircle>
            <AreaButton>금천구</AreaButton>
          </AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>노원구</AreaButton>
          </AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>도봉구</AreaButton>
          </AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>동대문구</AreaButton>
          </AreaNameCircle>
        </RowBox>
        <RowBox>
          <AreaNameCircle>
            <AreaButton>동작구</AreaButton>
          </AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>마포구</AreaButton>
          </AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>서대문구</AreaButton>
          </AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>서초구</AreaButton>
          </AreaNameCircle>
        </RowBox>
        <RowBox>
          <AreaNameCircle>
            <AreaButton>성동구</AreaButton>
          </AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>성북구</AreaButton>
          </AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>송파구</AreaButton>
          </AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>양천구</AreaButton>
          </AreaNameCircle>
        </RowBox>
        <RowBox>
          <AreaNameCircle>
            <AreaButton>영등포구</AreaButton>
          </AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>용산구</AreaButton>
          </AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>은평구</AreaButton>
          </AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>종로구</AreaButton>
          </AreaNameCircle>
        </RowBox>
        <RowBox>
          <AreaNameCircle>
            <AreaButton>중구</AreaButton>
          </AreaNameCircle>
          <AreaNameCircle>
            <AreaButton>중랑구</AreaButton>
          </AreaNameCircle>
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
export default AreaSort;
