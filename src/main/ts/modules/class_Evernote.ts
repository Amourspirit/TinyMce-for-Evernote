// tslint:disable-next-line
/// <reference path='../../../../node_modules/@types/jquery/JQuery.d.ts'/>
// tslint:disable-next-line
/// <reference path="../../../types/jquery.tagName.d.ts" />
// tslint:disable-next-line
/// <reference path="../../../types/jquery.xpath.d.ts" />
// tslint:disable-next-line
// <reference path="../../../types/gmconfig.d.ts" />
// tslint:disable-next-line
/// <reference path="../../../types/tinymce.code.d.ts" />
// import GM_config from 'GM_config';
declare const GM_config: any;
import $ from 'jquery';
import { appSettings } from './appSettings';
import { Log } from './class_Log';
import { TinymceWork } from './class_Iinymce';
import tinymce from 'tinymce';
import { DebugLevel } from './enums';
import { IntervalManual } from './class_InternalManual';

export class Evernote {
  private btnSelector: string = '';
  private iframeSelector: string = '';
  private noteSelector: string = '';
  private tinymceDivId = '';
  private fullScreen: boolean = false;
  private TMCE: TinymceWork = new TinymceWork();

  public init = (): void => {
    this.allScriptsLoaded();
  }
  public onTinymceInit = (e: any): void => {
    Log.message(appSettings.shortName + ': Tiny Mce Init was triggered');
  }

