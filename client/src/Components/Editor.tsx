import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const modules = {
  toolbar: {
    container: [
      [{ size: ['false', 'large', 'huge'] }],
      [{ align: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [
        {
          color: [
            '#000000',
            '#e60000',
            '#ff9900',
            '#ffff00',
            '#008a00',
            '#0066cc',
            '#9933ff',
            '#ffffff',
            '#facccc',
            '#ffebcc',
            '#ffffcc',
            '#cce8cc',
            '#cce0f5',
            '#ebd6ff',
            '#bbbbbb',
            '#f06666',
            '#ffc266',
            '#ffff66',
            '#66b966',
            '#66a3e0',
            '#c285ff',
            '#888888',
            '#a10000',
            '#b26b00',
            '#b2b200',
            '#006100',
            '#0047b2',
            '#6b24b2',
            '#444444',
            '#5c0000',
            '#663d00',
            '#666600',
            '#003700',
            '#002966',
            '#3d1466',
            'custom-color',
          ],
        },
        { background: [] },
      ],
      ['image', 'link'],
    ],
  },
};

interface IEditor {
  contents: string;
  setContents: (contents: string) => void;
}

const Editor: React.FC<any> = ({ contents, setContents }: IEditor) => {
  const onChange = (e: string) => {
    setContents(e);
  };

  return (
    <Container>
      <ReactQuill onChange={onChange} modules={modules} />
    </Container>
  );
};

const Container = styled.div`
  .ql-editor {
    height: 400px;
    font-size: 18px;
  }
`;

export default Editor;
