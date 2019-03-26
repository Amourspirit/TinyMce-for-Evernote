// tslint:disable-next-line
// <reference path="../../../types/gmconfig.d.ts" />
// import GM_config from 'GM_config';
declare const GM_config: any;
declare const GM_info: any;

import { appSettings } from './appSettings';

export class GmConfig {
  private gmConfig: any = GM_config;

  // #region [publicGet]
  /**
   * Ask for confirmation before closing without saving
   * @readonly
   */
  public get tinymceConfirmNoSaveExit(): boolean {
    return this.gmConfig.get('tinymceConfirmNoSaveExit');
  }
  /**
   * Width in pixels of editor when not full screen.
   * @readonly
   */
  public get tinymceWidth(): number {
    return parseInt(this.gmConfig.get('tinymceWidth'), 10);
  }
  /**
   * Gets Timymce theme. Default 'Modern White'
   * @readonly
   */
  public get tinymceTheme(): string {
    return this.gmConfig.get('tinymceTheme');
  }
  /**
   * Load Plugin Full Screen
   * @readonly
   */
  public get tinymcePluginFullscreen(): boolean {
    return this.gmConfig.get('tinymcePluginFullscreen');
  }
  /**
   * Gets he  Number of toolbars selected
   * @readonly
   */
  public get tinymceToolbars(): string {
    return this.gmConfig.get('tinymceToolbars');
  }
  /**
   * Display fonts
   * @readonly
   */
  public get tinymceFontsDisplay(): boolean {
    return this.gmConfig.get('tinymceFontsDisplay');
  }
  /**
   * 'Load Plugin Table
   * @readonly
   */
  public get tinymcePluginTable(): boolean {
    return this.gmConfig.get('tinymcePluginTable');
  }
  /**
   * Load Plugin Special Characters
   * @readonly
   */
  public get tinymcePluginCharmap(): boolean {
    return this.gmConfig.get('tinymcePluginCharmap');
  }
  /**
   * Load Plugin Html Code
   * @readonly
   */
  public get tinymcePluginCode(): boolean {
    return this.gmConfig.get('tinymcePluginCode');
  }
  /**
   * Width in pixels of HTML code editor
   * @readonly
   */
  public get tinymcePluginCodeWidth(): number {
    return parseInt(this.gmConfig.get('tinymcePluginCodeWidth'), 10);
  }
  /**
   * Height in pixels of HTML code editor
   * @readonly
   */
  public get tinymcePluginCodeHeight(): number {
    return parseInt(this.gmConfig.get('tinymcePluginCodeHeight'), 10);
  }
  /**
   * Load Plugin Preview
   * @readonly
   */
  public get tinymcePluginPreview(): boolean {
    return this.gmConfig.get('tinymcePluginPreview');
  }
  /**
   * Load Plugin Print
   * @readonly
   */
  public get tinymcePluginPrint(): boolean {
    return this.gmConfig.get('tinymcePluginPrint');
  }
  /**
   * Load Plugin Insert Date Time
   * @readonly
   */
  public get tinymcePluginInsertdatetime(): boolean {
    return this.gmConfig.get('tinymcePluginInsertdatetime');
  }
  /**
   * Load Plugin Image
   * @readonly
   */
  public get tinymcePluginImage(): boolean {
    return this.gmConfig.get('tinymcePluginImage');
  }
  /**
   * Load Plugin Find & Replace
   * @readonly
   */
  public get tinymcePluginSearchreplace(): boolean {
    return this.gmConfig.get('tinymcePluginSearchreplace');
  }
  /**
   * Load Plugin Emoticons
   * @readonly
   */
  public get tinymcePluginEmoticons(): boolean {
    return this.gmConfig.get('tinymcePluginEmoticons');
  }
  /**
   * Load Plugin Advanced List
   * @readonly
   */
  public get tinymcePluginAdvlist(): boolean {
    return this.gmConfig.get('tinymcePluginAdvlist');
  }
  /**
   * Load Plugin Visual Blocks
   * @readonly
   */
  public get tinymcePluginVisualblocks(): boolean {
    return this.gmConfig.get('tinymcePluginVisualblocks');
  }
  /**
   * Load Plugin Visual Characters
   * @readonly
   */
  public get tinymcePluginVisualchars(): boolean {
    return this.gmConfig.get('tinymcePluginVisualchars');
  }
  /**
   * Load Plugin BBCode
   * @readonly
   */
  public get tinymcePluginBbcode(): boolean {
    return this.gmConfig.get('tinymcePluginBbcode');
  }
  /**
   * Load Plugin Word Count
   * @readonly
   */
  public get tinymcePluginWordcount(): boolean {
    return this.gmConfig.get('tinymcePluginWordcount');
  }
  public get tinymcePluginHilite(): boolean {
    return this.gmConfig.get('tinymcePluginHilite');
  }
  // #endregion

