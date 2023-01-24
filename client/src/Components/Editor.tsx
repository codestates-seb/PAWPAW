import React, { useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

interface IEditor {
  contents: string;
  setContents: (contents: string) => void;
}

const Editor: any = ({ contents, setContents }: IEditor) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const onChange = (e: string) => {
    setContents(e);
  };

  const imageHandler = () => {
    const input = document.createElement('input'); // input 태그를 동적으로 생성

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    // 파일 선택창에서 이미지를 선택하면 실행될 콜백 함수 등록
    input.onchange = () => {
      if (input.files) {
        const file = input.files[0];
        const imageURL = URL.createObjectURL(input.files[0]);

        // 현재 커서 위치에 이미지를 삽입하고 커서 위치를 +1 하기
        if (quillRef.current) {
          const range = quillRef.current.getEditorSelection();
          if (range) {
            quillRef.current.getEditor().insertEmbed(range.index, 'image', imageURL);
            // quillRef.current.getEditor().setSelection(range.index + 1);
            // document.body.querySelector(':scope > input').remove()
          }
        }

        // 폼데이터에 이미지 파일 추가
        const formData = new FormData();
        formData.append('image', file);
      }
    };
  };

  const modules = useMemo(() => {
    return {
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
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  return (
    <Container>
      <ReactQuill ref={quillRef} onChange={onChange} modules={modules} />
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
