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
/**
 * Cancels an event from taking place.
 * @param e the event to cancle
 * @see {@link https://webdevelopment2.com/the-secret-of-cancelling-and-stopping-events-using-javascript/ }
 */
  public static cancelEvent = (e: any): void => {
    if (!e) { e = window.event; }
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  }

  /**
   * Stops an event from taking place.
   * @param e the event to stop
   * @see {@link https://webdevelopment2.com/the-secret-of-cancelling-and-stopping-events-using-javascript/ }
   * stopEvent, well stops the event. Seriously, it stops the event from being called by other background elements.
   * Many elements may use the same event called by just one.
   * So stopping it here ensures that it doesn’t propagate * to the background elements. cancelEvent squashes the browser’s default behavior.
   */
  public static stopEvent = (e: any): void => {
    if (!e) { e = window.event; }
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  }
}
