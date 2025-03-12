import { PrintOptions } from './message-log';

export type Maybe<T> = T | undefined;

export type ObjectOfNumbers = { [key: string]: number };
export type ObjectOfStrings = { [key: string]: string };

export type Message = string | string[] | [string, PrintOptions];
export type Messages = Message | Message[];
