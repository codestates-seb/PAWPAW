import React from 'react';
import styled from 'styled-components';
import color from '../util/color';

const { ivory, darkivory, yellow, brown } = color;

interface SortModalProps {
  setSorting: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SortModal({ setSorting, setIsOpen }: SortModalProps) {
  const clickHandler = (text: string) => {
    setSorting(text);
    setIsOpen(false);
  };

  return (
    <Container>
      <Box>
        <Button onClick={() => clickHandler('newest')}>최신순</Button>
        <Button onClick={() => clickHandler('likes')}>인기순</Button>
        <Button onClick={() => clickHandler('comments')}>댓글 많은 순</Button>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 23px;
  border: 1px solid ${darkivory};
  border-radius: 10px;
  background-color: ${ivory};
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 5px;
  color: ${brown};
  font-weight: 500;
  cursor: pointer;

  border-bottom: 1px solid ${darkivory};

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    color: ${yellow};
  }
`;

export default SortModal;
