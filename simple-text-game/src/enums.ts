export const KEYS_CODES = {
  ENTER: 13,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
  ESCAPE: 27,
  SPACE_BAR: 32,

  // // WSAD
  // W: 87,
  // S: 83,
  // A: 65,
  // D: 68,
};

// export const SIZE = {
//   TINY: 'tiny',
//   SMALL: 'small',
//   ONEHANDED: 'one-handed',
//   TWOHANDED: 'two-handed',
//   LARGE: 'large',
// } as const;

// export type Size = typeof SIZE[keyof typeof SIZE];

export const DAMAGE_TYPE = {
  ALL: 'all',
  BLUNT: 'blunt',
  COLD: 'cold',
  EXPLOSIVES: 'explosives',
  FIRE: 'fire',
  MAGIC: 'magic',
  NATURAL: 'natural',
  PIERCING: 'piercing',
  SLASHING: 'slashing',
  NONE: 'none',
} as const;

export type DamageType = typeof DAMAGE_TYPE[keyof typeof DAMAGE_TYPE];
