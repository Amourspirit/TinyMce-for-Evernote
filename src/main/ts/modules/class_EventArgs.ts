/**
 * Interface for class EventArgs
 * @param cancel (required) Determins if the event is to be cancled somewhere in the bubble events
 */
export interface IEventArgs {
  /**
   * Determins if the event is to be cancled somewhere in the bubble events
   */
  cancel: boolean;
}
/**
 * Event args of Basic events
 */
export class EventArgs implements IEventArgs {
  public cancel: boolean = false;
}