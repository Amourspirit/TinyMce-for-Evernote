import { Interval, IInterval } from './class_Interval';
import { appSettings } from './appSettings';
import { DebugLevel } from './enums';
import { Log } from './class_Log';

export interface IIntervalManual extends IInterval {
  isStarted: boolean;
  start(): void;
}
/**
 * An instance of this clas will not start the interval until the start() method is called.
 * @extends {Interval}
 */
export class IntervalManual extends Interval implements IIntervalManual {
  private lIsStarted: boolean = false;
  /**
   * Creates a new instance and starts the interval
   * @constructor
   * @param interval {number} time in milli seconds before each Interval is fired
   * @param maxCount {number} the maxium number of times to fire each interval before onExpired is fied
   */
  public constructor(interval: number, maxCount: number) {
    super(interval, maxCount);
  }
  /**
   * Starts the interval. Instances will not start the interval until this method is called.
   *
   * Calling this method on an instance more than once has no effect.
   */
  public start(): void {
    // @debug start
    const methodName: string = 'IntervalManual.start';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // @debug end
    if (this.isStarted === true) {
      return;
    }
    this.lIsStarted = true;
    super.startInterval();
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
  public dispose(): void {
    // @debug start
    const methodName: string = 'IntervalManual.dispose';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // @debug end
    this.lIsStarted = false;
    super.dispose();
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
  /**
   * Readonly property that gets if the start method has been called.
   */
  public get isStarted(): boolean {
    return this.lIsStarted;
  }
  // tslint:disable-next-line
  protected startInterval() {
    // intentionally left blank to override super
  }

}