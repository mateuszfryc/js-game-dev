import { inputHistory_PersistanceKey } from './state/persistance';
import { clamp } from './utils/math';

export class InputHistory {
  entries: string[] = [];
  currentIndex = 0;

  constructor() {
    const savedEntries = window.localStorage.getItem(inputHistory_PersistanceKey);
    if (savedEntries) {
      this.entries = JSON.parse(savedEntries);
      this.setIndexToLast();
    }
  }

  getLastIndex(): number {
    return this.entries.length - 1;
  }

  setIndexToLast(): void {
    this.currentIndex = this.getLastIndex();
  }

  add(entry: string): void {
    if (entry === '') return;

    this.entries = [...new Set([...this.entries, entry])];
    this.setIndexToLast();
    window.localStorage.setItem(inputHistory_PersistanceKey, JSON.stringify(this.entries));
  }

  length(): number {
    return this.entries.length;
  }

  hasEntries(): boolean {
    return this.length() > 0;
  }

  includes(entry: string): boolean {
    return this.entries.includes(entry);
  }

  getLast(setIndexToLast = false): string | undefined {
    const item = this.entries[this.getLastIndex()];

    if (item && setIndexToLast) {
      this.setIndexToLast();
    }

    return item;
  }

  getPrevious(): string | undefined {
    const index = this.currentIndex - 1;
    const item = this.entries[index];
    this.currentIndex = item ? clamp(index, 0, this.entries.length - 1) : 0;

    return item;
  }

  getNext(): string | undefined {
    const index = this.currentIndex + 1;
    const item = this.entries[index];
    const lastIndex = this.getLastIndex();
    this.currentIndex = item ? clamp(index, 0, lastIndex) : lastIndex;

    return item;
  }

  clear(): void {
    this.entries.length = 0;
    this.currentIndex = 0;
  }
}
