import { ObjectOfNumbers } from '../types';

export const hasOneOfProps = (object: { [key: string]: any }, propsNames: string[]): boolean =>
  Object.keys(object).some((key) => propsNames.includes(key));

export const findOryginalStrings = (phrases: string[]): string[] => {
  const occurrences: ObjectOfNumbers = {};

  // create map that stores number of occurrences for each phrase
  phrases.forEach((phrase) => {
    if (!occurrences[phrase]) {
      occurrences[phrase] = 1;
    } //
    else {
      occurrences[phrase]++;
    }
  });

  return Object.entries(occurrences)
    .filter(([, value]) => value === 1)
    .map(([key]) => key);
};
