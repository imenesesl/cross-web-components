/* eslint-disable max-lines */
import { EVENT_HANDLER_CHILD, EVENT_HANDLER_ROOT } from '../../constants';
import { EventHandler } from '../../event-handler';

interface MockData {
  name: string;
}
const GLOBAL = '[GLOBAL]';
const ROOT = '[ROOT]';
const CHILD = '[CHILD]';
const CUSTOM_EVENT = '[CUSTOM_EVENT]';
const NO_FOUND = '[NO_FOUND]';

describe('Event Handler', () => {
  const eventRoot = EventHandler.root();
  const eventChild = EventHandler.child();
  const eventCustom = EventHandler.custom(GLOBAL);
  const mock: MockData = { name: 'Web adapter' };

  it('Type Root', () => expect(eventRoot.conf).toEqual({ listen: EVENT_HANDLER_ROOT, destination: EVENT_HANDLER_CHILD }));

  it('Type Child', () => expect(eventChild.conf).toEqual({ listen: EVENT_HANDLER_CHILD, destination: EVENT_HANDLER_ROOT }));

  it('[Dispatch - Callback] Sending data to child', done => {
    eventRoot.dispatch<MockData>(CHILD, mock);
    eventChild.listener<MockData>(CHILD, ({ name }) => {
      expect(name).toEqual(mock.name);
      done();
    });
  });

  it('[Dispatch - Callback] Sending data to child - NO FOUND', done => {
    eventRoot.dispatch<MockData>(CHILD, mock);
    eventChild.listener<MockData>(NO_FOUND, ({ name }) => {
      expect(name).toEqual(mock.name);
      done();
    });
    done();
  });

  it('[Dispatch - Callback] sending data to root - NO FOUND', done => {
    eventChild.dispatch(NO_FOUND, mock);
    eventRoot.listener<MockData>(ROOT, ({ name }) => expect(name).toEqual(mock.name));
    done();
  });

  it('[Dispatch - Callback] sending data to root', done => {
    eventChild.dispatch(ROOT, mock);
    eventRoot.listener<MockData>(ROOT, ({ name }) => {
      expect(name).toEqual(mock.name);
      done();
    });
  });

  it('[Dispatch - Callback -Custom] sending data to root - NO FOUND', done => {
    eventCustom.dispatch<MockData>(CUSTOM_EVENT, mock);
    eventCustom.listener<MockData>(ROOT, ({ name }) => expect(name).toEqual(mock.name));
    done();
  });

  it('[Dispatch - Callback - Custom] sending data to root', done => {
    eventCustom.dispatch<MockData>(ROOT, mock);
    eventCustom.listener<MockData>(ROOT, ({ name }) => {
      expect(name).toEqual(mock.name);
      done();
    });
  });
});
