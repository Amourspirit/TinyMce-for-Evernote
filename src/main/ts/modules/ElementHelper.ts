import { Log } from './class_Log';
import { appSettings } from './appSettings';
import { IElementCreate } from './interfaces';
import { utilCreateElement } from './app_util';
import {
  DebugLevel,
  ElementLocation
} from './enums';

export const elementAddToDoc = (e: HTMLElement, nodeLocation: ElementLocation): void => {
  // @debug start
  const methodName: string = 'elementAddToDoc';
  const appDebugLevel = appSettings.debugLevel;
  const levelDebug = DebugLevel.debug;
  if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
  // @debug end
  const D: Document = document;
  let targ: Element;
  switch (nodeLocation) {
    case ElementLocation.body:
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Case body`); }
      // @debug end
      targ = D.getElementsByTagName('body')[0] || D.body;
      break;
    case ElementLocation.head:
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Case head`); }
      // @debug end
      targ = D.getElementsByTagName('head')[0] || D.head;
      break;
    default:
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Case default: body, documentelement`); }
      // @debug end
      targ = D.getElementsByTagName('body')[0] || D.body || D.documentElement;
      break;
  }
  targ.appendChild(e);
  // @debug start
  if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
  // @debug end
};
/**
 * Creates an Html element
 * @param elemtnType {ElementCreateTypes} The element type to create such as script, div, iframe
 * @param args {IElementCreate} Extra parameters such as type and any other parameters
 * @returns {HTMLElement} Element with any extra attributes set
 */
export const elementCreate = (args: IElementCreate): HTMLElement => {
  // @debug start
  const methodName: string = 'elementCreateScript';
  // Higher price to check using enumes each time so capture the values here
  const appDebugLevel = appSettings.debugLevel;
  const levelDebug = DebugLevel.debug;

  if (appDebugLevel >= levelDebug) {
    Log.debug(`${methodName}: Entered.`);
  }
  // @debug end

  const htmlNode: HTMLElement = utilCreateElement(args.elementTag); // D.createElement('script');
  if (args.elementAttributes) {
    for (const key in args.elementAttributes) {
      if (args.elementAttributes.hasOwnProperty(key)) {
        const value = args.elementAttributes[key];
        htmlNode.setAttribute(key, value);
      }
    }
  }
  if (args.elementText && args.elementText.length > 0) {
    htmlNode.textContent = args.elementText;
  }
  // @debug start
  if (appDebugLevel >= levelDebug) {
    Log.debug(`${methodName}: Leaving`);
  }
  // @debug end
  return htmlNode;
};
/**
  * Add Html Element passed in as e to the document
  * @param e The Html Element to append to document
  * @param nodeLocation determines what part of the document to append e.
  */
export const elementAppendText = (newText: string, e: HTMLElement): void => {
  if (e.textContent) {
    e.textContent += newText;
  } else {
    e.textContent = newText;
  }
};
