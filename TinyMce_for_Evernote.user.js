// ==UserScript==
// @name            TinyMce for Evernote
// @namespace       https://github.com/Amourspirit/TinyMce-for-Evernote
// @version         1.2.5
// @description     Adds TinyMce in Evernote with custom options including source code. A new button is added to Evernote top toolbar section.
// @run-at          document-end
// @include         /^https?:\/\/www\.evernote\.com\/home\.action.*n=.*$/
// @match           http://www.evernote.com/Home.action*
// @match           https://www.evernote.com/Home.action*
// @grant           none
// @noframes
// @license         MIT
// @homepageURL     https://amourspirit.github.io/TinyMce-for-Evernote/
// @update          https://github.com/Amourspirit/TinyMce-for-Evernote/raw/master/TinyMce_for_Evernote.user.js
// @downloadURL     https://github.com/Amourspirit/TinyMce-for-Evernote/raw/master/TinyMce_for_Evernote.user.js
// @contributionURL https://amourspirit.github.io/TinyMce-for-Evernote/#donate
// ==/UserScript==
'use strict';
// #nsregion BIGBYTE
// #region Methods
var BIGBYTE = BIGBYTE || {};
if (typeof(BIGBYTE.createNS) == 'undefined') {
    BIGBYTE.createNS = function(namespace) {
        var nsparts = namespace.split(".");
        var parent = BIGBYTE;

        // we want to be able to include or exclude the root namespace so we strip
        // it if it's in the namespace))
        if (nsparts[0] === "BIGBYTE") {
            nsparts = nsparts.slice(1);
        }

        // loop through the parts and create a nested namespace if necessary
        for (var i = 0; i < nsparts.length; i++) {
            var partname = nsparts[i];
            // check if the current parent already has the namespace declared
            // if it isn't, then create it
            if (typeof parent[partname] === "undefined") {
                parent[partname] = {};
            }
            // get a reference to the deepest element in the hierarchy so far
            parent = parent[partname];
        }
        // the parent is now constructed with empty namespaces and can be used.
        // we return the outermost namespace
        return parent;
    };
}
if (typeof(BIGBYTE.isjquery) == 'undefined') {
    BIGBYTE.isjquery = function(data) {
        // If data is already a jQuery object
        if (data instanceof jQuery) {
            // Do nothing different
            data = data;
            // Otherwise
        } else {
            // Convert to jQuery object
            data = jQuery(data);
        }
        // Return jQuery object
        return data;
    };
}
// #endregion
// #endnsregion BIGBYTE
// #nsregion BIGBYTE.USERSCRIPT.DOCUMENT

if (window.top != window.self) {
    // if this is an iframe then return
    return;
}

