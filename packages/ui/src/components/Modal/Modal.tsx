import Portal from 'components/Portal';
import React, { useEffect } from 'react';

import { Button, Buttons } from '../buttons/Buttons';
import { Dialog } from './Dialog';
import { Header } from './Header';

type Props = {
  isOpen: boolean;
  formId: string;
  handleClose: () => void;
  children: React.ReactNode;
  title: string;
}

function Modal ({ children, formId, handleClose, isOpen, title }: Props): React.ReactElement<Props> | null {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => e.key === 'Escape' ? handleClose() : null;

    document.body.addEventListener('keydown', closeOnEscapeKey);

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <Portal elementId='modal-root'>
      <Dialog>
        <Header>{title}</Header>
        {children}
        <Buttons>
          <Button
            filled
            form={formId}
            style={{ marginLeft: '8px' }}
          >
            Save
          </Button>
          <Button
            onClick={handleClose}
          >
            Close
          </Button>
        </Buttons>
      </Dialog>
    </Portal>
  );
}

export default Modal;
