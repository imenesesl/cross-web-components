/* eslint-disable no-console */
import { EventHandler } from '../../event-handler';

interface MockData {
  name: string;
}

const CHANNEL = '[CHANNEL]';
const PHANTOM = '[PHANTOM]';

const ACTION = '[ACTION]';
const ANY = '[ANY]';

const breakProcess = (done: jest.DoneCallback) =>
  setTimeout(() => {
    done();
  }, 200);

describe('Event Handler', () => {
  const mainChannel = EventHandler.channel(CHANNEL);
  const phantomChannel = EventHandler.channel(PHANTOM);

  const mock: MockData = { name: 'cross-web-components' };

  it('MAIN CHANNEL - [Dispatch - Listener] This action is dispatched but the listener is not called', done => {
    mainChannel.dispatch<MockData>(ACTION, mock);
    mainChannel.listener<MockData>(ANY, ({ name }) => expect(name).toEqual(mock.name));
    breakProcess(done);
  });

  it('MAIN CHANNEL - [Dispatch - Listener] This action is dispatched and the listener is called', done => {
    mainChannel.dispatch<MockData>(ACTION, mock);
    mainChannel.listener<MockData>(ACTION, ({ name }) => expect(name).toEqual(mock.name));
    breakProcess(done);
  });

  it('PHANTOM CHANNEL - MAIN CHANNEL - [Dispatch - Listener] This action is dispatched but the listener is not called because it work with the PHANTOM CHANNEL', done => {
    mainChannel.dispatch<MockData>(ACTION, mock);
    phantomChannel.listener<MockData>(ACTION, ({ name }) => expect(name).toEqual(mock.name));
    breakProcess(done);
  });

  it('PHANTOM CHANNEL - MAIN CHANNEL- [Dispatch - Listener] This action is dispatched but the listener is not called because it work with the MAIN CHANNEL', done => {
    phantomChannel.dispatch<MockData>(ACTION, mock);
    mainChannel.listener<MockData>(ACTION, ({ name }) => expect(name).toEqual(mock.name));
    breakProcess(done);
  });
});
