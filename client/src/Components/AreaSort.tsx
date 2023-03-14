import React from 'react';
import styled from 'styled-components';

const AreaSort: React.FC = () => {
  return (
    <>
      <AreaBox>
        <TextBox></TextBox>
        <RowBox>
          <AreaNameCircle>
            <button>전체</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
        </RowBox>
        <RowBox>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
        </RowBox>
        <RowBox>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
        </RowBox>
        <RowBox>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
        </RowBox>
        <RowBox>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
        </RowBox>
        <RowBox>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
        </RowBox>
        <RowBox>
          <AreaNameCircle>
            <button>강남구</button>
          </AreaNameCircle>
          <AreaNameCircle>
            <button>강남구</button>
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
  border: solid 3px black;
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
export default AreaSort;
