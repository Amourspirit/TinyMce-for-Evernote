import { IEvent, EventDispatcher } from 'strongly-typed-events';
import { ElementLoaderEventArgs } from './class_ElementLoaderEventArgs';
import { IKeyValueGeneric } from './interfaces';
import { BaseElementLoad } from './abstract_class_BaseNodeLoad';
import { Log } from './class_Log';
import { appSettings } from './appSettings';
import { DebugLevel } from './enums';
import { ElementsLoadedArgs } from './class_ElementsLoadedArgs';

export class ElementLoader {
  private lTotalScripts: number = 0; // the total number of scritps added with addElement
  private lEvents: IKeyValueGeneric<BaseElementLoad>;
  private lOnElementLoaded = new EventDispatcher<ElementLoader, ElementLoaderEventArgs>();
  private lOnAllElementLoaded = new EventDispatcher<ElementLoader, ElementsLoadedArgs>();
  private lOnTick = new EventDispatcher<ElementLoader, ElementLoaderEventArgs>();
  private lOnTickExpired = new EventDispatcher<ElementLoader, ElementLoaderEventArgs>();
  public constructor() {
    this.lEvents = {};
  }
  public addElement(key: string, e: BaseElementLoad): void {
    // @debug start
    const methodName: string = 'addElement';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered.`); }
    // @debug end
    if (key.length === 0) {
      Log.error(`${appSettings.shortName}: addElement: key argument can not be an empty string`);
      return;
    }
    if (this.lEvents.hasOwnProperty(key)) {
      Log.error(`${appSettings.shortName}: addElement: key ${key} is already in the list of elemets and can not be added again`);
      return;
    }
    this.lEvents[key] = e;
    this.lTotalScripts++;
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
  public onAllElementsLoaded(): IEvent<ElementLoader, ElementsLoadedArgs> {
    return this.lOnAllElementLoaded.asEvent();
  }
  public onElementLoaded(): IEvent<ElementLoader, ElementLoaderEventArgs> {
    return this.lOnElementLoaded.asEvent();
  }
  public onTick(): IEvent<ElementLoader, ElementLoaderEventArgs> {
    return this.lOnTick.asEvent();
  }
  public onTickExpired(): IEvent<ElementLoader, ElementLoaderEventArgs> {
    return this.lOnTickExpired.asEvent();
  }

  public start(): void {
    for (const key in this.lEvents) {
      if (this.lEvents.hasOwnProperty(key)) {
        const element = this.lEvents[key];
        element.onTick().subscribe((sender, args) => {
          const eArgs: ElementLoaderEventArgs = new ElementLoaderEventArgs(key, args);
          this.tick(eArgs);
          if (eArgs.cancel === true) {
            return;
          }
          this.lOnTick.dispatch(this, eArgs);
        });
        element.onExpired().subscribe((sender, args) => {
          const eArgs: ElementLoaderEventArgs = new ElementLoaderEventArgs(key, args);
          this.tickExpired(eArgs);
          if (eArgs.cancel === true) {
            return;
          }
          this.lOnTickExpired.dispatch(this, eArgs);
        });
        element.onScriptLoaded().subscribe((sender, args) => {
          const eArgs: ElementLoaderEventArgs = new ElementLoaderEventArgs(key, args);
          this.elementLoaded(eArgs);
          if (eArgs.cancel === true) {
            return;
          }
          this.lOnElementLoaded.dispatch(this, eArgs);
        });
        element.start();
      }
    }
  }
  private elementLoaded(args: ElementLoaderEventArgs): void {
    // @debug start
    const methodName: string = 'elementLoaded';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
      Log.debug(`${methodName}: args key: ${args.key}`);
    }
    // @debug end
    if (this.lEvents.hasOwnProperty(args.key) === false) {
      Log.error(`${appSettings.shortName}: elementLoaded: key ${args.key} was not found to delete. This may be a serious error`);
      return;
    } else {
      // delete the added script
      delete this.lEvents[args.key];
    }
    const done: boolean = this.isScriptsLoaded();
    if (done) {
      const eArgs = new ElementsLoadedArgs(this.lTotalScripts);
      this.allScriptsLoaded(eArgs);
      if (eArgs.cancel === false) {
        this.lOnAllElementLoaded.dispatch(this, eArgs);
      }
    }
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
  private tick(args: ElementLoaderEventArgs): void {
    // @debug start
    const methodName: string = 'tick';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered.`); }
    // @debug end
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
    return;
  }
  private tickExpired(args: ElementLoaderEventArgs): void {
    // @debug start
    const methodName: string = 'tickExpired';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered.`); }
    // @debug end
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
    return;
  }
  private allScriptsLoaded(args: ElementsLoadedArgs): void {
    // @debug start
    const methodName: string = 'allScriptsLoaded';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered.`); }
    // @debug end
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
    return;
  }
  /*
 * Function to check and see if there are any scripts left to be loaded
 * @returns boolean, true if all the scripts are loaded; Otherwise false
 */
  private isScriptsLoaded = (): boolean => {
    for (const key in this.lEvents) {
      if (this.lEvents[key]) {
        return false;
      }
    }
    return true;
  }
}