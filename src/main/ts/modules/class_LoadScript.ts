import { IScriptItem as IScriptItem } from './IScriptItem';
import { Settings as settings } from "./class_Settings";
import { Log as Log } from "./class_Log";

export class BigbyteLoader {
  constructor(parameters) {

  }
  static addJS_Node = (text: string, s_URL: string, funcToRun: string, runOnLoad: EventListenerOrEventListenerObject): void => {
    const D: Document = document;
    const scriptNode: HTMLScriptElement = D.createElement('script');
    if (runOnLoad) {
      scriptNode.addEventListener("load", runOnLoad, false);
    }
    scriptNode.type = "text/javascript";
    if (text) scriptNode.textContent = text;
    if (s_URL) scriptNode.src = s_URL;
    if (funcToRun) scriptNode.textContent = '(' + funcToRun + ')()';

    const targ: Element = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    targ.appendChild(scriptNode);
  };
  static addJS_NodeToBody = (text: string, s_URL: string, funcToRun: string, runOnLoad: EventListenerOrEventListenerObject): void => {
    const D: Document = document;
    const scriptNode: HTMLScriptElement = D.createElement('script');
    if (runOnLoad) {
      scriptNode.addEventListener("load", runOnLoad, false);
    }
    scriptNode.type = "text/javascript";
    if (text) scriptNode.textContent = text;
    if (s_URL) scriptNode.src = s_URL;
    if (funcToRun) scriptNode.textContent = '(' + funcToRun + ')()';

    const targ: Element = D.getElementsByTagName('body')[0] || D.body || D.documentElement;
    targ.appendChild(scriptNode);
  };

  static addCss_Node = (text: string, element: string): void => {
    element = typeof element !== undefined ? element : 'head';
    const D: Document = document;
    const scriptNode: HTMLStyleElement = D.createElement('style');
    scriptNode.type = "text/css";
    if (text) scriptNode.textContent = text;
    const targ: Element = D.getElementsByTagName(element)[0] || D.body || D.documentElement;
    targ.appendChild(scriptNode);
  };

  static addLink_Node = (href: string, type: string, rel: string): void => {
    type = typeof type !== undefined ? type : "text/css";
    rel = typeof rel !== undefined ? rel : "stylesheet";
    const D: Document = document;
    const scriptNode: HTMLLinkElement = D.createElement('link');
    scriptNode.type = type;
    scriptNode.href = href;
    if (rel) scriptNode.rel = rel;
    const targ: Element = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    targ.appendChild(scriptNode);
  };

  static addHtml_Node = (html: string): void => {
    const D: Document = document;
    var targ: Element = D.getElementsByTagName('body')[0] || D.body || D.documentElement;
    targ.insertAdjacentHTML('beforeend', html);
  };

  static loadScript = (scriptItm: IScriptItem): void => {

    if (typeof (scriptItm.count) == undefined) {
      scriptItm.count = 0;
    }
    if (typeof (scriptItm.loaded) == undefined) {
      scriptItm.loaded = false;
    }
    if (typeof (scriptItm.text) == undefined) {
      scriptItm.text = ''; // timeout in seconds
    }
    if (typeof (scriptItm.timeout) == undefined) {
      scriptItm.timeout = 30; // timeout in seconds
    }

    var bbScriptLoadedEvent = new CustomEvent(
      "bbScriptLoaded", {
        detail: {
          message: "Script Loaded",
          time: new Date(),
          scriptItm: scriptItm
        },
        bubbles: true,
        cancelable: false
      }
    );

    switch (scriptItm.type) {
      case 'linkedjs':
        let skipTest: boolean = false;
        if (typeof (scriptItm.testMethod) === undefined || (scriptItm.testMethod.length === 0)) {
          skipTest = true;
        }
        if (skipTest) {
          // there is no test for this item so we will and assume
          // all is fine/
          scriptItm.loaded = true;
          BigbyteLoader.addJS_Node(scriptItm.text, scriptItm.src, undefined, undefined);
          // trigger event for loaded

          //jQuery(document).trigger("bbScriptLoaded", scriptItm);
          document.dispatchEvent(bbScriptLoadedEvent);
          return;
        }
        scriptItm.count++;
        var maxCount = scriptItm.timeout * 10; // multply by 10 to convert into 10th of seconds

        if (scriptItm.count > maxCount) {
          Log.error(settings.shortName + ': unable to load script, Aborting: ', scriptItm.src);
          return;
        }
        var testmethod;
        try {
          testmethod = eval(scriptItm.testMethod);
        } catch (e) {
          testmethod = undefined;
        }
        if (typeof (testmethod) == undefined) {
          if (!scriptItm.loaded) {
            scriptItm.loaded = true;
            BigbyteLoader.addJS_Node(scriptItm.text, scriptItm.src, undefined, undefined);
          }
          setTimeout(function () {
            BigbyteLoader.loadScript(scriptItm);
          }, 100);
        } else {
          // script item is loaded trigger an evert
          document.dispatchEvent(bbScriptLoadedEvent);
        }
        break;
      case 'css':
        if (typeof (scriptItm.tag) == undefined) {
          scriptItm.tag = 'body'; // timeout in seconds
        }
        BigbyteLoader.addCss_Node(scriptItm.src, scriptItm.tag);
        document.dispatchEvent(bbScriptLoadedEvent);
        break;
      case 'csslink':
        BigbyteLoader.addLink_Node(scriptItm.src, undefined, undefined);
        document.dispatchEvent(bbScriptLoadedEvent);
        break;
      default:
        // statements_def
        break;
    }
  }
}
