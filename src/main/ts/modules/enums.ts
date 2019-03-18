export enum PriorityLevel {
  none,
  now,
  med,
  high,
}
/**
 * Determins the debug level of the project
 * @param none Nothing will be logged
 * @param debug Everyting will be loged
 * @param error Everything but debug info will be logged
 * @param warn Warnings and info will be logged
 * @param info Only info will be logged
 */
export enum DebugLevel {
  /**
   * Nothing will be logged
   */
  none,
  /**
   * Everyting will be loged
   */
  debug,
  /**
   * Everything but debug info will be logged
   */
  error,
  /**
   * Warnings and info will be logged
   */
  warn,
  /**
   * Only info will be logged
   */
  info,
}
/**
 * Determins where the element will be loaded
 * @param head Represents the head of the document
 * @param body Represents the body of the document
 * @param other Represents unknow part of the doucment
 */
export enum ElementLocation {
  /**
   * Represents the head of the document
   */
  head,
  /**
   * Represents the body of the document
   */
  body,
  /**
   * Represents the unknow part of the document
   */
  other
}