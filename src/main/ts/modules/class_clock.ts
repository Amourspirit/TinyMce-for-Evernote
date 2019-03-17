import {
  SimpleEventDispatcher,
  SignalDispatcher,
  EventDispatcher,
  IEvent
} from 'strongly-typed-events';
import { IDisposable } from './interfaces';

/*
 * This clock example shows how to use Strongly Typed Events
 * with interfaces.
 */

export interface IClock {
  OnTick(): IEvent<IClock, number>;
}

export class Clock implements IDisposable {
  private localOnTick = new SignalDispatcher();
  private localOnSequenceTick = new SimpleEventDispatcher<number>();
  private localOnClockTick = new EventDispatcher<Clock, number>();
  private localTicks: number = 0;
  private localTimer: NodeJS.Timeout;
  constructor(public name: string, timeout: number) {
    this.localTimer = setInterval(() => {
      this.localTicks += 1;
      this.localOnTick.dispatch();
      this.localOnSequenceTick.dispatch(this.localTicks);
      this.localOnClockTick.dispatch(this, this.localTicks);
    }, timeout);
  }

  public get onTick() {
    return this.localOnTick.asEvent();
  }

  public get onSequenceTick() {
    return this.localOnSequenceTick.asEvent();
  }

  public get onClockTick() {
    return this.localOnClockTick.asEvent();
  }
  public dispose() {
    clearInterval(this.localTimer);
    return;
  }
}