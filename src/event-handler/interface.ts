import { Subscription } from 'rxjs';

export interface EventHandlerInterface {
  dispatch<T>(action: string, payload: T): void;
  listener<T>(action: string, fun: (payload: T) => void): Subscription;
}

export interface EventHandlerInstance<T> {
  channel: (channel: string) => T;
}
export interface Payload<T> {
  payload: T;
  action: string;
}

export interface ConfigEventHandler {
  root: string;
  child: string;
}
