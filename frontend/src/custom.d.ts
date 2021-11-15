declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';

declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
