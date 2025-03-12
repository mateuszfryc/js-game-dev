export class Hints {
  elements: HTMLDivElement[];

  constructor() {
    this.elements = Array.from(document.querySelectorAll<HTMLDivElement>('.hints'));
  }

  show(): void {
    this.elements.forEach(({ style }) => {
      style.display = 'inline';
    });
  }

  hide(): void {
    this.elements.forEach(({ style }) => {
      style.display = 'none';
    });
  }

  switch(): void {
    this.elements.forEach(({ style }) => {
      style.display = style.display === 'none' || style.display === undefined ? 'block' : 'none';
    });
  }
}
