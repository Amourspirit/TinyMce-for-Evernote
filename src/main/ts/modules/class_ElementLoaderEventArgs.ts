import { IIntervalEventArgs } from './class_IntervalEventArgs';
import { EventArgs } from './class_EventArgs';
export class ElementLoaderEventArgs extends EventArgs {
  public elementArgs: IIntervalEventArgs;
  public loadFailed: boolean = false;
  private lkey: string;
  private lInterval: number = 0;
  private lCount: number = 0;

  public constructor(key: string, elmArgs: IIntervalEventArgs) {
    super();
    this.lkey = key;
    this.elementArgs = elmArgs;
    this.lCount = elmArgs.count;
    this.lInterval = elmArgs.interval;
  }
  public get count(): number {
    return this.lCount;
  }
  public get key() {
    return this.lkey;
  }
  public get interval(): number {
    return this.lInterval;
  }
}
