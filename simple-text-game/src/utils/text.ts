import pluralize from 'pluralize';
import { digits, teens, tens } from './number-names';

export const sanitizeString = (str: string): string =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/[^a-z0-9ążźńćółśę \!\?\.',_-]/gim, '').trim();

export const isVowel = (char: string): boolean => ['a', 'o', 'u', 'i', 'e'].includes(char);

export const pickRandomText = (texts: string[]): string =>
  texts[Math.floor(Math.random() * texts.length)];

export function getOriginalElements(texts: string[]): string[] {
  return texts.reduce((all, name) => {
    if (all.includes(name)) return all;

    return [...all, name];
  }, [] as string[]);
}

export function addIndefiniteArticle(word: string): string {
  const firstLetter = word.slice(0, 1);
  const characters = word.split('');
  characters[0] = isVowel(firstLetter) ? `an ${firstLetter}` : `a ${firstLetter}`;

  return characters.join('');
}

export function integerToWords(number: number): string {
  if (number < 10) {
    return digits[number];
  }

  if (number > 9 && number < 20) {
    return teens[number - 10];
  }

  const { floor, round } = Math;

  if (number < 100) {
    const fullTens = round(floor(number / 10));
    const rest = number - fullTens;
    const tensIndex = round(fullTens / 10);

    return `${tens[tensIndex]} ${digits[rest]}`;
  }

  return 'more than one hundret';
}

export function formatInlineList(
  list: string[],
  addArticles = true,
  addOneToSingleItems = false,
): string {
  const items = list;
  const singleNames: string[] = [];
  const repeatingNames: string[] = [];

  getOriginalElements(items).forEach((name: string) => {
    let count = 0;
    items.forEach((n) => {
      if (n === name) count++;
    });

    if (count > 1) {
      repeatingNames.push(`${integerToWords(count)} ${pluralize(name, count)}`);
    } else {
      if (addOneToSingleItems) repeatingNames.push(`one ${name}`);
      else singleNames.push(name);
    }
  });

  const itemsWithArticles = addArticles
    ? singleNames.map((item) => addIndefiniteArticle(item))
    : singleNames;
  const itemsInOneString = [...itemsWithArticles, ...repeatingNames].join(', ');
  const lastCommaIndex = itemsInOneString.lastIndexOf(',');
  const characters = itemsInOneString.split('');
  characters[lastCommaIndex] = ' and';

  return characters.join('');
}

export function firstCharToCapital(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function findStringsOverlaps(A: string[], B: string[], BinA = true, AinB = true): string[] {
  const overlaps: string[] = [];

  if (BinA) {
    B.forEach((word) => {
      if (A.includes(word)) overlaps.push(word);
    });
  }

  if (AinB) {
    A.forEach((word) => {
      if (B.includes(word)) overlaps.push(word);
    });
  }

  return overlaps;
}