  public init(): void {
    let strTitle = appSettings.menuName;
    if (GM_info && GM_info.script && GM_info.script.version) {
      strTitle = `${appSettings.menuName}: Version: ${GM_info.script.version}`;
    }
    // const initValues: GM_config.IGMconfigInitValues = {
    const initValues = {
      id: appSettings.preKey + 'Config', // The id used for this instance of GM_config
      title: strTitle, // Panel Title
      fields: // Fields object
      {
         tinymceConfirmNoSaveExit:
        {
          section: ['TinyMce editor section'],
          type: 'checkbox',
          label: 'Ask for confirmation before closing without saving?',
          default: true
        },
        tinymceWidth:
        {
          label: 'Width in pixels of editor when not full screen.', // Appears next to field
          type: 'int', // Makes this setting a text input
          min: 400, // Optional lower range limit
          max: 4000, // Optional upper range limit
          default: 660 // Default value if user doesnt change it
        },
        tinymceTheme:
        {
          section: ['TinyMce Themes', 'Choose Theme'],
          label: 'Theme', // Appears next to field
          type: 'select', // Makes this setting a dropdown
          options: ['Defalut Theme', 'Modern White', 'Modern two', 'Charcoal', 'SS4'], // Possible choices
          default: 'Modern White' // Default value if user doesn't change it
        },
        tinymceToolbars:
        {
          section: ['Toolbar Options', 'Selecting one will combine all the toolbars'],
          label: 'Select Number of Toolbars',
          type: 'select',
          options: ['one', 'two'],
          default: ['one']
        },
        tinymceFontsDisplay:
        {
          section: ['Font Display'],
          type: 'checkbox',
          label: 'Display Font List?',
          default: true
        },
        tinymcePluginFullscreen:
        {
          section: ['TinyMce plugins section', 'Plugin Options'],
          type: 'checkbox',
          label: 'Load Plugin Full Screen?',
          default: true
        },
        tinymcePluginTable:
        {
          type: 'checkbox',
          label: 'Load Plugin Table?',
          default: true
        },
        tinymcePluginCharmap:
        {
          type: 'checkbox',
          label: 'Load Plugin Special Characters?',
          default: true
        },
        tinymcePluginCode:
        {
          type: 'checkbox',
          label: 'Load Plugin Html Code?',
          default: true
        },
        tinymcePluginCodeWidth:
        {
          label: 'Width in pixels of HTML code editor.',
          type: 'int',
          min: 200,
          max: 4000,
          default: 400
        },
        tinymcePluginCodeHeight:
        {
          label: 'Height in pixels of HTML code editor.',
          type: 'int',
          min: 200,
          max: 4000,
          default: 300
        },
        tinymcePluginPreview:
        {
          type: 'checkbox',
          label: 'Load Plugin Preview?',
          default: true
        },
        tinymcePluginPrint:
        {
          type: 'checkbox',
          label: 'Load Plugin Print?',
          default: true
        },
        tinymcePluginInsertdatetime:
        {
          type: 'checkbox',
          label: 'Load Plugin Insert Date Time?',
          default: true
        },
        tinymcePluginImage:
        {
          type: 'checkbox',
          label: 'Load Plugin Image?',
          default: true
        },
        tinymcePluginSearchreplace:
        {
          type: 'checkbox',
          label: 'Load Plugin Find & Replace?',
          default: true
        },
        tinymcePluginEmoticons:
        {
          type: 'checkbox',
          label: 'Load Plugin Emoticons?',
          default: true
        },
        tinymcePluginAdvlist:
        {
          type: 'checkbox',
          label: 'Load Plugin Advanced List?',
          default: false
        },
        tinymcePluginVisualblocks:
        {
          type: 'checkbox',
          label: 'Load Plugin Visual Blocks?',
          default: true
        },
        tinymcePluginVisualchars:
        {
          type: 'checkbox',
          label: 'Load Plugin Visual Characters?',
          default: false
        },
        tinymcePluginBbcode:
        {
          type: 'checkbox',
          label: 'Load Plugin BBCode?',
          default: false
        },
        tinymcePluginWordcount:
        {
          type: 'checkbox',
          label: 'Load Plugin Word Count?',
          default: true
        },
        tinymcePluginHilite:
        {
          type: 'checkbox',
          label: 'Load Plugin Hilite?',
          default: true
        }
      },
      // css: '#MyConfig_section_0 { display: none !important; }' // CSS that will hide the section
    };
    // tslint:disable-next-line
    GM_config.init(initValues);
  }
}