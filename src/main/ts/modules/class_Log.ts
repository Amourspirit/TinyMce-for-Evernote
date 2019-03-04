import { Settings as settings } from "./class_Settings";
export class Log {
    private constructor(){

    };
    static message = (msg: string, ...optionalParams: any[]): void => {
        if (settings.debug === false) {
            return;
        }
        console.log(msg, ...optionalParams);
    };
    
    static error = (error: any, ...optionalParams: any[]): void => {
        if (settings.debug === false) {
            return;
        }
        console.error(error, ...optionalParams);
    }
}