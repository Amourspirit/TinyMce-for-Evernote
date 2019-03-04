import { BigbyteLoader as Loader } from "./modules/class_LoadScript";
import { Settings } from './modules/class_Settings';
import { UserScriptUtil as Util } from "./modules/class_UserscriptUtil";

const validateIfTop = (): boolean => {
    return window.top === window.self;
};

if (validateIfTop()) {

    

};
