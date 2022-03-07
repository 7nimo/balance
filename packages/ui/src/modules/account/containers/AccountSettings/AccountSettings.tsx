/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from 'api/constants';
import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import { useMatch } from 'react-location';
import { useMutation } from 'react-query';
import { postFile } from 'utils/http.util';

function AccountSettings (): React.ReactElement {
  const { params: { accountId } } = useMatch();

  const uploadFile = useMutation((file: any) => {
    const formData = new FormData();

    console.log('d:', file);
    formData.append('statement', file);

    formData.forEach((f) => console.log(f));

    return postFile(`${API_URL}/account/${accountId}/transaction/import`, formData);
  });

  // specify upload params and url for your files
  const getUploadParams = () => { return { url: `${API_URL}/account/${accountId}/transaction/import` }; };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ file, meta }: any, status: any) => { console.log(status, meta, file); };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files: any[], allFiles: any[]) => {
    // console.log(files.map((f: { meta: any; }) => f.meta));
    // allFiles.forEach((f: { remove: () => any; }) => f.remove());
    console.log('file: ', files[0].file);
    uploadFile.mutate(files[0].file);
  };

  return <div>
    <Dropzone
      accept='text/csv'
      // getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
    />
  </div>;
}

export default AccountSettings;
