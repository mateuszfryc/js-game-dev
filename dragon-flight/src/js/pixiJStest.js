const { Utils } = Engine;
const { GetWindowInnerSize } = Utils;
let AnimationSpeed = 0.3;
/**
  PIXI.js aliases
**/

const Pixi = PIXI;
const GraphicsEngine = Pixi.Application;
const ParticleContainer = Pixi.ParticleContainer;
const Sprite = Pixi.Sprite;
const AnimatedSprite = Pixi.AnimatedSprite;

/**
  Setup PIXI.js graphics engine, scale it's view to full window and setup event listner
  that will call size updater to make sure PIXI's view is aloways at max window size
**/

const Graphics = new GraphicsEngine({
  autoResize: true,
  backgroundColor: 0x486acb,
  resolution: window.devicePixelRatio || 1,
});
Graphics.stop();
const Renderer = Graphics.renderer;
const Stage = Graphics.stage;
const Loader = Graphics.loader;
const Resources = Loader.resources;

document.body.appendChild(Graphics.view);

function UpdateRendereSize() {
  const { width, height } = GetWindowInnerSize();
  Renderer.resize(width, height);
}

UpdateRendereSize();
window.addEventListener('resize', UpdateRendereSize);

/**
  Create particles container and fill it with particles when sprite is loaded.
**/
const Assets = {
  RedDragon: {
    name: 'RedDragonBody',
    path: 'assets/sprites/dragon_red_body.json',
  },
};

let RedDragonBody = {};

function init() {
  RedDragonBody = new AnimatedSprite(
    Resources[Assets.RedDragon.name].spritesheet.animations.dragon_body
  );
  Stage.addChild(RedDragonBody);
  RedDragonBody.animationSpeed = AnimationSpeed;
  RedDragonBody.scale.set(0.5);
  RedDragonBody.x = Graphics.screen.width * 0.5;
  RedDragonBody.y = Graphics.screen.height * 0.5;
  RedDragonBody.play();
  // console.log( Resources[ Assets.RedDragon.name ] );

  // flameParticles.children.forEach( child => particles.push( child ));

  // const dudeBoundsPadding = 100;
  // const dudeBounds = new PIXI.Rectangle(
  //     -dudeBoundsPadding,
  //     -dudeBoundsPadding,
  //     Graphics.screen.width + dudeBoundsPadding * 2,
  //     Graphics.screen.height + dudeBoundsPadding * 2,
  // );

  // let tick = 0;

  // function GameUpdate( deltaTime ) {

  // };

  // Graphics.ticker.add( GameUpdate );
  Graphics.start();
}

Loader.add(Assets.RedDragon.name, Assets.RedDragon.path).load(init);
