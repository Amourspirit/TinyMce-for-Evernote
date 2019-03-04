export class UserScriptUtil {
    private constructor() {
        
    };
    static extend = (...optionalParams: any[]): any[] => {
        for (let i: number = 1; i < optionalParams.length; i++)
            for (let key in optionalParams[i])
                if (optionalParams[i].hasOwnProperty(key))
                    optionalParams[0][key] = optionalParams[i][key];
        return optionalParams[0];
    };
}