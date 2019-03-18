import { BaseElementLoad } from './abstract_class_BaseElementLoad';
import { IIntervalEventArgs } from './class_IntervalEventArgs';
import { appSettings } from './appSettings';
import { Log } from './class_Log';
import { IElementCreate } from './interfaces';
import {
  DebugLevel,
  ElementLocation
} from './enums';
import { elementCreate, elementAddToDoc } from './ElementHelper';
/**
 * Arguments of instance of ElementJsLoad class
 * @param scriptLocation {ElementLocation} (rquired) The location to inject the script such as head or body.
 * @param functionToRun {string} (optional) The function to run after the script is loaded
 * @param tyepName {string} (optional) Be the name of any object such as JQ, $, jQyery
 * @param textContent {string} (optional) text/html to add to the element content.
 * @param src {string} (optional) src for the Html Element like //cdn.jsdelivr.net/npm/jquery/@3.3.1/dist/jquery.min.js
 */
export interface IElementJsLoadArgs {
  /**
   * The location to inject the script such as head or body.
   */
  scriptLocation: ElementLocation;
  /**
   * The function to run after the script is loaded
   */
  functionToRun?: string;
  /**
   * The type name to check for onTick.
   *
   * Be the name of any object such as JQ, $, jQyery
   */
  tyepName?: string;
  /**
   * text/html to add to the element content.
   */
  textContent?: string;
  /**
   * src for the Html Element like
  ```
  //cdn.jsdelivr.net/npm/jquery/@3.3.1/dist/jquery.min.js
  ```
   */
  src?: string;
}
/**
 * Class for manageing adding of Javascript to document.
 * Javascript can be added as script using ElementLocation.textContent
 * or as linked js using ElementLocation.src in the constructor
 */
export class ElementLoadJs extends BaseElementLoad {
  private lTestFuncton: string;
  /**
   * Createns a new instance of the class
   * @param args The arguments for the constructor
   * @param args.scriptLocation {ElementLocation} (rquired) The location to inject the script such as head or body.
   * @param args.functionToRun {string} (optional) The function to run after the script is loaded
   * @param args.tyepName {string} (optional) Be the name of any object such as JQ, $, jQyery
   * @param args.textContent {string} (optional) text/html to add to the element content.
   * @param args.src {string} (optional) src for the Html Element like //cdn.jsdelivr.net/npm/jquery/@3.3.1/dist/jquery.min.js
   */
  public constructor(args: IElementJsLoadArgs) {
    super();
    const textContent: string = args && args.textContent || '';
    const src: string = args && args.src || '';
    this.lTestFuncton = args && args.tyepName || '';
    if (textContent.length + src.length === 0) {
      throw new Error('src or textContent muse included in the args');
    }
    const eArgs: IElementCreate = {
      elementTag: 'script',
      // elementType: 'text/javascript',
      // elementSrc: args.src,
      elementText: args.textContent,
      elementAttributes: {
        src: (args.src || ''),
        type: 'text/javascript'
      }
    };
    const eHtml: HTMLElement = elementCreate(eArgs); // this.elementCreateScript(eArgs);
    const functionToRun: string = args && args.functionToRun || '';
    if (functionToRun.length > 0) {
      eHtml.addEventListener('load', () => {
        const functionHtml: HTMLElement = elementCreate({
          elementTag: 'script',
          elementText: functionToRun,
          elementAttributes: {
            type: 'text/javascript'
          }
        }); // document.createElement('script');
        // functionHtml.textContent = functionToRun;
        elementAddToDoc(functionHtml, args.scriptLocation);
      });
      // this.elementAppendText(`(${functionToRun})()`, eHtml);
    }
    elementAddToDoc(eHtml, args.scriptLocation);
  }
  /**
   * Overrides super method to capture onTick events
   * @param eventArgs The event args for the event
   *
   * If there is no script function to test the edOnScriptAdded is dispatched right awaway.
   * In this case there would only be one tick.
   *
   * If eventargs.cancel property is set to true for thie method then
   * the event onTick will not dispatch
   */
  protected onTickTock(eventArgs: IIntervalEventArgs): void {
    // @debug start
    const methodName: string = 'ScriptJsNode.onTickTock';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;

    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered.`); }
    Log.debug(`${methodName} try no ${this.count}`);
    // @debug end
    if (this.lTestFuncton.length > 0) {
      if (this.fnAsStringExist(this.lTestFuncton) === true) {
        this.elementLoaded.dispatch(this, eventArgs);
        this.dispose();
      } else {
        // @debug start
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Try no ${this.count}, Unable to find test function: ${this.lTestFuncton}`); }
        // @debug end
        this.elementLoaded.dispatch(this, eventArgs);
        this.dispose();
      }
    } else {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: There is no function to test for. Dispatching OnScriptAdded`); }
      // @debug end
      this.elementLoaded.dispatch(this, eventArgs);
      this.dispose();
    }
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving: count: ${this.count}`); }
    // @debug end
  }
  /**
  * Overrides super method to capture onExpired events
  * @param eventArgs The event args for the event
  *
  * If eventargs.cancel property is set to true for thie method then
  * the event onExpired will not dispatch
  */
  protected onTickExpired(eventArgs: IIntervalEventArgs): void {
    // @debug start
    const methodName: string = 'ScriptJsNode.onExpired';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;

    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
    }
    Log.debug(`${methodName} try no ${this.count}`);
    Log.debug(`${methodName}: Leaving.`);
    // @debug end
    return;
  }
}