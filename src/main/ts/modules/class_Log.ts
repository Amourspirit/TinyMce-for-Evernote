import { Settings as appSettings } from './class_Settings';
import { DebugLevel } from './enums';
export class Log {

  public static message = (msg: string, ...optionalParams: any[]): void => {
    if (appSettings.debugLevel > DebugLevel.info) {
      return;
    }
    console.log(msg, ...optionalParams);
  }

  public static warn = (msg: string, ...optionalParams: any[]): void => {
    if (appSettings.debugLevel > DebugLevel.warn) {
      return;
    }
    console.warn(msg, ...optionalParams);
  }

  public static error = (msg: any, ...optionalParams: any[]): void => {
    if (appSettings.debugLevel > DebugLevel.error) {
      return;
    }
    console.error(msg, ...optionalParams);
  }
  public static debug = (msg: string, ...optionalParams: any[]): void => {
    if (appSettings.debugLevel > DebugLevel.debug) {
      return;
    }
    console.log(`${appSettings.shortName}: Debug: ${msg}`, ...optionalParams);
  }

  public static debugWarn = (msg: string, ...optionalParams: any[]): void => {
    if (appSettings.debugLevel > DebugLevel.debug) {
      return;
    }
    console.warn(`${appSettings.shortName}: Debug: ${msg}`, ...optionalParams);
  }
  private constructor() {
  }
}