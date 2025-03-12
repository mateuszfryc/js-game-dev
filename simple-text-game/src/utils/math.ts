const { round, floor, random } = Math;

export function clamp(number: number, min: number, max: number): number {
  if (number < min) return min;
  if (number > max) return max;

  return number;
}

export function throwTheDice(numberOfSides = 6, diceCount = 1): number {
  let result = 0;

  for (let i = 0; i < diceCount; i++) {
    result += round(random() * numberOfSides);
  }

  return result;
}

export function randomInRange(minimum: number, maximum: number): number {
  return floor(random() * (maximum - minimum + 1)) + minimum;
}

export function mapRangeClamped(
  mappedValue: number,
  inMin = 0,
  inMax = 1,
  outMin = 0,
  outMax = 1,
): number {
  const value = ((mappedValue - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  if (value > outMax) return outMax;
  if (value < outMin) return outMin;

  return value;
}
