import { DamageType } from 'enums';
import { Action, ActionInput } from './action';
import { ContentLookup } from './location';
import { MessageLoop } from './message-loop';

export type Attributes = {
  intelligence: number;
  charisma: number;
  dexterity: number;
  strength: number;
  constitution: number;
};

export type DamageModifiers = {
  all?: number;
  blunt?: number;
  cold?: number;
  explosives?: number;
  fire?: number;
  magic?: number;
  natural?: number;
  piercing?: number;
  slashing?: number;
};

export interface EntityPropsBase {
  name: string;
  keyWords: string[];

  attributes?: Attributes;
  damage?: number;
  damageModifiers?: DamageModifiers;
  damageType?: DamageType;
  isALivingBeing?: boolean;
  isOpen?: boolean;
  isLocked?: boolean;
  isPlural?: boolean;
  outOfRange?: boolean;
  useBlocked?: string | MessageLoop;
  howToText?: string;
  onUseText?: string;
  enterLocation?: string[];
  attackResponse?: (input: ActionInput) => string;
}

export interface EntityTemplate extends EntityPropsBase {
  hp?: number;
  parent?: string;
  content?: ContentLookup[];
  defaultAction?: string;
}

export interface EntityProps extends EntityPropsBase {
  content?: Entity[];
  defaultAction?: Action;
}

let lastId = 0;

export class Entity implements EntityProps {
  readonly id: number;
  readonly name: string;
  readonly keyWords: string[];
  readonly attributes: Attributes = {
    intelligence: 10,
    charisma: 10,
    dexterity: 10,
    strength: 10,
    constitution: 10,
  };
  hp = 1;

  damage?: number;
  isOpen?: boolean;
  isLocked?: boolean;
  isPlural?: boolean;
  content?: Entity[];
  defaultAction?: Action;
  readonly isALivingBeing?: boolean;
  readonly damageModifiers?: DamageModifiers;
  readonly damageType?: DamageType;
  readonly outOfRange?: boolean;
  readonly useBlocked?: string | MessageLoop;
  readonly howToText?: string;
  readonly onUseText?: string;
  readonly enterLocation?: string[];
  attackResponse?: (input: ActionInput) => string;

  constructor(baseTemplate: EntityTemplate, ...overrideTemplates: EntityTemplate[]) {
    this.id = lastId;
    lastId++;
    let template = baseTemplate;

    overrideTemplates.forEach((override) => {
      template = {
        ...template,
        ...override,
        // content: [...(template.content ?? []), ...(override.content ?? [])],
      };
    });

    for (const propName in template) {
      if (template.hasOwnProperty(propName)) {
        this[propName] = template[propName];
      }
    }

    this.keyWords = [...new Set(this.keyWords)];
  }

  isDead(): boolean {
    return this.hp <= 0;
  }

  hasContent(): boolean {
    return Boolean(this.content) && this.content!.length > 0;
  }
}
