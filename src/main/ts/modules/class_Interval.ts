// import { IScriptItem } from './interfaces';
import { EventDispatcher, IEvent } from 'strongly-typed-events';
import { IntervalEventArgs, IIntervalEventArgs } from './class_IntervalEventArgs';
import { IDisposable } from './interfaces';

/**
 * Inerface used with Interval class
 */
export interface IInterval {
  onTick(): IEvent<Interval, IIntervalEventArgs>;
  onExpired(): IEvent<Interval, IIntervalEventArgs>;
}

/**
 * Inteval class Runs a timer and raises events based on the options used to construt an instanc.
 *
 * (Example)
```ts
const iv: Interval = new Interval(500, 10);
iv.onTick().subscribe((sender, args) => {
  Log.message(`Tick ${args.count}`);
});
iv.onExpired().subscribe((sender, args) => {
  Log.message(`Tick Expired ${args.count}`);
});
```
 */
export class Interval implements IInterval, IDisposable {
  /**
   * Protected Property of EventDispatcher
   */
  protected edOnTick = new EventDispatcher<Interval, IIntervalEventArgs>();
  /**
   * Protected Property of EventDispatcher
   */
  protected edOnTickExpired = new EventDispatcher<Interval, IIntervalEventArgs>();
  private lTick: number = 0;
  private lMaxTick: number;
  private lIntervalTime: number;
  private lInterval: NodeJS.Timeout | undefined;
  private lIsDisposed: boolean = false;
  /**
   * Creates a new instance and starts the interval
   * @constructor
   * @param interval {number} time in milli seconds before each Interval is fired
   * @param maxCount {number} the maxium number of times to fire each interval before onExpired is fied
   */
  public constructor(interval: number, maxCount: number) {
    this.lMaxTick = maxCount;
    this.lIntervalTime = interval;
    if (this.lIntervalTime < 1) {
      throw new RangeError('interval arg must be greater than 0');
    }
    if (this.lMaxTick < 1) {
      return;
    }
    this.startInterval();
  }

  // implement method by returning the dispatcher as
  // an IEvent to hide the dispatch method

  /**
   * Gets the event wihen interval fires
   * @returns {IEvent} an instance of IEvent
   ```ts
const iv: Interval = new Interval(500, 10);
iv.onTick().subscribe((sender, args) => {
  Log.message(`Tick ${args.count}`);
});
iv.onExpired().subscribe((sender, args) => {
  Log.message(`Tick Expired ${args.count}`);
});
```
   */
  public onTick(): IEvent<Interval, IIntervalEventArgs> {
    return this.edOnTick.asEvent();
  }

  /**
   * Gets the event wihen interval expires
   * @returns {IEvent} an instance of IEvent
   *
    *  (Example)
   ```ts
  const iv: Interval = new Interval(500, 10);
  iv.onTick().subscribe((sender, args) => {
  Log.message(`Tick ${args.count}`);
  });
  iv.onExpired().subscribe((sender, args) => {
  Log.message(`Tick Expired ${args.count}`);
  });
  ```
   */
  public onExpired(): IEvent<Interval, IIntervalEventArgs> {
    return this.edOnTickExpired.asEvent();
  }

  /**
   * Disposes of the instance.
   * calling dispose will stop the interval count and set instance dispose state to true.
   */
  public dispose(): void {
    if (this.lIsDisposed === true) {
      return;
    }
    try {
      if (this.lInterval) {
        clearInterval(this.lInterval);
      }
    } finally {
      this.lMaxTick = 0;
      this.lIntervalTime = 0;
      this.lMaxTick = 0;
      this.lIsDisposed = true;
    }
  }

  /**
   * Readonly Property that get the dispose state of the instance.
   *
   * This property will always return true once dispose() is called on the instance.
   */
  public get isDisposed(): boolean {
    return this.lIsDisposed;
  }
  public get count(): number {
    return this.lTick;
  }
  /**
   * Protected Method that starts the interval.
   *
   * This method sould only be overriden when the derived class needs to start the interval manually.
   *
   * example
  ```ts
  public start(): void {
    if (this.isStarted === true) {
      return;
    }
    this.lIsStarted = true;
    super.startInterval();
  }
  protected startInterval() {
    // intentionally left blank to override super
  }
  ```
   */
  protected startInterval() {
    this.lInterval = setInterval(() => {
      this.tick();
    }, this.lIntervalTime);
  }
  /**
   * Overridable method to capture onTick events in extended classes
   * @param eventArgs The event args for the event
   *
   * If eventargs.cancel property is set to true in extended classes for thie method then
   * the event onTick will not dispatch
   */
  protected onTickTock(eventArgs: IIntervalEventArgs): void {
    if (eventArgs.cancel === true) {
      return;
    }
    return;
  }
  /**
   * Overridable method to capture zll Tick events in extended classes
   * @param eventArgs The event args for the event
   *
   * If eventargs.cancel property is set to true in extended classes for thie method then
   * the event onTick will not dispatch
   */
  protected onTicks(eventArgs: IIntervalEventArgs): void {
    if (eventArgs.cancel === true) {
      return;
    }
    return;
  }
  /**
  * Overridable method to capture onExpired events in extended classes
  * @param eventArgs The event args for the event
  *
  * If eventargs.cancel property is set to true in extended classes for thie method then
  * the event onExpired will not dispatch
  */
  protected onTickExpired(eventArgs: IIntervalEventArgs): void {
    if (eventArgs.cancel === true) {
      return;
    }
    return;
  }
  private tick(): void {
    this.lTick += 1;
    const eventArgs: IIntervalEventArgs = new IntervalEventArgs(this.lTick, this.lIntervalTime);
    this.onTicks(eventArgs);
    if (this.isAtInterval()) {
      if (this.lInterval) {
        clearInterval(this.lInterval);
      }
      this.onTickExpired(eventArgs);
      if (eventArgs.cancel === true) {
        return;
      }
      this.edOnTickExpired.dispatch(this, eventArgs);
    } else {
      this.onTickTock(eventArgs);
      if (eventArgs.cancel === true) {
        return;
      }
      this.edOnTick.dispatch(this, eventArgs);
    }
  }
  private isAtInterval = (): boolean => {
    return this.lTick > this.lMaxTick;
  }
}
