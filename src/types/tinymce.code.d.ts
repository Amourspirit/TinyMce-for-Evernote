// tslint:disable:jsdoc-format
// tslint:disable:max-line-length
// tslint:disable:no-irregular-whitespace
import * as tinymce from 'tinymce';
declare module "tinymce" {
    export interface Settings {
        code_dialog_width?: number;
        code_dialog_height?: number;
        [key: string]: any;
    }
    export interface EditorManager extends util.Observable {
        gminput?: tinymce.Editor;
    }
}
// see: https://github.com/Microsoft/TypeScript/issues/10859