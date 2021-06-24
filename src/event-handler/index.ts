/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { isNullOrUndefined } from '../utils/checkers';
import { atDocument, atWindow } from '../utils/dom';
import { ConfigEventHandler, EventHandlerInstance, EventHandlerInterface, Payload } from './interface';

class EventHandlerAdapter implements EventHandlerInterface {
  private store: BehaviorSubject<any> = new BehaviorSubject(null);
  public conf: ConfigEventHandler = { root: '', child: '' };

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
    atDocument().addEventListener(this.conf.root, (e: Event) => this.store.next(e));
  }

  public dispatch<T>(action: string, payload: T): void {
    const data: Payload<T> = { payload, action };
    const { CustomEvent } = atWindow();
    const event = new CustomEvent(this.conf.child, { detail: data });
    atDocument().dispatchEvent(event);
  }

  public listener<T>(action: string, fun: (payload: T) => void): Subscription {
    return this.state().subscribe(event => (event.action === action ? fun({ ...event.payload }) : null));
  }
}

export const EventHandler: EventHandlerInstance<EventHandlerAdapter> = {
  channel: (action: string) => new EventHandlerAdapter({ root: action, child: action }),
};
