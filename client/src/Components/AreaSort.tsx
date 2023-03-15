import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { addressToCode } from '../util/ConvertAddress';
import { Icon } from '@iconify/react';

interface AreaSortProps {
  setAreaSorting: React.Dispatch<React.SetStateAction<string[]>>;
}

const AreaSort: React.FC<AreaSortProps> = ({ setAreaSorting }) => {
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
      console.log('가보자구', checkedList);
      setAreaSorting(checkedList);
    },
    [checkedList, setAreaSorting],
  );
  return (
    <>
      <AreaBox>
        <TextBox>
          <TextTop>다른 동네 친구들이 궁금해요</TextTop>
          <TextBottom>원하는 지역의 게시글만 볼 수 있어요</TextBottom>
        </TextBox>
        <WholeCircle check={isWholeChecked}>
          <WholeButton onClick={() => checkedWholeHandler()}>전체</WholeButton>
        </WholeCircle>
        <ButtonCarrier onSubmit={onSubmit}>
          {area.map((item, idx) => (
            <AreaNameCircle key={idx} check={checkedList.includes(item)}>
              <AreaButton
                type={'checkbox'}
                id={item}
                checked={checkedList.includes(item)}
                onChange={(el) => checkedHandler(el, item)}
              />
              <CheckBox check={checkedList.includes(item)}>
                {checkedList.includes(item) ? (
                  <Icon
                    icon='material-symbols:check-small-rounded'
                    color='7D5A5A'
                    width='35'
                    height='35'
                  />
                ) : (
                  <Icon
                    icon='material-symbols:check-small-rounded'
                    color='#bfbfbf'
                    width='35'
                    height='35'
                  />
                )}
              </CheckBox>
              <ButtonLabel htmlFor={item}>{item}</ButtonLabel>
            </AreaNameCircle>
          ))}
          <SubmitButton type='submit'>가보자구</SubmitButton>
        </ButtonCarrier>
      </AreaBox>
    </>
  );
};

const AreaBox = styled.div`
  width: 358px;
  height: 630px;
  margin: 30px;
  padding: 22px;
  border: solid 1px black;
  border-radius: 20px;
  z-index: 1000;
  position: fixed;
  background: white;
  left: 10px;
  top: 10px;
`;
const TextBox = styled.div`
  width: 100%;
  height: 80px;
  background-color: gray;
`;
const TextTop = styled.div`
  text-align: center;
`;
const TextBottom = styled(TextTop)``;

const AreaNameCircle = styled.div<{ check: boolean }>`
  width: 55px;
  height: 55px;
  border-radius: 35px;
  border: solid 3px #bfbfbf;
  margin: 0 10px 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.check ? '#FFF8F0' : 'white')};
  position: relative;
`;
const WholeCircle = styled(AreaNameCircle)`
  width: 130px;
  height: 40px;
  border-radius: 18px;
  margin: 10px;
`;
const ButtonCarrier = styled.form`
  display: flex;
  height: 450px;
  flex-wrap: wrap;
  margin-top: 10px;
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
const SubmitButton = styled.button`
  margin-left: 5px;
  width: 215px;
  height: 55px;
  border-radius: 26px;
`;
const ButtonLabel = styled.label`
  all: unset;
  text-align: row;
  color: #7b7b7b;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
`;
const CheckBox = styled.div<{ check: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 12px;
  border: solid 3px #bfbfbf;
  position: absolute;
  bottom: 36px;
  left: 28px;
  text-align: center;
  background-color: ${(props) => (props.check ? '#FFF8F0' : 'white')};
  display: flex;
  justify-content: center;
  align-items: center;
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
