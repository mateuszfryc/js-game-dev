'use strict';
let i = {};
Engine.Run = function () {
  // Get Engine objects and settings

  const { Assets, KEYS, Mouse, Utils } = Engine;
  const { GetCanvasAspectRatio, GetWindowInnerSize, IsInRange } = Utils;

  // PIXI.js aliases

  const Pixi = PIXI;
  const GraphicsEngine = Pixi.Application;
  const ParticleContainer = Pixi.ParticleContainer;
  const Container = Pixi.Container;
  const Texture = Pixi.Texture;
  const Sprite = Pixi.Sprite;
  const AnimatedSprite = Pixi.AnimatedSprite;
  const Loader = new Pixi.Loader();
  const Resources = Loader.resources;

  /**
    Setup PIXI.js graphics engine, scale it's view to full window and setup event listner
    that will call size updater to make sure PIXI's view is aloways at max window size
  **/

  const Graphics = new GraphicsEngine({
    autoResize: true,
    backgroundColor: 0x486acb,
  });
  Graphics.stop();
  const Renderer = Graphics.renderer;
  const Screen = Renderer.screen;
  const Stage = Graphics.stage;
  Stage.sortableChildren = true;

  document.body.appendChild(Graphics.view);

  function UpdateRendereSize() {
    Renderer.resolution = GetCanvasAspectRatio(Renderer.context);
    const { width, height } = GetWindowInnerSize();
    Renderer.resize(width, height);
  }

  UpdateRendereSize();
  window.addEventListener('resize', UpdateRendereSize);

  // Rendering layers / z values

  const UI = new Container();
  Stage.addChild(UI);
  UI.zIndex = 20;
  UI.width = Screen.width;
  UI.height = Screen.height;

  const EntitiesStage = new Container();
  Stage.addChild(EntitiesStage);
  EntitiesStage.zIndex = 10;
  EntitiesStage.width = Screen.width;
  EntitiesStage.height = Screen.height;

  // Some basic values

  let speed = 3;
  let velocity = { x: 0, y: 0 };
  let acceleration = 2;
  let isAimInHeadRotRange = false;

  // Chain assets into loading queue

  Assets.Animated.forEach((image) => {
    Loader.add(image.name, image.path);
  });
  Assets.Static.forEach((image) => {
    Loader.add(image.name, image.path);
  });

  function AssetsPostLoadActions(loader, resources) {
    const AimSight = new Sprite(resources['aim_sight'].texture);
    AimSight.anchor.set(0.5);
    AimSight.x = Screen.width * 0.5;
    AimSight.y = Screen.height * 0.5;
    AimSight.width = 32;
    AimSight.height = 32;
    UI.addChild(AimSight);

    const DragonRedBody = new AnimatedSprite(
      resources['dragon_red_body'].spritesheet.animations.dragon_body
    );
    Stage.addChild(DragonRedBody);
    DragonRedBody.animationSpeed = 0.32;
    DragonRedBody.scale.set(0.5);
    DragonRedBody.x = Screen.width * 0.5;
    DragonRedBody.y = Screen.height * 0.5;

    const DragonRedHead_sheet = resources['dragon_red_head'].spritesheet;
    const DragonRedHead = new Sprite(
      DragonRedHead_sheet.textures['dragon_head_idle']
    );
    DragonRedHead.x = 260;
    DragonRedHead.y = -10;
    DragonRedBody.addChild(DragonRedHead);
    EntitiesStage.addChild(DragonRedBody);
    DragonRedBody.play();

    // Mouse

    function OnMouseDown() {
      DragonRedHead.texture = DragonRedHead_sheet.textures['dragon_head_fire'];
    }

    function OnMouseUp() {
      DragonRedHead.texture = DragonRedHead_sheet.textures['dragon_head_idle'];
    }

    function UpdatePlayerHeadRotation() {
      // rotate player's dragon head according to angle from the head to the mouse pointer
      const { x, y } = DragonRedHead.getGlobalPosition();
      const angle = Mouse.GetPointToMouseAngle(x, y);
      isAimInHeadRotRange = IsInRange(angle, -0.65, 1.15);
      if (isAimInHeadRotRange) {
        DragonRedHead.rotation = angle;
      }
    }

    function OnMouseMove() {
      Mouse.UpdateMousePosition();

      AimSight.x = Mouse.x;
      AimSight.y = Mouse.y;

      UpdatePlayerHeadRotation();
    }

    document.addEventListener('mousedown', OnMouseDown);
    document.addEventListener('mouseup', OnMouseUp);
    document.addEventListener('mousemove', OnMouseMove);

    // Keyboard

    const KEYS_BINDINGS = {
      SPRINT: KEYS.SHIFT,
      MOVE_UP: KEYS.W,
      MOVE_DOWN: KEYS.S,
      MOVE_LEFT: KEYS.A,
      MOVE_RIGHT: KEYS.D,
      SELECT_FIRE_BALL: KEYS['1'],
      SELECT_FIRE_BREATH: KEYS['2'],
    };

    const keyDownRouter = {
      [KEYS_BINDINGS.MOVE_UP]: function () {},
      [KEYS_BINDINGS.SELECT_FIRE_BALL]: function () {},
      [KEYS_BINDINGS.SELECT_FIRE_BREATH]: function () {},
    };

    const keyUpRouter = {
      [KEYS_BINDINGS.MOVE_UP]: function () {},
    };

    const keysDown = [];

    function OnKeyDown(event) {
      let k = event.keyCode;
      keysDown[k] = true;
      if (keyDownRouter[k]) {
        keyDownRouter[k]();
      }
    }

    function OnKeyReleased(event) {
      let k = event.keyCode;
      delete keysDown[k];
      if (keyUpRouter[k]) {
        keyUpRouter[k]();
      }
    }

    // actions for keys being pressed
    function OnKeyPressed() {}

    document.addEventListener('keydown', OnKeyDown, false);
    document.addEventListener('keyup', OnKeyReleased, false);

    function GlobalUpdate(deltaTime) {
      if (Math.abs(velocity.y) <= speed) {
        if (KEYS_BINDINGS.MOVE_DOWN in keysDown) {
          velocity.y += acceleration;
        }

        if (KEYS_BINDINGS.MOVE_UP in keysDown) {
          velocity.y -= acceleration / 1.4;
        }
        UpdatePlayerHeadRotation();
      }

      if (Math.abs(velocity.x) <= speed) {
        if (KEYS_BINDINGS.MOVE_LEFT in keysDown) {
          velocity.x -= acceleration;
        }

        if (KEYS_BINDINGS.MOVE_RIGHT in keysDown) {
          velocity.x += acceleration;
        }
        UpdatePlayerHeadRotation();
      }

      const x = DragonRedBody.x + deltaTime * velocity.x;
      const y = DragonRedBody.y + deltaTime * velocity.y;
      if (x > 0 && x < Screen.width) {
        DragonRedBody.x = x;
      }
      if (y > 0 && y < Screen.height) {
        DragonRedBody.y = y;
      }

      velocity.x *= 0.97;
      velocity.y *= 0.97;
    }

    Graphics.ticker.add(GlobalUpdate);

    Graphics.start();

    i = Graphics;
  }

  // Run post loading function

  Loader.load(AssetsPostLoadActions);
};

//::Initialise
window.addEventListener('load', Engine.Run);
