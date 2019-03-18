import { ElementLoader } from './class_ElementLoader';
import { ElementLoadCss } from './class_ElementLoadCss';
import { ElementLoadJs } from './class_ElementLoadJs';
import { ElementLoad } from './class_ElementLoad';
import { ElementLocation, DebugLevel } from './enums';
import { Log } from './class_Log';
import { appSettings } from './appSettings';
import tinymce from 'tinymce';
import { IEventArgs } from './class_EventArgs';
export class EvernoteElementLoader extends ElementLoader {
  protected onBeforeStart(args: IEventArgs): void {
    if (args.cancel === true) {
      return;
    }
    this.addTinyMce();
    this.addJQuery();
    this.addJqueryXpath();
    this.addLightBoxCss();
    this.addIconCss();
    this.addTinyMceCss();
  }

  // region tinyMceCss
  private addTinyMceCss(): void {
    const srcLink: string = `//cdnjs.cloudflare.com/ajax/libs/tinymce/${appSettings.tinyMceVersion}/skins/lightgray/skin.min.css`;
    const key: string = 'tinyMceCss';
    this.addCssLink(key, srcLink);
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
        tyepName: 'jQuery',
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
  // #region IconCSS
  private addIconCss(): void {
    // @debug start
    const methodName: string = 'addIconCss';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // @debug end
    const pluginSrc: string = '//cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css';
    const key: string = 'icons-css';
    this.addCssLink(key, pluginSrc);
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
  // #end region IconCSS
  // #region jQuery
  private addJQuery(): void {
    // @debug start
    const methodName: string = 'addJQuery';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // @debug end
    if (typeof (jQuery) === 'undefined') {
      // @debug start
      const pluginSrc: string = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js';
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Attempting to add jquery link: ${pluginSrc}`); }
      // @debug end

      const elJs: ElementLoadJs = new ElementLoadJs({
        scriptLocation: ElementLocation.head,
        tyepName: 'jQuery',
        src: pluginSrc
      });
      this.addElement('jQuery', elJs);
    } else {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: No need to load jQuery already loaded`); }
      // @debug end
    }
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
  // #end region jQuery
  // #region jQuery.Xpath
  private addJqueryXpath(): void {
    // @debug start
    const methodName: string = 'addJqueryXpath';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // @debug end
    let xpathAlreadyExist: boolean = false;
    try {
      if (typeof (jQuery().xpath) === 'function') {
        xpathAlreadyExist = true;
      }
    } catch (error) {
      // @debug start
      Log.debug(`${methodName}: JQuery does not exist yet`);
      // @debug end
    }
    if (xpathAlreadyExist === true) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: No need to load jQuery.Xpath already loaded`); }
      // @debug end
    } else {
      // @debug start
      const pluginSrc: string = 'https://cdn.jsdelivr.net/npm/jquery-xpath@0.3.1/jquery.xpath.min.js';
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Attempting to add jquery link: ${pluginSrc}`); }
      // @debug end
      const elJs: ElementLoadJs = new ElementLoadJs({
        scriptLocation: ElementLocation.head,
        tyepName: 'jQuery().xpath',
        src: pluginSrc
      });
      this.addElement('jQueryXpath', elJs);
    }
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
  // #end region jQuery.Xpath
  // #region Lightbox
  private addLightBoxCss(): void {
    const elCss = new ElementLoadCss({
      scriptLocation: ElementLocation.head,
      textContent: this.getLigthboxCss()
    });
    this.addElement('LigthboxCss', elCss);
  }
  private getLigthboxCss(): string {
    const css = '// BUILD_INCLUDE("./scratch/css/lightbox.min.css")';
    return css;
  }
  //  #end region Lightbox
  private addCssLink(key: string, srcLink: string): void {
    // @debug start
    const methodName: string = 'addIconCss';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // @debug end
    const elCss = new ElementLoad({
      scriptLocation: ElementLocation.head,
      elementCreate: {
        elementTag: 'style',
        elementAttributes: {
          type: 'text/css',
          src: srcLink
        }
      }
    });
    this.addElement(key, elCss);
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
}