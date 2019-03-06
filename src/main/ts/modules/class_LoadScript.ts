import { IScriptItem as IScriptItem } from './Interfaces';
import { Settings as appSettings } from './class_Settings';
import { Log as Log } from './class_Log';
import { DebugLevel } from './enums';

export class BigbyteLoader {

  public static addJsNode = (text: string, sUrl: string, funcToRun?: string, runOnLoad?: EventListenerOrEventListenerObject): void => {
    const methodName: string = 'addJsNode';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.Debug;

    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
      Log.debug(`${methodName}: Working on .`, text, sUrl);
    }
    const D: Document = document;
    const scriptNode: HTMLScriptElement = D.createElement('script');
    if (runOnLoad) {
      scriptNode.addEventListener('load', runOnLoad, false);
    }
    scriptNode.type = 'text/javascript';
    if (text && (text.length > 0)) {
      scriptNode.textContent = text;
    }
    if (sUrl && (sUrl.length > 0)) {
      scriptNode.src = sUrl;
    }
    if (funcToRun && (funcToRun.length > 0)) {
      scriptNode.textContent = '(' + funcToRun + ')()';
    }
    const targ: Element = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    targ.appendChild(scriptNode);
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Leaving.`);
    }
  }

  public static addJsNodeToBody = (text: string, sUrl?: string, funcToRun?: string, runOnLoad?: EventListenerOrEventListenerObject): void => {
    const methodName: string = 'addJsNodeToBody';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.Debug;

    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
      Log.debug(`${methodName}: Working on .`, text, sUrl);
    }
    const D: Document = document;
    const scriptNode: HTMLScriptElement = D.createElement('script');
    if (runOnLoad) {
      scriptNode.addEventListener('load', runOnLoad, false);
    }
    scriptNode.type = 'text/javascript';
    if (text && (text.length > 0)) {
      scriptNode.textContent = text;
    }
    if (sUrl && (sUrl.length > 0)) {
      scriptNode.src = sUrl;
    }
    if (funcToRun && (funcToRun.length > 0)) {
      scriptNode.textContent = '(' + funcToRun + ')()';
    }

    const targ: Element = D.getElementsByTagName('body')[0] || D.body || D.documentElement;
    targ.appendChild(scriptNode);
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Leaving.`);
    }
  }

  public static addCssNode = (text: string, element: string): void => {
    const methodName: string = 'addCssNode';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.Debug;

    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
      Log.debug(`${methodName}: Working on .`, text, element);
    }
    element = typeof element !== 'undefined' ? element : 'head';
    const D: Document = document;
    const scriptNode: HTMLStyleElement = D.createElement('style');
    scriptNode.type = 'text/css';
    scriptNode.textContent = text;
    const targ: Element = D.getElementsByTagName(element)[0] || D.body || D.documentElement;
    targ.appendChild(scriptNode);
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Leaving.`);
    }
  }

  public static addLinkNode = (href: string, type?: string, rel?: string): void => {
    const methodName: string = 'addLinkNode';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.Debug;

    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
      Log.debug(`${methodName}: Working on .`, href);
    }
    type = typeof type !== 'undefined' ? type : 'text/css';
    rel = typeof rel !== 'undefined' ? rel : 'stylesheet';
    const D: Document = document;
    const scriptNode: HTMLLinkElement = D.createElement('link');
    scriptNode.href = href;
    if (type && (type.length > 0)) {
      scriptNode.type = type;
    }
    if (rel && (rel.length > 0)) {
      scriptNode.rel = rel;
    }
    const targ: Element = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    targ.appendChild(scriptNode);
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Leaving.`);
    }
  }

  public static addHtmlNode = (html: string): void => {
    const methodName: string = 'addHtmlNode';
    // higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.Debug;

    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
      Log.debug(`${methodName}: Working on .`, html);
    }
    const D: Document = document;
    const targ: Element = D.getElementsByTagName('body')[0] || D.body || D.documentElement;
    targ.insertAdjacentHTML('beforeend', html);
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Leaving.`);
    }
  }

  public static loadScript = (scriptItem: IScriptItem): void => {
    const methodName: string = 'loadScript';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.Debug;

    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered in ${methodName}.`);
    }
    if (typeof (scriptItem.count) === 'undefined') {
      scriptItem.count = 0;
    }
    if (typeof (scriptItem.loaded) === 'undefined') {
      scriptItem.loaded = false;
    }
    if (typeof (scriptItem.text) === 'undefined') {
      scriptItem.text = ''; // timeout in seconds
    }
    if (typeof (scriptItem.timeout) === 'undefined') {
      scriptItem.timeout = 30; // timeout in seconds
    }
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: scriptItem param:`, scriptItem);
    }

    const bbScriptLoadedEvent = new CustomEvent(
      'bbScriptLoaded', {
        detail: {
          message: 'Script Loaded',
          time: new Date(),
          scriptItm: scriptItem
        },
        bubbles: true,
        cancelable: false
      }
    );

    switch (scriptItem.type) {
      case 'linkedjs':
        let skipTest: boolean = false;
        if (typeof (scriptItem.testMethod) === 'undefined' || (scriptItem.testMethod.length === 0)) {
          skipTest = true;
        }
        if (appDebugLevel >= levelDebug) {
          Log.debug(`${methodName}: skipTest for adding script:`, skipTest);
        }
        if (skipTest) {
          // there is no test for this item so we will and assume
          // all is fine/
          scriptItem.loaded = true;
          BigbyteLoader.addJsNode(scriptItem.text, scriptItem.src);
          // trigger event for loaded
          document.dispatchEvent(bbScriptLoadedEvent);
          return;
        }
        scriptItem.count++;
        const maxCount: number = scriptItem.timeout * 10; // multply by 10 to convert into 10th of seconds

        if (scriptItem.count > maxCount) {
          Log.error(appSettings.shortName + ': unable to load script, Aborting: ', scriptItem.src);
          return;
        }
        let testmethod: any;
        const evilEval = eval; // this doe to get around tslint no eval
        try {
          if (appDebugLevel >= levelDebug) {
            Log.debug(`${methodName}: Trying Evil Eval`);
          }
          // tslint:disable-next-line
          testmethod = evilEval(scriptItem.testMethod);
        } catch (e) {
          testmethod = 'undefined';
        }
        if (typeof (testmethod) === 'undefined') {
          if (appDebugLevel >= levelDebug) {
            Log.debug(`${methodName}: Undefined Test method`);
          }
          if (!scriptItem.loaded) {
            scriptItem.loaded = true;
            BigbyteLoader.addJsNode(scriptItem.text, scriptItem.src);
          }
          setTimeout(() => {
            if (appDebugLevel >= levelDebug) {
              Log.debug(`${methodName}: Loading script via timer`, scriptItem);
          }
            BigbyteLoader.loadScript(scriptItem);
          }, 100);
        } else {
          // script item is loaded trigger an evert
          if (appDebugLevel >= levelDebug) {
            Log.debug(`${methodName}: Script is loaded. Dispatching event`);
          }
          document.dispatchEvent(bbScriptLoadedEvent);
        }
        break;
      case 'css':
        if (appDebugLevel >= levelDebug) {
          Log.debug(`${methodName}: Attempting to load css`);
        }
        if (typeof (scriptItem.tag) === 'undefined') {
          scriptItem.tag = 'body'; // timeout in seconds
        }
        BigbyteLoader.addCssNode(scriptItem.src, scriptItem.tag);
        if (appDebugLevel >= levelDebug) {
          Log.debug(`${methodName}: Finished loading css and dispatching event`);
        }
        document.dispatchEvent(bbScriptLoadedEvent);
        break;
      case 'csslink':
        if (appDebugLevel >= levelDebug) {
          Log.debug(`${methodName}: Attempting to load css link`);
        }
        BigbyteLoader.addLinkNode(scriptItem.src);
        if (appDebugLevel >= levelDebug) {
          Log.debug(`${methodName}: Finished loading css link and dispatching event`);
        }
        document.dispatchEvent(bbScriptLoadedEvent);
        break;
      default:
        // statements_def
        break;
    }
  }
  private constructor() { }
}
