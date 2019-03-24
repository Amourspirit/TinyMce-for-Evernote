import { appSettings } from './appSettings';
import { DebugLevel } from './enums';
export class Log {

  public static message(msg: string, optionalParams?: any[]): void {
    if (appSettings.debugLevel > DebugLevel.info) {
      return;
    }
    const params = [];
    if (optionalParams) {
      for (let i = 0; i < optionalParams.length; i++) {
        params[i] = optionalParams[i];
      }
    }
    console.log(msg, ...params);
  }

  public static warn(msg: string, optionalParams?: any[]): void {
    if (appSettings.debugLevel > DebugLevel.warn) {
      return;
    }
    const params = [];
    if (optionalParams) {
      for (let i = 0; i < optionalParams.length; i++) {
        params[i] = optionalParams[i];
      }
    }
    console.warn(msg, ...params);
  }

  public static error(msg: any, optionalParams?: any[]): void {
    if (appSettings.debugLevel > DebugLevel.error) {
      return;
    }
    const params = [];
    if (optionalParams) {
      for (let i = 0; i < optionalParams.length; i++) {
        params[i] = optionalParams[i];
      }
    }
    console.error(msg, ...params);
  }
  public static debug(msg: string, optionalParams?: any[]): void {
    if (appSettings.debugLevel > DebugLevel.debug) {
      return;
    }
    const params = [];
    if (optionalParams) {
      for (let i = 0; i < optionalParams.length; i++) {
        params[i] = optionalParams[i];
      }
    }
    console.log(`${appSettings.shortName}: Debug: ${msg}`, ...params);
  }

  public static debugWarn(msg: string, optionalParams?: any[]): void {
    if (appSettings.debugLevel > DebugLevel.debug) {
      return;
    }
    const params = [];
    if (optionalParams) {
      for (let i = 0; i < optionalParams.length; i++) {
        params[i] = optionalParams[i];
      }
    }
    console.warn(`${appSettings.shortName}: Debug: ${msg}`, ...params);
  }
}