import { Evernote } from './modules/class_Evernote';
import { Log } from './modules/class_Log';
import { Settings as appSettings } from './modules/class_Settings';
// tinymce.EditorManager.editors[0].id; will get id of Evernote's tinymce editor.
// tinymce.EditorManager.editors[0].settings.selector; will get the selector used by the editor.
declare const GM_registerMenuCommand: any;
declare const GM_config: any;

const validateIfTop = (): boolean => {
    return window.top === window.self;
};

if (validateIfTop()) {
    Log.message(appSettings.shortName + ': Start loading...');
    const en = new Evernote();
    en.init();
    Log.message(appSettings.shortName + ': End loading...');
}

if (typeof GM_registerMenuCommand === 'function') {
    Log.message(appSettings.shortName + ': Registering: Open ' + appSettings.shortName + ' Options Menu');
    GM_registerMenuCommand(appSettings.menuName, (): void => {
        GM_config.open();
        Log.message(appSettings.shortName + ': Registered: Open ' + appSettings.shortName + ' Options Menu');
    });
} else {
    Log.error(appSettings.shortName + ': Unable to Register: Open ' + appSettings.shortName + ' Options Menu');
}
