import { get } from './utils/html';

export type ValuePropName = 'innerHTML' | 'value';

export class HTMLHandler<T extends HTMLElement = HTMLDivElement> {
  value = '';
  selector = '';
  htmlElement: T;
  valuePropName: ValuePropName;

  constructor(selector: string, propName?: ValuePropName) {
    this.selector = selector;
    this.htmlElement = get(selector);
    this.valuePropName = propName ?? 'innerHTML';
  }

  set(text: string): void {
    this.htmlElement[this.valuePropName] = text;
    this.value = text;
  }

  edit(): void {
    this.htmlElement.click();
    this.htmlElement.focus();
  }

  clear(): void {
    this.set('');
  }

  isEmpty(): boolean {
    return this.htmlElement[this.valuePropName] === '' && this.value === '';
  }

  on<E extends Event>(eventName: string, listener: (e: E) => void): void {
    this.htmlElement.addEventListener(eventName, listener);
  }

  find<F extends HTMLElement = HTMLDivElement>(selector: string): F | undefined {
    return this.htmlElement.querySelector<F>(selector) ?? undefined;
  }

  append(...elements: HTMLElement[]): void {
    elements.forEach((element) => this.htmlElement.appendChild(element));
  }

  show(displayType = 'block'): void {
    this.htmlElement.style.display = displayType;
  }

  hide(): void {
    this.htmlElement.style.display = 'none';
  }

  setClass(name: string): void {
    this.htmlElement.className = ` ${name}`;
  }

  addClass(name: string): void {
    this.htmlElement.classList.add(name);
  }

  removeClass(name: string): void {
    this.htmlElement.classList.remove(name);
  }

  onChange(): void {
    //
  }
}
