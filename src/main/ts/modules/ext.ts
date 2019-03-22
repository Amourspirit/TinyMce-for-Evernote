
declare global {
  interface Number {
    thousandsSeperator(): String;
  }
  interface StringConstructor {
  /**
* Replaces {#} style placeholders with replacemetns passed into args
* @param str The string to foramt
* @param args The replacemetn values
* @example
```ts
let res = StringFormat("Hello {0}", "World!");
console.log(res); // Hello World!
res = StringFormat("Hello {0} {1}", "beautiful", "World!");
console.log(res); // Hello beautiful World!
res = StringFormat("Hello {0},{0}!", "beauty");
console.log(res); //Hello beauty,beauty!
res = StringFormat("Hello {0},{0}!", "beauty", "World!");
console.log(res); //Hello beauty,beauty!
````
*/
    Format(str: string, ...args: string[]): string;
  }
}
Number.prototype.thousandsSeperator = function (): string {
  return Number(this).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
String.Format = (str: string, ...args: string[]) =>
  str.replace(/{(\d+)}/g, (match, index) => args[index] || '');
export { };