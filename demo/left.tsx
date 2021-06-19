import React, { useState } from 'react';

import { EventHandler } from '../src';
import { ModalState } from './model';

export const Left: React.FC = () => {
  const customEvent = EventHandler.custom('[MODAL]');

  const [id, setId] = useState<string>('');

  const onClick = () => customEvent.dispatch<ModalState>('[MODAL_UPDATE_STATE]', { state: true, id });

  return (
    <>
      <input placeholder='id' value={id} onChange={({ target: { value } }) => setId(value)} />
      <button onClick={onClick}>Show</button>
    </>
  );
};
