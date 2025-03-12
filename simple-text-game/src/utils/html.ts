import { ObjectOfStrings } from '../types';
import { mapRangeClamped } from './math';

export const get = document.querySelector.bind(document);

export function newHTML<T extends HTMLElement = HTMLParagraphElement>(
  tag: string,
  content = '',
  attributes?: ObjectOfStrings,
): T {
  const element = document.createElement(tag) as T;
  element.innerHTML = content;

  if (attributes)
    for (const name in attributes) {
      if (attributes.hasOwnProperty(name)) element[name] = attributes[name];
    }

  return element;
}

export function animateOnce<T extends HTMLElement = HTMLElement>(
  selector: string,
  property: string,
  from: number,
  to: number,
  // in seconds
  duration: number,
): void {
  const initialElements = Array.from(document.querySelectorAll<T>(selector));
  initialElements.forEach((e) => (e.style[property] = from));

  let previousTime = performance.now();
  const animate = (): void => {
    const currentTime = performance.now();
    const deltaTime = currentTime - previousTime;
    const elements = Array.from(document.querySelectorAll<T>(selector));
    const { length } = elements;
    let doneCount = 0;

    elements.forEach((e) => {
      const current = parseFloat(e.style[property]);
      let newValue = current;
      if (current < to) {
        newValue += mapRangeClamped(deltaTime, 0, duration * 1000, from, to);
        e.style[property] = newValue;
      }
      if (newValue >= to) {
        doneCount++;
      }
    });

    if (doneCount < length) {
      previousTime = currentTime;
      requestAnimationFrame(animate);
    }
  };

  animate();
}
