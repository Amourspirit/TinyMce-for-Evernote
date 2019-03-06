// ==UserScript==
// @name            TinyMce for Evernote
// @namespace       https://github.com/Amourspirit/TinyMce-for-Evernote
// @version         2.0.5
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
// @update          https://github.com/Amourspirit/TinyMce-for-Evernote/raw/master/TinyMce_for_Evernote.user.js
// @downloadURL     https://github.com/Amourspirit/TinyMce-for-Evernote/raw/master/TinyMce_for_Evernote.user.js
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

    var Settings = (function () {
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

    var Log = (function () {
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
            console.log.apply(console, [msg].concat(optionalParams));
        };
        return Log;
    }());

    var BigbyteLoader = (function () {
        function BigbyteLoader() {
        }
        BigbyteLoader.addJsNode = function (text, sUrl, funcToRun, runOnLoad) {
            var methodName = 'addJsNode';
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
            var targ = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
            targ.appendChild(scriptNode);
            if (appDebugLevel >= levelDebug) {
                Log.debug(methodName + ": Leaving.");
            }
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
            var methodName = 'addCssNode';
            var appDebugLevel = Settings.debugLevel;
            var levelDebug = DebugLevel.Debug;
            if (appDebugLevel >= levelDebug) {
                Log.debug(methodName + ": Entered.");
                Log.debug(methodName + ": Working on .", text, element);
            }
            element = typeof element !== 'undefined' ? element : 'head';
            var D = document;
            var scriptNode = D.createElement('style');
            scriptNode.type = 'text/css';
            scriptNode.textContent = text;
            var targ = D.getElementsByTagName(element)[0] || D.body || D.documentElement;
            targ.appendChild(scriptNode);
            if (appDebugLevel >= levelDebug) {
                Log.debug(methodName + ": Leaving.");
            }
        };
        BigbyteLoader.addLinkNode = function (href, type, rel) {
            var methodName = 'addLinkNode';
            var appDebugLevel = Settings.debugLevel;
            var levelDebug = DebugLevel.Debug;
            if (appDebugLevel >= levelDebug) {
                Log.debug(methodName + ": Entered.");
                Log.debug(methodName + ": Working on .", href);
            }
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
            if (appDebugLevel >= levelDebug) {
                Log.debug(methodName + ": Leaving.");
            }
        };
        BigbyteLoader.addHtmlNode = function (html) {
            var methodName = 'addHtmlNode';
            var appDebugLevel = Settings.debugLevel;
            var levelDebug = DebugLevel.Debug;
            if (appDebugLevel >= levelDebug) {
                Log.debug(methodName + ": Entered.");
                Log.debug(methodName + ": Working on .", html);
            }
            var D = document;
            var targ = D.getElementsByTagName('body')[0] || D.body || D.documentElement;
            targ.insertAdjacentHTML('beforeend', html);
            if (appDebugLevel >= levelDebug) {
                Log.debug(methodName + ": Leaving.");
            }
        };
        BigbyteLoader.loadScript = function (scriptItem) {
            var methodName = 'loadScript';
            var appDebugLevel = Settings.debugLevel;
            var levelDebug = DebugLevel.Debug;
            if (appDebugLevel >= levelDebug) {
                Log.debug(methodName + ": Entered in " + methodName + ".");
            }
            if (typeof (scriptItem.count) === 'undefined') {
                scriptItem.count = 0;
            }
            if (typeof (scriptItem.loaded) === 'undefined') {
                scriptItem.loaded = false;
            }
            if (typeof (scriptItem.text) === 'undefined') {
                scriptItem.text = '';
            }
            if (typeof (scriptItem.timeout) === 'undefined') {
                scriptItem.timeout = 30;
            }
            if (appDebugLevel >= levelDebug) {
                Log.debug(methodName + ": scriptItem param:", scriptItem);
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
                    if (appDebugLevel >= levelDebug) {
                        Log.debug(methodName + ": skipTest for adding script:", skipTest);
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
                        if (appDebugLevel >= levelDebug) {
                            Log.debug(methodName + ": Trying Evil Eval");
                        }
                        testmethod = evilEval(scriptItem.testMethod);
                    }
                    catch (e) {
                        testmethod = 'undefined';
                    }
                    if (typeof (testmethod) === 'undefined') {
                        if (appDebugLevel >= levelDebug) {
                            Log.debug(methodName + ": Undefined Test method");
                        }
                        if (!scriptItem.loaded) {
                            scriptItem.loaded = true;
                            BigbyteLoader.addJsNode(scriptItem.text, scriptItem.src);
                        }
                        setTimeout(function () {
                            if (appDebugLevel >= levelDebug) {
                                Log.debug(methodName + ": Loading script via timer", scriptItem);
                            }
                            BigbyteLoader.loadScript(scriptItem);
                        }, 100);
                    }
                    else {
                        if (appDebugLevel >= levelDebug) {
                            Log.debug(methodName + ": Script is loaded. Dispatching event");
                        }
                        document.dispatchEvent(bbScriptLoadedEvent);
                    }
                    break;
                case 'css':
                    if (appDebugLevel >= levelDebug) {
                        Log.debug(methodName + ": Attempting to load css");
                    }
                    if (typeof (scriptItem.tag) === 'undefined') {
                        scriptItem.tag = 'body';
                    }
                    BigbyteLoader.addCssNode(scriptItem.src, scriptItem.tag);
                    if (appDebugLevel >= levelDebug) {
                        Log.debug(methodName + ": Finished loading css and dispatching event");
                    }
                    document.dispatchEvent(bbScriptLoadedEvent);
                    break;
                case 'csslink':
                    if (appDebugLevel >= levelDebug) {
                        Log.debug(methodName + ": Attempting to load css link");
                    }
                    BigbyteLoader.addLinkNode(scriptItem.src);
                    if (appDebugLevel >= levelDebug) {
                        Log.debug(methodName + ": Finished loading css link and dispatching event");
                    }
                    document.dispatchEvent(bbScriptLoadedEvent);
                    break;
                default:
                    break;
            }
        };
        return BigbyteLoader;
    }());

    var UserScriptUtil = (function () {
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

    var Util = (function () {
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

    var TinyMceWork = (function () {
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
                            content_style: 'a,blockquote,body,code,dd,del,dfn,div,dl,dt,em,h1,h2,h3,h4,h5,h6,html,iframe,img,li,ol,p,pre,q,ul{border:0;padding:0;margin:0}a,abbr,acronym,address,area,b,bdo,big,blockquote,caption,center,cite,code,col,colgroup,dd,del,dfn,div,dl,dt,em,font,h3,h4,h5,h6,hr,i,ins,kbd,li,map,ol,p,pre,q,s,samp,small,span,strike,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,tt,u,ul{line-height:1.57143em}a,body{margin:0}body,h1,h2{font-family:gotham,helvetica,arial,sans-serif}a,img[name=en-crypt]{cursor:pointer}h3,p{margin-bottom:.714285em}del{text-decoration:line-through}dfn{font-style:italic}body{box-sizing:border-box;color:#383838;font-size:14px;padding-right:1px;word-wrap:break-word}a:link,a:visited{color:#047ac6}a:active,a:hover{color:#2596de}h1{font-size:1.5em;font-weight:700;line-height:1.04762em;margin-bottom:.4761em;margin-top:.9523em}h2{font-size:1.286em;font-weight:700;line-height:1.22222em;margin-bottom:.5556em;margin-top:1.111em}h3,h4,h5,h6{font-size:1em;font-weight:700;font-family:gotham,helvetica,arial,sans-serif}h3{margin-top:1.4285em}div{font-family:gotham,helvetica,arial,sans-serif;font-size:14px}img.en-media{height:auto;margin-bottom:1.286em;max-width:100%}img.en-media[height="1"]{height:1px}p+div img,p+img{margin-top:.714285em}div+div img,div+img{margin-top:.857412em}div+div img+img,img+img,li ol,li ul{margin-top:0}ol,ul{list-style-position:outside;margin-bottom:.714285em;margin-left:2em;margin-top:.2857em;padding-left:0}li ol,li ul{margin-bottom:0}h1+ol,h1+ul,h2+ol,h2+ul,p+ol,p+ul{margin-top:-.428571em}blockquote{border-left:2px solid #bfbfbf;margin-bottom:1.4285em;margin-left:1.4285em;margin-top:1.4285em;padding-left:.714285em}code,pre{font-family:Monaco,Courier,monospace}cite{font-style:italic}table{font-size:1em}td,th{padding:.2em 2em .2em 0;text-align:left;vertical-align:top}button.en-ignore{margin-bottom:1em}.highlight{background:#c9f2d0;border:1px solid #62eb92}.Decrypted{background-color:#f7f7f7;padding:5px}.Decrypted .Header{color:#404040;font-family:gotham,helvetica,arial,sans-serif;font-size:11px;padding-bottom:5px}.Decrypted .Body{background-color:#fff;padding:5px}.canvas-container{background:url(/redesign/global/img/loading-spinner.gif) center center no-repeat #fff;border:1px solid #cacaca;margin-bottom:10px}',
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

    var Evernote = (function () {
        function Evernote() {
            var _this = this;
            this.btnSelector = '';
            this.iframeSelector = '';
            this.noteSelector = '';
            this.fullScreen = false;
            this.scripts = [];
            this.TMCE = new TinyMceWork();
            this.init = function () {
                var methodName = '';
                var appDebugLevel = Settings.debugLevel;
                var levelDebug = DebugLevel.Debug;
                if (appDebugLevel >= levelDebug) {
                    methodName = 'init';
                    Log.debug(methodName + ": Entered in init.");
                }
                if (typeof (tinymce__default) !== 'undefined') {
                    Settings.tinyMceVersion = tinymce__default.EditorManager.majorVersion + '.' + tinymce__default.EditorManager.minorVersion;
                }
                var tinyMceVer = Settings.tinyMceVersion;
                Log.message(Settings.shortName + ': tinyMCE Version', tinyMceVer);
                var pluginSrc = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js';
                var pluginXpathJq = 'https://cdn.jsdelivr.net/npm/jquery-xpath@0.3.1/jquery.xpath.min.js';
                if (document.addEventListener) {
                    document.addEventListener('allScriptsLoaded', _this.onBbScriptLoaded);
                }
                if (typeof (jQuery) === 'undefined') {
                    if (appDebugLevel >= levelDebug) {
                        Log.debug(methodName + ": Attempting to add jquery link: " + pluginXpathJq);
                    }
                    _this.addScript('jquery', pluginSrc, 'linkedjs', 'jQuery');
                }
                else {
                    if (appDebugLevel >= levelDebug) {
                        Log.debug(methodName + ": No need to load jQuery already loaded");
                    }
                }
                if (typeof (jQuery().xpath) === 'undefined') {
                    if (appDebugLevel >= levelDebug) {
                        Log.debug(methodName + ": Attempting to add jquery xpath link: " + pluginXpathJq);
                    }
                    _this.addScript('jqueryXpath', pluginXpathJq, 'linkedjs', 'jQuery().xpath');
                }
                else {
                    if (appDebugLevel >= levelDebug) {
                        Log.debug(methodName + ": No need to load jQuery xpath already loaded");
                    }
                }
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": Attempting to icons-css");
                }
                _this.addScript('icons-css', '//cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css', 'csslink');
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": Attempting to hilite-icons-css");
                }
                _this.addScript('hilite-icons-css', '//api.bigbytetech.ca/js/hilite.css', 'csslink');
                if (typeof (tinymce__default) === 'undefined') {
                    if (appDebugLevel >= levelDebug) {
                        Log.debug(methodName + ": Could not find tinymce. Attempting to add via link injection.");
                    }
                    _this.addScript('tinyMceJs', '//cdnjs.cloudflare.com/ajax/libs/tinymce/' + tinyMceVer + '/tinymce.min.js', 'linkedjs', 'tinyMCE');
                }
                else {
                    if (appDebugLevel >= levelDebug) {
                        Log.debug(methodName + ": Found tinymce");
                    }
                }
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": Attempting to add tinyMceCss");
                }
                _this.addScript('tinyMceCss', '//cdnjs.cloudflare.com/ajax/libs/tinymce/' + tinyMceVer + '/skins/lightgray/skin.min.css', 'csslink');
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": Attempting to add lightboxcss");
                }
                _this.addScript('lightboxcss', _this.lightBoxCss, 'css', undefined, { tag: 'body' });
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": Calling " + methodName + " loadScripts");
                }
                _this.loadScripts();
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": Leaving");
                }
            };
            this.onAllScriptsLoaded = function (e) {
                var methodName = '';
                var appDebugLevel = Settings.debugLevel;
                var levelDebug = DebugLevel.Debug;
                if (appDebugLevel >= levelDebug) {
                    methodName = 'onAllScriptsLoaded';
                    Log.debug(methodName + ": Entered.");
                }
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
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": calliing ensuringPlugins()");
                }
                _this.ensurePlugins();
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": calliing addToolbarButton()");
                }
                _this.addToolbarButton();
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": adding custom event handlers");
                }
                $(document).on('editBtnAdded', _this.onEditBtnAdded);
                $(document).on('tinymceInit', _this.onTinymceInit);
                $(document).on('tinymceSave', _this.onTinymceSave);
                $(document).on('tinymceCancel', _this.onTinymceCancel);
                $(document).on('tinymceFullScreen', _this.onTinyMceFulllscreen);
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": calliing writeLightBox()");
                }
                _this.writeLightBox();
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": calliing init on TinyMceWork class instance of TMCE");
                }
                _this.TMCE.init();
                var intGmboxPadLeft = parseInt($('.gmbox').css('padding-left'), 10);
                var intGmboxPadRight = parseInt($('.gmbox').css('padding-right'), 10);
                var intTinymceWidth = parseInt(GM_config.get('tinymceWidth'), 10);
                intTinymceWidth = intTinymceWidth - (intGmboxPadLeft + intGmboxPadRight);
                $('.gmbox-window').width(intTinymceWidth);
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": .gmbox-window class width", intTinymceWidth);
                }
                $('.gmclose').click(function () {
                    if (appDebugLevel >= levelDebug) {
                        Log.debug(methodName + ": .gmclose click function entered");
                        Log.debug(methodName + ": .gmclose click function tinyID", Settings.tinyId);
                        Log.debug(methodName + ": .gmclose click triggering tinymceCancel custom eveent");
                    }
                    $(document).trigger('tinymceCancel', {
                        message: 'cancel',
                        tinyMceId: Settings.tinyId
                    });
                });
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": Leaving");
                }
            };
            this.onTinymceInit = function (e) {
                Log.message(Settings.shortName + ': Tiny Mce Init was triggered');
            };
            this.onTinymceSave = function (e) {
                var methodName = '';
                var appDebugLevel = Settings.debugLevel;
                var levelDebug = DebugLevel.Debug;
                if (appDebugLevel >= levelDebug) {
                    methodName = 'onTinymceSave';
                    Log.debug(methodName + ": Entered.");
                }
                if (e.tinyMceId === Settings.tinyId) {
                    _this.save();
                    _this.lightBoxReset();
                    var ed = tinymce__default.EditorManager.editors[e.tinyMceId];
                    ed.setContent('');
                }
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": Leaving.");
                }
            };
            this.onTinymceCancel = function (e, data) {
                var methodName = '';
                var appDebugLevel = Settings.debugLevel;
                var levelDebug = DebugLevel.Debug;
                if (appDebugLevel >= levelDebug) {
                    methodName = 'onTinymceCancel';
                    Log.debug(methodName + ": Entered.");
                }
                if (data.tinyMceId === Settings.tinyId) {
                    var ed = tinymce__default.EditorManager.editors[data.tinyMceId];
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
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": Leaving.");
                }
            };
            this.onTinyMceFulllscreen = function (e) {
                var methodName = '';
                var appDebugLevel = Settings.debugLevel;
                var levelDebug = DebugLevel.Debug;
                if (appDebugLevel >= levelDebug) {
                    methodName = 'onTinyMceFulllscreen';
                    Log.debug(methodName + ": Entered.");
                }
                if (e.tinyMceId === Settings.tinyId) {
                    _this.fullScreen = e.state;
                    if (e.state) {
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
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": Leaving.");
                }
            };
            this.addScript = function (sName, sSrc, objType, objTestMethod, args) {
                var methodName = 'addScript';
                var appDebugLevel = Settings.debugLevel;
                var levelDebug = DebugLevel.Debug;
                var newItm = {
                    name: sName,
                    src: sSrc,
                    type: objType,
                    testMethod: (objTestMethod) ? objTestMethod : '',
                    text: '',
                    loaded: false,
                    timeout: 0,
                    tag: '',
                    count: 0
                };
                if (args) {
                    if (appDebugLevel >= levelDebug) {
                        Log.debug(methodName + ": Attempting to add script:", newItm);
                    }
                    _this.scripts[sName] = newItm;
                }
                else {
                    if (appDebugLevel >= levelDebug) {
                        Log.debug(methodName + ": Attempting to extend script:", newItm);
                    }
                    var extended = UserScriptUtil.extend(newItm, args);
                    if (appDebugLevel >= levelDebug) {
                        Log.debug(methodName + ": Extended script:", extended);
                    }
                    _this.scripts[sName] = extended;
                }
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": Leaving");
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
                var lib = _this;
                if ($('#gm-edit-btn').length) {
                    $('#gm-edit-btn').click(function () {
                        var k = Settings.tinyId;
                        var ed = tinymce__default.EditorManager.editors[k];
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
                    Log.message(Settings.shortName + ': Edit Button Click added');
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
                        Log.message(Settings.shortName + ': Found element for button placement');
                        clearInterval(gmTimer);
                        objElement.append(lib.createToolbarHtml());
                        $(document).trigger('editBtnAdded', {
                            type: 'editBtnAdded',
                            message: 'Button Added',
                            time: new Date()
                        });
                    }
                    else {
                        Log.message(Settings.shortName + ': Unable to find element for button placement');
                    }
                    if (gmCounter >= 20 || objElement.length > 0) {
                        clearInterval(gmTimer);
                    }
                }, 500);
            };
            this.createToolbarHtml = function () {
                var btnHtml = _this.createToolbarEditBtn();
                var html = '';
                html += '<div id="gm-tb" title="Edit with TinyMCE" class="' + _this.btnSelector + '">' + btnHtml + '</div>';
                return html;
            };
            this.createToolbarEditBtn = function () {
                var html = '<div id="gm-edit-btn" style="display:inline-block;" name="gm-edit-btn" class="gm-btn"><i class="fi-page-edit"></i></div>';
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
                var methodName = 'loadScripts';
                var appDebugLevel = Settings.debugLevel;
                var levelDebug = DebugLevel.Debug;
                if (appDebugLevel >= levelDebug) {
                    Log.debug(methodName + ": Entered.");
                }
                var count = 0;
                for (var key in _this.scripts) {
                    if (_this.scripts.hasOwnProperty(key)) {
                        var script = _this.scripts[key];
                        if (appDebugLevel >= levelDebug) {
                            Log.debug(methodName + ": Attempting to add script:", script);
                        }
                        count++;
                        if (count > 1) {
                            return;
                        }
                        BigbyteLoader.loadScript(script);
                    }
                }
                if (appDebugLevel >= levelDebug) {
                    methodName = Util.getMethodName(function () { return _this.init; });
                    Log.debug(methodName + ": exiting " + methodName + ".");
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
            this.lightBoxCss = '.gmbackdrop,.gmbox{position:absolute;display:none}.gmbackdrop{top:0;left:0;width:100%;height:100%;background:#000;opacity:0;';
            this.lightBoxCss += 'filter:alpha(opacity=0);z-index:201}.gmbox{background:#fff;z-index:202;padding:10px;';
            this.lightBoxCss += '-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-moz-box-shadow:0 0 5px #444;-webkit-box-shadow:0 0 5px #444;';
            this.lightBoxCss += 'box-shadow:0 0 5px #444}.gmclose{float:right;margin-right:6px;cursor:pointer}.mce-panel{border:none}div.gmbox .mce-panel{border:';
            this.lightBoxCss += ' 0 solid rgba(0,0,0,.2)}div.mce-tinymce.mce-container.mce-panel{margin-top:2em}div.mce-tinymce.mce-container.mce-panel.mce-fullscreen';
            this.lightBoxCss += '{margin-top:0}#gm-edit-btn{font-size:1.6em;color:#ABABAB;cursor:pointer;}#gm-edit-btn:hover{color:#2DBE60}';
            this.lightBoxCss += '.gmbox-window{top:50%;left:50%;transform: translate(-50%, -50%);position: absolute;';
            this.lightBoxCss += '}#gm-tb{display:inline-block;position:absolute;}';
        }
        return Evernote;
    }());

    var validateIfTop = function () {
        return window.top === window.self;
    };
    if (validateIfTop()) {
        Log.message(Settings.shortName + ': Start loading...');
        var en = new Evernote();
        en.init();
        Log.message(Settings.shortName + ': End loading...');
    }
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

}($, tinymce));
//# sourceMappingURL=TinyMce_for_Evernote.user.js.map
