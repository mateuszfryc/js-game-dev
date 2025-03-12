'use strict';

Engine.Run = function () {
  const {
    AnimatedSprite,
    Animation,
    Assets,
    KEYS,
    Layers,
    Mouse,
    Settings,
    SimpleSprite,
    StaticSprite,
    Utils,
    Vector,
    World,
    DebugDraw,
  } = this;
  const {
    arrayToObject,
    clamp,
    getFrames,
    getRandomIntInRange,
    isInRange,
    withScale,
  } = Utils;
  const { imagesPath, spritesFiles, staticImages } = Assets;
  const { Friction, Gravity } = World;
  const { Scale } = Settings;

  const Stage = new iStage('canvas');
  const { canvas } = Stage;

  // console.log(canvas.width / 2, canvas.height / 2);

  // Load assets and wait till all of them are on board
  const spritesCheckList = arrayToObject(spritesFiles, (object, item) => {
    object[item[0]] = false;
  });
  const particlesBitmapData = arrayToObject(
    staticImages.fireParticles,
    (object, item) => {
      object['p' + item] = new BitmapData(
        imagesPath + 'fireParticle' + item + '.png'
      );
    }
  );

  let origin = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.062, 0, 0, 0, 0];

  let black = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  let violetDeath = [
    1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 255, 0, 0, 0, 0, 0,
  ];

  let strongYellow = [
    0, 0.5, 0, 0, 0, 0, 0.5, 0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 1, 0,
  ];

  const fireParticles = (function () {
    let particles = [];
    let i = 0;
    let particlesDataIndex = 0;
    for (i; i < 5000; i++) {
      const p = new Bitmap(particlesBitmapData[`p0${particlesDataIndex + 1}`]);
      particles.push(p);
      p.x = p.y = -1000;
      p.visible = false;
      p.id = i;
      Layers.addToLayer('front', p);
      particlesDataIndex++;
      if (particlesDataIndex > staticImages.fireParticles.length - 1)
        particlesDataIndex = 0;
    }
    return particles;
  })();
  // index of fire particles in-use
  const fireParticlesAvilable = fireParticles.map((item, index) => index);
  const fireParticlesInUse = [];
  let fireParticlesIndex = 0;

  const frameData = arrayToObject(spritesFiles, (object, item) => {
    const spriteName = item[0],
      columns = item[1],
      rows = item[2],
      path = `${imagesPath}${spriteName}.png`,
      bd = new BitmapData(path);
    bd.loader.addEventListener2(Event.COMPLETE, () => {
      object[spriteName] = getFrames(bd, columns, rows, false, () => {
        spritesCheckList[spriteName] = true;
      });
    });
  });
  const areSpritesLoaded = () =>
    Object.values(spritesCheckList).every((o) => !!o);

  function init() {
    // const UI = document.getElementById('UI');
    // const weaponSwitches = document.getElementById('weapon-switches');
    const weaponSwitch_fireBall = document.getElementById('fire-ball');
    const weaponSwitch_fireBreath = document.getElementById('fire-breath');
    // const fireBreathAmount = new SimpleSprite(
    //   frameData.fireBreathAmount.frames,
    //   frameData.fireBreathAmount.width,
    //   frameData.fireBreathAmount.height,
    //   1, 270, 20
    // );
    // Layers.addToLayer('UI', fireBreathAmount );

    let isMLB = false;
    let movingClouds = [];
    let shouldSpawnCloud = true;
    let lastSpawnTime = 0;
    let timeToSpawnNextCloud = 12000;
    let avilableCloudsIds = [];
    let isAimInHeadRotRange = false;
    let playerToMouseVector = new Vector(1);
    let selectedWeapon = 'fireBall';

    // todo: remove, refactor
    // *******************************************
    const sprites = {};
    // *******************************************

    const clouds = staticImages.clouds.map((s) => {
      return new Bitmap(new BitmapData(`${imagesPath}cloud${s}.png`));
    });

    clouds.forEach((c, i) => {
      c.x = canvas.width + 100;
      c.id = i;
      avilableCloudsIds.push(i);
      c.randomTransform = () => {
        let h = canvas.height * 0.5;
        c.scaleX = c.scaleY = getRandomIntInRange(0.5, 3);
        c.y = getRandomIntInRange(-h, h);
      };
      Layers.addToLayer('stage', c);
    });

    // clouds movement update
    Stage.addEventListener(Event.ENTER_FRAME, () => {
      if (shouldSpawnCloud) {
        let newCloud = clouds[avilableCloudsIds[0]];
        avilableCloudsIds.splice(0, 1);
        newCloud.x = canvas.width + 100;
        newCloud.speed = getRandomIntInRange(2.5, 3.5);
        newCloud.randomTransform();
        movingClouds.push(newCloud);
        lastSpawnTime = new Date().getTime();
        shouldSpawnCloud = false;
      }

      movingClouds.forEach((c, i) => {
        c.x -= c.speed;
        if (c.x < -c.width) {
          movingClouds.splice(i, 1);
          avilableCloudsIds.push(c.id);
        }
      });

      let currentDate = new Date().getTime();
      if (
        currentDate - lastSpawnTime > timeToSpawnNextCloud &&
        movingClouds.length < clouds.length &&
        avilableCloudsIds.length > 0
      ) {
        shouldSpawnCloud = true;
        timeToSpawnNextCloud = getRandomIntInRange(10000, 20000);
      }
    });

    sprites.dragon = (options) => {
      const s = new AnimatedSprite({
        frames: frameData.dragon.frames,
        width: frameData.dragon.width,
        height: frameData.dragon.height,
        framesCount: frameData.dragon.framesCount,
        animations: {
          fly: new Animation({
            type: 'from-to',
            from: 0,
            to: 19,
            frameDuration: 4,
          }),
          flyFast: new Animation({
            type: 'from-to',
            from: 2,
            to: 13,
            frameDuration: 3,
          }),
          // soar:    new Animation({ type: 'custom-frames', frames: [ 24, 25, 26, 25, 24 ], frameDuration: 5 }),
          default: 'fly',
        },
        scale: 1,
        ...options,
      });
      Layers.addToLayer('stage', s);
      return s;
    };

    sprites.dragonHead = (options) => {
      const s = new AnimatedSprite({
        frames: frameData.dragonHead.frames,
        width: frameData.dragonHead.width,
        height: frameData.dragonHead.height,
        framesCount: frameData.dragonHead.framesCount,
        animations: {
          idle: new Animation({ type: 'single-frame', frames: [0] }),
          fire: new Animation({ type: 'single-frame', frames: [1] }),
          default: 'idle',
        },
        bodyMovementOffset: [
          { x: 0, y: withScale(4) },
          { x: 0, y: withScale(4) },
          { x: withScale(1), y: withScale(5) },
          { x: withScale(2), y: withScale(4) },
          { x: withScale(3), y: withScale(3) },
          { x: withScale(2), y: withScale(2) },
          { x: withScale(1), y: withScale(1) },
          { x: withScale(-2), y: withScale(-1) },
          { x: withScale(-2), y: withScale(-2) },
          { x: withScale(-2), y: withScale(-3) },
          { x: withScale(-2), y: withScale(-2) },
          { x: withScale(-1), y: withScale(-2) },
          { x: 0, y: withScale(-1) },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: withScale(-1), y: 0 },
          { x: 0, y: withScale(1) },
          { x: withScale(1), y: withScale(2) },
          { x: withScale(2), y: withScale(3) },
          { x: withScale(1), y: withScale(3) },
        ],
        scale: 1,
        ...options,
      });
      Layers.addToLayer('stage', s);
      return s;
    };

    //::Player
    const Player = {
      x: 0,
      y: 0,
      velocity: new Vector(),
      speed: {
        xAxis: withScale(5),
        yAxis: withScale(4),
      },
      acceleration: {
        xAxis: withScale(2),
        yAxis: withScale(1),
      },
      body: undefined,
      bodyOffset: new Vector(-50, 2),
      head: undefined,
      headOffset: new Vector(78),

      move: function (x, y) {
        this.x += x;
        this.y += y;
      },

      update: function () {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.velocity.x *= Friction;
        this.velocity.y *= Gravity;

        Player.body.move();
        Player.head.move();

        // update fire breath particles
        let i = 0,
          f;
        if (fireParticlesInUse.length > 0)
          for (i; i < fireParticlesInUse.length; i++) {
            f = fireParticles[fireParticlesInUse[i]];
            if (
              f.x > canvas.width + 100 ||
              f.x < -100 ||
              f.y > canvas.height + 100 ||
              f.y < -100 ||
              f.alpha < 0.015
            ) {
              fireParticlesInUse.splice(i, 1);
              i--;
              fireParticlesAvilable.push(f.id);
              f.x = -1000;
              f.y = -1000;
              f.visible = false;
              continue;
            }
            f.x += f.v.x;
            f.y += f.v.y;
            f.scaleX += 0.003;
            f.scaleY += 0.003;
            f.v.x *= 0.99;
            f.v.y += 0.05;
            f.alpha *= 0.99;
            f.rotation += f.rotRate;

            let t = f.transform._cmat;
            t[1] *= 0.95;
            t[6] *= 0.95;
            t[7] *= 0.95;
            t[12] *= 0.95;

            if (f.alpha < 0.85 && f.alpha > 0.5) {
              if (f.scaleX > f.scaleY) f.scaleY += 0.01;
              else f.scaleX += 0.01;
            }

            if (f.alpha < 0.846 && f.alpha > 0.8455) {
              f.rotation = Math.random() * 180;
            }

            if (f.alpha < 0.6) {
              f.v.y -= 0.1;
            }

            if (f.alpha < 0.5) {
              t[0] *= 0.97;
              t[5] *= 0.97;
              t[10] *= 0.97;
              f.alpha *= 0.98;
            }

            if (f.alpha < 0.2) {
              f.scaleX += 0.003;
              f.scaleY += 0.003;
            }
          }
      },

      fireBall: function () {
        let { x, y, headOffset } = this;
        x += headOffset.x * Scale;
        y += headOffset.y * Scale;
        let s = new SimpleSprite(
          frameData.fireBall.frames,
          frameData.fireBall.width,
          frameData.fireBall.height,
          frameData.fireBall.framesCount,
          x,
          y
        );

        s.setRotation(this.head.rotation + 90);
        s.setScale(1.8);

        let v = playerToMouseVector.copy();
        let speed = 24;
        v.normalize().multiply(speed);

        function update() {
          if (
            s.position.x > canvas.width + 100 ||
            s.position.y > canvas.height + 100
          ) {
            Stage.removeEventListener(Event.ENTER_FRAME, update);
            Stage.removeChild(s);
          }
          s.move(v.x, v.y);
          s.scaleX *= 1.003;
        }

        Stage.addEventListener(Event.ENTER_FRAME, update);
        Stage.addChild(s);
      },

      fireBreath: function () {
        let {
          x,
          y,
          headOffset: { x: hx, y: hy },
          head: { rotation },
        } = this;
        x += hx * Scale;
        y += hy * Scale;
        let i = 0;
        let v = playerToMouseVector.copy();
        let mod;

        for (i; i < 24; i++) {
          if (fireParticlesAvilable.length < 1) {
            continue;
          }
          let fIndex = fireParticlesAvilable.shift();
          let f = fireParticles[fIndex];
          fireParticlesInUse.push(fIndex);
          f.x = x;
          f.y = y;
          // particle velocity
          mod = Math.random() * (15 + 15) - 15;
          let speed = 3 + Math.abs(Math.abs(mod / 2.5) - 15);
          v.y + mod;
          v.normalize().multiply(speed);
          f.v = v.copy();
          f.visible = true;
          f.scaleX = 0.05;
          f.scaleY = 0.001;
          f.alpha = 1;
          f.rotation = rotation;
          f.rotRate = Math.random() * (1 + 1) - 1;
          let t = f.transform._cmat;
          t[0] = 1;
          t[1] = 0.4;
          t[6] = 0.4;
          t[5] = 1;
          t[7] = 0.4;
          t[10] = 1;
          t[12] = 0.4;
        }
      },

      bodyFlyIdle: function () {
        this.body.playAnimation('fly', true);
      },

      bodyFlyFast: function () {
        this.body.playAnimation('flyFast', true);
      },

      init: function () {
        this.move(250, canvas.height / 2);

        this.body = sprites.dragon({ parentRef: this });
        this.body.setOffset(this.bodyOffset.x, this.bodyOffset.y);

        this.head = sprites.dragonHead({ parentRef: this });
        // this.head.setPivotPoint( -15 );
        this.head.setOffset(this.headOffset.x, this.headOffset.y);
        this.head.bodyMovementTarget = this.body;

        this.body.playAnimation('fly');
        this.head.playAnimation('idle');

        // this.head.bodyMovementTarget = this.body;
        Stage.addEventListener(Event.ENTER_FRAME, () => this.update());
      },
    };
    Engine.Player = Player;

    const updatePlayerHeadRotation = function () {
      Player.head.setRotation(clamp(Mouse.angleToPlayerHead, -25, 70));
    };

    const updatePlayerToMouseAngle = function () {
      let angle = Mouse.getPointToMouseAngle(
        Player.x + Player.headOffset.x,
        Player.y + Player.headOffset.y
      );
      angle -= 90;
      isAimInHeadRotRange = isInRange(angle, -35, 85);
      Mouse.angleToPlayer = angle;
      if (isAimInHeadRotRange) Mouse.angleToPlayerHead = angle;
    };

    const MouseEventDown = function () {
      Player.head.playAnimation('fire');
      isMLB = true;
      if (selectedWeapon === 'fireBall') {
        Player.fireBall();
      }
    };

    const MouseEventUp = function () {
      Player.head.playAnimation('idle');
      isMLB = false;
    };

    const MouseLeftPressed = function () {
      if (isMLB) {
        if (selectedWeapon === 'fireBreath') {
          Player.fireBreath();
        }
      }
    };

    const aimSight = new StaticSprite(
      frameData.aimSight.frames[0],
      frameData.aimSight.width,
      frameData.aimSight.height,
      0,
      0,
      0,
      Mouse
    );
    aimSight.setScale(1.5, true);
    Layers.addToLayer('UI', aimSight);

    const MouseMove = function () {
      Mouse.getMousePosition();
      updatePlayerToMouseAngle();
      updatePlayerHeadRotation();
      aimSight.move();
      if (isAimInHeadRotRange) {
        playerToMouseVector.setTo(Mouse.x - Player.x, Mouse.y - Player.y);
      }
    };

    document.addEventListener('mousedown', MouseEventDown);
    document.addEventListener('mouseup', MouseEventUp);
    document.addEventListener('mousemove', MouseMove);
    Stage.addEventListener(Event.ENTER_FRAME, MouseLeftPressed);

    //::Keyboard
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
      // [KEYS_BINDINGS.SPRINT]: function() {
      //   Player.bodyFlyFast();
      // },
      [KEYS_BINDINGS.MOVE_UP]: function () {
        Player.bodyFlyFast();
      },
      [KEYS_BINDINGS.SELECT_FIRE_BALL]: function () {
        selectedWeapon = 'fireBall';
        weaponSwitch_fireBall.className = 'selected';
        weaponSwitch_fireBreath.className = '';
      },
      [KEYS_BINDINGS.SELECT_FIRE_BREATH]: function () {
        selectedWeapon = 'fireBreath';
        weaponSwitch_fireBall.className = '';
        weaponSwitch_fireBreath.className = 'selected';
      },
    };

    const keyUpRouter = {
      [KEYS_BINDINGS.MOVE_UP]: function () {
        Player.bodyFlyIdle();
      },
    };

    const keysDown = [];

    const pressKey = function (e) {
      let k = e.keyCode;
      keysDown[k] = true;
      if (keyDownRouter[k]) {
        keyDownRouter[k]();
      }
    };

    const releaseKey = function (e) {
      let k = e.keyCode;
      delete keysDown[k];
      if (keyUpRouter[k]) {
        keyUpRouter[k]();
      }
    };

    const pressedKeys = function () {
      const {
        speed,
        acceleration: { xAxis, yAxis },
        velocity,
      } = Player;

      let shouldUpdate = false;

      if (
        KEYS_BINDINGS.MOVE_DOWN in keysDown &&
        Math.abs(velocity.y) <= speed.yAxis * 2.4
      ) {
        velocity.y += yAxis;
        updatePlayerHeadRotation();
        shouldUpdate = true;
      }
      if (
        KEYS_BINDINGS.MOVE_UP in keysDown &&
        Math.abs(velocity.y) <= speed.yAxis
      ) {
        velocity.y -= yAxis / 1.4;
        updatePlayerHeadRotation();
        shouldUpdate = true;
      }
      if (Math.abs(velocity.x) <= speed.xAxis) {
        if (KEYS_BINDINGS.MOVE_LEFT in keysDown) {
          velocity.x -= xAxis;
          shouldUpdate = true;
        }
        if (KEYS_BINDINGS.MOVE_RIGHT in keysDown) {
          velocity.x += xAxis;
          shouldUpdate = true;
        }
        updatePlayerHeadRotation();
      }
    };

    document.addEventListener('keydown', pressKey, false);
    document.addEventListener('keyup', releaseKey, false);
    Stage.addEventListener(Event.ENTER_FRAME, pressedKeys);

    // Engine.testParent = new Vector(canvas.width * 0.5, canvas.height * 0.5);
    // Engine.testParent.move = function( x, y )
    // {
    //   this.x += x;
    //   this.y += y;
    //   Engine.test.move()
    // }

    // Engine.test = new SimpleSprite(
    //   frameData.fireParticles.frames,
    //   frameData.fireParticles.width,
    //   frameData.fireParticles.height,
    //   frameData.fireParticles.framesCount,
    //   canvas.width * 0.5, canvas.height * 0.5,
    //   // 0, 0,
    //   // 0,
    //   // Engine.testParent
    // );
    // Layers.addToLayer('front', Engine.test);
    Player.init();

    Layers.pushAllLayersToStage(Stage);
  }

  // DebugDraw.pinPoint( canvas.width * 0.5, canvas.height * 0.5 );

  // const p = new Bitmap( particlesBitmapData.p01);
  // Layers.addToLayer( 'front', p );
  // p.x = canvas.width * 0.5;
  // p.y = canvas.height * 0.5;
  // window.p = p;

  let waitForAssets = setInterval(() => {
    if (areSpritesLoaded()) {
      clearInterval(waitForAssets);
      init();
    }
  }, 100);
};

//::Initialise
window.addEventListener('load', () => {
  Engine.Run();
});
