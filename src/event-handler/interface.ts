import { Subscription } from 'rxjs';

export interface EventHandlerInterface {
  dispatch<T>(action: string, payload: T): void;
  listener<T>(action: string, fun: (payload: T) => void): Subscription;
}

export interface Payload<T> {
  currentPayload: T;
  action: string;
}

export interface ConfigEventHandler {
  listen: string;
  destination: string;
}
