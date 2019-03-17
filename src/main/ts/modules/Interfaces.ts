export interface IScriptItem {
  name: string;
  src: string;
  type: string;
  testMethod: string;
  text: string;
  timeout: number;
  loaded: boolean;
  count: number;
  tag: string;
}
export interface IKeyAny {
  [key: string]: any;
}
export interface ITinyMceExternalPlugins {
  textcolor: string;
  colorpicker: string;
  nonbreaking: string;
  hr: string;
  link: string;
  [key: string]: any;
}

export interface ITriggerEvent {
  type: string;
  tinyMceId: string;
  message?: string;
  time: Date;
  state?: boolean;
}

/**
 * Provides a mechanism for releasing resources with a promise.
 *  @see {@link  https://gist.github.com/dsherret/cf5d6bec3d0f791cef00 }
 *  @example
```ts
(async () => {
  await using(ioc.get<IUdpClient>(types.IUdpClient), async (client) => {
    client.connect(endpoint);
    client.send({ toBuffer: () => Buffer.from("hello world1") });
    let response = await client.receive();
    console.log(response);

    await Task.delay(1000);
    client.send({ toBuffer: () => Buffer.from("hello world2") });
    response = await client.receive();
    console.log(response);
    console.log("using complete");
  });
  console.log("end");
})();
```
 **/
export interface IDisposableAsync {
  dispose(): Promise<void>;
}

/**
 * Provides a mechanism for releasing resources.
 *  @see {@link  https://gist.github.com/dsherret/cf5d6bec3d0f791cef00 }
 **/
export interface IDisposable {
  dispose(): void;
}
/**
 * Represents a generic item with a string key value
 * @example
 ```ts
const lst: IKeyValueGeneric<string> = {
    src: 'https://someUrl.come/js/myjs.js',
    scrolling: 'yes',
    type: 'text/javascript'
};
for (const key in lst) {
    if (lst.hasOwnProperty(key)) {
    const value = lst[key];
    console.log(key, value);
    }
}
console.log('src: ', lst['src']);
console.log('type: ', lst.type);
 ```
 */
export interface IKeyValueGeneric<T> {
  [key: string]: T;
}

/**
 * Represents a generic item with a numeric key value
 * @example
```ts
interface IIndexValueGeneric<T> {
  [index: number]: T;
}
const lst: IIndexValueGeneric<string> = {
    1: 'https://someUrl.come/js/myjs.js',
    7: 'yes',
    3: 'text/javascript'
};
for (const key in lst) {
    if (lst.hasOwnProperty(key)) {
    const value = lst[key];
    console.log(key, value);
    }
}
console.log(lst[7]);
```
 */
export interface IIndexValueGeneric<T> {
  [index: number]: T;
}