import { Message } from 'types';

export class MessageLoop {
  constructor(private messages: Message[], private shouldLoop = false, public currentIndex = 0) {}

  get(): Message {
    return this.messages[this.currentIndex];
  }

  next(): Message {
    const { currentIndex, shouldLoop, messages } = this;
    const text = messages[currentIndex] ?? 'Ehh...';
    const potentialNext = currentIndex + 1;
    this.currentIndex =
      potentialNext >= messages.length
        ? shouldLoop
          ? (this.currentIndex = 0)
          : messages.length
        : potentialNext;

    return text;
  }
}