  public onTinymceSave = (e: any, data: any): void => {
    // @debug start
    const methodName: string = 'Evernote.onTinymceSave';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;

    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
      if (!data) {
        Log.error(`${methodName}: data seems to be null`);
      } else if (data.tinyMceId !== appSettings.tinyId) {
        Log.debugWarn(`${methodName}: data.tinyMcid Parameter does not match expected value of ${appSettings.tinyId}. e, data params`, [e, data]);
      }
    }
    // @debug end
    if (data.tinyMceId === appSettings.tinyId) {
      this.save();
      this.lightBoxReset();
      const ed: tinymce.Editor = tinymce.EditorManager.editors[data.tinyMceId];
      if (!ed) {
        Log.error(`${methodName}: Editor was not found and is null. Param e, data`, [e, data]);
      }
      ed.setContent(''); // clean up tinyMCE
    }
    // @debug start
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Leaving.`);
    }
    // @debug end
  }

  public onTinymceCancel = (e: any, data: any): void => {
    // @debug start
    const methodName: string = 'Evernote.onTinymceCancel';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;

    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
      if (!data) {
        Log.error(`${methodName}: data seems to be null`);
      } else if (data.tinyMceId !== appSettings.tinyId) {
        Log.debugWarn(`${methodName}: data.tinyMcid Parameter does not match expected value of ${appSettings.tinyId}. e, data params`, [e, data]);
      }
    }
    // @debug end
    if (data.tinyMceId === appSettings.tinyId) {
      const ed: tinymce.Editor = tinymce.EditorManager.editors[data.tinyMceId];
      if (!ed) {
        Log.error(`${methodName}: Editor was not found and is null. Params e, data`, [e, data]);
      }
      const confirm: boolean = GM_config.get('tinymceConfirmNoSaveExit');
      if (confirm) {
        if (this.confirmExit()) {
          this.lightBoxReset();
          ed.setContent(''); // clean up tinyMCE
        }
      } else {
        this.lightBoxReset();
        ed.setContent(''); // clean up tinyMCE
      }
    }
    // @debug start
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Leaving.`);
    }
    // @debug end
  }

  public onTinyMceFulllscreen = (e: any, data: any): void => {
    // @debug start
    const methodName: string = 'Evernote.onTinyMceFulllscreen';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;

    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
      if (!data) {
        Log.error(`${methodName}: data seems to be null`);
      } else if (data.tinyMceId !== appSettings.tinyId) {
        Log.debugWarn(`${methodName}: data.tinyMcid Parameter does not match expected value of ${appSettings.tinyId}. e, data params`, [e, data]);
      } else {
        Log.debug(`${methodName}: param data`, data);
      }
    }
    // @debug end
    if (data.tinyMceId === appSettings.tinyId) {
      // getTinymceDivId in not being used at this point but may be in the future.
      this.getTinymceDivId();
      this.fullScreen = e.state;
      if (data.state) {
        // remove the class that keeps the window centered if needed
        if ($('#tinybox').hasClass('gmbox-window')) {
          $('#tinybox').removeClass('gmbox-window');
        }
      } else {
        // add the class that keeps the window centered if needed
        if (!$('#tinybox').hasClass('gmbox-window')) {
          $('#tinybox').addClass('gmbox-window');
        }
      }
    }
    // @debug start
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Leaving.`);
    }
    // @debug end
  }
  /*
  * Event Handler that fires when all scripts are loaded
  * this is main loading point for the script.
  */
  private allScriptsLoaded(): void {
    // @debug start
    const methodName: string = 'Evernote.allScriptsLoaded';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered`);
    }
    // @debug end
    Log.message(appSettings.shortName + ': all scripts have been loaded.');
    this.btnSelector = '//*[@id="gwt-debug-NoteAttributesView-root"]/div[1]/div[1]';
    // #en-common-editor-iframe is chrome selector, firefox is different
    // if ($.browser.chrome) {
    if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())) {
      // setup for Chrome
      this.iframeSelector = '.RichTextArea-entinymce';
      this.noteSelector = 'body';
    } else {
      // setup for Firefox
      this.iframeSelector = '.RichTextArea-entinymce';
      this.noteSelector = 'body';
    }
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: calliing ensuringPlugins()`); }
    // @debug end
    this.ensurePlugins();
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: calliing addToolbarButton()`); }
    // @debug end
    this.addToolbarButton();

    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: adding custom event handlers`); }
    // @debug end
    $(document).on('editBtnAdded', this.onEditBtnAdded);
    $(document).on('tinymceInit', this.onTinymceInit);
    $(document).on('tinymceSave', this.onTinymceSave);
    $(document).on('tinymceCancel', this.onTinymceCancel);
    $(document).on('tinymceFullScreen', this.onTinyMceFulllscreen);

    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: calliing writeLightBox()`); }
    // @debug end
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: calliing init on TinyMceWork class instance of TMCE`); }
    // @debug end
    this.TMCE.init();

    // set the width of the popup TinyMce editor from settings
    // get the padding of .gmbox
    const intGmboxPadLeft: number = parseInt($('.gmbox').css('padding-left'), 10);
    const intGmboxPadRight: number = parseInt($('.gmbox').css('padding-right'), 10);
    // get the set value for thw width
    // tslint:disable-next-line
    let intTinymceWidth: number = parseInt(GM_config.get('tinymceWidth'), 10);

    // calc the over all width
    intTinymceWidth = intTinymceWidth - (intGmboxPadLeft + intGmboxPadRight);
    // assign the width to the style
    $('.gmbox-window').width(intTinymceWidth);
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: .gmbox-window class width`, [intTinymceWidth]); }
    // @debug end
    // set the cancel function for TinyMce popup
    $('.gmclose').click(() => {
      // @debug start
      if (appDebugLevel >= levelDebug) {
        Log.debug(`${methodName}: .gmclose click function entered`);
        Log.debug(`${methodName}: .gmclose click function tinyID`, [appSettings.tinyId]);
        Log.debug(`${methodName}: .gmclose click triggering tinymceCancel custom eveent`);
      }
      // @debug end
      $(document).trigger('tinymceCancel', {
        message: 'cancel',
        tinyMceId: appSettings.tinyId
      });
    });
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }

  private onEditBtnAdded(): void {
    // @debug start
    const methodName: string = 'Evernote.onEditBtnAdded';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
    }
    // @debug end
    Log.message(appSettings.shortName + ': onEditBtnAdded event fired');
    this.addButtonClick();
    // @debug start
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Leaving.`);
    }
    // @debug end
  }
  private addButtonClick(): void {
    // @debug start
    const methodName: string = 'Evernote.addButtonClick';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
    }
    // @debug end
    // const lib: Evernote = this;
    if ($('#gm-edit-btn').length) {
      $('#gm-edit-btn').click((): void => {
        const k: any = appSettings.tinyId;
        const ed: tinymce.Editor = tinymce.EditorManager.editors[k];
        if (this.fullScreen) {
          ed.execCommand('mceFullScreen');
        }
        ed.setContent($(this.iframeSelector).contents().find(this.noteSelector).html());
        $('.gmbackdrop, .gmbox').animate({
          opacity: '.50'
        }, 300, 'linear');
        $('.gmbox').animate({
          opacity: '1.00'
        }, 300, 'linear');
        $('.gmbackdrop, .gmbox').css('display', 'block');
      });
      Log.message(`${appSettings.shortName}: Edit Button Click added`);
    } else {
      Log.error(`${appSettings.shortName}: addButtonClick: #gm-edit-btn was not found`);
    }
    // @debug start
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Leaving.`);
    }
    // @debug end
  }

  private addToolbarButton(): void {
    // @debug start
    const methodName: string = 'Evernote.addToolbarButton';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
    }
    // @debug end

    const ivm = new IntervalManual(500, 20);
    let tickCount = 0;
    ivm.onTick().subscribe((sender, args): void => {
      tickCount++;
      Log.message(`${appSettings.shortName}: try no. ${tickCount} to find element for button pacement`);
      const objElement: any = $(document.body).xpath(this.btnSelector);
      if (objElement.length) {
        ivm.dispose();
        Log.message(`${appSettings.shortName}: Found element for button placement on ${tickCount} try`);
        // add my own toolbar button
        objElement.append(this.createToolbarHtml());
        this.onEditBtnAdded();
      }
    });
    ivm.onExpired().subscribe((sender, args): void => {
      Log.error(`${methodName}: unable to located selector for main button after ${args.count} attempts`);
    });
    ivm.start();
    // @debug start
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Leaving.`);
    }
    // @debug end
  }
  private createToolbarHtml(): string {
    // tslint:disable-next-line
    const css = '';// `BUILD_INCLUDE('./scratch/text/buttonstyle.txt')`;
    const btnHtml: string = `// BUILD_INCLUDE('./scratch/html/gm-edit-btn.html')[asJsString]`;
    let html: string = '';
    html += `<div tabindex="0" id="gm-tb" title="Edit with TinyMCE" style="${css}">${btnHtml}</div>`;
    return html;
  }

  /*
   * resets the lightbox back to hidden state
   */
  private lightBoxReset(): void {
    $('.gmbackdrop, .gmbox').animate({
      opacity: '0'
    }, 300, 'linear', (): void => {
      $('.gmbackdrop, .gmbox').css('display', 'none');
    });
    $('textarea#gminput').val(''); // clean up textarea
  }
  private confirmExit = (): boolean => {
    return confirm('Are you sure you want to close this editor?');
  }

  private save = (): void => {
    // @debug start
    const methodName: string = 'Evernote.save';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
    }
    // @debug end
    const k: any = appSettings.tinyId;
    const ed: tinymce.Editor = tinymce.EditorManager.editors[k];
    const e: any = ed.getContent();
    $('.gmbackdrop, .gmbox').animate({
      opacity: '0'
    }, 300, 'linear', () => {
      $('.gmbackdrop, .gmbox').css('display', 'none');
    });
    const content: any = $(this.iframeSelector).contents().find(this.noteSelector);
    content.html(e);
    $('textarea#gminput').val(''), ed.setContent('');
    // @debug start
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Leaving.`);
    }
    // @debug end
  }

  // custom plugin for jquery that coverts tag name into lower case.
  private ensurePlugins(): void {
    if (typeof ($.fn.tagName) === 'undefined') {
      $.fn.tagName = function (toLower: any) {
        let tn: string = this.prop('tagName');
        if (toLower) {
          tn = tn.toLowerCase();
        }
        return tn;
      };
    }
  }
  /**
   * Get the id of the div generated by tinymce and stores that id in the property this.tinymceDivId once found.
   */
  private getTinymceDivId(): string {
    // @debug start
    const methodName: string = 'Evernote.onTinymceCancel';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;

    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
    }
    // @debug end
    if (this.tinymceDivId.length > 0) {
      return this.tinymceDivId;
    }
    const div = $(`div#${appSettings.fullScreenRealId} :first-child`);
    if (div.length > 0) {
      this.tinymceDivId = div.attr('id') + '';
    }
    // @debug start
    if (this.tinymceDivId.length > 0) {
      Log.debug(`${methodName}: Found custom tinymce div id: ${this.tinymceDivId}`);
    } else {
      Log.debugWarn(`${methodName}: Unable to find tinymce div id`);
    }
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving.`); }
    // @debug end
    return this.tinymceDivId;
  }
}