// ==UserScript==
// @name            TinyMce for Evernote
// @namespace       https://github.com/Amourspirit/TinyMce-for-Evernote
// @version         3.0.0
// @description     Adds TinyMce in Evernote with custom options including source code. A new button is added to Evernote top toolbar section.
// @author          Paul Moss
// @run-at          document-end
// @include         /^https?:\/\/www\.evernote\.com\/home\.action.*n=.*$/
// @include         /^https?:\/\/www\.evernote\.com\/u\/0/Home\.action.*n=.*$/
// @include         /^https?:\/\/app\.yinxiang\.com\/Home\.action.*n=.*$/
// @include         /^https?:\/\/app\.yinxiang\.com\/u\/0/Home\.action.*n=.*$/
// @match           https://www.evernote.com/Home.action*
// @match           https://www.evernote.com/u/0/Home.action*
// @match           https://app.yinxiang.com/Home.action*
// @match           https://app.yinxiang.com/u/0/Home.action*
// @noframes
// @license         MIT
// @homepageURL     https://amourspirit.github.io/TinyMce-for-Evernote/
// @update          https://github.com/Amourspirit/TinyMce-for-Evernote/raw/master/dist/TinyMce_for_Evernote.user.js
// @downloadURL     https://github.com/Amourspirit/TinyMce-for-Evernote/raw/master/dist/TinyMce_for_Evernote.user.js
// @contributionURL https://amourspirit.github.io/TinyMce-for-Evernote/#donate
// @require         https://openuserjs.org/src/libs/sizzle/GM_config.min.js
// @grant           GM_registerMenuCommand
// @grant           GM_addStyle
// @grant           GM_setValue
// @grant           GM_getValue
// ==/UserScript==
(function ($, tinymce) {
    'use strict';

    $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
    var tinymce__default = 'default' in tinymce ? tinymce['default'] : tinymce;

    var PriorityLevel;
    (function (PriorityLevel) {
        PriorityLevel[PriorityLevel["None"] = 0] = "None";
        PriorityLevel[PriorityLevel["Low"] = 1] = "Low";
        PriorityLevel[PriorityLevel["Med"] = 2] = "Med";
        PriorityLevel[PriorityLevel["High"] = 3] = "High";
    })(PriorityLevel || (PriorityLevel = {}));
    var DebugLevel;
    (function (DebugLevel) {
        DebugLevel[DebugLevel["None"] = 0] = "None";
        DebugLevel[DebugLevel["Debug"] = 1] = "Debug";
        DebugLevel[DebugLevel["Info"] = 2] = "Info";
        DebugLevel[DebugLevel["Warn"] = 3] = "Warn";
        DebugLevel[DebugLevel["Error"] = 4] = "Error";
    })(DebugLevel || (DebugLevel = {}));

    var Settings =  (function () {
        function Settings() {
        }
        Settings.tinyId = 'gminput';
        Settings.shortName = 'TMCEE';
        Settings.preKey = 'tmceen_';
        Settings.debugLevel = DebugLevel.Info;
        Settings.menuName = 'TinyMce Options';
        Settings.tinyMceVersion = '4.1.0';
        return Settings;
    }());

    var Log =  (function () {
        function Log() {
        }
        Log.message = function (msg) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!(Settings.debugLevel >= DebugLevel.Info)) {
                return;
            }
            console.log.apply(console, [msg].concat(optionalParams));
        };
        Log.error = function (error) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!(Settings.debugLevel >= DebugLevel.Error)) {
                return;
            }
            console.error.apply(console, [error].concat(optionalParams));
        };
        Log.debug = function (msg) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!(Settings.debugLevel >= DebugLevel.Debug)) {
                return;
            }
            console.log.apply(console, [Settings.shortName + ": Debug: " + msg].concat(optionalParams));
        };
        Log.debugWarn = function (msg) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!(Settings.debugLevel >= DebugLevel.Debug)) {
                return;
            }
            console.warn.apply(console, [Settings.shortName + ": Debug: " + msg].concat(optionalParams));
        };
        return Log;
    }());
    var BigbyteLoader =  (function () {
        function BigbyteLoader() {
        }
        BigbyteLoader.addJsNode = function (text, sUrl, funcToRun, runOnLoad) {

            var D = document;
            var scriptNode = D.createElement('script');
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
            var targ = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
            targ.appendChild(scriptNode);

        };
        BigbyteLoader.addJsNodeToBody = function (text, sUrl, funcToRun, runOnLoad) {
            var methodName = 'addJsNodeToBody';
            var appDebugLevel = Settings.debugLevel;
            var levelDebug = DebugLevel.Debug;
            if (appDebugLevel >= levelDebug) {
                Log.debug(methodName + ": Entered.");
                Log.debug(methodName + ": Working on .", text, sUrl);
            }
            var D = document;
            var scriptNode = D.createElement('script');
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
            var targ = D.getElementsByTagName('body')[0] || D.body || D.documentElement;
            targ.appendChild(scriptNode);
            if (appDebugLevel >= levelDebug) {
                Log.debug(methodName + ": Leaving.");
            }
        };
        BigbyteLoader.addCssNode = function (text, element) {

            element = typeof element !== 'undefined' ? element : 'head';
            var D = document;
            var scriptNode = D.createElement('style');
            scriptNode.type = 'text/css';
            scriptNode.textContent = text;
            var targ = D.getElementsByTagName(element)[0] || D.body || D.documentElement;
            targ.appendChild(scriptNode);

        };
        BigbyteLoader.addLinkNode = function (href, type, rel) {

            type = typeof type !== 'undefined' ? type : 'text/css';
            rel = typeof rel !== 'undefined' ? rel : 'stylesheet';
            var D = document;
            var scriptNode = D.createElement('link');
            scriptNode.href = href;
            if (type && (type.length > 0)) {
                scriptNode.type = type;
            }
            if (rel && (rel.length > 0)) {
                scriptNode.rel = rel;
            }
            var targ = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
            targ.appendChild(scriptNode);

        };
        BigbyteLoader.addHtmlNode = function (html) {

            var D = document;
            var targ = D.getElementsByTagName('body')[0] || D.body || D.documentElement;
            targ.insertAdjacentHTML('beforeend', html);

        };
        BigbyteLoader.loadScript = function (scriptItem) {
            if (scriptItem.timeout === 0) {
                scriptItem.timeout = 30;
            }

            var bbScriptLoadedEvent = new CustomEvent('bbScriptLoaded', {
                detail: {
                    message: 'Script Loaded',
                    time: new Date(),
                    scriptItm: scriptItem
                },
                bubbles: true,
                cancelable: false
            });

            switch (scriptItem.type) {
                case 'linkedjs':
                    var skipTest = false;
                    if (typeof (scriptItem.testMethod) === 'undefined' || (scriptItem.testMethod.length === 0)) {
                        skipTest = true;
                    }

                    if (skipTest) {
                        scriptItem.loaded = true;
                        BigbyteLoader.addJsNode(scriptItem.text, scriptItem.src);

                        document.dispatchEvent(bbScriptLoadedEvent);
                        return;
                    }
                    scriptItem.count++;
                    var maxCount = scriptItem.timeout * 10; 
                    if (scriptItem.count > maxCount) {
                        Log.error(Settings.shortName + ': unable to load script, Aborting: ', scriptItem.src);
                        return;
                    }
                    var testmethod = void 0;
                    var evilEval = eval; 
                    try {
                        testmethod = evilEval(scriptItem.testMethod);
                    }
                    catch (e) {
                        testmethod = 'undefined';
                        Log.error(Settings.shortName + ": loadScript: Error running Eval:", e);
                    }
                    if (typeof (testmethod) === 'undefined') {

                        if (!scriptItem.loaded) {
                            scriptItem.loaded = true;
                            BigbyteLoader.addJsNode(scriptItem.text, scriptItem.src);
                        }
                        setTimeout(function () {

                            BigbyteLoader.loadScript(scriptItem);
                        }, 100);
                    }
                    else {

                        document.dispatchEvent(bbScriptLoadedEvent);
                    }
                    break;
                case 'css':

                    if (typeof (scriptItem.tag) === 'undefined') {
                        scriptItem.tag = 'body'; 
                    }
                    BigbyteLoader.addCssNode(scriptItem.src, scriptItem.tag);

                    document.dispatchEvent(bbScriptLoadedEvent);
                    break;
                case 'csslink':

                    BigbyteLoader.addLinkNode(scriptItem.src);

                    document.dispatchEvent(bbScriptLoadedEvent);
                    break;
                default:
                    break;
            }

            return;
        };
        return BigbyteLoader;
    }());

    var UserScriptUtil =  (function () {
        function UserScriptUtil() {
        }
        UserScriptUtil.extend = function () {
            var optionalParams = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                optionalParams[_i] = arguments[_i];
            }
            for (var i = 1; i < optionalParams.length; i++) {
                for (var key in optionalParams[i]) {
                    if (optionalParams[i].hasOwnProperty(key)) {
                        optionalParams[0][key] = optionalParams[i][key];
                    }
                }
            }
            return optionalParams[0];
        };
        return UserScriptUtil;
    }());

    var Util =  (function () {
        function Util() {
        }
        Util.getMethodName = function (obj) {
            if (obj.name) {
                return obj.name;
            }
            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec(obj.toString());
            var result = results && results.length > 1 && results[1];
            if (!result) {
                funcNameRegex = /return .([^;]+)/;
                results = (funcNameRegex).exec(obj.toString());
                result = results && results.length > 1 && results[1].split('.').pop();
            }
            return result || '';
        };
        return Util;
    }());
    var TinyMceWork =  (function () {
        function TinyMceWork() {
            var _this = this;
            this.fullscreen = false;
            this.gmConfig = GM_config;
            this.init = function () {

                var gmTinyMceTimerCounter = 0;
                var ver = Settings.tinyMceVersion;
                var id = Settings.tinyId;

                var lib = _this;
                var gmTinyMceTimer = setInterval(function () {
                    gmTinyMceTimerCounter++;
                    Log.message(Settings.shortName + ': try no. ' + gmTinyMceTimerCounter + ' looking for tinymce');
                    if (typeof (tinymce) !== 'undefined') {
                        Log.message(Settings.shortName + ': found tinymce library');
                        clearInterval(gmTinyMceTimer);
                        tinymce.PluginManager.load('lists', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/lists/plugin.min.js');
                        var loadTable = lib.gmConfig.get('tinymcePluginTable');
                        if (loadTable) {

                            tinymce.PluginManager.load('table', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/table/plugin.min.js');
                        }
                        var loadCharmap = lib.gmConfig.get('tinymcePluginCharmap');
                        if (loadCharmap) {

                            tinymce.PluginManager.load('charmap', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/charmap/plugin.min.js');
                        }
                        var loadCode = lib.gmConfig.get('tinymcePluginCode');
                        if (loadCode) {

                            tinymce.PluginManager.load('code', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/code/plugin.min.js');
                        }
                        var loadFullscreen = lib.gmConfig.get('tinymcePluginFullscreen');
                        if (loadFullscreen) {

                            tinymce.PluginManager.load('fullscreen', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/fullscreen/plugin.min.js');
                        }
                        var loadEmoticons = lib.gmConfig.get('tinymcePluginEmoticons');
                        if (loadEmoticons) {

                            tinymce.PluginManager.load('emoticons', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/emoticons/plugin.min.js');
                        }
                        var loadWordcount = lib.gmConfig.get('tinymcePluginWordcount');
                        if (loadEmoticons) {

                            tinymce.PluginManager.load('wordcount', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/wordcount/plugin.min.js');
                        }
                        var loadPrint = lib.gmConfig.get('tinymcePluginPrint');
                        if (loadPrint) {

                            tinymce.PluginManager.load('print', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/print/plugin.min.js');
                        }
                        var loadPreview = lib.gmConfig.get('tinymcePluginPreview');
                        if (loadPreview) {

                            tinymce.PluginManager.load('preview', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/preview/plugin.min.js');
                        }
                        var loadInsertdatetime = lib.gmConfig.get('tinymcePluginInsertdatetime');
                        if (loadInsertdatetime) {

                            tinymce.PluginManager.load('insertdatetime', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/insertdatetime/plugin.min.js');
                        }
                        var loadImage = lib.gmConfig.get('tinymcePluginImage');
                        if (loadImage) {

                            tinymce.PluginManager.load('image', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/image/plugin.min.js');
                        }
                        var loadSearchreplace = lib.gmConfig.get('tinymcePluginSearchreplace');
                        if (loadSearchreplace) {

                            tinymce.PluginManager.load('searchreplace', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/searchreplace/plugin.min.js');
                        }
                        var loadAdvlist = lib.gmConfig.get('tinymcePluginAdvlist');
                        if (loadAdvlist) {

                            tinymce.PluginManager.load('advlist', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/advlist/plugin.min.js');
                        }
                        var loadBbcode = lib.gmConfig.get('tinymcePluginBbcode');
                        if (loadBbcode) {

                            tinymce.PluginManager.load('bbcode', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/bbcode/plugin.min.js');
                        }
                        var loadVisualblocks = lib.gmConfig.get('tinymcePluginVisualblocks');
                        if (loadVisualblocks) {

                            tinymce.PluginManager.load('visualblocks', 'https://cdn.tinymce.com/4/plugins/visualblocks/plugin.min.js');
                        }
                        var loadVisualchars = lib.gmConfig.get('tinymcePluginVisualchars');
                        if (loadVisualchars) {
                            tinymce.PluginManager.load('visualchars', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/visualchars/plugin.min.js');
                        }
                        var loadHilite = lib.gmConfig.get('tinymcePluginHilite');
                        if (loadHilite) {

                            tinymce.PluginManager.load('hilite', 'https://cdn.jsdelivr.net/gh/Amourspirit/TinyMCE-Plugin-hilite@9b2a96752b5162187315e07047a7c0efd706145c/js/plugin.min.js');
                        }
                        var tinyMceExternalPlugins = {
                            textcolor: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/textcolor/plugin.min.js',
                            colorpicker: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/colorpicker/plugin.min.js',
                            nonbreaking: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/nonbreaking/plugin.min.js',
                            hr: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/hr/plugin.min.js',
                            link: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/link/plugin.min.js'
                        };
                        var toolbar1 = 'mysave myexit insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent';
                        var toolbar2 = (loadFullscreen ? 'fullscreen ' : '');
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
                        var tinyMceInit = {
                            selector: 'textarea#' + id,
                            init_instance_callback: function () {
                                $('.mce-i-mysave').addClass('fi-save');
                                $('.mce-i-myexit').addClass('fi-x');

                                $(document).trigger('tinymceInit', {
                                    type: 'tinymceInit',
                                    message: 'init',
                                    time: new Date(),
                                    tinyMceId: id
                                });
                            },
                            height: 260,
                            inline: false,
                            browser_spellcheck: true,
                            plugins: '',
                            menubar: 'edit insert format view tools' + (loadTable ? ' table' : ''),
                            toolbar: [toolbar1, toolbar2],
                            content_css: 'https://www.evernote.com/js/tinymce/skins/lightgray/content.min.css',
                            content_style: "a,blockquote,body,code,dd,del,dfn,div,dl,dt,em,h1,h2,h3,h4,h5,h6,html,iframe,img,li,ol,p,pre,q,ul{border:0;padding:0;margin:0}a,abbr,acronym,address,area,b,bdo,big,blockquote,caption,center,cite,code,col,colgroup,dd,del,dfn,div,dl,dt,em,font,h3,h4,h5,h6,hr,i,ins,kbd,li,map,ol,p,pre,q,s,samp,small,span,strike,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,tt,u,ul{line-height:1.57143em}a,body{margin:0}body,h1,h2{font-family:gotham,helvetica,arial,sans-serif}a,img[name=en-crypt]{cursor:pointer}h3,p{margin-bottom:.714285em}del{text-decoration:line-through}dfn{font-style:italic}body{box-sizing:border-box;color:#383838;font-size:14px;padding-right:1px;word-wrap:break-word}a:link,a:visited{color:#047ac6}a:active,a:hover{color:#2596de}h1{font-size:1.5em;font-weight:700;line-height:1.04762em;margin-bottom:.4761em;margin-top:.9523em}h2{font-size:1.286em;font-weight:700;line-height:1.22222em;margin-bottom:.5556em;margin-top:1.111em}h3,h4,h5,h6{font-size:1em;font-weight:700;font-family:gotham,helvetica,arial,sans-serif}h3{margin-top:1.4285em}div{font-family:gotham,helvetica,arial,sans-serif;font-size:14px}img.en-media{height:auto;margin-bottom:1.286em;max-width:100%}img.en-media[height='1']{height:1px}p+div img,p+img{margin-top:.714285em}div+div img,div+img{margin-top:.857412em}div+div img+img,img+img,li ol,li ul{margin-top:0}ol,ul{list-style-position:outside;margin-bottom:.714285em;margin-left:2em;margin-top:.2857em;padding-left:0}li ol,li ul{margin-bottom:0}h1+ol,h1+ul,h2+ol,h2+ul,p+ol,p+ul{margin-top:-.428571em}blockquote{border-left:2px solid #bfbfbf;margin-bottom:1.4285em;margin-left:1.4285em;margin-top:1.4285em;padding-left:.714285em}code,pre{font-family:Monaco,Courier,monospace}cite{font-style:italic}table{font-size:1em}td,th{padding:.2em 2em .2em 0;text-align:left;vertical-align:top}button.en-ignore{margin-bottom:1em}.highlight{background:#c9f2d0;border:1px solid #62eb92}.Decrypted{background-color:#f7f7f7;padding:5px}.Decrypted .Header{color:#404040;font-family:gotham,helvetica,arial,sans-serif;font-size:11px;padding-bottom:5px}.Decrypted .Body{background-color:#fff;padding:5px}.canvas-container{background:url(/redesign/global/img/loading-spinner.gif) center center no-repeat #fff;border:1px solid #cacaca;margin-bottom:10px}",
                            keep_styles: false,
                            setup: function (ed) {
                                ed.on('FullscreenStateChanged', function (e) {
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
                                    onclick: function () {
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
                                    onclick: function () {
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
                    if (gmTinyMceTimerCounter >= 20) {
                        Log.message(Settings.shortName + ': reached max value for finding TinyMCE Lib');
                        clearInterval(gmTinyMceTimer);
                    }
                }, 500);

            };
        }
        return TinyMceWork;
    }());
    var Evernote =  (function () {
        function Evernote() {
            var _this = this;
            this.btnSelector = '';
            this.iframeSelector = '';
            this.noteSelector = '';
            this.fullScreen = false;
            this.scripts = [];
            this.TMCE = new TinyMceWork();
            this.init = function () {
                if (typeof (tinymce__default) !== 'undefined') {
                    Settings.tinyMceVersion = tinymce__default.EditorManager.majorVersion + '.' + tinymce__default.EditorManager.minorVersion;
                }
                var tinyMceVer = Settings.tinyMceVersion;
                Log.message(Settings.shortName + ': tinyMCE Version', tinyMceVer);
                var pluginSrc = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js';
                var pluginXpathJq = 'https://cdn.jsdelivr.net/npm/jquery-xpath@0.3.1/jquery.xpath.min.js';
                if (document.addEventListener) { 

                    document.addEventListener('bbScriptLoaded', _this.onBbScriptLoaded);

                    document.addEventListener('allScriptsLoaded', _this.onAllScriptsLoaded);
                }
                else {

                }
                if (typeof (jQuery) === 'undefined') {

                    _this.addScript('jquery', pluginSrc, 'linkedjs', 'jQuery');
                }
                else {

                }
                if (typeof (jQuery().xpath) === 'undefined') {

                    _this.addScript('jqueryXpath', pluginXpathJq, 'linkedjs', 'jQuery().xpath');
                }
                else {

                }

                _this.addScript('icons-css', '//cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css', 'csslink');

                _this.addScript('hilite-icons-css', '//api.bigbytetech.ca/js/hilite.css', 'csslink');
                if (typeof (tinymce__default) === 'undefined') {

                    _this.addScript('tinyMceJs', '//cdnjs.cloudflare.com/ajax/libs/tinymce/' + tinyMceVer + '/tinymce.min.js', 'linkedjs', 'tinyMCE');
                }
                else {

                }

                _this.addScript('tinyMceCss', '//cdnjs.cloudflare.com/ajax/libs/tinymce/' + tinyMceVer + '/skins/lightgray/skin.min.css', 'csslink');

                _this.addScript('lightboxcss', _this.lightBoxCss, 'css', undefined, { tag: 'body' });
                _this.loadScripts();

            };
            this.onAllScriptsLoaded = function (e) {

                Log.message(Settings.shortName + ': all scripts have been loaded.');
                _this.btnSelector = '//*[@id="gwt-debug-NoteAttributesView-root"]/div[1]/div[1]';
                if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())) {
                    _this.iframeSelector = '.RichTextArea-entinymce';
                    _this.noteSelector = 'body';
                }
                else {
                    _this.iframeSelector = '.RichTextArea-entinymce';
                    _this.noteSelector = 'body';
                }

                _this.ensurePlugins();

                _this.addToolbarButton();

                $(document).on('editBtnAdded', _this.onEditBtnAdded);
                $(document).on('tinymceInit', _this.onTinymceInit);
                $(document).on('tinymceSave', _this.onTinymceSave);
                $(document).on('tinymceCancel', _this.onTinymceCancel);
                $(document).on('tinymceFullScreen', _this.onTinyMceFulllscreen);
                _this.writeLightBox();

                _this.TMCE.init();
                var intGmboxPadLeft = parseInt($('.gmbox').css('padding-left'), 10);
                var intGmboxPadRight = parseInt($('.gmbox').css('padding-right'), 10);
                var intTinymceWidth = parseInt(GM_config.get('tinymceWidth'), 10);
                intTinymceWidth = intTinymceWidth - (intGmboxPadLeft + intGmboxPadRight);
                $('.gmbox-window').width(intTinymceWidth);
                $('.gmclose').click(function () {

                    $(document).trigger('tinymceCancel', {
                        message: 'cancel',
                        tinyMceId: Settings.tinyId
                    });
                });

            };
            this.onTinymceInit = function (e) {
                Log.message(Settings.shortName + ': Tiny Mce Init was triggered');
            };
            this.onTinymceSave = function (e, data) {

                if (data.tinyMceId === Settings.tinyId) {
                    _this.save();
                    _this.lightBoxReset();
                    var ed = tinymce__default.EditorManager.editors[data.tinyMceId];
                    if (!ed) {
                        Log.error(methodName + ": Editor was not found and is null. Param e, data", e, data);
                    }
                    ed.setContent(''); 
                }

            };
            this.onTinymceCancel = function (e, data) {

                if (data.tinyMceId === Settings.tinyId) {
                    var ed = tinymce__default.EditorManager.editors[data.tinyMceId];
                    if (!ed) {
                        Log.error(methodName + ": Editor was not found and is null. Params e, data", e, data);
                    }
                    var confirm_1 = GM_config.get('tinymceConfirmNoSaveExit');
                    if (confirm_1) {
                        if (_this.confirmExit()) {
                            _this.lightBoxReset();
                            ed.setContent(''); 
                        }
                    }
                    else {
                        _this.lightBoxReset();
                        ed.setContent(''); 
                    }
                }

            };
            this.onTinyMceFulllscreen = function (e, data) {

                if (data.tinyMceId === Settings.tinyId) {
                    _this.fullScreen = e.state;
                    if (data.state) {
                        if ($('#tinybox').hasClass('gmbox-window')) {
                            $('#tinybox').removeClass('gmbox-window');
                        }
                    }
                    else {
                        if (!$('#tinybox').hasClass('gmbox-window')) {
                            $('#tinybox').addClass('gmbox-window');
                        }
                    }
                }

            };
            this.addScript = function (sName, sSrc, objType, objTestMethod, args) {

                var newItm = {
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

                    _this.scripts[sName] = newItm;
                }
                else {

                    var extended = UserScriptUtil.extend(newItm, args);

                    _this.scripts[sName] = extended;
                }

            };
            this.isScriptsLoaded = function () {
                for (var key in _this.scripts) {
                    if (!_this.scripts[key].loaded) {
                        return false;
                    }
                }
                return true;
            };
            this.onBbScriptLoaded = function (e) {
                delete _this.scripts[e.detail.scriptItm.name];
                var done = _this.isScriptsLoaded();
                if (done) {
                    var allScriptsLoaded = new CustomEvent('allScriptsLoaded', {
                        detail: {
                            message: 'All Scripts Loaded',
                            time: new Date(),
                        },
                        bubbles: true,
                        cancelable: false
                    });

                    document.dispatchEvent(allScriptsLoaded);
                }
                else {
                    _this.loadScripts();
                }

            };
            this.onEditBtnAdded = function (e) {

                Log.message(Settings.shortName + ': onEditBtnAdded event fired');
                _this.addButtonClick();

            };
            this.addButtonClick = function () {
                if ($('#gm-edit-btn').length) {
                    $('#gm-edit-btn').click(function () {
                        var k = Settings.tinyId;
                        var ed = tinymce__default.EditorManager.editors[k];
                        if (_this.fullScreen) {
                            ed.execCommand('mceFullScreen');
                        }
                        ed.setContent($(_this.iframeSelector).contents().find(_this.noteSelector).html());
                        $('.gmbackdrop, .gmbox').animate({
                            opacity: '.50'
                        }, 300, 'linear');
                        $('.gmbox').animate({
                            opacity: '1.00'
                        }, 300, 'linear');
                        $('.gmbackdrop, .gmbox').css('display', 'block');
                    });
                    Log.message(Settings.shortName + ": Edit Button Click added");
                }
                else {
                    Log.error(Settings.shortName + ": addButtonClick: #gm-edit-btn was not found");
                }

            };
            this.addToolbarButton = function () {

                var lib = _this;
                var gmCounter = 0;
                var gmTimer = setInterval(function () {
                    gmCounter++;
                    Log.message(Settings.shortName + ': try no. ' + gmCounter);
                    var objElement = $(document.body).xpath(lib.btnSelector);
                    if (objElement.length) {
                        Log.message(Settings.shortName + ": Found element for button placement");
                        clearInterval(gmTimer);
                        objElement.append(lib.createToolbarHtml());
                        $(document).trigger('editBtnAdded', {
                            type: 'editBtnAdded',
                            message: 'Button Added',
                            time: new Date()
                        });
                    }
                    if (gmCounter >= 20 || objElement.length > 0) {
                        clearInterval(gmTimer);
                    }
                }, 500);

            };
            this.createToolbarHtml = function () {
                var css = "background-clip:border-box;background-color:rgba(0,0,0,0);background-position-x:0;background-position-y:0;background-size:24px 24px;border-bottom-color:#333;border-bottom-style:none;border-bottom-width:0;border-image-outset:0;border-image-repeat:stretch;border-image-slice:100%;border-image-source:none;border-image-width:1;border-left-color:#333;border-left-style:none;border-left-width:0;border-right-color:#333;border-right-style:none;border-right-width:0;border-top-color:#333;border-top-style:none;border-top-width:0;box-sizing:border-box;color:#333;cursor:pointer;display:inline-block;height:24px;line-height:16px;margin:0;opacity:1;outline-color:#333;outline-style:none;outline-width:0;overflow-x:hidden;overflow-y:hidden;padding:0;text-size-adjust:100%;transition-delay:0s;transition-duration:.2s;transition-property:opacity;transition-timing-function:ease-in-out;-webkit-user-select:none;user-select:none;-o-user-select:none;-webkit-touch-callout:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;vertical-align:top;width:24px;-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent;z-index:200;";
                var btnHtml = _this.createToolbarEditBtn();
                var html = '';
                html += "<div id=\"gm-tb\" title=\"Edit with TinyMCE\" style=\"" + css + "\">" + btnHtml + "</div>";
                return html;
            };
            this.createToolbarEditBtn = function () {
                var html = "<div id=\x22gm-edit-btn\x22 style=\x22display:inline-block;\x22 name=\x22gm-edit-btn\x22 class=\x22gm-btn\x22><i class=\x22fi-page-edit\x22></i></div>";
                return html;
            };
            this.getLightBoxHtml = function (id, title) {
                id = typeof id !== 'undefined' ? id : Settings.tinyId;
                title = typeof title !== 'undefined' ? title : '';
                var html = '<div class="gmbackdrop"></div>';
                html += '<div id="tinybox" class="gmbox gmbox-window"><div class="gmclose"><i class="fi-x" style="color:black"></i></div>';
                html += title;
                html += '<textarea id="' + id + '" rows="18" cols="68"></textarea>';
                html += '</div></div>';
                return html;
            };
            this.writeLightBox = function (id, title) {
                var html = _this.getLightBoxHtml(id, title);
                BigbyteLoader.addHtmlNode(html);
            };
            this.lightBoxReset = function () {
                $('.gmbackdrop, .gmbox').animate({
                    opacity: '0'
                }, 300, 'linear', function () {
                    $('.gmbackdrop, .gmbox').css('display', 'none');
                });
                $('textarea#gminput').val(''); 
            };
            this.confirmExit = function () {
                return confirm('Are you sure you want to close this editor?');
            };
            this.save = function () {

                var k = Settings.tinyId;
                var ed = tinymce__default.EditorManager.editors[k];
                var e = ed.getContent();
                $('.gmbackdrop, .gmbox').animate({
                    opacity: '0'
                }, 300, 'linear', function () {
                    $('.gmbackdrop, .gmbox').css('display', 'none');
                });
                var content = $(_this.iframeSelector).contents().find(_this.noteSelector);
                content.html(e);
                $('textarea#gminput').val(''), ed.setContent('');

            };
            this.loadScripts = function () {

                var count = 0;
                for (var key in _this.scripts) {
                    if (_this.scripts.hasOwnProperty(key)) {
                        var script = _this.scripts[key];

                        count++;
                        if (count > 1) {
                            return;
                        }
                        BigbyteLoader.loadScript(script);
                    }
                }

            };
            this.ensurePlugins = function () {
                if (typeof ($.fn.tagName) === 'undefined') {
                    $.fn.tagName = function (toLower) {
                        var tn = this.prop('tagName');
                        if (toLower) {
                            tn = tn.toLowerCase();
                        }
                        return tn;
                    };
                }
            };
            this.lightBoxCss = ".gmbackdrop,.gmbox{position:absolute;display:none}.gmbackdrop{top:0;left:0;width:100%;height:100%;background:#000;opacity:0;z-index:201}.gmbox{background:#fff;z-index:202;padding:10px;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-moz-box-shadow:0 0 5px #444;-webkit-box-shadow:0 0 5px #444;box-shadow:0 0 5px #444}.gmclose{float:right;margin-right:6px;cursor:pointer}.mce-panel{border:none}div.gmbox .mce-panel{border:0 solid rgba(0,0,0,.2)}div.mce-tinymce.mce-container.mce-panel{margin-top:2em}div.mce-tinymce.mce-container.mce-panel.mce-fullscreen{margin-top:0}#gm-edit-btn{font-size:1.6em;color:#ababab;cursor:pointer}#gm-edit-btn:hover{color:#2dbe60}.gmbox-window{top:50%;left:50%;transform:translate(-50%,-50%);position:absolute}#gm-tb{display:inline-block;position:absolute}";
        }
        return Evernote;
    }());

    var GmConfig =  (function () {
        function GmConfig() {
            this.init = function () {
                var initValues = {
                    id: Settings.preKey + 'Config',
                    title: Settings.menuName,
                    fields: 
                    {
                        tinymcePluginFullscreen: {
                            type: 'checkbox',
                            label: 'Load Plugin Full Screen?',
                            default: true
                        },
                        tinymcePluginTable: {
                            type: 'checkbox',
                            label: 'Load Plugin Table?',
                            default: true
                        },
                        tinymcePluginCharmap: {
                            type: 'checkbox',
                            label: 'Load Plugin Special Characters?',
                            default: true
                        },
                        tinymcePluginCode: {
                            type: 'checkbox',
                            label: 'Load Plugin Html Code?',
                            default: true
                        },
                        tinymcePluginCodeWidth: {
                            label: 'Width in pixels of HTML code editor.',
                            type: 'int',
                            min: 200,
                            max: 4000,
                            default: 400
                        },
                        tinymcePluginCodeHeight: {
                            label: 'Height in pixels of HTML code editor.',
                            type: 'int',
                            min: 200,
                            max: 4000,
                            default: 300
                        },
                        tinymcePluginPreview: {
                            type: 'checkbox',
                            label: 'Load Plugin Preview?',
                            default: true
                        },
                        tinymcePluginPrint: {
                            type: 'checkbox',
                            label: 'Load Plugin Print?',
                            default: true
                        },
                        tinymcePluginInsertdatetime: {
                            type: 'checkbox',
                            label: 'Load Plugin Insert Date Time?',
                            default: true
                        },
                        tinymcePluginImage: {
                            type: 'checkbox',
                            label: 'Load Plugin Image?',
                            default: true
                        },
                        tinymcePluginSearchreplace: {
                            type: 'checkbox',
                            label: 'Load Plugin Find & Replace?',
                            default: true
                        },
                        tinymcePluginEmoticons: {
                            type: 'checkbox',
                            label: 'Load Plugin Emoticons?',
                            default: true
                        },
                        tinymcePluginAdvlist: {
                            type: 'checkbox',
                            label: 'Load Plugin Advanced List?',
                            default: false
                        },
                        tinymcePluginVisualblocks: {
                            type: 'checkbox',
                            label: 'Load Plugin Visual Blocks?',
                            default: true
                        },
                        tinymcePluginVisualchars: {
                            type: 'checkbox',
                            label: 'Load Plugin Visual Characters?',
                            default: false
                        },
                        tinymcePluginBbcode: {
                            type: 'checkbox',
                            label: 'Load Plugin BBCode?',
                            default: false
                        },
                        tinymcePluginWordcount: {
                            type: 'checkbox',
                            label: 'Load Plugin Word Count?',
                            default: true
                        },
                        tinymcePluginHilite: {
                            type: 'checkbox',
                            label: 'Load Plugin Hilite?',
                            default: true
                        },
                        tinymceConfirmNoSaveExit: {
                            type: 'checkbox',
                            label: 'Ask for confirmation before closing without saving?',
                            default: true
                        },
                        tinymceWidth: {
                            label: 'Width in pixels of editor when not full screen.',
                            type: 'int',
                            min: 400,
                            max: 4000,
                            default: 660 
                        }
                    },
                    css: '#MyConfig_section_0 { display: none !important; }' 
                };
                GM_config.init(initValues);
            };
        }
        return GmConfig;
    }());

    var validateIfTop = function () {
        return window.top === window.self;
    };
    if (validateIfTop()) {
        Log.message(Settings.shortName + ': Start loading...');
        var en = new Evernote();
        en.init();
        var gConfig = new GmConfig();
        gConfig.init();
        if (typeof GM_registerMenuCommand === 'function') {
            Log.message(Settings.shortName + ': Registering: Open ' + Settings.shortName + ' Options Menu');
            GM_registerMenuCommand(Settings.menuName, function () {
                GM_config.open();
                Log.message(Settings.shortName + ': Registered: Open ' + Settings.shortName + ' Options Menu');
            });
        }
        else {
            Log.error(Settings.shortName + ': Unable to Register: Open ' + Settings.shortName + ' Options Menu');
        }
        Log.message(Settings.shortName + ': End loading...');
    }

}($, tinymce));
