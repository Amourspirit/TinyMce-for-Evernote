import { ElementsLoadedArgs } from './class_ElementsLoadedArgs';
/**
 * Event args usded with all scripts are loaded
 */
export class ElementsLoadFailArgs extends ElementsLoadedArgs {
  private lRemainingEvents: Array<string>;
  /**
   * Constructs a new instance
   * @param numOfScripts The total number of scripts loaded
   */
  constructor(numOfScripts: number, remainingScripts: Array<string>) {
    super(numOfScripts);
    this.lRemainingEvents = remainingScripts;
  }
  /**
   * Gets all scripts that failed to load
   * @property remainingEvents
   */
  public get remainingEvents(): Array<string> {
    return this.lRemainingEvents;
  }
}