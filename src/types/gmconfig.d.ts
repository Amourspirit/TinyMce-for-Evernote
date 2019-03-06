// tslint:disable:jsdoc-format
// tslint:disable:max-line-length
// tslint:disable:no-irregular-whitespace
declare module "GM_config" {
    export function init(settings: IGMconfigInitValues): void;
    export function open(): void;
    export function get(setting: string): any;
    export function GM_registerMenuCommand(name: string, fn: () => void): void;
    export interface IGMconfigInitValues {
        id: string;
        css?: string;
        title: string;
        fields: IGMField;
    }


    interface IGMItem {
        type: string;
        label: string;
        default?: boolean | number | string;
        min?: number;
        max?: number;
    }

    interface IGMField {
        [key: string]: IGMItem;
    }
}