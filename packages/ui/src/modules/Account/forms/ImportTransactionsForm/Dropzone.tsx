import { API_URL } from 'core/api/constants';
import { postFile } from 'core/utils/http.util';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQueryClient } from 'react-query';

import { H2, Header } from '../styled';
import { DropArea } from './styled';

type Props = {
  accountId: string;
}

export default function Dropzone ({ accountId }: Props): React.ReactElement<Props> {
  const queryClient = useQueryClient();
  const onDrop = useCallback((acceptedFiles: File[]) => {
      // todo: validation
      // validateFile();
      // const [file] = acceptedFiles;
      // readFile(file);
  }, []);

  const uploadForm = useMutation((form: FormData) => postFile(`${API_URL}/account/${accountId}/transaction/import`, form), {
    onSettled: async () => {
      // this fails if queried before transactions are saved in db
      await queryClient.refetchQueries(['transactions', accountId]);
      await queryClient.refetchQueries(['account', accountId]);
    }
  });

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    const [file] = acceptedFiles;

    const formData = new FormData();

    formData.append('statement', file);

    uploadForm.mutate(formData);
  }, [uploadForm]);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false,
    onDrop,
    onDropAccepted
  });

  return (
    <>
      <Header>
        <H2>Transaction Import</H2>
      </Header>
        <DropArea
          {...getRootProps()}
          isDragActive={isDragActive}
        >
          <input {...getInputProps()} />
          <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
        </DropArea>
    </>
  );
}

// todo
// function readFile (file: File) {
//   const reader = new FileReader();

//   reader.onabort = () => console.log('file reading was aborted');
//   reader.onerror = () => console.log('file reading has failed');

//   reader.onload = () => {
//   // Do whatever you want with the file contents

//     console.log(reader.result);
//   };

//   reader.readAsText(file);
// }
