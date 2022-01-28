import React from 'react';
import Dropzone, { IDropzoneProps, ILayoutProps } from 'react-dropzone-uploader';

// add type defs to custom LayoutComponent prop to easily inspect props passed to injected components
const Layout = ({ dropzoneProps, extra: { maxFiles }, files, input, previews, submitButton }: ILayoutProps) => {
  return (
    <div>
      {previews}

      <div {...dropzoneProps}>{files.length < maxFiles && input}</div>

      {files.length > 0 && submitButton}
    </div>
  );
};

const CustomLayout = () => {
  // add type defs to function props to get TS support inside function bodies,
  // and not just where functions are passed as props into Dropzone
  const getUploadParams: IDropzoneProps['getUploadParams'] = () => ({ url: '' });

  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <>
      <Dropzone
        LayoutComponent={Layout}
        classNames={{}}
        getUploadParams={getUploadParams}
        inputContent='Drop Files (Custom Layout)'
        onSubmit={handleSubmit}
      />
      <CustomLayout />
    </>
  );
};
