import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import color from '../util/color';

const { yellow, darkbrown, brown } = color;

interface SearchBarProps {
  search: (searchType: string, searchContent: string) => void;
}

function SearchBar({ search }: SearchBarProps) {
  const [type, setType] = useState<string>('author');
  const [text, setText] = useState<string>('');

  const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type && text) {
      search(type, text);
      setText('');
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        iconHtml: '⚠',
        title: '검색어를 입력해주세요.',
        color: brown,
        padding: '20px 0px 40px 0px',
        confirmButtonColor: yellow,
        confirmButtonText: '<b>확인</b>',
      });
      return;
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <SelectBox onChange={onTypeChange}>
        <Option value='author'>작성자</Option>
        <Option value='title'>글 제목</Option>
        <Option value='content'>글 내용</Option>
      </SelectBox>
      <Input value={text} onChange={onInputChange} type='text' />
      <SubmitButton>검색</SubmitButton>
    </form>
  );
}

const SelectBox = styled.select`
  padding: 5px;
  border: 1px solid #e2e2e2;
  border-radius: 5px 0 0 5px;
  color: ${darkbrown};
  font-weight: 500;
  cursor: pointer;
`;

const Option = styled.option`
  cursor: pointer;
`;

const Input = styled.input`
  padding: 6px;
  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  border-left: none;
  border-right: none;
  width: 150px;
`;

const SubmitButton = styled.button`
  padding: 7px 10px;
  border: none;
  border-radius: 0 5px 5px 0;
  font-weight: 600;
  color: white;
  background-color: ${brown};
  cursor: pointer;

  &:hover {
    background-color: ${darkbrown};
  }
`;

export default SearchBar;
