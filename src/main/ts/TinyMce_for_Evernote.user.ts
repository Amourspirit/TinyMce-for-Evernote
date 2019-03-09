import { Evernote } from './modules/class_Evernote';
import { Log } from './modules/class_Log';
import { Settings as appSettings } from './modules/class_Settings';
import { GmConfig } from './modules/class_GmConfig';

// tinymce.EditorManager.editors[0].id; will get id of Evernote's tinymce editor.
// tinymce.EditorManager.editors[0].settings.selector; will get the selector used by the editor.
declare const GM_registerMenuCommand: any;
declare const GM_config: any;

const validateIfTop = (): boolean => {
  return window.top === window.self;
};

if (validateIfTop()) {
  Log.message(appSettings.shortName + ': Start loading...');
  const en: Evernote = new Evernote();
  en.init();

  // better to load GM_Config event if the script failed to load. The failure may have been due to a user tweak.
  // by loading GM_Config the user can change the settings even if the script fails to load.
  const gConfig: GmConfig = new GmConfig();
  gConfig.init();
  if (typeof GM_registerMenuCommand === 'function') {
    Log.message(appSettings.shortName + ': Registering: Open ' + appSettings.shortName + ' Options Menu');
    GM_registerMenuCommand(appSettings.menuName, (): void => {
      GM_config.open();
      Log.message(appSettings.shortName + ': Registered: Open ' + appSettings.shortName + ' Options Menu');
    });
  } else {
    Log.error(appSettings.shortName + ': Unable to Register: Open ' + appSettings.shortName + ' Options Menu');
  }
  Log.message(appSettings.shortName + ': End loading...');
}
