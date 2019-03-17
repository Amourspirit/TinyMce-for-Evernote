import { DebugLevel } from './enums';
import { IKeyValueGeneric } from './interfaces';

export interface IappSettings {
  debugLevel: DebugLevel;
  shortName: string;
  tinyId: string;
  menuName: string;
  tinyMceVersion: string;
  fullScreenRealId: string;
}

export const appSettings: IKeyValueGeneric<any> & IappSettings = {
  tinyId: 'gminput',
  shortName: 'TMCEE',
  preKey: 'tmceen_',
  debugLevel: DebugLevel.info,
  menuName: 'TinyMce Options',
  tinyMceVersion: '4.1.0',
  fullScreenRealId: 'tinymce-real-fs'
};

export const updateAppSetting = (key: string, value: any): void => {
  if (appSettings.hasOwnProperty(key)) {
    appSettings[key] = value;
  }
};