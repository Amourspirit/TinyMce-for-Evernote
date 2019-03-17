export interface IIntervalEventArgs {
  cancel: boolean;
  count: number;
  interval: number;
}
export class IntervalEventArgs implements IIntervalEventArgs {
  public cancel: boolean = false;
  private lCount: number;
  private lInterval: number;

  public get count() {
    return this.lCount;
  }
  public get interval() {
    return this.lInterval;
  }
  public constructor(ticks: number, interval: number = 0) {
    this.lCount = ticks;
    this.lInterval = interval;
  }
}