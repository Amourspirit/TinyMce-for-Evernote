// tslint:disable-next-line
/// <reference path="../../../types/tinymce.code.d.ts" />

import $ from 'jquery';
import * as tinymce from 'tinymce';
// import tinymce from 'tinymce';
import { Log } from './class_Log';
import { appSettings } from './appSettings';
import { ITinyMceExternalPlugins } from './interfaces';
import { DebugLevel } from './enums';
// import { Clock } from './class_clock';
// import GM_config from 'GM_config';
declare const GM_config: any;

export class TinymceWork {
  public fullscreen: boolean = false;
  // tslint:disable-next-line
  private gmConfig: any = GM_config;
  // tslint:disable-next-line:no-empty
  public constructor() { }

  public init = (): void => {
    // @debug start
    const methodName: string = 'TinymceWork.init';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
    }
    // @debug end
    const ver: string = appSettings.tinyMceVersion;
    const id: string = appSettings.tinyId;
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: tinymce id: ${ver} Version: ${id}`); }
    // @debug end
    tinymce.PluginManager.load('lists', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/lists/plugin.min.js');

    const loadTable: boolean = this.gmConfig.get('tinymcePluginTable');
    if (loadTable) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding table to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('table', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/table/plugin.min.js');
    }
    const loadCharmap: boolean = this.gmConfig.get('tinymcePluginCharmap');
    if (loadCharmap) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding charmap to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('charmap', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/charmap/plugin.min.js');
    }
    const loadCode: boolean = this.gmConfig.get('tinymcePluginCode');
    if (loadCode) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding code to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('code', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/code/plugin.min.js');
    }
    const loadFullscreen: boolean = this.gmConfig.get('tinymcePluginFullscreen');
    if (loadFullscreen) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding fullscreen to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('fullscreen', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/fullscreen/plugin.min.js');
    }
    const loadEmoticons: boolean = this.gmConfig.get('tinymcePluginEmoticons');
    if (loadEmoticons) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding emoticons to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('emoticons', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/emoticons/plugin.min.js');
    }
    const loadWordcount: boolean = this.gmConfig.get('tinymcePluginWordcount');
    if (loadEmoticons) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding wordcount to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('wordcount', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/wordcount/plugin.min.js');
    }
    const loadPrint: boolean = this.gmConfig.get('tinymcePluginPrint');
    if (loadPrint) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding print to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('print', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/print/plugin.min.js');
    }
    const loadPreview: boolean = this.gmConfig.get('tinymcePluginPreview');
    if (loadPreview) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding preview to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('preview', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/preview/plugin.min.js');
    }
    const loadInsertdatetime: boolean = this.gmConfig.get('tinymcePluginInsertdatetime');
    if (loadInsertdatetime) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding insertdatetime to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('insertdatetime', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/insertdatetime/plugin.min.js');
    }
    const loadImage: boolean = this.gmConfig.get('tinymcePluginImage');
    if (loadImage) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding image to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('image', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/image/plugin.min.js');
    }
    const loadSearchreplace: boolean = this.gmConfig.get('tinymcePluginSearchreplace');
    if (loadSearchreplace) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding searchreplace to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('searchreplace', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/searchreplace/plugin.min.js');
    }
    const loadAdvlist: boolean = this.gmConfig.get('tinymcePluginAdvlist');
    if (loadAdvlist) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding advlist to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('advlist', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/advlist/plugin.min.js');
    }
    const loadBbcode: boolean = this.gmConfig.get('tinymcePluginBbcode');
    if (loadBbcode) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding bbcode to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('bbcode', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/bbcode/plugin.min.js');
    }
    const loadVisualblocks: boolean = this.gmConfig.get('tinymcePluginVisualblocks');
    if (loadVisualblocks) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding visualblocks to tinymce plugins`); }
      // @debug end
      tinymce.PluginManager.load('visualblocks', 'https://cdn.tinymce.com/4/plugins/visualblocks/plugin.min.js');
    }
    const loadVisualchars: boolean = this.gmConfig.get('tinymcePluginVisualchars');
    if (loadVisualchars) {
      // @debug start
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Adding visualchars to tinymce plugins`); }
      // @debug end
      // tinyMCE.PluginManager.load('visualchars', 'https://cdn.tinymce.com/4/plugins/visualchars/plugin.min.js');
      tinymce.PluginManager.load('visualchars', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/visualchars/plugin.min.js');
    }
    const loadHilite: boolean = this.gmConfig.get('tinymcePluginHilite');
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
    const toolbar1: string = 'mysave myexit insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent';
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
    const tinyMceInit: tinymce.Settings = {
      selector: 'textarea#' + id,
      // entity_encoding: 'named',
      // entities: '160,nbsp',
      // init_instance_callback: "BIGBYTE.USERSCRIPT.STHL.TMCE.callback",
      init_instance_callback: () => {
        $('.mce-i-mysave').addClass('fi-save');
        // add x icon to button
        $('.mce-i-myexit').addClass('fi-x');
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
      // extended_valid_elements : "span[!class]",
      inline: false,
      browser_spellcheck: true,
      plugins: '',
      menubar: 'edit insert format view tools' + (loadTable ? ' table' : ''),
      toolbar: [toolbar1, toolbar2],
      // external_plugins: null,
      content_css: 'https://www.evernote.com/js/tinymce/skins/lightgray/content.min.css',
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
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: tinymce.init being called with param`, tinyMceInit); }
    // @debug end
    tinymce.init(tinyMceInit);
    /*
            let gmTinyMceTimerCounter: number = 0;
            const gmTinyMceTimer = setInterval(() => {
                gmTinyMceTimerCounter++;
                Log.message(appSettings.shortName + ': try no. ' + gmTinyMceTimerCounter + ' looking for tinymce');
                if (typeof (tinymce) !== 'undefined') {
                    Log.message(appSettings.shortName + ': found tinymce library');
                    // tinyMceTimer.dispose();
                    clearInterval(gmTinyMceTimer);
                }
                // set a limit to how many time we check for tinymce
                if (gmTinyMceTimerCounter >= 20) {
                    Log.message(appSettings.shortName + ': reached max value for finding TinyMCE');
                    // tinyMceTimer.dispose();
                    clearInterval(gmTinyMceTimer);
                }
            }, 500);
     */
    // @debug start
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Leaving`);
    }
    // @debug end
  }
}