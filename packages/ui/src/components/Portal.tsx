import { createElementAndAppendToBody } from 'core/utils/dom';
import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
  elementId?: string;
}

function Portal ({ children, elementId = 'portal' }: Props): React.ReactElement<Props> | null {
  const [element, setElement] = useState<Element | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(elementId);

    if (!element) {
      element = createElementAndAppendToBody(elementId);
    }

    setElement(element);

    return () => {
      if (element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [elementId]);

  // element state will be null on first render
  if (element === null) return null;

  return createPortal(children, element);
}

export default Portal;
