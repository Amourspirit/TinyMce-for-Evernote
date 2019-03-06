// tslint:disable-next-line
/// <reference path="../../../types/tinymce.code.d.ts" />

import $ from 'jquery';
import * as tinymce from 'tinymce';
// import tinymce from 'tinymce';
import { Log } from './class_Log';
import { Settings as appSettings } from './class_Settings';
import { ITinyMceExternalPlugins } from './Interfaces';
// import { Clock } from './class_clock';
// import GM_config from 'GM_config';
declare const GM_config: any;

export class TinyMceWork {
  public fullscreen: boolean = false;
  // tslint:disable-next-line
  private gmConfig: any = GM_config;
  // tslint:disable-next-line:no-empty
  public constructor() {}

  public init = (): void => {
    let gmTinyMceTimerCounter: number = 0;
    const ver: string = appSettings.tinyMceVersion;
    const id: string = appSettings.tinyId;
    const lib: TinyMceWork = this;
    const gmTinyMceTimer = setInterval(() => {
      gmTinyMceTimerCounter++;
      Log.message(appSettings.shortName + ': try no. ' + gmTinyMceTimerCounter + ' looking for tinymce');
      if (typeof (tinymce) !== 'undefined') {
        Log.message(appSettings.shortName + ': found tinymce library');
        // tinyMceTimer.dispose();
        clearInterval(gmTinyMceTimer);

        tinymce.PluginManager.load('lists', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/lists/plugin.min.js');

        const loadTable: boolean = lib.gmConfig.get('tinymcePluginTable');
        if (loadTable) {
          tinymce.PluginManager.load('table', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/table/plugin.min.js');
        }
        const loadCharmap: boolean = lib.gmConfig.get('tinymcePluginCharmap');
        if (loadCharmap) {
          tinymce.PluginManager.load('charmap', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/charmap/plugin.min.js');
        }
        const loadCode: boolean = lib.gmConfig.get('tinymcePluginCode');
        if (loadCode) {
          tinymce.PluginManager.load('code', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/code/plugin.min.js');
        }
        const loadFullscreen: boolean = lib.gmConfig.get('tinymcePluginFullscreen');
        if (loadFullscreen) {
          tinymce.PluginManager.load('fullscreen', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/fullscreen/plugin.min.js');
        }
        const loadEmoticons: boolean = lib.gmConfig.get('tinymcePluginEmoticons');
        if (loadEmoticons) {
          tinymce.PluginManager.load('emoticons', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/emoticons/plugin.min.js');
        }
        const loadWordcount: boolean = lib.gmConfig.get('tinymcePluginWordcount');
        if (loadEmoticons) {
          tinymce.PluginManager.load('wordcount', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/wordcount/plugin.min.js');
        }
        const loadPrint: boolean = lib.gmConfig.get('tinymcePluginPrint');
        if (loadPrint) {
          tinymce.PluginManager.load('print', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/print/plugin.min.js');
        }
        const loadPreview: boolean = lib.gmConfig.get('tinymcePluginPreview');
        if (loadPreview) {
          tinymce.PluginManager.load('preview', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/preview/plugin.min.js');
        }
        const loadInsertdatetime: boolean = lib.gmConfig.get('tinymcePluginInsertdatetime');
        if (loadInsertdatetime) {
          tinymce.PluginManager.load('insertdatetime', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/insertdatetime/plugin.min.js');
        }
        const loadImage: boolean = lib.gmConfig.get('tinymcePluginImage');
        if (loadImage) {
          tinymce.PluginManager.load('image', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/image/plugin.min.js');
        }
        const loadSearchreplace: boolean = lib.gmConfig.get('tinymcePluginSearchreplace');
        if (loadSearchreplace) {
          tinymce.PluginManager.load('searchreplace', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/searchreplace/plugin.min.js');
        }
        const loadAdvlist: boolean = lib.gmConfig.get('tinymcePluginAdvlist');
        if (loadAdvlist) {
          tinymce.PluginManager.load('advlist', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/advlist/plugin.min.js');
        }
        const loadBbcode: boolean = lib.gmConfig.get('tinymcePluginBbcode');
        if (loadBbcode) {
          tinymce.PluginManager.load('bbcode', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/bbcode/plugin.min.js');
        }
        const loadVisualblocks: boolean = lib.gmConfig.get('tinymcePluginVisualblocks');
        if (loadVisualblocks) {
          tinymce.PluginManager.load('visualblocks', 'https://cdn.tinymce.com/4/plugins/visualblocks/plugin.min.js');
        }
        const loadVisualchars: boolean = lib.gmConfig.get('tinymcePluginVisualchars');
        if (loadVisualchars) {
          // tinyMCE.PluginManager.load('visualchars', 'https://cdn.tinymce.com/4/plugins/visualchars/plugin.min.js');
          tinymce.PluginManager.load('visualchars', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/visualchars/plugin.min.js');
        }
        const loadHilite: boolean = lib.gmConfig.get('tinymcePluginHilite');
        if (loadHilite) {
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
          content_style: 'a,blockquote,body,code,dd,del,dfn,div,dl,dt,em,h1,h2,h3,h4,h5,h6,html,iframe,img,li,ol,p,pre,q,ul{border:0;padding:0;margin:0}a,abbr,acronym,address,area,b,bdo,big,blockquote,caption,center,cite,code,col,colgroup,dd,del,dfn,div,dl,dt,em,font,h3,h4,h5,h6,hr,i,ins,kbd,li,map,ol,p,pre,q,s,samp,small,span,strike,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,tt,u,ul{line-height:1.57143em}a,body{margin:0}body,h1,h2{font-family:gotham,helvetica,arial,sans-serif}a,img[name=en-crypt]{cursor:pointer}h3,p{margin-bottom:.714285em}del{text-decoration:line-through}dfn{font-style:italic}body{box-sizing:border-box;color:#383838;font-size:14px;padding-right:1px;word-wrap:break-word}a:link,a:visited{color:#047ac6}a:active,a:hover{color:#2596de}h1{font-size:1.5em;font-weight:700;line-height:1.04762em;margin-bottom:.4761em;margin-top:.9523em}h2{font-size:1.286em;font-weight:700;line-height:1.22222em;margin-bottom:.5556em;margin-top:1.111em}h3,h4,h5,h6{font-size:1em;font-weight:700;font-family:gotham,helvetica,arial,sans-serif}h3{margin-top:1.4285em}div{font-family:gotham,helvetica,arial,sans-serif;font-size:14px}img.en-media{height:auto;margin-bottom:1.286em;max-width:100%}img.en-media[height="1"]{height:1px}p+div img,p+img{margin-top:.714285em}div+div img,div+img{margin-top:.857412em}div+div img+img,img+img,li ol,li ul{margin-top:0}ol,ul{list-style-position:outside;margin-bottom:.714285em;margin-left:2em;margin-top:.2857em;padding-left:0}li ol,li ul{margin-bottom:0}h1+ol,h1+ul,h2+ol,h2+ul,p+ol,p+ul{margin-top:-.428571em}blockquote{border-left:2px solid #bfbfbf;margin-bottom:1.4285em;margin-left:1.4285em;margin-top:1.4285em;padding-left:.714285em}code,pre{font-family:Monaco,Courier,monospace}cite{font-style:italic}table{font-size:1em}td,th{padding:.2em 2em .2em 0;text-align:left;vertical-align:top}button.en-ignore{margin-bottom:1em}.highlight{background:#c9f2d0;border:1px solid #62eb92}.Decrypted{background-color:#f7f7f7;padding:5px}.Decrypted .Header{color:#404040;font-family:gotham,helvetica,arial,sans-serif;font-size:11px;padding-bottom:5px}.Decrypted .Body{background-color:#fff;padding:5px}.canvas-container{background:url(/redesign/global/img/loading-spinner.gif) center center no-repeat #fff;border:1px solid #cacaca;margin-bottom:10px}',
          // valid_elements: 'ol ul',
          // extended_valid_elements: 'ol[|class|style] ul[class|style]',
          keep_styles: false,
          setup: (ed) => {
            // Add a custom button
            ed.on('FullscreenStateChanged', (e) => {
              lib.fullscreen = e.state;
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
        tinymce.init(tinyMceInit);
      }
      // set a limit to how many time we check for tinymce
      if (gmTinyMceTimerCounter >= 20) {
        Log.message(appSettings.shortName + ': reached max value for finding TinyMCE Lib');
        // tinyMceTimer.dispose();
        clearInterval(gmTinyMceTimer);
      }
    }, 500);
   /*  const tinyMceTimer = new Clock('tinyMceTimer', 500);
    tinyMceTimer.onClockTick.subscribe((c, n) => {

    }); */
  }
}