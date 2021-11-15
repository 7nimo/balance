import { createElement } from 'react';

interface IconProps {
  props: any;
  content: any;
}

export default function createIconComponent({ props, content }: IconProps): JSX.Element {
  return createElement('svg', props, content);
}
