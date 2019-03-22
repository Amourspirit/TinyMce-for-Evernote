import { Log } from './class_Log';
import { appSettings } from './appSettings';
import { DebugLevel } from './enums';

/**
   * Test if a string value is a function in the global scope of a window
   * @param fnstring Function Name as string
   *
   * @link https://www.sitepoint.com/call-javascript-function-string-without-using-eval
   * @returns Returns true if the scring value matches a global function; otherwise false.
   */
export const utilFnAsStringExist = (fnstring: string): boolean => {
  // @debug start
  const methodName: string = 'fnAsStringExist';
  // Higher price to check using enumes each time so capture the values here
  const appDebugLevel = appSettings.debugLevel;
  const levelDebug = DebugLevel.debug;

  if (appDebugLevel >= levelDebug) {
    Log.debug(`${methodName}: Entered.`);
  }
  Log.debug(`${methodName} Looking for function: ${fnstring}`);
  // @debug end
  // find object
  // see: https://stackoverflow.com/questions/42193262/element-implicitly-has-an-any-type-because-type-window-has-no-index-signatur
  const fn = (window as any)[fnstring];
  // is object a function?
  if (typeof fn === 'function') {
    // @debug start
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: found function: ${fnstring}.`);
      Log.debug(`${methodName}: Leaving.`);
    }
    // @debug end
    return true;
  } else {
    // @debug start
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: unable to find function: ${fnstring}.`);
      Log.debug(`${methodName}: Leaving.`);
    }
    // @debug end
    return false;
  }
};
/**
 * Test if all functions in the fnArray exist in the global scope.
 * @param fnArray An array of string function to test for existance
 * @returns true if all function in the fnArray exist; Otherwise false.
 */
export const utilFnArrayExist = (fnArray: string[]): boolean => {
  if (fnArray.length === 0) {
    return true;
  }
  let result: boolean = true;
  for (const fn in fnArray) {
    if (fnArray.hasOwnProperty(fn)) {
      const testFn = fnArray[fn];
      result = result && utilFnAsStringExist(testFn);
    }
  }
  return result;
};
export const utilCreateElement = <T extends HTMLElement>(tag: string): T => {
  const D: Document = document;
  // const val = ElementCreateTypes[eType];
  const node: T = (D as any).createElement(tag);
  return node;
};
/**
 * Gets a property/method name when object is passed in
 * @param obj The object ot get the property name of
 * stackoverflow link {@link https://stackoverflow.com/questions/38118137/get-name-of-class-method-in-typescript}
 * @returns Name of the current property or ''
 */
export const utilGetMethodName = (obj: any): string => {
  if (obj.name) {
    return obj.name;
  }

  let funcNameRegex = /function (.{1,})\(/;
  let results = (funcNameRegex).exec(obj.toString());
  let result: string | false | null | undefined = results && results.length > 1 && results[1];

  if (!result) {
    funcNameRegex = /return .([^;]+)/;
    results = (funcNameRegex).exec(obj.toString());
    result = results && results.length > 1 && results[1].split('.').pop();
  }
  return result || '';
};

/**
 * Cancels an event from taking place.
 * @param e the event to cancle
 * @see {@link https://webdevelopment2.com/the-secret-of-cancelling-and-stopping-events-using-javascript/ }
 */
export const utilCancelEvent = (e: any): void => {
  if (!e) { e = window.event; }
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
};

/**
 * Stops an event from taking place.
 * @param e the event to stop
 * @see {@link https://webdevelopment2.com/the-secret-of-cancelling-and-stopping-events-using-javascript/ }
 * stopEvent, well stops the event. Seriously, it stops the event from being called by other background elements.
 * Many elements may use the same event called by just one.
 * So stopping it here ensures that it doesn’t propagate * to the background elements. cancelEvent squashes the browser’s default behavior.
 */
export const utilStopEvent = (e: any): void => {
  if (!e) { e = window.event; }
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
};