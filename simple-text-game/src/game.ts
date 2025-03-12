import { ActionResult } from './action';
import { ActionsHub, GameState } from './actions-hub';
import { closeQuickMessages } from './actions/misc/close-quick-messages';
import { contentTemplates } from './content';
import { firstScene, hitAnyKeyToClose } from './content/messages';
import { Entity, EntityTemplate } from './entity';
import { KEYS_CODES } from './enums';
import { Hints } from './hints';
import { HTMLHandler } from './html-handler';
import { InputHistory } from './input-history';
import { ContentLookup, EntityOverrides, GameWorldLocation } from './location';
import { locationsTemplates } from './locations';
import { Menu } from './menu';
import { menus } from './menus';
import { MessageLog } from './message-log';
import { PlayerInput } from './player.input';
import { Player } from './player/player';
import { Settings, SettingsValues } from './settings';
import { Message, Messages } from './types';
import { getAllUrlParams } from './utils/get-url-params';
import { animateOnce } from './utils/html';

/*
  TODO: regex keywords, e.g. [fF]+[uU]+[cC]+[kK]+
 */

export class Game {
  previousTarget: Entity;
  currentLocation: GameWorldLocation;
  readonly savedGames: string[] = [];

  /* Stores spawned rooms throught runtime. */
  readonly visitedLocations: GameWorldLocation[] = [];

  readonly actionsHub = new ActionsHub();
  readonly settings = new Settings();
  readonly player = new Player();
  readonly inputHistory = new InputHistory();
  readonly playerInput = new PlayerInput();
  readonly messageLog = new MessageLog('#message-log');
  readonly quickMessages = new MessageLog('#quick-messages');
  readonly hints = new Hints();
  readonly callToAction = new HTMLHandler('#call-to-action');

