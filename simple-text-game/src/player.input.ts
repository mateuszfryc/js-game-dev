import { HTMLHandler } from './html-handler';
import { sanitizeString } from './utils/text';

export class PlayerInput extends HTMLHandler<HTMLInputElement> {
  container = new HTMLHandler<HTMLDivElement>('#input-container');
  cachedInput: string | null = null;

  constructor() {
    super('input', 'value');

    this.on<KeyboardEvent>('input', this.onInput.bind(this));
    document.addEventListener('click', this.focus.bind(this));
  }

  focus(): void {
    this.htmlElement.click();
    this.htmlElement.focus();
  }

  onInput(event: KeyboardEvent): void {
    const target = event?.target as HTMLInputElement;
    if (target) {
      this.value = sanitizeString(target.value);
    }
  }

  show(): void {
    this.container.show('flex');
  }

  hide(): void {
    this.container.hide();
  }

  cacheCurrent(): void {
    this.cachedInput = this.value;
  }
}
