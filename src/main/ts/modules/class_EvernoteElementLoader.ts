import { ElementLoader } from './class_ElementLoader';
import { ElementLoadJs } from './class_ElementLoadJs';
import { ElementLoad } from './class_ElementLoad';
import { ResourceTest } from './class_ResourceTest';
import { ElementLocation, DebugLevel } from './enums';
import { Log } from './class_Log';
import { appSettings } from './appSettings';
import tinymce from 'tinymce';
import { IEventArgs } from './class_EventArgs';
import { exceptionMessages } from './appResourceString';
import './ext';

export class EvernoteElementLoader extends ElementLoader {

  protected onBeforeStart(args: IEventArgs): void {
    // @debug start
    const methodName: string = 'onBeforeStart';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // @debug end
    if (args.cancel === true) {
      return;
    }
    this.testForResource('resTinyMce', 300, 30, 'tinymce');
    this.addLightbox();
    this.addTinyMce();
    // this.addJQuery();
    // this.addJqueryXpath();
    this.addLightBoxCss();
    // this.addIconCss();
    this.addTinyMceCss();
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
  private testForResource(key: string, timing: number = 500, attempts: number = 30, ...globalRes: string[]) {
    if (this.hasElement(key)) {
      this.dispose();
      throw new Error(String.Format(exceptionMessages.argKeyExist, 'key', key));
    }
    const lt: ResourceTest = new ResourceTest(timing, attempts, ...globalRes);
    this.addElement(key, lt);
  }
  // region tinyMceCss
  /**
   * This is the default CSS for TinyMCE. If this style sheet is not included then tinyMCE will not work when another style
   * is not applied. Such as using the tinyMCE skin_url option.
   */
  private addTinyMceCss(): void {
    const srcLink: string = `//cdnjs.cloudflare.com/ajax/libs/tinymce/${appSettings.tinyMceVersion}/skins/lightgray/skin.min.css`;
    const key: string = 'tinyMceCss';
    this.addStyleLink(key, srcLink, ElementLocation.head);
  }
  // end region tinyMceCss
  // #regon tinyMce
  private addTinyMce(): void {
    // @debug start
    const methodName: string = 'AddTinyMce';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // @debug end
    if (typeof (tinymce) === 'undefined') {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Could not find tinymce. Attempting to add via link injection.`); }
      // @debug end
      const pluginSrc: string = `//cdnjs.cloudflare.com/ajax/libs/tinymce/${appSettings.tinyMceVersion}/tinymce.min.js`;
      const elJs: ElementLoadJs = new ElementLoadJs({
        scriptLocation: ElementLocation.head,
        tyepName: ['jQuery'],
        src: pluginSrc
      });
      this.addElement('tinyMceJs', elJs);
    } else {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Found tinymce`); }
      // @debug end
    }
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
  // #end region tinyMce
  // #region Lightbox
  private addLightBoxCss(): void {
    // @debug start
    const methodName: string = 'addLightBoxCss';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // @debug end
    this.addStyle('LigthboxCss', this.getLigthboxCss(), ElementLocation.body);
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
  private getLigthboxCss(): string {
    const css = '// BUILD_INCLUDE("./scratch/css/lightbox.min.css")';
    return css;
  }
  private addLightbox() {
    // @debug start
    const methodName: string = 'EvernoteElementLoader.addStyleLink';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered`);
    }
    // @debug end
    const elDivGmbackDrop = new ElementLoad({
      scriptLocation: ElementLocation.body,
      elementCreate: {
        elementTag: 'div',
        elementAttributes: {
          class: 'gmbackdrop'
        }
      }
    });
    this.addElement('div.gmbackdrop', elDivGmbackDrop);
    const elMulti: ElementLoad = new ElementLoad({
      scriptLocation: ElementLocation.body,
      elementCreate: {
        elementTag: 'div',
        elementAttributes: {
          id: 'tinybox',
          class: 'gmbox gmbox-window'
        },
        childElements: [{
          elementTag: 'div',
          elementAttributes: {
            class: 'gmclose'
          },
          childElements: [{
            elementTag: 'span',
            elementAttributes: {
              class: 'gm-close-tooltip'
            },
            elementHtml: 'Click to close this editor. <br /><br />Changes will not be saved.'
          }]
        },
        {
          elementTag: 'div',
          elementAttributes: {
            id: appSettings.fullScreenRealId,
          },
          childElements: [{
            elementTag: 'textarea',
            elementAttributes: {
              id: appSettings.tinyId,
              rows: '18',
              cols: '66'
            }
          }]
        }]
      }
    });
    this.addElement('lightBoxHtml', elMulti);
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
  //  #end region Lightbox
  private addStyleLink(key: string, srcLink: string, elementLocation: ElementLocation = ElementLocation.head): void {
    // @debug start
    const methodName: string = 'EvernoteElementLoader.addStyleLink';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered`);
      Log.debug(`${methodName}: Adding Csslink for key: ${key} and src ${srcLink}`);
    }
    // @debug end
    const elCss = new ElementLoad({
      scriptLocation: elementLocation,
      elementCreate: {
        elementTag: 'link',
        elementAttributes: {
          type: 'text/css',
          href: srcLink,
          rel: 'stylesheet'
        }
      }
    });
    this.addElement(key, elCss);
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }

  private addStyle(key: string, styelcontent: string, elementLocation: ElementLocation = ElementLocation.head): void {
    // @debug start
    const methodName: string = 'EvernoteElementLoader.addStyle';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered`);
      Log.debug(`${methodName}: Adding Csslink for key: ${key}`);
    }
    // @debug end
    const elCss = new ElementLoad({
      scriptLocation: elementLocation,
      elementCreate: {
        elementTag: 'style',
        elementText: styelcontent,
        elementAttributes: {
          type: 'text/css'
        }
      }
    });
    this.addElement(key, elCss);
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
}