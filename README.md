# cross-web-components

## `Package to establish communication between your web components`

- ## EventHandler

```ts
import { EventHandler } from 'cross-web-components';

const customEvent = EventHandler.channel('[CUSTOM_CHANNEL]');
```
### Example - Dispatch (React)

```tsx
export const Example = () => {
  const customEvent = EventHandler.channel('[MODAL]');

  const [id, setId] = useState<string>('');

  const onClick = () => customEvent.dispatch<ModalState>('[MODAL_UPDATE_STATE]', { state: true, id });

  return (
    <>
      <input placeholder='id' value={id} onChange={({ target: { value } }) => setId(value)} />
      <button onClick={onClick}>Show</button>
    </>
  );
};
```

### Example - Listener (React)

```tsx
export const Modal = () => {
  const customEvent = EventHandler.channel('[MODAL]');

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
```

## Get Started

- Add the following in the dependencies of your package.json

```bash
npm install rxjs cross-web-components'
```

- Ready to use

```ts
import { EventHandler } from 'cross-web-components';
```
