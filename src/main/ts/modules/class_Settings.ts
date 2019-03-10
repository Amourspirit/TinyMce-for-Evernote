import { DebugLevel } from './enums';

export class Settings {
  public static readonly tinyId = 'gminput';
  public static readonly shortName: string = 'TMCEE';
  public static readonly preKey: string = 'tmceen_';
  public static debugLevel: DebugLevel = DebugLevel.Info;
  public static readonly menuName: string = 'TinyMce Options';
  public static tinyMceVersion: string = '4.1.0';
  public static fullScreenRealId = 'tinymce-real-fs';
  private constructor() {
  }
}