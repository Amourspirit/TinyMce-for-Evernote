import { IIntervalEventArgs } from './class_IntervalEventArgs';
import { EventArgs } from './class_EventArgs';
export class ElementLoaderEventArgs extends EventArgs {
  public elementArgs: IIntervalEventArgs;
  public loadFailed: boolean = false;
  private lkey: string;

  public constructor(key: string, elmArgs: IIntervalEventArgs) {
    super();
    this.lkey = key;
    this.elementArgs = elmArgs;
  }
  public get key() {
    return this.lkey;
  }
}
