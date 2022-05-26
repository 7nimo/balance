/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import { H2, Header } from './styled';

export default function TransactionDropzone () {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result;

        console.log(binaryStr);
      };

      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getInputProps, getRootProps } = useDropzone({
    maxFiles: 1,
    onDrop
  });

  return (
    <>
      <Header>
        <H2>Transaction Import</H2>
      </Header>
      <Wrapper>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
  border-width: 2px;
  border-radius: 2px;
  border-color: var(--line);
  border-style: dashed;
  background-color: #fafafa;
  background-color: rgba(193, 198, 207, .09);

  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;
