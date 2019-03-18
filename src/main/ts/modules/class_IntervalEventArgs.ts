import { EventArgs, IEventArgs } from './class_EventArgs';
export interface IIntervalEventArgs extends IEventArgs {
  count: number;
  interval: number;
  // constructor(ticks: number, interval: number): void;
}
export class IntervalEventArgs extends EventArgs implements IIntervalEventArgs {
  private lCount: number;
  private lInterval: number;

  public get count() {
    return this.lCount;
  }
  public get interval() {
    return this.lInterval;
  }
  public constructor(ticks: number, interval: number = 0) {
    super();
    this.lCount = ticks;
    this.lInterval = interval;
  }
}