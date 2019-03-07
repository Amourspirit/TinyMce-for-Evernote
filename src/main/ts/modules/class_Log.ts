import { Settings as appSettings } from './class_Settings';
import { DebugLevel } from './enums';
export class Log {

    public static message = (msg: string, ...optionalParams: any[]): void => {
        if (!(appSettings.debugLevel >= DebugLevel.Info)) {
            return;
        }
        console.log(msg, ...optionalParams);
    }

    public static error = (error: any, ...optionalParams: any[]): void => {
        if (!(appSettings.debugLevel >= DebugLevel.Error)) {
            return;
        }
        console.error(error, ...optionalParams);
    }
    public static debug = (msg: string, ...optionalParams: any[]): void => {
        if (!(appSettings.debugLevel >= DebugLevel.Debug)) {
            return;
        }
        console.log(`${appSettings.shortName}: Debug: ${msg}`, ...optionalParams);
    }

    public static debugWarn = (msg: string, ...optionalParams: any[]): void => {
        if (!(appSettings.debugLevel >= DebugLevel.Debug)) {
            return;
        }
        console.warn(`${appSettings.shortName}: Debug: ${msg}`, ...optionalParams);
    }
    private constructor() {
    }
}