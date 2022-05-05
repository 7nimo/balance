import * as React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgRocket ({ title, titleId }: SVGRProps): JSX.Element {
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
        d='M11.75 4.5c-4.866-.942-7.86.285-9.413 1.328-.845.566-.779 1.7-.04 2.398l2.78 2.626L11.75 4.5zm8.307 7.75c.604 4.962-.819 7.977-1.92 9.504-.572.792-1.655.751-2.363.076l-3.047-2.908 7.33-6.672zM9.295 17.636c0-1.73-1.2-2.931-2.931-2.931s-2.932 1.2-2.932 2.931c0 1.255.11 1.962.195 2.322a.55.55 0 00.415.415c.36.086 1.067.195 2.322.195 1.73 0 2.931-1.2 2.931-2.932z'
        fill='var(--icon-accent)'
      />
      <path
        d='M14.048 19.995c-.49.392-1.11.47-1.644.14-.809-.5-2.253-1.586-4.603-3.936-2.35-2.35-3.436-3.794-3.936-4.603-.33-.534-.252-1.154.14-1.644.565-.706 1.671-1.969 3.796-4.094C11.66 2 18.716 2 20.358 3.642 22 5.284 22 12.341 18.142 16.2c-2.125 2.125-3.388 3.231-4.094 3.796z'
        fill='var(--icon-main)'
      />
      <path
        d='M13 7.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z'
        fill='var(--icon-accent)'
      />
    </svg>
  );
}

SvgRocket.defaultProps = {
  title: 'Rocket',
  titleId: 11
};

export default SvgRocket;
