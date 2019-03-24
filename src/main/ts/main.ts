import { Evernote } from './modules/class_Evernote';
import { Log } from './modules/class_Log';
import { appSettings, updateAppSetting } from './modules/appSettings';
import { GmConfig } from './modules/class_GmConfig';
import { EvernoteElementLoader } from './modules/class_EvernoteElementLoader';
import tinymce from 'tinymce';

// tinymce.EditorManager.editors[0].id; will get id of Evernote's tinymce editor.
// tinymce.EditorManager.editors[0].settings.selector; will get the selector used by the editor.
declare const GM_registerMenuCommand: any;
declare const GM_config: any;

const validateIfTop = (): boolean => {
  return window.top === window.self;
};
const main = (): void => {
  const en: Evernote = new Evernote();
  en.init();
};

if (validateIfTop()) {
  Log.message(appSettings.shortName + ': Entry Script: Start loading...');
  if (typeof (tinymce) !== 'undefined') {
    updateAppSetting('tinyMceVersion', `${tinymce.EditorManager.majorVersion}.${tinymce.EditorManager.minorVersion}`);
  }
  const loader: EvernoteElementLoader = new EvernoteElementLoader();
  loader.onAllElementsLoaded().subscribe((sender, args): void => {
    Log.message(`${appSettings.shortName}: Entry Script: All Scripts loaded. Total count: ${args.totalNumberOfScripts}`);
    main();
  });
  loader.onElementsLoadFail().subscribe((sender, args): void => {
    Log.error(`${appSettings.shortName}: Entry Script: The neceassary elements were note loaded. Failed:`, args.remainingEvents);
  });
  loader.onElementLoaded().subscribe((sender, args): void => {
    Log.message(`${appSettings.shortName}: Entry Script: Element with Key value of '${args.key}' has loaded`);
  });
  loader.onTickExpired().subscribe((sender, args): void => {
    Log.warn(`${appSettings.shortName}: Entry Script: Element with Key value of '${args.key}' has failed to load`);
  });
  loader.start();
  // better to load GM_Config event if the script failed to load. The failure may have been due to a user tweak.
  // by loading GM_Config the user can change the settings even if the script fails to load.
  const gConfig: GmConfig = new GmConfig();
  gConfig.init();
  if (typeof GM_registerMenuCommand === 'function') {
    Log.message(appSettings.shortName + ': Entry Script: Registering: Open ' + appSettings.shortName + ' Options Menu');
    GM_registerMenuCommand(appSettings.menuName, (): void => {
      GM_config.open();
      Log.message(appSettings.shortName + ': Entry Script: Registered: Open ' + appSettings.shortName + ' Options Menu');
    });
  } else {
    Log.error(appSettings.shortName + ': Entry Script: Unable to Register: Open ' + appSettings.shortName + ' Options Menu');
  }
  Log.message(appSettings.shortName + ': Entry Script: End loading...');
}
