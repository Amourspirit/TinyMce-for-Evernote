import { IIntervalEventArgs } from './class_IntervalEventArgs';

export class ElementLoaderEventArgs {
  public elementArgs: IIntervalEventArgs;
  public cancel: boolean = false;
  private lkey: string;

  public constructor(key: string, elmArgs: IIntervalEventArgs) {
    this.lkey = key;
    this.elementArgs = elmArgs;
  }
  public get key() {
    return this.lkey;
  }
}
