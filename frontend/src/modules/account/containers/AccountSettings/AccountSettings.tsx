import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import { API_URL } from 'api/constants';
import { useMatch } from 'react-location';

function AccountSettings(): React.ReactElement {
  const {

    params: { accountId },

  } = useMatch()

    // specify upload params and url for your files
    const getUploadParams = ({ }) => { return { url: `${API_URL}/account/${accountId}/transaction/import` } }
  
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file}: any, status: any) => { console.log(status, meta, file) }
    
    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files: any[], allFiles: any[]) => {
      console.log(files.map((f: { meta: any; }) => f.meta))
      allFiles.forEach((f: { remove: () => any; }) => f.remove())
    }

  return <div>
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="text/csv"
    />
  </div>;
}

export default AccountSettings;
