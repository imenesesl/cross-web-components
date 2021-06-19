/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { EVENT_HANDLER_CHILD, EVENT_HANDLER_ROOT } from '../constants';
import { isNullOrUndefined } from '../utils/checkers';
import { atDocument, atWindow } from '../utils/dom';
import { ConfigEventHandler, EventHandlerInterface, Payload } from './interface';

class EventHandlerAdapter implements EventHandlerInterface {
  private store: BehaviorSubject<any> = new BehaviorSubject(null);
  public conf: ConfigEventHandler = { listen: '', destination: '' };

  constructor(location: ConfigEventHandler) {
    this.conf = location;
    this.main();
  }

  private state(): Observable<Payload<any>> {
    return this.store.asObservable().pipe(
      filter((e: CustomEvent) => !isNullOrUndefined(e)),
      map(({ detail }: CustomEvent) => detail),
    );
  }

  private main(): void {
    atDocument().addEventListener(this.conf.listen, (e: Event) => this.store.next(e));
  }

  public dispatch<T>(action: string, payload: T): void {
    const data: Payload<T> = { currentPayload: { ...payload }, action };
    const { CustomEvent } = atWindow();
    const event = new CustomEvent(this.conf.destination, { detail: data });
    atDocument().dispatchEvent(event);
  }

  public listener<T>(currentAction: string, fun: (payload: T) => void): Subscription {
    return this.state().subscribe(({ action, currentPayload }) =>
      !currentAction || currentAction === action ? fun({ ...currentPayload }) : null,
    );
  }
}

export const EventHandler = {
  root: () => new EventHandlerAdapter({ listen: EVENT_HANDLER_ROOT, destination: EVENT_HANDLER_CHILD }),
  child: () => new EventHandlerAdapter({ listen: EVENT_HANDLER_CHILD, destination: EVENT_HANDLER_ROOT }),
  custom: (action: string) => new EventHandlerAdapter({ listen: action, destination: action }),
};