var bbDoc = BIGBYTE.createNS("BIGBYTE.USERSCRIPT.DOCUMENT");
bbDoc.ns = 'BIGBYTE.USERSCRIPT.DOCUMENT';
// #region LoadScripts
if (typeof(bbDoc.loadScript) == 'undefined') {
    bbDoc.loadScript = function(scriptItm) {
        var lib = this;
        if (typeof(scriptItm.count) == 'undefined') {
            scriptItm.count = 0;
        }
        if (typeof(scriptItm.loaded) == 'undefined') {
            scriptItm.loaded = false;
        }
        if (typeof(scriptItm.text) == 'undefined') {
            scriptItm.text = ''; // timeout in seconds
        }
        if (typeof(scriptItm.timeout) == 'undefined') {
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
                var skipTest = false;
                if (typeof(scriptItm.testMethod) == 'undefined' || (scriptItm.testMethod.length == 0)) {
                    skipTest = true;
                }
                if (skipTest) {
                    // there is no test for this item so we will and assume
                    // all is fine/
                    scriptItm.loaded = true;
                    lib.addJS_Node(scriptItm.text, scriptItm.src);
                    // trigger event for loaded

                    //jQuery(document).trigger("bbScriptLoaded", scriptItm);
                    document.dispatchEvent(bbScriptLoadedEvent);
                    return;
                }
                scriptItm.count++;
                var maxCount = scriptItm.timeout * 10; // multply by 10 to convert into 10th of seconds

                if (scriptItm.count > maxCount) {
                    console.error('unable to load script, Aborting: ', scriptItm.src);
                    return;
                }
                var testmethod;
                try {
                    testmethod = eval(scriptItm.testMethod);
                } catch (e) {
                    testmethod = undefined;
                }
                if (typeof(testmethod) == 'undefined') {
                    if (!scriptItm.loaded) {
                        scriptItm.loaded = true;
                        lib.addJS_Node(scriptItm.text, scriptItm.src);
                    }
                    setTimeout(function() {
                        lib.loadScript(scriptItm);
                    }, 100);
                } else {
                    // script item is loaded trigger an evert
                    //jQuery(document).trigger("bbScriptLoaded", scriptItm);
                    document.dispatchEvent(bbScriptLoadedEvent);
                }
                break;
            case 'css':
                if (typeof(scriptItm.tag) == 'undefined') {
                    scriptItm.tag = 'body'; // timeout in seconds
                }
                lib.addCss_Node(scriptItm.src, scriptItm.tag);
                //jQuery(document).trigger("bbScriptLoaded", scriptItm);
                document.dispatchEvent(bbScriptLoadedEvent);
                break;
            case 'csslink':
                lib.addLink_Node(scriptItm.src);
                //jQuery(document).trigger("bbScriptLoaded", scriptItm);
                document.dispatchEvent(bbScriptLoadedEvent);
                break;
            default:
                // statements_def
                break;
        }
    }
}

// #endregion LoadScripts
// #region BIGBYTE.USERSCRIPT.DOCUMENT Methods
// gneric document related
if (typeof(bbDoc.addJS_Node) == 'undefined') {
    bbDoc.addJS_Node = function(text, s_URL, funcToRun, runOnLoad) {
        var D = document;
        var scriptNode = D.createElement('script');
        if (runOnLoad) {
            scriptNode.addEventListener("load", runOnLoad, false);
        }
        scriptNode.type = "text/javascript";
        if (text) scriptNode.textContent = text;
        if (s_URL) scriptNode.src = s_URL;
        if (funcToRun) scriptNode.textContent = '(' + funcToRun.toString() + ')()';

        var targ = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
        targ.appendChild(scriptNode);
    };
}
if (typeof(bbDoc.addJS_NodeToBody) == 'undefined') {
    bbDoc.addJS_NodeToBody = function(text, s_URL, funcToRun, runOnLoad) {
        var D = document;
        var scriptNode = D.createElement('script');
        if (runOnLoad) {
            scriptNode.addEventListener("load", runOnLoad, false);
        }
        scriptNode.type = "text/javascript";
        if (text) scriptNode.textContent = text;
        if (s_URL) scriptNode.src = s_URL;
        if (funcToRun) scriptNode.textContent = '(' + funcToRun.toString() + ')()';

        var targ = D.getElementsByTagName('body')[0] || D.body || D.documentElement;
        targ.appendChild(scriptNode);
    };
}
if (typeof(bbDoc.addCss_Node) == 'undefined') {
    bbDoc.addCss_Node = function(text, element) {
        element = typeof element !== 'undefined' ? element : 'head';
        var D = document;
        var scriptNode = D.createElement('style');
        scriptNode.type = "text/css";
        if (text) scriptNode.textContent = text;

        var targ = D.getElementsByTagName(element)[0] || D.body || D.documentElement;
        targ.appendChild(scriptNode);
    };
}
if (typeof(bbDoc.addLink_Node) == 'undefined') {
    bbDoc.addLink_Node = function(href, type, rel) {
        type = typeof type !== 'undefined' ? type : "text/css";
        rel = typeof rel !== 'undefined' ? rel : "stylesheet";
        var D = document;
        var scriptNode = D.createElement('link');
        scriptNode.type = type;
        scriptNode.href = href;
        if (rel) scriptNode.rel = rel;

        var targ = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
        targ.appendChild(scriptNode);
    };
}

