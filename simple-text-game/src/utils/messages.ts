import { MessageLoop } from '../message-loop';
import { Message, Messages } from '../types';

export const messageToSingleString = (message: Message | Messages | MessageLoop): string => {
  if (typeof message === 'string') return message;
  if (message instanceof MessageLoop) return messageToSingleString(message.next());
  if (message instanceof Array) {
    if (message.length === 0) return '';
    if (message.length === 1 || typeof message[1] === 'object') return message[0] as string;

    return message.join(' ');
  }

  return '';
};
