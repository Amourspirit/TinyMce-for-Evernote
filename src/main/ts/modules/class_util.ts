export class Util {
    /**
     * Gets a property/method name when object is passed in
     * @param obj The object ot get the property name of
     * stackoverflow link {@link https://stackoverflow.com/questions/38118137/get-name-of-class-method-in-typescript}
     * @returns Name of the current property or ''
     */
    public static getMethodName(obj: any): string {
        if (obj.name) {
            return obj.name;
        }

        let funcNameRegex = /function (.{1,})\(/;
        let results = (funcNameRegex).exec(obj.toString());
        let result: string | false | null | undefined = results && results.length > 1 && results[1];

        if (!result) {
            funcNameRegex = /return .([^;]+)/;
            results = (funcNameRegex).exec(obj.toString());
            result = results && results.length > 1 && results[1].split('.').pop();
        }
        return result || '';
    }
}
