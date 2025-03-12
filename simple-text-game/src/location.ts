import { Entity } from './entity';
import { Maybe, Message } from './types';
import { firstCharToCapital, formatInlineList, getOriginalElements } from './utils/text';

export type EntityOverrides = {
  name?: string;
  keyWords?: string[];
  enterLocation?: string[];
  content?: ContentLookup[];
  parent?: string;
};

export type LocationProperties = {
  name: string;
  description: Message;
};

export type ContentLookup =
  | string
  | [string /* name */, EntityOverrides]
  | [number /* quantity */, string /* name */]
  | [number /* quantity */, string /* name */, EntityOverrides];

export type LocationTemplate = LocationProperties & {
  content: ContentLookup[];
};

type MapLocationArguments = {
  name: string;
  description: Message;
  content: Entity[];
};

export class GameWorldLocation {
  id: number;
  name: string;
  description: Message;
  content: Entity[];

  constructor(id: number, properties: MapLocationArguments) {
    this.id = id;
    this.name = properties.name;
    this.description = properties.description;
    this.content = properties.content;
  }

  getItemsFromOpenedEntities(): Entity[] {
    return this.content
      .filter((e) => e.isOpen && !e.isALivingBeing && !e.isLocked && !e.useBlocked)
      .map((c) => c.content ?? [])
      .flat();
  }

  getContentKeyWords(includeContent = false): string[] {
    const words = this.content.map((item) => item.keyWords).flat();

    if (includeContent) {
      words.push(
        ...this.getItemsFromOpenedEntities()
          .map((e) => e.keyWords)
          .flat(),
      );
    }

    return getOriginalElements(words);
  }

  getItemByKey(key: string): Maybe<Entity> {
    return this.content.find((item) => item.keyWords.includes(key));
  }

  getMultipleByKeys(keys: string[], includeContent = false): Entity[] {
    const entities = [...this.content];

    // get all the content of entities that are currently open and their items
    // can be grabed
    if (includeContent) {
      entities.push(...this.getItemsFromOpenedEntities());
    }

    return entities.filter((item) => item.keyWords.some((key) => keys.includes(key)));
  }

  getExits(filterOutLockedExits = true): Maybe<Entity[]> {
    const exits = this.getMultipleByKeys(['exit']);

    if (filterOutLockedExits)
      return exits.filter((e) => e.enterLocation && e.enterLocation.length > 0);

    return exits;
  }

  getContentNamesAsStringList(filter?: (content: Entity[]) => Entity[]): string {
    let entities = [...this.content];
    if (filter) {
      entities = filter(entities);
    }
    const allNames: string[] = [];
    const dead: string[] = [];
    const destroyed: string[] = [];

    entities.forEach((i) => {
      allNames.push(i.name);

      if (i.isDead()) {
        if (i.isALivingBeing) {
          dead.push(i.name);

          return;
        }
        destroyed.push(i.name);
      }
    });

    let list = formatInlineList(allNames);

    if (dead.length > 0) {
      const names =
        dead.length === 1 ? `one ${dead[0]} is` : `${formatInlineList(dead, true, true)} are`;
      list += `. ${firstCharToCapital(names)} dead`;
    }

    if (destroyed.length > 0) {
      const names =
        destroyed.length === 1 ? `one ${dead[0]} is` : `${formatInlineList(dead, true, true)} are`;
      list += ` and the ${names} destroyed`;
    } //
    else {
      list += '.';
    }

    return list;
  }

  removeContentById(id: number): void {
    let index = -1;
    this.content.some((e, i) => {
      if (e.id === id) {
        index = i;
        console.log(e.id === id);
        if (index > -1) this.content.splice(index, 1);

        return true;
      }

      if (e.content) {
        index = e.content.findIndex((c) => c.id === id);
        console.log('e.content', index);
        if (index > -1) {
          e.content.splice(index, 1);
          console.log(index > -1);

          return true;
        }
      }

      return false;
    });
  }
}
