import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgTrash ({ title, titleId }: SVGRProps): JSX.Element {
  return (
    <svg
      aria-labelledby={titleId}
      fill='none'
      height='1em'
      viewBox='0 0 24 24'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d='M3.5 6h17c-.697 8.717-1.152 12.571-1.363 14.105-.08.587-.39 1.095-.955 1.274-.894.283-2.693.621-6.182.621-3.49 0-5.288-.338-6.182-.621-.564-.179-.875-.687-.955-1.274C4.652 18.571 4.197 14.717 3.5 6z'
        fill='var(--icon-main)'
      />
      <path
        d='M2.523 6.408c.29-1.159 1.24-2.027 2.43-2.132C6.446 4.143 8.795 4 12 4c3.205 0 5.554.143 7.047.276 1.19.105 2.14.974 2.43 2.132l.134.536c.227.909-.258 1.716-1.192 1.802C19.054 8.872 16.55 9 12 9s-7.054-.128-8.42-.254c-.933-.086-1.418-.893-1.19-1.802l.133-.536z'
        fill='var(--icon-accent)'
      />
      <path
        d='M9.044 3.368A2 2 0 0110.941 2h2.117a2 2 0 011.898 1.368L15.5 5h-7l.544-1.632zm-.968 9.2a.997.997 0 011.99-.142l.358 5.005a.997.997 0 11-1.99.143l-.358-5.006zm5.858-.142a.997.997 0 011.99.143l-.358 5.005a.997.997 0 11-1.99-.143l.358-5.005z'
        fill='var(--icon-accent)'
      />
    </svg>
  );
}

SvgTrash.defaultProps = {
  title: 'Trash',
  titleId: 59900
};

export default SvgTrash;
