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
import { BigbyteLoader as Loader } from './class_LoadScript';
import { Settings as appSettings } from './class_Settings';
import { UserScriptUtil as usUtil } from './class_UserscriptUtil';
import { Util as util } from './class_util';
import { Log } from './class_Log';
import { TinyMceWork } from './class_Iinymce';
import tinymce from 'tinymce';
// import { IScriptItem } from './Interfaces';
import {
    IScriptItem,
    IKeyAny
} from './Interfaces';
import { DebugLevel } from './enums';

export class Evernote {
    private readonly lightBoxCss: string;
    private btnSelector: string = '';
    private iframeSelector: string = '';
    private noteSelector: string = '';
    private fullScreen: boolean = false;
    private scripts: IKeyAny = [];
    private TMCE: TinyMceWork = new TinyMceWork();

    public constructor() {
        this.lightBoxCss = '.gmbackdrop,.gmbox{position:absolute;display:none}.gmbackdrop{top:0;left:0;width:100%;height:100%;background:#000;opacity:0;';
        this.lightBoxCss += 'filter:alpha(opacity=0);z-index:201}.gmbox{background:#fff;z-index:202;padding:10px;';
        this.lightBoxCss += '-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-moz-box-shadow:0 0 5px #444;-webkit-box-shadow:0 0 5px #444;';
        this.lightBoxCss += 'box-shadow:0 0 5px #444}.gmclose{float:right;margin-right:6px;cursor:pointer}.mce-panel{border:none}div.gmbox .mce-panel{border:';
        this.lightBoxCss += ' 0 solid rgba(0,0,0,.2)}div.mce-tinymce.mce-container.mce-panel{margin-top:2em}div.mce-tinymce.mce-container.mce-panel.mce-fullscreen';
        this.lightBoxCss += '{margin-top:0}#gm-edit-btn{font-size:1.6em;color:#ABABAB;cursor:pointer;}#gm-edit-btn:hover{color:#2DBE60}';
        this.lightBoxCss += '.gmbox-window{top:50%;left:50%;transform: translate(-50%, -50%);position: absolute;';
        this.lightBoxCss += '}#gm-tb{display:inline-block;position:absolute;}';
    }
    public onMe = (e: any): void => {
        Log.debug('onMe called: param', e);
        Log.debug('onMe this: ', this);
    }