if (typeof(bbDoc.addHtml_Node) == 'undefined') {
    bbDoc.addHtml_Node = function(html) {
        var D = document;
        var targ = D.getElementsByTagName('body')[0] || D.body || D.documentElement;
        targ.insertAdjacentHTML('beforeend', html);
    };
}
// #endregion BIGBYTE.USERSCRIPT.DOCUMENT Methods

// #nsregion BIGBYTE.USERSCRIPT.UTIL
var bbusu = BIGBYTE.createNS("BIGBYTE.USERSCRIPT.UTIL");
bbusu.ns = 'BIGBYTE.USERSCRIPT.UTIL';
// #region Methods
if(typeof(bbusu.extend) == 'undefined') {
    /**
     * Extends an object to contain new Properties
     * @return {[Object]} the new merged oject
     */
    bbusu.extend = function () {
        for (var i = 1; i < arguments.length; i++)
            for (var key in arguments[i])
                if (arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    };
}

// #endregion Methods
// #endnsregion BIGBYTE.USERSCRIPT.UTIL

// #endnsregion BIGBYTE.USERSCRIPT.DOCUMENT"
// #nsregion BIGBYTE.USERSCRIPT.EVERNOTE
// #region Create NS
var enus = BIGBYTE.createNS("BIGBYTE.USERSCRIPT.EVERNOTE");
enus.ns = 'BIGBYTE.USERSCRIPT.EVERNOTE';
// #endregion Create ns
// #region Properties
enus.btnSelector = '';
enus.iframeSelector = '';
enus.sidebarSelector = '';
enus.noteSelector = '';
enus.fullScreen = false;
// light box related
enus.lightBoxCss = '.gmbackdrop,.gmbox{position:absolute;display:none}.gmbackdrop{top:0;left:0;width:100%;height:100%;background:#000;opacity:0;';
enus.lightBoxCss += 'filter:alpha(opacity=0);z-index:201}.gmbox{background:#fff;z-index:202;padding:10px;';
enus.lightBoxCss += '-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-moz-box-shadow:0 0 5px #444;-webkit-box-shadow:0 0 5px #444;';
enus.lightBoxCss += 'box-shadow:0 0 5px #444}.gmclose{float:right;margin-right:6px;cursor:pointer}.mce-panel{border:none}div.gmbox .mce-panel{border:';
enus.lightBoxCss += ' 0 solid rgba(0,0,0,.2)}div.mce-tinymce.mce-container.mce-panel{margin-top:2em}div.mce-tinymce.mce-container.mce-panel.mce-fullscreen';
enus.lightBoxCss += '{margin-top:0}#gm-edit-btn{font-size:1.6em;color:#ABABAB;cursor:pointer;}#gm-edit-btn:hover{color:#2DBE60}';
enus.lightBoxCss += '.gmbox-window{top:50%;left:50%;transform: translate(-50%, -50%);position: absolute;';
enus.lightBoxCss += 'width:650px;height:450px;}#gm-tb{display:inline-block;position:absolute;}';
// #endregion Properties
// #region Init
/**
 * Init for the main script
 */
enus.init = function() {
    if (window.top != window.self) {
        // if this is an iframe then return
        return;
    }
    BIGBYTE.USERSCRIPT.EVERNOTE.TMCE.version = '4.1.0';
    if(typeof(tinyMCE) != 'undefined') {
        BIGBYTE.USERSCRIPT.EVERNOTE.TMCE.version = tinyMCE.majorVersion + '.' + tinyMCE.minorVersion;
    }
    var tinyMceVer = BIGBYTE.USERSCRIPT.EVERNOTE.TMCE.version;
    console.log('tinyMCE Version', tinyMceVer);
    // var pluginSrc = '//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.0/jquery-1.8.0.min.js';
    var pluginSrc = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js';

    // no jquery at this point use pure javascript events
    if (document.addEventListener) { // For all major browsers, except IE 8 and earlier
        document.addEventListener("bbScriptLoaded", BIGBYTE.USERSCRIPT.EVERNOTE.onBbScriptLoaded);
    } else if (document.attachEvent) { // For IE 8 and earlier versions
        document.attachEvent("onbbScriptLoaded", BIGBYTE.USERSCRIPT.EVERNOTE.onBbScriptLoaded);
    }

    if (document.addEventListener) { // For all major browsers, except IE 8 and earlier
        document.addEventListener("allScriptsLoaded", BIGBYTE.USERSCRIPT.EVERNOTE.onAllScriptsLoaded);
    } else if (document.attachEvent) { // For IE 8 and earlier versions
        document.attachEvent("onallScriptsLoaded", BIGBYTE.USERSCRIPT.EVERNOTE.onAllScriptsLoaded);
    }

    // only add jquery if we need it.
    if (typeof(jQuery) == 'undefined') {
        this.addScript('jquery', pluginSrc, 'linkedjs', 'jQuery');
    }

    this.addScript('icons-css', '//cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css', 'csslink');
    //this.addScript('code-css','shi/css/shi_default.min.css','csslink');
    // tiny mce
    if (typeof(tinyMCE) == 'undefined') {
        this.addScript('tinyMceJs', '//cdnjs.cloudflare.com/ajax/libs/tinymce/' + tinyMceVer + '/tinymce.min.js', 'linkedjs', 'tinyMCE');
    }
    this.addScript('tinyMceCss', '//cdnjs.cloudflare.com/ajax/libs/tinymce/' + tinyMceVer + '/skins/lightgray/skin.min.css', 'csslink');

    this.addScript('lightboxcss', this.lightBoxCss, 'css',null, {tag:'body'});

    //this.addScript('tinymce_advanced_theme', '//cdnjs.cloudflare.com/ajax/libs/tinymce/' + tinyMceVer + '/themes/advanced/theme.min.js','linkedjs') // no checking required
    this.loadScripts();
};
/*
 * Load scripts will load one script only at a time.
 * When the script is loaded the next if any script will be
 * load via the onScripLoadeEvent
 * the onScriptLoaded Event calle this function over and over untll all the scripts are loaded
 */
enus.loadScripts = function() {

    var count = 0;
    for (var key in this.scripts) {
        count++;
        if (count > 1) {
            return;
        }
        BIGBYTE.USERSCRIPT.DOCUMENT.loadScript(this.scripts[key]);
    }
};
/*
 * Array to hold all the scripts that are to be loaded
 */
enus.scripts = [];
/*
 * Adds script item to the BIGBYTE.USERSCRIPT.EVERNOTE.scripts array
 * these are scripts tha will be loaded when the BIGBYTE.USERSCRIPT.EVERNOTE.init() is fired
 */
enus.addScript = function(name, src, type, testMethod, args) {
    var newItm = {
        name: name,
        src: src,
        type: type,
        testMethod: testMethod
    };
    if(typeof(args) === undefined) {
        this.scripts[name] = newItm;
    } else {
        var extended = BIGBYTE.USERSCRIPT.UTIL.extend(newItm, args);
        this.scripts[name] = extended;
    }


};

/*
 * Function to check and see if there are any scripts left to be loaded
 * @returns boolean, true if all the scripts are loaded; Otherwise false
 */
enus.isScriptsLoaded = function() {
    var lib = BIGBYTE.USERSCRIPT.EVERNOTE;
    for (var key in lib.scripts) {
        if (!lib.scripts[key].loaded) {
            return false;
        }
    }
    return true;
};

// #endregion init

// #region events
enus.onBbScriptLoaded = function(e) {
    var lib = BIGBYTE.USERSCRIPT.EVERNOTE;
    // delete the added script

    delete lib.scripts[e.detail.scriptItm.name];
    var done = lib.isScriptsLoaded();
    if (done) {
        var allScriptsLoaded = new CustomEvent(
            "allScriptsLoaded", {
                detail: {
                    message: "All Scripts Loaded",
                    time: new Date(),
                },
                bubbles: true,
                cancelable: false
            }
        );
        document.dispatchEvent(allScriptsLoaded);
        //jQuery(document).trigger("allScriptsLoaded");
    } else {
        // add the next script
        lib.loadScripts();
    }
}

/*
 * Event Handler that fires when all scripts are loaded
 * this is main loading point for the script.
 */
enus.onAllScriptsLoaded = function(e) {
	console.log('all scripts have been loaded.');
	jQuery(function($, undefined) {
		var lib = BIGBYTE.USERSCRIPT.EVERNOTE;
        lib.btnSelector = '.GJDCG5CEMB';
		// #en-common-editor-iframe is chrome selector, firefox is different
		//if ($.browser.chrome) {
		if(/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())) {
			// setup for Chrome
            lib.iframeSelector = '#entinymce_491_ifr';
            lib.noteSelector = 'body';
		} else {
			// setup for Firefox
			// lib.iframeSelector = '#entinymce_489_ifr';
			lib.iframeSelector = '.RichTextArea-entinymce';
			lib.noteSelector = 'body';
		}

		lib.sidebarSelector = '#gwt-debug-sidebar';

		lib.ensurePlugins();
		lib.addToolbarButton();

		$(document).on('editBtnAdded', lib.onEditBtnAdded);
		$(document).on("tinymceInit", lib.onTinymceInit);
		$(document).on("tinymceSave", lib.onTinymceSave);
		$(document).on("tinymceCancel", lib.onTinymceCancel);
		$(document).on('tinymceFullScreen', lib.onTinyMceFulllscreen);


		lib.lightBoxAddCss();
		lib.writeLightBox();
		lib.TMCE.init();

		$('.gmclose').click(function() {
			$.event.trigger({
			type: "tinymceCancel",
			message: 'cancel',
			time: new Date(),
			tinyMceId: 'gminput'
			});
		});


    });
};

