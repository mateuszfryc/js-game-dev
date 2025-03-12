import { HTMLHandler } from './html-handler';
import { SettingsValues } from './settings';
import { Messages } from './types';
import { newHTML } from './utils/html';
import { randomInRange } from './utils/math';
import { hasOneOfProps } from './utils/misc';

export type PrintOptions = {
  prefix?: string;
  speed?: number | [number, number];
  className?: string;
};

export type QueuedMessage = {
  id: number;
  text: string;
  options?: PrintOptions;
};

export class MessageLog extends HTMLHandler<HTMLDivElement> {
  printQueue: QueuedMessage[] = [];
  isPrinting = false;
  lastMessageId = 0;
  /* Meant to be replaced by getter passed from settings object. */
  getPrintSpeed: () => number;

  constructor(idOrClassName: string) {
    super(idOrClassName);
    this.getPrintSpeed = (): number => 0;
  }

  scrollToNewest(): void {
    this.htmlElement.scroll({ top: 99999999, behavior: 'smooth' });
  }

  dimmOlderMessages(): void {
    Array.from(this.htmlElement.querySelectorAll('p')).forEach(
      (element) => (element.style.opacity = `${0.6}`),
    );
  }

  printSingleCharacter(text: string, element: HTMLElement): string {
    let character = text.substring(0, 1);
    if (character === '&') {
      const [entityCode] = text.match(/&[^&;]+;/gim) ?? [];
      if (entityCode) {
        character = entityCode;
      }
    }
    element.innerHTML += character;

    return text.substring(character.length);
  }

  createMessageElement(id: number, options?: PrintOptions): HTMLParagraphElement {
    const element = newHTML<HTMLParagraphElement>('p');
    element.id = `id-${id}`;
    this.append(element);
    // this.htmlElement.insertBefore(element, this.htmlElement.firstChild);

    if (options) {
      if (options.prefix) {
        const prefix = newHTML<HTMLSpanElement>('span', '', {
          id: 'prefix',
        });
        element.appendChild(prefix);
      }

      if (options.className) {
        element.className += options.className;
      }
    }

    this.scrollToNewest();

    return element;
  }

  findMessageElement(id: number, options?: PrintOptions): [HTMLParagraphElement, HTMLSpanElement?] {
    const messageElement =
      this.find<HTMLParagraphElement>(`#id-${id}`) ?? this.createMessageElement(id, options);

    const prefix = this.find<HTMLSpanElement>(`#id-${id} > span:first-child`);

    return [messageElement, prefix];
  }

  printLetterByLetter(): void {
    if (this.getPrintSpeed() === SettingsValues.printSpeed.instant) {
      this.printAllPendingMessages();

      return;
    }

    if (!this.isPrinting || this.printQueue.length === 0) return;

    const message = this.printQueue[0];
    const { id, text, options } = message;
    let printDelayMiliseconds = randomInRange(0, 100);

    if (options?.speed) {
      if (options.speed instanceof Array) {
        const [from, to] = options.speed;
        printDelayMiliseconds = randomInRange(from, to);
      } //
      else {
        printDelayMiliseconds = options.speed;
      }
    }

    const [messageElement, prefix] = this.findMessageElement(id, options);

    if (options?.prefix && prefix) {
      options.prefix = this.printSingleCharacter(options.prefix, prefix);
      setTimeout(this.printLetterByLetter.bind(this), printDelayMiliseconds);

      return;
    }

    if (text !== '') {
      message.text = this.printSingleCharacter(message.text, messageElement);
      setTimeout(this.printLetterByLetter.bind(this), printDelayMiliseconds);

      return;
    }

    this.printQueue = this.printQueue.filter(({ id: ID }) => ID !== id);

    if (this.printQueue.length > 0) {
      setTimeout(this.printLetterByLetter.bind(this), printDelayMiliseconds);

      return;
    }

    this.scrollToNewest();
    this.isPrinting = false;
  }

  printAllPendingMessages(): void {
    if (!this.isPrinting || this.getPrintSpeed() === SettingsValues.printSpeed.slow) return;

    this.isPrinting = false;
    const queue = [...this.printQueue];
    this.printQueue.length = 0;

    queue.forEach((message) => {
      const { id, text, options } = message;

      const [messageElement, prefix] = this.findMessageElement(id, options);

      if (options?.prefix && prefix) {
        prefix.innerHTML += options.prefix;
      }
      messageElement.innerHTML += text;
    });

    this.scrollToNewest();
  }

  addToPrintQueue(message: string, options?: PrintOptions): void {
    // add "." at the end of the last sentence
    // const lastCharacter = message[message.length - 1];
    // const punctuation = ['?', '!', '...', ';', ':', '|'];
    // if (!punctuation.includes(lastCharacter) && (!options || !options.prefix))
    //   message = `${message}.`;

    // prettier-ignore
    const formatedOptions = options
      ? {
        prefix: options.prefix ? `${options.prefix}: ` : '',
        speed: options.speed,
        className: options.className,
      }
      : undefined;

    this.printQueue.push({ id: this.lastMessageId, text: message, options: formatedOptions });
    this.lastMessageId++;

    if (!this.isPrinting) {
      this.isPrinting = true;
      this.printLetterByLetter();
    }

    this.scrollToNewest();
  }

  print(texts: Messages, options?: PrintOptions): void {
    this.scrollToNewest();
    this.dimmOlderMessages();
    // this.isPrinting = true;

    // without this timeout the dimmOlderMessages would finish before its content
    // and new content would get dimmed as well
    setTimeout(() => {
      if (typeof texts === 'string' && options) {
        this.addToPrintQueue(texts, options);

        return;
      }

      if (texts instanceof Array) {
        if (
          texts.length === 2 &&
          typeof texts[0] === 'string' &&
          typeof texts[1] !== 'string' &&
          hasOneOfProps(texts[1], ['prefix', 'className', 'speed'])
        ) {
          const [message, printOptions] = texts as [string, PrintOptions];
          this.addToPrintQueue(message, printOptions);

          return;
        }

        texts.forEach((text) => {
          if (typeof text === 'string') {
            this.addToPrintQueue(text);

            return;
          }

          const [message, printOptions] = text as [string, PrintOptions];
          this.addToPrintQueue(message, printOptions);
        });

        return;
      }

      this.addToPrintQueue(texts);
    }, 0);
  }
}
