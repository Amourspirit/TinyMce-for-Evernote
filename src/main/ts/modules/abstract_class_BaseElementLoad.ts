import { IntervalManual } from './class_InternalManual';
import { EventDispatcher, IEvent } from 'ste-events';
import { Interval } from './class_Interval';
import { IIntervalEventArgs } from './class_IntervalEventArgs';
import { utilFnAsStringExist, utilFnArrayExist } from './app_util';

/**
 * abstract class used to build ScriptLoaders.
 */
export abstract class BaseElementLoad extends IntervalManual {
  protected ptIsLoaded: boolean = false;
  protected elementLoaded = new EventDispatcher<Interval, IIntervalEventArgs>();
  // private lInterval: IntervalManual;
  /**
   * constructs a new instance of the class.
   * @constructor
   * @param interval {number} the number of milli seconds to wait between attempts to load a script. Default value 500
   * @param maxCount {number} the maximum number of trys to attempt adding script. Default value 30
   */
  public constructor(interval: number = 500, maxCount: number = 30) {
    super(interval, maxCount);
    // this.lInterval = new IntervalManual(interval, maxCount);
  }
  public onElementLoaded(): IEvent<Interval, IIntervalEventArgs> {
    return this.elementLoaded.asEvent();
  }

  /**
   * Test if a string value is a function in the global scope of a window
   * @param fnstring Function Name as string
   *
   * @link https://www.sitepoint.com/call-javascript-function-string-without-using-eval
   * @returns Returns true if the scring value matches a global function; otherwise false.
   */
  protected fnAsStringExist(fnstring: string): boolean {
    return utilFnAsStringExist(fnstring);
  }
/**
* Test if all functions in the fnArray exist in the global scope.
* @param fnArray An array of string function to test for existance
* @returns true if all function in the fnArray exist; Otherwise false.
*/
  protected fnArrayExist(fnArray: string[]): boolean {
    return utilFnArrayExist(fnArray);
  }
}