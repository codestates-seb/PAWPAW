import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { addressToCode } from '../util/ConvertAddress';

const AreaSort: React.FC = () => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isWholeChecked, setIsWholeChecked] = useState<boolean>(true);
  const checkedItemHandler = (value: string, isChecked: boolean) => {
    checkedList.length === 0 && !value ? setIsWholeChecked(true) : setIsWholeChecked(false);
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }
    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((el) => el !== value));
      return;
    }
    return;
  };
  const checkedWholeHandler = () => {
    setCheckedList([]);
    setIsWholeChecked(true);
  };
  const checkedHandler = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
    console.log(value, e.target.checked);
  };

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newArr = [];
      for (const el of checkedList) {
        newArr.push(addressToCode(el));
      }
      console.log('가보자구', newArr);
    },
    [checkedList],
  );
  return (
    <>
      <AreaBox>
        <TextBox></TextBox>
        <AreaNameCircle check={isWholeChecked}>
          <WholeButton onClick={() => checkedWholeHandler()}>전체</WholeButton>
        </AreaNameCircle>
        <ButtonCarrier onSubmit={onSubmit}>
          {area.map((item, idx) => (
            <AreaNameCircle key={idx} check={checkedList.includes(item)}>
              <AreaButton
                type={'checkbox'}
                id={item}
                checked={checkedList.includes(item)}
                onChange={(el) => checkedHandler(el, item)}
              />
              <ButtonLabel htmlFor={item}>{item}</ButtonLabel>
            </AreaNameCircle>
          ))}
          <button type='submit'>가보자구</button>
        </ButtonCarrier>
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

const TextBox = styled.div`
  width: 100%;
  height: 150px;
  background-color: gray;
`;

const AreaNameCircle = styled.div<{ check: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 35px;
  border: solid 3px #bfbfbf;
  margin: 0 10px 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.check ? '#FFF8F0' : 'white')};
`;
const ButtonCarrier = styled.form`
  display: flex;
  height: 500px;
  flex-wrap: wrap;
`;
const WholeButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 60px;
  height: 60px;
  text-align: center;
`;
const AreaButton = styled.input`
  all: unset;
  cursor: pointer;
  input[type='checkbox'] {
    width: 60px;
    height: 60px;
    text-align: center;
  }
`;
const ButtonLabel = styled.label`
  all: unset;
  text-align: row;
  color: #7b7b7b;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
`;

const area = [
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
];

export default AreaSort;
