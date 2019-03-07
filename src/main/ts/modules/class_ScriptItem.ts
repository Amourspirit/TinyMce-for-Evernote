import {
    IScriptItem,
    IDisposable
} from './Interfaces';
import { Settings as appSettings } from './class_Settings';
import { DebugLevel } from './enums';
import { Log as Log } from './class_Log';

export class ScriptItem implements IScriptItem, IDisposable {
    public readonly name: string;
    public readonly src: string;
    public readonly type: string;
    public readonly testMethod: string;
    public readonly text: string;
    public timeout: number;
    public count: number;
    public loaded: boolean;
    public tag: string;
    // public readonly disposed: boolean;
    // tslint:disable-next-line
    private _disposed: boolean;
    public constructor(si: IScriptItem) {
        // this.disposed = false;
        this._disposed = false;
        this.name = si.name;
        this.src = si.src;
        this.type = si.type;
        this.testMethod = si.testMethod;
        this.text = si.text;
        this.timeout = si.timeout;
        this.loaded = si.loaded;
        this.count = si.count;
        this.tag = si.tag;
    }
    public get isDisposed(): boolean {
        return this._disposed;
    }
    public dispose(): void {
        // @debug start
        const methodName: string = 'ScriptItem.dispose';
        // Higher price to check using enumes each time so capture the values here
        const appDebugLevel = appSettings.debugLevel;
        const levelDebug = DebugLevel.Debug;
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
        // @debug end
        if (this._disposed === true) {
            // @debug start
            if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Already disopsed returning.`); }
            if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
            // @debug end
            return;
        }
        // @debug start
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Disopsing of ${this.name}`); }
        // @debug end
        this._disposed = true;
        // the hard way of reseting. Due to readonly properties;
        // see https://stackoverflow.com/questions/46634876/how-can-i-change-a-readonly-property-in-typescript
        (this.name as ScriptItem['name']) = '';
        (this.src as ScriptItem['src']) = '';
        (this.type as ScriptItem['type']) = '';
        (this.testMethod as ScriptItem['testMethod']) = '';
        (this.text as ScriptItem['text']) = '';
        this.timeout = 0;
        this.count = 0;
        this.loaded = false;
        this.tag = '';
        // (this.disposed as ScriptItem['disposed']) = true;
        // @debug start
        if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
        // @debug end
    }
}