import { settings_PersistanceKey } from './state/persistance';
import { Message, ObjectOfNumbers } from './types';
import { firstCharToCapital } from './utils/text';

export type SettingShorthand = {
  id: string;
  name: string;
  value: number;
  options: ObjectOfNumbers;
};

export const SettingsValues = {
  skipIntro: {
    no: 0,
    yes: 1,
  },
  printSpeed: {
    normal: 0,
    slow: 1,
    instant: 2,
  },
  unknownActionResponse: {
    print: 0,
    printInModal: 1,
    skip: 2,
  },
  useInputHistory: {
    no: 0,
    yes: 1,
  },
};

class Setting {
  value: number;
  readonly id: string;
  readonly isVisibleToThePlayer: boolean;
  readonly options: ObjectOfNumbers;

  constructor(
    id: string,
    initialValue: number,
    isVisibleToThePlayer: boolean,
    options: ObjectOfNumbers,
  ) {
    this.id = id;
    this.value = initialValue;
    this.isVisibleToThePlayer = isVisibleToThePlayer;
    this.options = options;

    const retrievedValue = this.retrieve();
    if (retrievedValue !== undefined) this.set(retrievedValue);
  }

  isValidOption(option: number): boolean {
    return Object.values(this.options).some((o) => o === option);
  }

  get(): number {
    return this.value;
  }

  set(newValue: number): void {
    if (!this.isValidOption(newValue)) return;

    this.value = newValue;

    this.persist();
  }

  persist(): void {
    window.localStorage.setItem(`${settings_PersistanceKey}-${this.id}`, `${this.value}`);
  }

  retrieve(): number | undefined {
    const storedItem = window.localStorage.getItem(`${settings_PersistanceKey}-${this.id}`);

    if (storedItem) return parseInt(storedItem);

    return undefined;
  }

  getReadableName(capitalLetter = true): string {
    const name = this.id.replace(/-/, ' ');
    if (capitalLetter) return firstCharToCapital(name);

    return name;
  }
}

export class Settings {
  skipIntro: Setting;
  printSpeed: Setting;
  unknownActionResponse: Setting;
  useInputHistory: Setting;
  all: Setting[];

  constructor() {
    /* Visible to the player */
    this.skipIntro = new Setting(
      'skip-intro',
      SettingsValues.skipIntro.yes,
      true,
      SettingsValues.skipIntro,
    );
    this.printSpeed = new Setting(
      'print-speed',
      SettingsValues.printSpeed.instant,
      true,
      SettingsValues.printSpeed,
    );

    /* Game internals */
    this.unknownActionResponse = new Setting(
      'unknown-action-response',
      SettingsValues.unknownActionResponse.print,
      false,
      SettingsValues.unknownActionResponse,
    );

    this.useInputHistory = new Setting(
      'use-input-history',
      SettingsValues.useInputHistory.yes,
      false,
      SettingsValues.useInputHistory,
    );

    this.all = [this.skipIntro, this.printSpeed, this.unknownActionResponse];
  }

  getShorthands(): SettingShorthand[] {
    return this.all.map((s) => ({
      id: s.id,
      name: s.getReadableName(),
      value: s.value,
      options: s.options,
    }));
  }

  getAllVisibleToPlayer(): SettingShorthand[] {
    return this.all
      .filter((s) => s.isVisibleToThePlayer)
      .map((s) => ({
        id: s.id,
        name: s.getReadableName(),
        value: s.value,
        options: s.options,
      }));
  }

  setById(id: string, newValue: number): void {
    const option = this.all.find((s) => s.id === id);

    if (option) option.set(newValue);
  }

  formSettingsAsMessages(onlyVisibleToThePlayer?: boolean): Message[] {
    return (onlyVisibleToThePlayer ? this.getAllVisibleToPlayer() : this.getShorthands())
      .map<Message[]>((setting) => [
        [
          Object.entries(setting.options)
            .map(([name, value]) => (value === setting.value ? `[${name}]` : name))
            .join(' '),
          { prefix: setting.name },
        ],
      ])
      .flat();
  }
}