  constructor() {
    const printSpeedGetter = this.settings.printSpeed.get.bind(this.settings.printSpeed);
    this.messageLog.getPrintSpeed = printSpeedGetter;
    this.quickMessages.getPrintSpeed = printSpeedGetter;

    this.hints.hide();
    this.callToAction.hide();
    this.playerInput.hide();
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));

    const naturalWeapons = ['head', 'fist', 'foot', 'hand']
      .map((name) => this.getContentTemplatesByName(name))
      .map<Entity>((template) => this.spawnEntity(template[0]));

    this.player.naturalWeapons.push(...naturalWeapons);

    const params = getAllUrlParams();

    setTimeout(
      ((): void => {
        if (params?.dev === '1') {
          // this.goToMenu(menus.characterCreationMenu);
          this.enterLocation('Cabin 08', false, false, firstScene);
          this.goToMenu(menus.gameplayMenu);
        } //
        else {
          if (this.settings.skipIntro.get() === SettingsValues.skipIntro.no) {
            this.goToMenu(menus.introMenu);
          } //
          else {
            this.goToMenu(menus.mainMenu);
          }
        }

        this.messageLog.scrollToNewest();
      }).bind(this),
      580,
    );

    animateOnce('.glitch__img', 'opacity', 0, 1, 10);

    console.log(this);
  }

  onPlayerCommandSubmit(): void {
    const { value: input } = this.playerInput;

    if (this.settings.useInputHistory.get() === SettingsValues.useInputHistory.yes)
      this.inputHistory.add(input);

    const actionsResults = this.actionsHub.findAndSolveAction(input, this.getGameState());

    this.applyActionsResults(actionsResults, input);

    this.playerInput.clear();
    if (actionsResults.length > 0) return;

    this.handleInputWithutAction(input);
  }

  onKeyDown(event: KeyboardEvent): void {
    // Prevent key up from moving cursor to the begining of the input field
    if (event.keyCode === KEYS_CODES.ARROW_UP) {
      event.preventDefault();
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    const { inputHistory, messageLog, playerInput, quickMessages } = this;
    const useHistory = this.settings.useInputHistory.get() === SettingsValues.useInputHistory.yes;

    /* eslint-disable indent */
    switch (event.keyCode) {
      case KEYS_CODES.ESCAPE:
        playerInput.clear();
        break;

      case KEYS_CODES.ENTER:
        if (quickMessages.isPrinting) {
          quickMessages.printAllPendingMessages();
          break;
        }

        if (messageLog.isPrinting) {
          messageLog.printAllPendingMessages();
          break;
        }

        this.onPlayerCommandSubmit();
        this.playerInput.clear();

        break;

      // case KEYS_CODES.W:
      case KEYS_CODES.ARROW_UP:
        if (useHistory && inputHistory.hasEntries()) {
          if (!inputHistory.includes(playerInput.value)) playerInput.cacheCurrent();
          const previous =
            playerInput.isEmpty() || playerInput.cachedInput === playerInput.value
              ? inputHistory.getLast(true)
              : inputHistory.getPrevious();

          if (previous) {
            playerInput.set(previous);
          }
        }
        break;

      // case KEYS_CODES.S:
      case KEYS_CODES.ARROW_DOWN:
        if (useHistory && inputHistory.hasEntries()) {
          const next = inputHistory.getNext();
          if (next) {
            playerInput.set(next);
            break;
          }
          if (playerInput.cachedInput !== null) {
            playerInput.set(playerInput.cachedInput);
            inputHistory.setIndexToLast();
          }
        }
        break;

      default:
        break;
    }
    /* eslint-enable indent */

    this.playerInput.focus();
  }

  applyActionsResults(actionsResults: ActionResult[], input = ''): void {
    actionsResults.forEach((result) => {
      if (result.blockingActions?.length === 1 && result.target) {
        this.applyActionsResults(this.actionsHub.solveSequencedActions(input, this.getGameState()));

        return;
      }
      if (result.target) this.previousTarget = result.target;
      if (result.quickMessages) this.printInModal(result.quickMessages);
      if (result.callToAction) this.callToAction.set(result.callToAction);
      if (result.clearMessageLog) this.messageLog.clear();
      if (result.messages) this.messageLog.print(result.messages);
      if (result.goToMenu) this.goToMenu(result.goToMenu);
      if (result.enterLocation)
        this.enterLocation(
          result.enterLocation,
          result.showLocationDescription ?? true,
          result.showEnterLocationInfo ?? true,
        );

      // if (this.player.hp <= 0) this.messageLog.print('You died', { className: 'red' });
    });
  }

  handleInputWithutAction(inputWithNoAction: string): void {
    const unknownActionResponse = this.settings.unknownActionResponse.get();
    if (
      inputWithNoAction === '' ||
      unknownActionResponse === SettingsValues.unknownActionResponse.skip
    )
      return;

    // TODO: if there is no action search the input for key words of level content and if
    // one is found ask what the player wants to do with this

    const response =
      inputWithNoAction.split(' ').length === 1
        ? `I don't know the word "${inputWithNoAction}"`
        : `I don't know what "${inputWithNoAction}" means`;

    if (unknownActionResponse === SettingsValues.unknownActionResponse.printInModal) {
      this.printInModal(response);

      return;
    }

    this.messageLog.print(response);
  }

  getGameState(): GameState {
    return {
      settings: this.settings,
      player: this.player,
      messageLog: this.messageLog,
      quickMessages: this.quickMessages,
      hints: this.hints,
      savedGames: this.savedGames,
      currentLocation: this.currentLocation,
      previousTarget: this.previousTarget,
      playerInput: this.playerInput.value,
      inputHistory: this.inputHistory,
      callToAction: this.callToAction.value,
    };
  }

  /** Find entities templates and override them if neccessary. */
  getContentTemplatesByName(contentLookup: ContentLookup | ContentLookup[]): EntityTemplate[] {
    const items: EntityTemplate[] = [];
    let lookup = contentLookup;

    if (!(lookup instanceof Array)) lookup = [lookup];

    lookup.forEach((item) => {
      // multiple items
      if (item instanceof Array) {
        let quantity = 1;
        let name = '';
        let overrides: EntityOverrides = {};

        if (typeof item[0] === 'number' && typeof item[1] === 'string') {
          if (typeof item[2] === 'object') {
            [quantity, name, overrides] = item;
          } //
          else {
            [quantity, name] = item;
          }
        } //
        else if (typeof item[0] === 'string' && typeof item[1] === 'object') {
          [name, overrides] = item;
        }

        const result = contentTemplates.find(
          (i) => i.name === name || i.name === overrides?.parent,
        );
        if (!result) throw new Error(`There is no content named ${name}`);

        for (let i = 0; i < quantity; i++) {
          // override result with custom properties
          items.push({ ...result, ...overrides });
        }

        return;
      }

      // sinle item
      const result = contentTemplates.find((i) => i.name === item);
      if (!result) throw new Error(`There is no content named ${item as string}`);
      items.push(result);
    });

    return items;
  }

  spawnEntity(initialTemplate: EntityTemplate): Entity {
    let template = initialTemplate;
    let parentTemplate: EntityTemplate;

    template.keyWords.push(template.name);

    if (template.parent) {
      parentTemplate = this.getContentTemplatesByName(template.parent)[0] ?? undefined;

      if (parentTemplate) {
        template = {
          ...parentTemplate,
          ...template,
          keyWords: [parentTemplate.name, ...template.keyWords, ...parentTemplate.keyWords],
        };
      }
    }

    const entity = new Entity(template);

    const content: Entity[] = [];
    if (template.content && template.content.length > 0) {
      this.getContentTemplatesByName(template.content).forEach((entityTemplate) => {
        content.push(this.spawnEntity(entityTemplate));
      });
      entity.content = content;
    }

    if (template.defaultAction) {
      const result = this.actionsHub.findAction(template.defaultAction);
      entity.defaultAction = result?.action;
    }

    return entity;
  }

  enterLocation(
    name: string,
    showLocationDescription = true,
    shouldPrintEntryInfo = true,
    message?: Messages,
  ): void {
    const { currentLocation, visitedLocations } = this;

    const template = locationsTemplates.find((location) => location.name === name);
    if (template === undefined) throw new Error(`Location ${name} can't be found`);

    // if the location that is about to be loaded was alredy visited
    // load it with it's modified state instead of creating new object
    const visited = visitedLocations.find((v) => v.name === name);

    if (visited) {
      // location was instatiated already and we can move on
      this.currentLocation = visited;
      if (shouldPrintEntryInfo) this.messageLog.print(`You enter ${name}`);
      if (showLocationDescription) this.messageLog.print(this.currentLocation.description);

      return;
    }

    if (currentLocation && !visited) visitedLocations.push(currentLocation);

    const locationContent: Entity[] = [];
    this.getContentTemplatesByName(template.content).forEach((entityTemplate) => {
      const item = this.spawnEntity(entityTemplate);
      locationContent.push(item);
    });

    this.currentLocation = new GameWorldLocation(
      this.visitedLocations.length, // id
      {
        ...template,
        content: locationContent,
      },
    );

    if (shouldPrintEntryInfo) this.messageLog.print(`You enter ${name}`);
    if (showLocationDescription) this.messageLog.print(this.currentLocation.description);
    if (message) this.messageLog.print(message);
  }

  printInModal(message: Messages): void {
    this.quickMessages.addClass('open');
    this.messageLog.addClass('dimmed');

    // give a minimal amount of time before the class names update
    setTimeout(() => {
      if (typeof message === 'string') {
        this.quickMessages.print([message, hitAnyKeyToClose]);
      } //
      else {
        this.quickMessages.print([...(message as Message[]), hitAnyKeyToClose]);
      }

      this.actionsHub.sequenced.unshift(closeQuickMessages);
    }, 0);
  }

  goToMenu(menu: Menu): void {
    const { actionsHub, callToAction, hints, messageLog, playerInput } = this;

    messageLog.clear();
    actionsHub.gameplay = menu.actions;
    menu.messages && messageLog.print(menu.messages);
    menu.callToAction ? callToAction.set(menu.callToAction) : callToAction.clear();
    menu.showCallToAction ? callToAction.show() : callToAction.hide();
    menu.showHints ? hints.show() : hints.hide();
    menu.showInput ? playerInput.show() : playerInput.hide();
    this.settings.useInputHistory.set(menu.useInputHistory ?? SettingsValues.useInputHistory.no);
    this.settings.unknownActionResponse.set(
      menu.unknownActionResponse ?? SettingsValues.unknownActionResponse.print,
    );

    if (menu.blockingActions) {
      menu.blockingActions.forEach((action) => actionsHub.sequenced.push(action));
      this.applyActionsResults(actionsHub.solveSequencedActions('', this.getGameState()));

      return;
    }

    this.actionsHub.sequenced = [];
  }
}
