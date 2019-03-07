import { IScriptItem } from './Interfaces';
import { ScriptItem } from './class_ScriptItem';
import { Settings as appSettings } from './class_Settings';
import { Log as Log } from './class_Log';
import { DebugLevel } from './enums';

export class BigbyteLoader {
  public static currentScritp: ScriptItem;
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
    // @debug start
    const methodName: string = 'BigbyteLoader.loadScript';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.Debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered in ${methodName}.`); }
    // @debug end
    if (!(BigbyteLoader.currentScritp) || (BigbyteLoader.currentScritp.isDisposed === true)) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Creating a new instance of ScriptItem for BigbyteLoader.currentScritp:`, scriptItem.name); }
      // @debug end
      BigbyteLoader.currentScritp = new ScriptItem(scriptItem);
      if (BigbyteLoader.currentScritp.timeout === 0) {
        BigbyteLoader.currentScritp.timeout = 30;
      }
    }
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: scriptItem param:`, BigbyteLoader.currentScritp); }
    // @debug end

    const bbScriptLoadedEvent = new CustomEvent(
      'bbScriptLoaded', {
        detail: {
          message: 'Script Loaded',
          time: new Date(),
          scriptItm: BigbyteLoader.currentScritp
        },
        bubbles: true,
        cancelable: false
      }
    );
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: switch test for: ${BigbyteLoader.currentScritp.type}`); }
    // @debug end
    switch (BigbyteLoader.currentScritp.type) {
      case 'linkedjs':
        let skipTest: boolean = false;
        if (typeof (BigbyteLoader.currentScritp.testMethod) === 'undefined' || (BigbyteLoader.currentScritp.testMethod.length === 0)) {
          skipTest = true;
        }
        // @debug start
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: skipTest for adding script:`, skipTest); }
        // @debug end
        if (skipTest) {
          // there is no test for this item so we will and assume
          // all is fine/
          BigbyteLoader.currentScritp.loaded = true;
          BigbyteLoader.addJsNode(BigbyteLoader.currentScritp.text, BigbyteLoader.currentScritp.src);
          // trigger event for loaded
          // @debug start
          if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Dispatching event bbScriptLoaded`); }
          // @debug end
          document.dispatchEvent(bbScriptLoadedEvent);
          return;
        }
        BigbyteLoader.currentScritp.count++;
        const maxCount: number = BigbyteLoader.currentScritp.timeout * 10; // multply by 10 to convert into 10th of seconds

        if (BigbyteLoader.currentScritp.count > maxCount) {
          Log.error(appSettings.shortName + ': unable to load script, Aborting: ', BigbyteLoader.currentScritp.src);
          return;
        }
        let testmethod: any;
        const evilEval = eval; // this doe to get around tslint no eval
        try {
          // @debug start
          if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Trying Evil Eval`); }
          // @debug end
          // tslint:disable-next-line
          testmethod = evilEval(BigbyteLoader.currentScritp.testMethod);
        } catch (e) {
          testmethod = 'undefined';
          Log.error(`${appSettings.shortName}: loadScript: Error running Eval:`, e);
        }
        if (typeof (testmethod) === 'undefined') {
          // @debug start
          if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Undefined Test method`); }
          // @debug end
          if (!BigbyteLoader.currentScritp.loaded) {
            BigbyteLoader.currentScritp.loaded = true;
            BigbyteLoader.addJsNode(BigbyteLoader.currentScritp.text, BigbyteLoader.currentScritp.src);
          }
          setTimeout(() => {
            // @debug start
            if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Loading script via timer`, BigbyteLoader.currentScritp.name); }
            if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving due tp timer.`); }
            // @debug end
            BigbyteLoader.loadScript(BigbyteLoader.currentScritp);
          }, 100);
          // BigbyteLoader.currentScritp.dispose();
        } else {
          // script item is loaded trigger an evert
          // @debug start
          if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Dispatching event bbScriptLoaded`); }
          // @debug end
          document.dispatchEvent(bbScriptLoadedEvent);
        }
        break;
      case 'css':
        // @debug start
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Attempting to load css`); }
        // @debug end
        if (typeof (BigbyteLoader.currentScritp.tag) === 'undefined') {
          BigbyteLoader.currentScritp.tag = 'body'; // timeout in seconds
        }
        BigbyteLoader.addCssNode(BigbyteLoader.currentScritp.src, BigbyteLoader.currentScritp.tag);
        // @debug start
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Dispatching event bbScriptLoaded`); }
        // @debug end
        document.dispatchEvent(bbScriptLoadedEvent);
        break;
      case 'csslink':
        // @debug start
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Attempting to load css link`); }
        // @debug end
        BigbyteLoader.addLinkNode(BigbyteLoader.currentScritp.src);
        // @debug start
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Dispatching event bbScriptLoaded`); }
        // @debug end
        document.dispatchEvent(bbScriptLoadedEvent);
        break;
      default:
        // @debug start
        if (appDebugLevel >= levelDebug) { Log.debugWarn(`${methodName}: Failed to Load Script: ${BigbyteLoader.currentScritp.name}. Case Default was hit!`); }
        // @debug end
        // statements_def
        break;
    }
    BigbyteLoader.currentScritp.dispose();
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
    return;
  }
  private constructor() { }
}
