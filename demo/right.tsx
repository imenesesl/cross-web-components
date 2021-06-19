import React, { useEffect, useState } from 'react';

import { EventHandler } from '../src';
import { ModalState } from './model';

export const Right: React.FC = () => {
  const customEvent = EventHandler.custom('[MODAL]');

  const [state, setState] = useState<ModalState>({ state: false, id: '' });

  useEffect(() => {
    const listener = customEvent.listener<ModalState>('[MODAL_UPDATE_STATE]', payload => setState(payload));
    return () => {
      listener.unsubscribe();
    };
  }, []);

  const onClick = () => setState({ id: '', state: false });

  return (
    <>
      {state.state && (
        <div>
          <h1>{state.id}</h1>
          <button onClick={onClick}>Hide</button>
        </div>
      )}
    </>
  );
};
