/**
 * Event args usded with all scripts are loaded
 */
export class ElementsLoadedArgs {
  public cancel: boolean = false;
  private lTotalScripts: number = 0;
  /**
   * Constructs a new instance
   * @param numOfScripts The total number of scripts loaded
   */
  constructor(numOfScripts: number) {
    this.lTotalScripts = numOfScripts;
  }
  /**
   * Gets all the script count of all the scripts that were loaded
   * @property totalNumberOfScripts
   */
  public get totalNumberOfScripts() {
    return this.lTotalScripts;
  }
}