import { Message } from 'types';
import { Attributes, Entity } from '../entity';
import { throwTheDice as rollTheDice } from '../utils/math';
import { firstCharToCapital } from '../utils/text';

// TODO nose, mouth and other parts of body

export class Player {
  firstName = '';
  lastName = '';
  sex = '';
  age = 0;
  hp = 100;
  inventory: Entity[] = [];
  naturalWeapons: Entity[] = [];
  expiriencePoints = 0;
  skillPoints = 15;

  attributes = {
    intelligence: 10,
    charisma: 10,
    dexterity: 10,
    strength: 10,
    constitution: 10,
  };

  progress = {};

  /* Set of belives that the player character has about him self. Changes over the course of game. */
  identity = `It is "The" question. Most people can answer to that fearly quickly. To your suprise you can not. Except for few details your mind is blank. Out of all things you could possibly remember you know that you are a rank 5 military pilot - the highest and most difficult rank to earn. You've been in army for a long time, but you don't remember how long, in what unit you have served or even which academy you have graduated. Or when. You are sure you have family but you don't remember any of them or when was the last time you saw each other. Your sex seems to be obvious but these days when any one with a bunch of credits can change it preaty easly you can't be 100% sure. You also remember your age and your name.`;

  /* What the character thinks its purpose is. Changes over the course of game.*/
  purpose: 'You are here because of your assignment, but aside from the fact that Periotheus - the space station you currently are on - is in some way important to your mission you remember no details.';

  attack(target: Entity, weapon: Entity): number {
    const { damage, damageType } = weapon;
    const modifier = target.damageModifiers ? target.damageModifiers[damageType as string] || 0 : 0;

    const modifiedDamage = (damage as number) + (modifier as number);

    if (modifiedDamage > 0) {
      target.hp -= modifiedDamage;

      return modifiedDamage;
    }

    return 0;
  }

  findWeaponByKeyWords(inputPhrases: string[]): Entity | undefined {
    return [...this.inventory, ...this.naturalWeapons].find((item) =>
      item.keyWords.find((word) => inputPhrases.includes(word)),
    );
  }

  drop(id: number): void {
    const index = this.inventory.findIndex((e) => e.id === id);

    if (index !== -1) this.inventory.splice(index, 1);
  }

  testAttribute(attributName: keyof Attributes, target: Entity): [boolean, Message[]] {
    const dice = 10;
    const playerRoll = rollTheDice(dice);
    const targetRoll = rollTheDice(dice);
    const attributeValue = this.attributes[attributName];
    const targetValue = target.attributes[attributName];
    const playerWon = playerRoll + attributeValue > targetRoll + targetValue;

    return [
      playerWon,
      [
        [
          `${attributName} (${attributeValue}) + d${dice} dice roll (${playerRoll}) = ${
            attributeValue + playerRoll
          }`,
          { prefix: 'You' },
        ],
        [
          `${attributName} + d${dice} dice roll = ${targetRoll + targetValue}`,
          { prefix: `${firstCharToCapital(target.name)}` },
        ],
      ],
    ];
  }
}
