// import { IKeyValueGeneric } from './interfaces';

interface IExceptionMessages {
  /**
   * Argument "{0}" must to be zero or greater
   */
  argLessThenZero: string;
  /**
   * Argument "{0}" must be one or greater
   */
  argLessThenOne: string;
  /**
   * Argument "{0}" is not allowed to be an empty string
   */
  argEmptyString: string;
  /**
   * Argument "{0}" invalid key. Key "{1}" already exist.
   */
  argKeyExist: string;

}

export const exceptionMessages: IExceptionMessages = {
  argLessThenZero: 'Argument "{0}" must to be zero or greater',
  argLessThenOne: 'Argument "{0}" must be one or greater',
  argEmptyString: 'Argument "{0}" is not allowed to be an empty string',
  argKeyExist: 'Argument "{0}" invalid key. Key "{1}" already exist.'
};