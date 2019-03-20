import { IEvent, EventDispatcher } from 'strongly-typed-events';
import { ElementLoaderEventArgs } from './class_ElementLoaderEventArgs';
import { IKeyValueGeneric } from './interfaces';
import { BaseElementLoad } from './abstract_class_BaseElementLoad';
import { Log } from './class_Log';
import { appSettings } from './appSettings';
import { DebugLevel } from './enums';
import { ElementsLoadedArgs } from './class_ElementsLoadedArgs';
import { IEventArgs, EventArgs } from './class_EventArgs';
import { ElementsLoadFailArgs } from './class_ElementsLoadFailArgs';
export class ElementLoader {
  private lTotalScripts: number = 0; // the total number of scritps added with addElement
  private lEvents: IKeyValueGeneric<BaseElementLoad>;
  private lEventsFailed: Array<string> = [];
  private lOnElementLoaded = new EventDispatcher<ElementLoader, ElementLoaderEventArgs>();
  private lOnAllElementLoaded = new EventDispatcher<ElementLoader, ElementsLoadedArgs>();
  private lOnElementLoadFail = new EventDispatcher <ElementLoader, ElementsLoadFailArgs>();
  private lOnTick = new EventDispatcher<ElementLoader, ElementLoaderEventArgs>();
  private lOnTickExpired = new EventDispatcher<ElementLoader, ElementLoaderEventArgs>();
  public constructor() {
    this.lEvents = {};
  }
  public addElement(key: string, e: BaseElementLoad): void {
    // @debug start
    const methodName: string = 'ElementLoader.addElement';
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
  public hasElement(key: string): boolean {
    // @debug start
    const methodName: string = 'ElementLoader.methodName';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered.`); }
    // @debug end
    if (key.length === 0) {
      Log.debugWarn(`${appSettings.shortName}: addElement: key is empty`);
      return false;
    }
    const reslut: boolean = this.lEvents.hasOwnProperty(key);
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
    return reslut;
  }
  public onAllElementsLoaded(): IEvent<ElementLoader, ElementsLoadedArgs> {
    return this.lOnAllElementLoaded.asEvent();
  }
  public onElementsLoadFail(): IEvent<ElementLoader, ElementsLoadFailArgs> {
    return this.lOnElementLoadFail.asEvent();
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
    // @debug start
    const methodName: string = 'ElementLoader.start';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // @debug end
    const onBeforeStartEventArgs = new EventArgs();
    this.onBeforeStart(onBeforeStartEventArgs);
    if (onBeforeStartEventArgs.cancel === true) {
      // @debug start
      Log.debug(`${methodName}: Exiting due to event was canceled `);
      // @debug end
      return;
    }
    for (const key in this.lEvents) {
      if (this.lEvents.hasOwnProperty(key)) {
        const element: BaseElementLoad = this.lEvents[key];
        element.onTick().subscribe((sender, args) => {
          const eArgs: ElementLoaderEventArgs = new ElementLoaderEventArgs(key, args);
          this.tick(eArgs);
          if (eArgs.cancel === true) {
            return;
          }
          // @debug start
          Log.debug(`${methodName}: Dispatching onTick for key: ${eArgs.key}`);
          // @debug end
          this.lOnTick.dispatch(this, eArgs);
        });
        element.onExpired().subscribe((sender, args) => {
          const eArgs: ElementLoaderEventArgs = new ElementLoaderEventArgs(key, args);
          // dispose the class if time is up.
          sender.dispose();
          this.tickExpired(eArgs);
          if (eArgs.cancel === true) {
            return;
          }
          // @debug start
          Log.debug(`${methodName}: Dispatching onTickExpired for key: ${eArgs.key}`);
          // @debug end
          this.lOnTickExpired.dispatch(this, eArgs);
        });
        element.onElementLoaded().subscribe((sender, args) => {
          const eArgs: ElementLoaderEventArgs = new ElementLoaderEventArgs(key, args);
          // dispose the class now that the script is loaded.
          sender.dispose();
          this.elementLoaded(eArgs);
          if (eArgs.cancel === true) {
            return;
          }
          // @debug start
          Log.debug(`${methodName}: Dispatching onElementLoaded for key: ${eArgs.key}`);
          // @debug end
          this.lOnElementLoaded.dispatch(this, eArgs);
        });
        element.start();
      }
    }
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
    this.onAfterStart(new EventArgs());
  }
  protected onBeforeStart(args: IEventArgs): void {
    return;
  }
  protected onAfterStart(args: IEventArgs): void {
    return;
  }
  private elementLoaded(args: ElementLoaderEventArgs): void {
    // @debug start
    const methodName: string = 'ElementLoader.elementLoaded';
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
    this.goForFinish();
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
  private tick(args: ElementLoaderEventArgs): void {
    // @debug start
    const methodName: string = 'ElementLoader.tick';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered.`);
      Log.debug(`${methodName}: tick for key ${args.key}`);
    }
    // @debug end
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
    return;
  }
  private tickExpired(args: ElementLoaderEventArgs): void {
    // @debug start
    const methodName: string = 'ElementLoader.tickExpired';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered`);
      Log.debug(`${methodName}: for key: ${args.key}`);
    }
    // @debug end
    // set the args loadFailed property
    args.loadFailed = true;
    // add faile event key to failed events array
    this.lEventsFailed.push(args.key);
    // event if the event failed we want to remove if from the list of events
    if (this.lEvents.hasOwnProperty(args.key) === false) {
      Log.error(`${appSettings.shortName}: tickExpired: key ${args.key} was not found to delete. This may be a serious error`);
      return;
    } else {
      // delete the added script
      delete this.lEvents[args.key];
    }
    this.goForFinish();
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
    return;
  }
  private allElementsLoaded(args: ElementsLoadedArgs): void {
    // @debug start
    const methodName: string = 'ElementLoader.allScriptsLoaded';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered.`); }
    // @debug end
    if (this.lEventsFailed.length > 0) {
      // @debug start
      Log.debug(`${methodName}: Failed to load all elements. Dispatching onElementsLoadFail()`);
      // @debug end
      args.cancel = true;
      const eArgs: ElementsLoadFailArgs = new ElementsLoadFailArgs(this.lTotalScripts, this.lEventsFailed);
      this.lOnElementLoadFail.dispatch(this, eArgs);
    }
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
    return;
  }
  private goForFinish() {
    // @debug start
    const methodName: string = 'ElementLoader.goForFinish';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // @debug end
    const done: boolean = this.isElementsLoaded();
    if (done) {
      // @debug start
      Log.debug(`${methodName}: All elemets are loaded dispatching onAllElementsLoaded`);
      // @debug end
      const eArgs = new ElementsLoadedArgs(this.lTotalScripts);
      this.allElementsLoaded(eArgs);
      if (eArgs.cancel === false) {
        this.lOnAllElementLoaded.dispatch(this, eArgs);
      }
    } else {
      // @debug start
      Log.debug(`${methodName}: Not elemets are loaded yet`);
      // @debug end
    }
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
  /*
 * Function to check and see if there are any element left to be loaded
 * @returns boolean, true if all the elements are loaded; Otherwise false
 */
  private isElementsLoaded(): boolean {
    for (const key in this.lEvents) {
      if (this.lEvents[key]) {
        return false;
      }
    }
    return true;
  }
}