    public init = (): void => {
        // @debug start
        let methodName: string = '';
        // Higher price to check using enumes each time so capture the values here
        const appDebugLevel = appSettings.debugLevel;
        const levelDebug = DebugLevel.Debug;

        if (appDebugLevel >= levelDebug) {
            methodName = 'Evernote.init';
            Log.debug(`${methodName}: Entered in init.`);
        }
        // @debug end
        /*  if (window.top !== window.self) {
             return;
         } */
        if (typeof (tinymce) !== 'undefined') {
            appSettings.tinyMceVersion = tinymce.EditorManager.majorVersion + '.' + tinymce.EditorManager.minorVersion;
        }

        const tinyMceVer: string = appSettings.tinyMceVersion;
        Log.message(appSettings.shortName + ': tinyMCE Version', tinyMceVer);

        // var pluginSrc = '//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.0/jquery-1.8.0.min.js';
        const pluginSrc: string = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js';
        // https://github.com/ilinsky/jquery-xpath/
        const pluginXpathJq: string = 'https://cdn.jsdelivr.net/npm/jquery-xpath@0.3.1/jquery.xpath.min.js';

        if (document.addEventListener) { // For all major browsers, except IE 8 and earlier
            // @debug start
            if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding Event Listener: bbScriptLoaded`); }
            // @debug end
            document.addEventListener('bbScriptLoaded', this.onMe);
            document.addEventListener('bbScriptLoaded', this.onBbScriptLoaded);
            // @debug start
            if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding Event Listener: allScriptsLoaded`); }
            // @debug end
            document.addEventListener('allScriptsLoaded', this.onBbScriptLoaded);
        } else {
            // @debug start
            if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Failed adding Event Listener: allScriptsLoaded`); }
            // @debug end
        }

        if (typeof (jQuery) === 'undefined') {
            // @debug start
            if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Attempting to add jquery link: ${pluginXpathJq}`); }
            // @debug end
            this.addScript('jquery', pluginSrc, 'linkedjs', 'jQuery');
        } else {
            // @debug start
            if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: No need to load jQuery already loaded`); }
            // @debug end
        }
        if (typeof (jQuery().xpath) === 'undefined') {
            // @debug start
            if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Attempting to add jquery xpath link: ${pluginXpathJq}`); }
            // @debug end
            this.addScript('jqueryXpath', pluginXpathJq, 'linkedjs', 'jQuery().xpath');
        } else {
            // @debug start
            if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: No need to load jQuery xpath already loaded`); }
            // @debug end
        }
        // @debug start
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Attempting to icons-css`); }
        // @debug end
        this.addScript('icons-css', '//cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css', 'csslink');
        // @debug start
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Attempting to hilite-icons-css`); }
        // @debug end
        this.addScript('hilite-icons-css', '//api.bigbytetech.ca/js/hilite.css', 'csslink');
        // this.addScript('code-css','shi/css/shi_default.min.css','csslink');
        // tiny mce
        if (typeof (tinymce) === 'undefined') {
            // @debug start
            if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Could not find tinymce. Attempting to add via link injection.`); }
            // @debug end
            this.addScript('tinyMceJs', '//cdnjs.cloudflare.com/ajax/libs/tinymce/' + tinyMceVer + '/tinymce.min.js', 'linkedjs', 'tinyMCE');
        } else {
            // @debug start
            if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Found tinymce`); }
            // @debug end
        }
        // @debug start
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Attempting to add tinyMceCss`); }
        // @debug end
        this.addScript('tinyMceCss', '//cdnjs.cloudflare.com/ajax/libs/tinymce/' + tinyMceVer + '/skins/lightgray/skin.min.css', 'csslink');
        // @debug start
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Attempting to add lightboxcss`); }
        // @debug end
        this.addScript('lightboxcss', this.lightBoxCss, 'css', undefined, { tag: 'body' });
        // @debug start
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Calling ${methodName} loadScripts`); }
        // @debug end
        // this.addScript('tinymce_advanced_theme', '//cdnjs.cloudflare.com/ajax/libs/tinymce/' + tinyMceVer + '/themes/advanced/theme.min.js','linkedjs') // no checking required
        this.loadScripts();
        // @debug start
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
        // @debug end
    }

    /*
    * Event Handler that fires when all scripts are loaded
    * this is main loading point for the script.
    */
    public onAllScriptsLoaded = (e: any): void => {
        // @debug start
        let methodName: string = '';
        // Higher price to check using enumes each time so capture the values here
        const appDebugLevel = appSettings.debugLevel;
        const levelDebug = DebugLevel.Debug;
        if (appDebugLevel >= levelDebug) {
            methodName = 'onAllScriptsLoaded';
            Log.debug(`${methodName}: Entered.`);
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
        // this.lightBoxAddCss();
        this.writeLightBox();
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
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: .gmbox-window class width`, intTinymceWidth); }
        // @debug end
        // set the cancel function for TinyMce popup
        $('.gmclose').click(() => {
            // @debug start
            if (appDebugLevel >= levelDebug) {
                Log.debug(`${methodName}: .gmclose click function entered`);
                Log.debug(`${methodName}: .gmclose click function tinyID`, appSettings.tinyId);
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

    public onTinymceInit = (e: any): void => {
        Log.message(appSettings.shortName + ': Tiny Mce Init was triggered');
    }

    public onTinymceSave = (e: any): void => {
        // @debug start
        let methodName: string = '';
        // Higher price to check using enumes each time so capture the values here
        const appDebugLevel = appSettings.debugLevel;
        const levelDebug = DebugLevel.Debug;

        if (appDebugLevel >= levelDebug) {
            methodName = 'onTinymceSave';
            Log.debug(`${methodName}: Entered.`);
        }
        // @debug end
        if (e.tinyMceId === appSettings.tinyId) {
            this.save();
            this.lightBoxReset();
            const ed: tinymce.Editor = tinymce.EditorManager.editors[e.tinyMceId];
            ed.setContent(''); // clean up tinyMCE
        }
        // @debug start
        if (appDebugLevel >= levelDebug) {
            Log.debug(`${methodName}: Leaving.`);
        }
        // @debug end
    }

    public onTinymceCancel = (e: any, data: any) => {
        // @debug start
        let methodName: string = '';
        // Higher price to check using enumes each time so capture the values here
        const appDebugLevel = appSettings.debugLevel;
        const levelDebug = DebugLevel.Debug;

        if (appDebugLevel >= levelDebug) {
            methodName = 'onTinymceCancel';
            Log.debug(`${methodName}: Entered.`);
        }
        // @debug end
        if (data.tinyMceId === appSettings.tinyId) {
            const ed: tinymce.Editor = tinymce.EditorManager.editors[data.tinyMceId];
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

    public onTinyMceFulllscreen = (e: any) => {
        // @debug start
        let methodName: string = '';
        // Higher price to check using enumes each time so capture the values here
        const appDebugLevel = appSettings.debugLevel;
        const levelDebug = DebugLevel.Debug;

        if (appDebugLevel >= levelDebug) {
            methodName = 'onTinyMceFulllscreen';
            Log.debug(`${methodName}: Entered.`);
        }
        // @debug end
        if (e.tinyMceId === appSettings.tinyId) {
            this.fullScreen = e.state;
            if (e.state) {
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
     * Adds script item to the BIGBYTE.USERSCRIPT.EVERNOTE.scripts array
     * these are scripts tha will be loaded when the BIGBYTE.USERSCRIPT.EVERNOTE.init() is fired
     */
    private addScript = (sName: string, sSrc: string, objType: any, objTestMethod?: any, args?: any): void => {
        // @debug start
        const methodName: string = 'addScript';
        // Higher price to check using enumes each time so capture the values here
        const appDebugLevel = appSettings.debugLevel;
        const levelDebug = DebugLevel.Debug;
        if (appDebugLevel >= levelDebug) {
            Log.debug(`${methodName}: Entered.`);
        }
        // @debug end
        const newItm: IScriptItem = {
            name: sName,
            src: sSrc,
            type: objType,
            testMethod: (objTestMethod) ? objTestMethod : '',
            text: '',
            loaded: false,
            timeout: 30,
            tag: '',
            count: 0
        };
        if (args) {
            // @debug start
            if (appDebugLevel >= levelDebug) {
                Log.debug(`${methodName}: Attempting to add script:`, newItm);
            }
            // @debug end
            this.scripts[sName] = newItm;
        } else {
            // @debug start
            if (appDebugLevel >= levelDebug) {
                Log.debug(`${methodName}: Attempting to extend script:`, newItm);
            }
            // @debug end
            const extended: any = usUtil.extend(newItm, args);
            // @debug start
            if (appDebugLevel >= levelDebug) {
                Log.debug(`${methodName}: Extended script:`, extended);
            }
            // @debug end
            this.scripts[sName] = extended;
        }
        // @debug start
        if (appDebugLevel >= levelDebug) {
            Log.debug(`${methodName}: Leaving`);
        }
        // @debug end
    }

    /*
    * Function to check and see if there are any scripts left to be loaded
    * @returns boolean, true if all the scripts are loaded; Otherwise false
    */
    private isScriptsLoaded = (): boolean => {
        for (const key in this.scripts) {
            if (!this.scripts[key].loaded) {
                return false;
            }
        }
        return true;
    }

    private onBbScriptLoaded = (e: any): void => {
        // @debug start
        const methodName: string = 'onBbScriptLoaded';
        // Higher price to check using enumes each time so capture the values here
        const appDebugLevel = appSettings.debugLevel;
        const levelDebug = DebugLevel.Debug;
        if (appDebugLevel >= levelDebug) {
            Log.debug(`${methodName}: Entered.`);
            Log.debug(`${methodName}: Param e`, e);
        }
        // @debug end
        // delete the added script
        delete this.scripts[e.detail.scriptItm.name];
        const done: boolean = this.isScriptsLoaded();
        if (done) {
            const allScriptsLoaded = new CustomEvent(
                'allScriptsLoaded', {
                    detail: {
                        message: 'All Scripts Loaded',
                        time: new Date(),
                    },
                    bubbles: true,
                    cancelable: false
                }
            );
            // @debug start
            if (appDebugLevel >= levelDebug) {
                Log.debug(`${methodName}: Dispatching event allScriptsLoaded.`);
            }
            // @debug end
            document.dispatchEvent(allScriptsLoaded);
        } else {
            // @debug start
            if (appDebugLevel >= levelDebug) {
                Log.debug(`${methodName}: Calling loadScripts() to load next`);
            }
            // @debug end
            // add the next script
            this.loadScripts();
        }
        // @debug start
        if (appDebugLevel >= levelDebug) {
            Log.debug(`${methodName}: Leaving.`);
        }
        // @debug end
    }

    private onEditBtnAdded = (e: any): void => {
        // @debug start
        const methodName: string = 'onEditBtnAdded';
        // Higher price to check using enumes each time so capture the values here
        const appDebugLevel = appSettings.debugLevel;
        const levelDebug = DebugLevel.Debug;
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
    private addButtonClick = (): void => {
        // @debug start
        const methodName: string = 'addButtonClick';
        // Higher price to check using enumes each time so capture the values here
        const appDebugLevel = appSettings.debugLevel;
        const levelDebug = DebugLevel.Debug;
        if (appDebugLevel >= levelDebug) {
            Log.debug(`${methodName}: Entered.`);
        }
        // @debug end
        const lib: Evernote = this;
        if ($('#gm-edit-btn').length) {
            $('#gm-edit-btn').click((): void => {
                const k: any = appSettings.tinyId;
                const ed: tinymce.Editor = tinymce.EditorManager.editors[k];
                if (lib.fullScreen) {
                    ed.execCommand('mceFullScreen');
                }
                ed.setContent($(lib.iframeSelector).contents().find(lib.noteSelector).html());
                $('.gmbackdrop, .gmbox').animate({
                    opacity: '.50'
                }, 300, 'linear');
                $('.gmbox').animate({
                    opacity: '1.00'
                }, 300, 'linear');
                $('.gmbackdrop, .gmbox').css('display', 'block');
            });
            Log.message(appSettings.shortName + ': Edit Button Click added');
        }
        // @debug start
        if (appDebugLevel >= levelDebug) {
            Log.debug(`${methodName}: Leaving.`);
        }
        // @debug end
    }

    private addToolbarButton = (): void => {
        // @debug start
        const methodName: string = 'addToolbarButton';
        // Higher price to check using enumes each time so capture the values here
        const appDebugLevel = appSettings.debugLevel;
        const levelDebug = DebugLevel.Debug;
        if (appDebugLevel >= levelDebug) {
            Log.debug(`${methodName}: Entered.`);
        }
        // @debug end
        const lib = this;
        let gmCounter: number = 0;
        const gmTimer = setInterval((): void => {
            gmCounter++;
            Log.message(appSettings.shortName + ': try no. ' + gmCounter);
            // tslint:disable-next-line
            const objElement: any = $(document.body).xpath(lib.btnSelector);
            if (objElement.length) {
                Log.message(appSettings.shortName + ': Found element for button placement');
                // add my own toolbar button
                clearInterval(gmTimer);
                objElement.append(lib.createToolbarHtml());
                $(document).trigger('editBtnAdded', {
                    type: 'editBtnAdded',
                    message: 'Button Added',
                    time: new Date()
                });
            } else {
                Log.message(appSettings.shortName + ': Unable to find element for button placement');
            }
            if (gmCounter >= 20 || objElement.length > 0) {
                clearInterval(gmTimer);
            }
        }, 500);
        // @debug start
        if (appDebugLevel >= levelDebug) {
            Log.debug(`${methodName}: Leaving.`);
        }
        // @debug end
    }
    private createToolbarHtml = (): string => {
        const btnHtml: string = this.createToolbarEditBtn();
        let html: string = '';
        html += '<div id="gm-tb" title="Edit with TinyMCE" class="' + this.btnSelector + '">' + btnHtml + '</div>';
        return html;
    }

    private createToolbarEditBtn = (): string => {
        const html: string = '<div id="gm-edit-btn" style="display:inline-block;" name="gm-edit-btn" class="gm-btn"><i class="fi-page-edit"></i></div>';
        return html;
    }
    private getLightBoxHtml = (id?: string, title?: string): string => {
        id = typeof id !== 'undefined' ? id : appSettings.tinyId;
        title = typeof title !== 'undefined' ? title : '';
        let html: string = '<div class="gmbackdrop"></div>';
        html += '<div id="tinybox" class="gmbox gmbox-window"><div class="gmclose"><i class="fi-x" style="color:black"></i></div>';
        html += title;
        html += '<textarea id="' + id + '" rows="18" cols="68"></textarea>';
        html += '</div></div>';
        return html;
    }
    private writeLightBox = (id?: string, title?: string): void => {
        const html: string = this.getLightBoxHtml(id, title);
        Loader.addHtmlNode(html);
    }
    /*
     * resets the lightbox back to hidden state
     */
    private lightBoxReset = (): void => {
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
        const methodName: string = 'save';
        // Higher price to check using enumes each time so capture the values here
        const appDebugLevel = appSettings.debugLevel;
        const levelDebug = DebugLevel.Debug;
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

    private loadScripts = (): void => {
        // @debug start
        let methodName: string = 'Evernote.loadScripts';
        // Higher price to check using enumes each time so capture the values here
        const appDebugLevel = appSettings.debugLevel;
        const levelDebug = DebugLevel.Debug;
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered.`); }
        // @debug end
        let count: number = 0;
        for (const key in this.scripts) {
            if (this.scripts.hasOwnProperty(key)) {
                const script: IScriptItem = this.scripts[key];
                // @debug start
                if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Attempting to add script:`, script); }
                // @debug end
                count++;
                if (count > 1) {
                    return;
                }
                Loader.loadScript(script);
            }
        }
        // @debug start
        if (appDebugLevel >= levelDebug) {
            methodName = util.getMethodName(() => this.init);
            Log.debug(`${methodName}: Exiting ${methodName}.`);
        }
        // @debug end
    }
    // custom plugin for jquery that coverts tag name into lower case.
    private ensurePlugins = () => {
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
}