enus.onEditBtnAdded = function(e) {
    console.log('onEditBtnAdded event fired');
    var lib = BIGBYTE.USERSCRIPT.EVERNOTE;
    var $ = jQuery;


    lib.addButtonClick();
};

/**
 * Event that fire when TinyMce is initiated
 */
enus.onTinymceInit = function(e) {
    console.log('Tiny Mce Init was triggered');
};
/**
 * Event that fire when TinyMce save is clicked
 */
enus.onTinymceSave = function(e) {
    var lib = BIGBYTE.USERSCRIPT.EVERNOTE;
    if (e.tinyMceId == 'gminput') {
        //console.log('Tiny Mce save was triggered');
        lib.save();
        lib.lightBoxReset();
        tinyMCE.get(e.tinyMceId).setContent(''); // clean up tinyMCE
    }

};
/**
 * Event that fire when TinyMce close is clicked
 */
enus.onTinymceCancel = function(e) {
    var lib = BIGBYTE.USERSCRIPT.EVERNOTE;
    if (e.tinyMceId == 'gminput') {
        if (lib.confirmExit()) {
            lib.lightBoxReset();
            tinyMCE.get(e.tinyMceId).setContent(''); // clean up tinyMCE
        }
    }
};
enus.onTinyMceFulllscreen = function(e) {
    var $ = jQuery;
    var lib = BIGBYTE.USERSCRIPT.EVERNOTE;

    if (e.tinyMceId == 'gminput') {
        lib.fullScreen = e.state;
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
};
// #endregion events
// #region methods
enus.addToolbarButton = function() {
    var $ = jQuery;
    var lib = BIGBYTE.USERSCRIPT.EVERNOTE;
    var gmCounter = 0;
    var gmTimer = setInterval(function() {
        gmCounter++;
        console.log("turn no. " + gmCounter);
        var objLen = $(lib.btnSelector).length;
        if (objLen) {
            console.log('found class ', lib.btnSelector);
            // add my own toolbar button
            clearInterval(gmTimer);
            $(lib.btnSelector).append(lib.createToolbarHtml());
            $.event.trigger({
                type: "editBtnAdded",
                message: 'Button Added',
                time: new Date()
            });
        } else {
            console.log('unable to find class ', lib.btnSelector);
        }

        if (gmCounter >= 20 || objLen > 0) {
            clearInterval(gmTimer);
        }
    }, 500);
};
enus.addButtonClick = function() {
    var $ = jQuery;
    var lib = this;
    if ($('#gm-edit-btn').length) {
        $('#gm-edit-btn').click(function() {
            if (this.fullScreen) {
                tinyMCE.get('gminput').execCommand('mceFullScreen');
            }
            tinyMCE.get('gminput').setContent($(lib.iframeSelector).contents().find(lib.noteSelector).html());
            $('.gmbackdrop, .gmbox').animate({
                'opacity': '.50'
            }, 300, 'linear');
            $('.gmbox').animate({
                'opacity': '1.00'
            }, 300, 'linear');
            $('.gmbackdrop, .gmbox').css('display', 'block');
        });
        console.log('Edit Button Click added');
    }
};
enus.ensurePlugins = function() {
    var $ = jQuery;
    if (typeof($.fn.tagName) == 'undefined') {
        $.fn.tagName = function(toLower) {
            var tn = this.prop("tagName");
            if (toLower) {
                tn = tn.toLowerCase();
            }
            return tn;
        };
    }
};
enus.createToolbarHtml = function() {
    var btnHtml = this.createToolbarEditBtn();
    var html = '';
    html += '<div id="gm-tb" title="Edit with TinyMCE" class="' + this.btnSelector + '">' + btnHtml + '</div>';
    return html;
};
enus.createToolbarEditBtn = function() {
    var html = '<div id="gm-edit-btn" style="display:inline-block;" name="gm-edit-btn" class="gm-btn"><i class="fi-page-edit"></i></div>';
    return html;
};
/*
 * resets the lightbox back to hidden state
 */
enus.lightBoxReset = function() {
    var $ = jQuery;
    $('.gmbackdrop, .gmbox').animate({
        'opacity': '0'
    }, 300, 'linear', function() {
        $('.gmbackdrop, .gmbox').css('display', 'none');
    });
    $('textarea#gminput').val(''); // clean up textarea
};

enus.lightBoxAddCss = function() {
    // var bdoc = BIGBYTE.USERSCRIPT.DOCUMENT;
    // bdoc.addCss_Node(this.lightBoxCss, 'body');
};
enus.confirmExit = function() {
    return confirm("Are you sure you want to close this editor?");
};
enus.save = function() {
    var $ = jQuery;
    var e = tinyMCE.get("gminput").getContent();
    var lib = this;
    $(".gmbackdrop, .gmbox").animate({
        opacity: "0"
    }, 300, "linear", function() {
        $(".gmbackdrop, .gmbox").css("display", "none");
    });
    var content = $(this.iframeSelector).contents().find(lib.noteSelector);
    content.html(e);
    $("textarea#gminput").val(""), tinyMCE.get("gminput").setContent("");
    $(this.sidebarSelector).show();
};
enus.writeLightBox = function(id, title) {
    var html = this.getLightBoxHtml(id, title);
    var bdoc = BIGBYTE.USERSCRIPT.DOCUMENT;
    bdoc.addHtml_Node(html);
};
enus.getLightBoxHtml = function(id, title) {
    id = typeof id !== 'undefined' ? id : 'gminput';
    title = typeof title !== 'undefined' ? title : '';
    var h = '<div class="gmbackdrop"></div>';
    h += '<div id="tinybox" class="gmbox gmbox-window"><div class="gmclose"><i class="fi-x" style="color:black"></i></div>';
    h += title;
    h += '<textarea id="' + id + '" rows="18" cols="68"></textarea>';
    h += '</div></div>';
    return h;
};
// #endregion methods
// #endnsregion BIGBYTE.USERSCRIPT.EVERNOTE

// #nsregion BIGBYTE.USERSCRIPT.STHL.TMCE
// #region Create NS
var entn = BIGBYTE.createNS("BIGBYTE.USERSCRIPT.EVERNOTE.TMCE");
entn.ns = 'BIGBYTE.USERSCRIPT.EVERNOTE.TMCE';
// #endregion Create ns
// #region Properties
entn.fullscreen = false;
entn.loopcount = 0;
entn.version = '4.1.0';

// #endregion Properties
// #region init
if (typeof(entn.init) == 'undefined') {
    entn.init = function() {
        var gmTinyMceTimerCounter = 0;
        var ver = this.version;
        var id = 'gminput';
        var gmTinyMceTimer = setInterval(function() {
            gmTinyMceTimerCounter++;
            console.log("turn no. " + gmTinyMceTimerCounter + ' looking for tinymce');
            if (typeof(tinyMCE) !== undefined) {
                console.log('found tinymce library');
                clearInterval(gmTinyMceTimer);
                tinyMCE.init({
                    selector: 'textarea#' + id,
                    //entity_encoding: 'named',
                    //entities: '160,nbsp',
                    //init_instance_callback: "BIGBYTE.USERSCRIPT.STHL.TMCE.callback",
                    init_instance_callback: function() {
                        $('.mce-i-mysave').addClass('fi-save');
                        // add x icon to button
                        $('.mce-i-myexit').addClass('fi-x');
                        $.event.trigger({
                            type: "tinymceInit",
                            message: 'init',
                            time: new Date(),
                            tinyMceId: id
                        });
                    },
                    height: 260,
                    // extended_valid_elements : "span[!class]",
                    inline: false,
                    browser_spellcheck: true,
                    plugins: "",
                    menubar: "edit insert format view tools table",
                    toolbar1: 'mysave myexit insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
                    toolbar2: 'fullscreen print preview | forecolor backcolor | insertdatetime table searchreplace | link image emoticons | code',
                    external_plugins: {
                        'fullscreen': 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/fullscreen/plugin.min.js',
                        'textcolor': 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/textcolor/plugin.min.js',
                        'colorpicker': 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/colorpicker/plugin.min.js',
                        'nonbreaking': 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/nonbreaking/plugin.min.js',
                        'insertdatetime': 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/insertdatetime/plugin.min.js',
                        'code': 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/code/plugin.min.js',
                        'hr': 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/hr/plugin.min.js',
                        'searchreplace': 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/searchreplace/plugin.min.js',
                        'table': 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/table/plugin.min.js',
                        'image' : 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/image/plugin.min.js',
                        'emoticons' : 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/emoticons/plugin.min.js',
                        'link' : 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/link/plugin.min.js',
                        'wordcount' : 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/wordcount/plugin.min.js',
                        'print' : 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/print/plugin.min.js',
                        'preview' : 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/' + ver + '/plugins/preview/plugin.min.js'
                    },
                    content_css: 'https://www.evernote.com/js/tinymce/skins/lightgray/content.min.css',
                    content_style: 'a,blockquote,body,code,dd,del,dfn,div,dl,dt,em,h1,h2,h3,h4,h5,h6,html,iframe,img,li,ol,p,pre,q,ul{border:0;padding:0;margin:0}a,abbr,acronym,address,area,b,bdo,big,blockquote,caption,center,cite,code,col,colgroup,dd,del,dfn,div,dl,dt,em,font,h3,h4,h5,h6,hr,i,ins,kbd,li,map,ol,p,pre,q,s,samp,small,span,strike,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,tt,u,ul{line-height:1.57143em}a,body{margin:0}body,h1,h2{font-family:gotham,helvetica,arial,sans-serif}a,img[name=en-crypt]{cursor:pointer}h3,p{margin-bottom:.714285em}del{text-decoration:line-through}dfn{font-style:italic}body{box-sizing:border-box;color:#383838;font-size:14px;padding-right:1px;word-wrap:break-word}a:link,a:visited{color:#047ac6}a:active,a:hover{color:#2596de}h1{font-size:1.5em;font-weight:700;line-height:1.04762em;margin-bottom:.4761em;margin-top:.9523em}h2{font-size:1.286em;font-weight:700;line-height:1.22222em;margin-bottom:.5556em;margin-top:1.111em}h3,h4,h5,h6{font-size:1em;font-weight:700;font-family:gotham,helvetica,arial,sans-serif}h3{margin-top:1.4285em}div{font-family:gotham,helvetica,arial,sans-serif;font-size:14px}img.en-media{height:auto;margin-bottom:1.286em;max-width:100%}img.en-media[height="1"]{height:1px}p+div img,p+img{margin-top:.714285em}div+div img,div+img{margin-top:.857412em}div+div img+img,img+img,li ol,li ul{margin-top:0}ol,ul{list-style-position:outside;margin-bottom:.714285em;margin-left:2em;margin-top:.2857em;padding-left:0}li ol,li ul{margin-bottom:0}h1+ol,h1+ul,h2+ol,h2+ul,p+ol,p+ul{margin-top:-.428571em}blockquote{border-left:2px solid #bfbfbf;margin-bottom:1.4285em;margin-left:1.4285em;margin-top:1.4285em;padding-left:.714285em}code,pre{font-family:Monaco,Courier,monospace}cite{font-style:italic}table{font-size:1em}td,th{padding:.2em 2em .2em 0;text-align:left;vertical-align:top}button.en-ignore{margin-bottom:1em}.highlight{background:#c9f2d0;border:1px solid #62eb92}.Decrypted{background-color:#f7f7f7;padding:5px}.Decrypted .Header{color:#404040;font-family:gotham,helvetica,arial,sans-serif;font-size:11px;padding-bottom:5px}.Decrypted .Body{background-color:#fff;padding:5px}.canvas-container{background:url(/redesign/global/img/loading-spinner.gif) center center no-repeat #fff;border:1px solid #cacaca;margin-bottom:10px}',
                    //valid_elements: 'ol ul',
                    //extended_valid_elements: 'ol[|class|style] ul[class|style]',
                    keep_styles: false,
                    setup: function(ed) {
                        // Add a custom button
                        ed.on('FullscreenStateChanged', function(e) {
                            this.fullscreen = e.state;
                            $.event.trigger({
                                type: "tinymceFullScreen",
                                message: 'fullscreen toogle',
                                time: new Date(),
                                state: e.state,
                                tinyMceId: id

                            });

                        });
                        ed.addButton('mysave', {
                            title: 'Save',
                            onclick: function() {
                                $.event.trigger({
                                    type: "tinymceSave",
                                    message: 'save',
                                    time: new Date(),
                                    tinyMceId: id
                                });
                            }
                        });
                        ed.addButton('myexit', {
                            title: 'Close',
                            onclick: function() {
                                $.event.trigger({
                                    type: "tinymceCancel",
                                    message: 'cancel',
                                    time: new Date(),
                                    tinyMceId: id
                                });
                            }
                        });

                    }
                });
            }
            // set a limit to how many time we check for tinymce
            if (gmTinyMceTimerCounter >= 20) {
                console.log('reache max value for finding TinyMCE Lib');
                clearInterval(gmTinyMceTimer);
            }
        },500);


    };
}

// #endregion init
// #endnsregion BIGBYTE.USERSCRIPT.STHL.TMCE
// init the lib objects.
if (window.top == window.self) {
    enus.init();
}
