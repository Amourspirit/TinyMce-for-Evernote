// tslint:disable-next-line
/// <reference path="../../../types/tinymce.code.d.ts" />

import $ from 'jquery';
import * as tinymce from 'tinymce';
// import tinymce from 'tinymce';
import { Log } from './class_Log';
import { appSettings } from './appSettings';
import { ITinyMceExternalPlugins, IKeyAny } from './interfaces';
import { DebugLevel } from './enums';
import { GmConfig } from './class_GmConfig';
// import { Clock } from './class_clock';
// import GM_config from 'GM_config';
declare const GM_config: any;

export class TinymceWork {
  public fullscreen: boolean = false;
  // tslint:disable-next-line
  private gmConfig: any = GM_config;
// #region [ publicPropArrow ]
  public init = (): void => {
    // @debug start
    const methodName: string = 'TinymceWork.init';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered`);
    }
    // @debug end
    const gmSet: GmConfig = new GmConfig();

    const ver: string = appSettings.tinyMceVersion;
    const id: string = appSettings.tinyId;
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: tinymce id: ${ver} Version: ${id}`); }
    // @debug end
    tinymce.PluginManager.load('lists', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/lists/plugin.min.js');

    const loadTable: boolean = gmSet.tinymcePluginTable;
    if (gmSet.tinymcePluginTable) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding table to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('table', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/table/plugin.min.js');
    }
    const loadCharmap: boolean = gmSet.tinymcePluginCharmap;
    if (loadCharmap) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding charmap to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('charmap', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/charmap/plugin.min.js');
    }
    const loadCode: boolean = gmSet.tinymcePluginCode;
    if (loadCode) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding code to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('code', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/code/plugin.min.js');
    }
    const loadFullscreen: boolean = gmSet.tinymcePluginFullscreen;
    if (loadFullscreen) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding fullscreen to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('fullscreen', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/fullscreen/plugin.min.js');
    }
    const loadEmoticons: boolean = gmSet.tinymcePluginEmoticons;
    if (loadEmoticons) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding emoticons to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('emoticons', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/emoticons/plugin.min.js');
    }
    const loadWordcount: boolean = gmSet.tinymcePluginWordcount;
    if (loadEmoticons) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding wordcount to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('wordcount', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/wordcount/plugin.min.js');
    }
    const loadPrint: boolean = gmSet.tinymcePluginPrint;
    if (loadPrint) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding print to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('print', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/print/plugin.min.js');
    }
    const loadPreview: boolean = gmSet.tinymcePluginPreview;
    if (loadPreview) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding preview to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('preview', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/preview/plugin.min.js');
    }
    const loadInsertdatetime: boolean = gmSet.tinymcePluginInsertdatetime;
    if (loadInsertdatetime) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding insertdatetime to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('insertdatetime', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/insertdatetime/plugin.min.js');
    }
    const loadImage: boolean = gmSet.tinymcePluginImage;
    if (loadImage) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding image to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('image', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/image/plugin.min.js');
    }
    const loadSearchreplace: boolean = gmSet.tinymcePluginSearchreplace;
    if (loadSearchreplace) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding searchreplace to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('searchreplace', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/searchreplace/plugin.min.js');
    }
    const loadAdvlist: boolean = gmSet.tinymcePluginAdvlist;
    if (loadAdvlist) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding advlist to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('advlist', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/advlist/plugin.min.js');
    }
    const loadBbcode: boolean = gmSet.tinymcePluginBbcode;
    if (loadBbcode) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding bbcode to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('bbcode', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/bbcode/plugin.min.js');
    }
    const loadVisualblocks: boolean = gmSet.tinymcePluginVisualblocks;
    if (loadVisualblocks) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding visualblocks to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('visualblocks', 'https://cdn.tinymce.com/4/plugins/visualblocks/plugin.min.js');
    }
    const loadVisualchars: boolean = gmSet.tinymcePluginVisualchars;
    if (loadVisualchars) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding visualchars to tinymce plugins`); }
      // @debug end
      // tinyMCE.PluginManager.load('visualchars', 'https://cdn.tinymce.com/4/plugins/visualchars/plugin.min.js');
      tinymce.PluginManager.load('visualchars', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/visualchars/plugin.min.js');
    }
    const loadHilite: boolean = gmSet.tinymcePluginHilite;
    if (loadHilite) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding hilite to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('hilite', 'https://cdn.jsdelivr.net/gh/Amourspirit/TinyMCE-Plugin-hilite@9b2a96752b5162187315e07047a7c0efd706145c/js/plugin.min.js');
    }
    const tinyMceExternalPlugins: ITinyMceExternalPlugins = {
      textcolor: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/textcolor/plugin.min.js',
      colorpicker: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/colorpicker/plugin.min.js',
      nonbreaking: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/nonbreaking/plugin.min.js',
      hr: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/hr/plugin.min.js',
      link: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/link/plugin.min.js'
    };
    const loadFont = gmSet.tinymceFontsDisplay;

    let toolbar1: string = 'mysave myexit | ';
    if (loadFont) {
      toolbar1 += 'fontselect fontsizeselect | ';
    }
    toolbar1 += 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent';
    let toolbar2: string = (loadFullscreen ? 'fullscreen ' : '');
    toolbar2 += (loadPrint ? 'print ' : '');
    toolbar2 += (loadPreview ? 'preview ' : '');
    toolbar2 += '| forecolor backcolor | ';
    toolbar2 += (loadPreview ? 'insertdatetime ' : '');
    toolbar2 += (loadTable ? 'table ' : '');
    toolbar2 += (loadSearchreplace ? 'searchreplace ' : '');
    toolbar2 += '| link ' + (loadImage ? 'image ' : '');
    toolbar2 += (loadEmoticons ? ' emoticons' : '');
    toolbar2 += (loadCharmap ? ' | charmap' : '');
    toolbar2 += (loadCode ? ' | code' : '');
    toolbar2 += (loadVisualchars ? ' | visualchars' : '');
    toolbar2 += (loadVisualblocks ? ' | visualblocks' : '');
    toolbar2 += (loadHilite ? ' | hilite' : '');
    const toolbars: Array<string> = [];
    if (gmSet.tinymceToolbars === 'one') {
      toolbar1 += ' | ' + toolbar2;
      toolbars.push(toolbar1);
    } else {
      toolbars.push(toolbar1, toolbar2);
    }
    const tinyMceInit: tinymce.Settings = {
      selector: 'textarea#' + id,
      // entity_encoding: 'named',
      // entities: '160,nbsp',
      // init_instance_callback: "BIGBYTE.USERSCRIPT.STHL.TMCE.callback",
      init_instance_callback: () => {
        $('.mce-i-mysave').addClass('save-s');
        // add x icon to button
        // $('.mce-i-myexit').addClass('fi-x');
        $('.mce-i-myexit').addClass('exit-x');
        // @debug start
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Triggering Event tinymceInit`); }
        // @debug end
        $(document).trigger('tinymceInit', {
          type: 'tinymceInit',
          message: 'init',
          time: new Date(),
          tinyMceId: id
        });
      },
      height: 260,
      // skin_url: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.1.0/skins/lightgray/',
      inline: false,
      browser_spellcheck: true,
      plugins: '',
      menubar: 'edit insert format view tools' + (loadTable ? ' table' : ''),
      toolbar: toolbars,
      // external_plugins: null,
      content_css: '',
      // tslint:disable-next-line
      content_style: "// BUILD_INCLUDE('./scratch/css/tinymce-content.min.css')",
      // valid_elements: 'ol ul',
      // extended_valid_elements: 'ol[|class|style] ul[class|style]',
      keep_styles: false,
      setup: (ed) => {
        // Add a custom button
        ed.on('FullscreenStateChanged', (e) => {
          this.fullscreen = e.state;
          $(document).trigger('tinymceFullScreen', {
            type: 'tinymceFullScreen',
            message: 'fullscreen toogle',
            time: new Date(),
            state: e.state,
            tinyMceId: id

          });

        });
        ed.addButton('mysave', {
          title: 'Save',
          onclick: () => {
            $(document).trigger('tinymceSave', {
              type: 'tinymceSave',
              message: 'save',
              time: new Date(),
              tinyMceId: id
            });
          }
        });
        ed.addButton('myexit', {
          title: 'Close',
          onclick: () => {
            $(document).trigger('tinymceCancel', {
              type: 'tinymceCancel',
              message: 'cancel',
              time: new Date(),
              tinyMceId: id
            });
          }
        });
      }
    };
    // Load the default fonts and sizes Used by Evernote
    if (loadFont) {
      tinyMceInit.font_formats = 'Gotham=gotham,helvetica,sans-serif;Georgia=georgia,palatina,serif;Helvetica=helvetica,arial,sans-serif;Courier New=courier new,courier,monospace;';
      tinyMceInit.font_formats += 'Times New Roman=times new roman,times,serif;Trebuchet=trebuchet ms,geneva,sans-serif;Verdena=verdana,helvetica,sans-serif;';
      tinyMceInit.fontsize_formats = '8pt 10pt 12pt 14pt 18pt 24pt 36pt';
    }

    const themeOpt: string = this.gmConfig.get('tinymceTheme') + '';
    switch (themeOpt) {
      case 'Modern White':
        tinyMceInit.skin_url = 'https://cdn.jsdelivr.net/gh/rbecheras/tinymce-skin-modern-light-flat@dd311f2e26b2d23f15caeecca364bfcd1c40f500/light';
        break;
      case 'Modern two':
        tinyMceInit.skin_url = 'https://cdn.jsdelivr.net/gh/Vodzo/tinymce_theme@b1f6cc5afd13d939cb81844b8cf2edde151de998';
        break;
      case 'Charcoal':
        tinyMceInit.skin_url = 'https://cdn.jsdelivr.net/gh/Vodzo/tinymce_charcoal_theme@8d5f045120f09011d8d4c19dcebeed93932edb13';
        break;
      case 'SS4':
        tinyMceInit.skin_url = 'https://cdn.jsdelivr.net/gh/DrMartinGonzo/tinymce-ss4-theme@5442568702bf1b03453e4f161d1bd5d4e79d45e0/client/dist/TinyMCE_ss4';
        break;
      default:
        tinyMceInit.skin_url = '';
        break;
    }
    tinyMceInit.plugins = (tinyMceInit.plugins + ' -lists').trim();
    if (loadTable) {
      tinyMceInit.plugins = (tinyMceInit.plugins + ' -table').trim();
    }
    if (loadCharmap) {
      tinyMceInit.plugins = (tinyMceInit.plugins + ' -charmap').trim();
    }
    if (loadCode) {
      tinyMceInit.plugins = (tinyMceInit.plugins + ' -code').trim();
      tinyMceInit.code_dialog_width = parseInt(GM_config.get('tinymcePluginCodeWidth'), 10);
      tinyMceInit.code_dialog_height = parseInt(GM_config.get('tinymcePluginCodeHeight'), 10);
    }
    if (loadFullscreen) {
      tinyMceInit.plugins = (tinyMceInit.plugins + ' -fullscreen').trim();
    }
    if (loadEmoticons) {
      tinyMceInit.plugins = (tinyMceInit.plugins + ' -emoticons').trim();
    }
    if (loadWordcount) {
      tinyMceInit.plugins = (tinyMceInit.plugins + ' -wordcount').trim();
    }
    if (loadPrint) {
      tinyMceInit.plugins = (tinyMceInit.plugins + ' -print').trim();
    }
    if (loadPreview) {
      tinyMceInit.plugins = (tinyMceInit.plugins + ' -preview').trim();
    }
    if (loadInsertdatetime) {
      tinyMceInit.plugins = (tinyMceInit.plugins + ' -insertdatetime').trim();
    }
    if (loadImage) {
      tinyMceInit.plugins = (tinyMceInit.plugins + ' -image').trim();
    }
    if (loadSearchreplace) {
      tinyMceInit.plugins = (tinyMceInit.plugins + ' -searchreplace').trim();
    }
    if (loadAdvlist) {
      tinyMceInit.plugins = (tinyMceInit.plugins + ' -advlist').trim();
    }
    if (loadBbcode) {
      tinyMceInit.plugins = (tinyMceInit.plugins + ' -bbcode').trim();
    }
    if (loadVisualblocks) {
      tinyMceInit.plugins = (tinyMceInit.plugins + ' -visualblocks').trim();
    }
    if (loadVisualchars) {
      tinyMceInit.plugins = (tinyMceInit.plugins + ' -visualchars').trim();
    }
    if (loadHilite) {
      tinyMceInit.plugins = (tinyMceInit.plugins + ' -hilite').trim();
    }

    tinyMceInit.external_plugins = tinyMceExternalPlugins;
    tinyMceInit.style_formats_merge = true;
    tinyMceInit.style_formats = this.getStyleFormats();
    // tinyMceInit.content_style = 'body {padding: 10px}';
    // tinyMceInit.extended_valid_elements = 'div[*]';
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: tinymce.init being called with param`, [tinyMceInit]); }
    // @debug end
    tinymce.init(tinyMceInit);
    // @debug start
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Leaving`);
    }
    // @debug end
  }
  // #endregion
  private getStyleFormats() {
    const sFmt = [];
    sFmt.push(this.getBlockContainers());
    sFmt.push(this.getFormatBlocks());
    return sFmt;
  }
  private getBlockContainers() {
    const c =  { title: 'Containers', items: [
      { title: 'section', block: 'section', wrapper: true, merge_siblings: false },
      { title: 'article', block: 'article', wrapper: true, merge_siblings: false },
      { title: 'blockquote', block: 'blockquote', wrapper: true },
      { title: 'hgroup', block: 'hgroup', wrapper: true },
      { title: 'aside', block: 'aside', wrapper: true },
      { title: 'figure', block: 'figure', wrapper: true }
    ] };
    return c;
  }
  private getFormatBlocks(): {} {
    const containers: IKeyAny = {
      title: 'Formated Blocks'
     };
    containers.items = [];

    containers.items.push(this.getFormatCodeBlock());
    return containers;
  }
  private getFormatCodeBlock() {
    const codeBlock = {
      title: 'Code Block', block: 'div', wrapper: true, merge_siblings: true,
      styles: {
        'box-sizing': 'border-box',
        'padding': '8px',
        'font-family': 'Monaco, Menlo, Consolas, \'Courier New\', monospace',
        'font-size': '12px',
        'color': '#333333',
        'border-radius': '4px',
        'background-color': '#fbfaf8',
        'border': '1px solid rgba(0, 0, 0, 0.15)',
        '-en-codeblock': 'true' // this is removed by tinyMCE
      }
    };
    return codeBlock;
  }
}