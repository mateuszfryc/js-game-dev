const { Utils } = Engine;
const { GetWindowInnerSize } = Utils;

/**
  PIXI.js aliases
**/

const Pixi = PIXI;
const GraphicsEngine = Pixi.Application;
const ParticleContainer = Pixi.ParticleContainer;
const Sprite = Pixi.Sprite;

/**
  Setup PIXI.js graphics engine, scale it's view to full window and setup event listner
  that will call size updater to make sure PIXI's view is aloways at max window size
**/

const Graphics = new GraphicsEngine({
  autoResize: true,
  backgroundColor: 0x486acb,
  resolution: window.devicePixelRatio || 1,
});
const Renderer = Graphics.renderer;

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
const particles = [];
const maxFlamesParticles =
  Graphics.renderer instanceof PIXI.Renderer ? 10000 : 100;
const flameParticles = new ParticleContainer(maxFlamesParticles, {
  scale: true,
  position: true,
  rotation: true,
  uvs: true,
  alpha: true,
});
Graphics.stage.addChild(flameParticles);

const Assets = {
  fireParticles: 'assets/sprites/fireparticles.json',
};

function init() {
  const flameParticlesSheet =
    Graphics.loader.resources[Assets.fireParticles].textures;

  let i = 0;
  let currentParticleIndex = 0;
  const particleTexturesNumber = Object.keys(flameParticlesSheet).length;
  for (i; i < maxFlamesParticles; i++) {
    currentParticleIndex++;
    if (currentParticleIndex > particleTexturesNumber) currentParticleIndex = 1;
    const particle = new Sprite(
      flameParticlesSheet[`fireParticle0${currentParticleIndex}.png`]
    );
    particle.anchor.set(0.5);
    particle.x = -300;
    particle.y = Graphics.screen.height / 4;
    // particle.scale.set( 1, 1);
    particle.direction = Math.random() * Math.PI * 2;
    particle.turningSpeed = Math.random() - 0.8;
    particle.speed = (2 + Math.random() * 2) * 0.2;
    particle.offset = Math.random() * 100;

    flameParticles.addChild(particle);
  }

  flameParticles.children.forEach((child) => particles.push(child));

  const dudeBoundsPadding = 100;
  const dudeBounds = new PIXI.Rectangle(
    -dudeBoundsPadding,
    -dudeBoundsPadding,
    Graphics.screen.width + dudeBoundsPadding * 2,
    Graphics.screen.height + dudeBoundsPadding * 2
  );

  let tick = 0;

  function GameUpdate(deltaTime) {
    // for (let i = 0; i < particles.length; i++) {
    //   particles[ i ].x += deltaTime * Math.random() * 3;
    // }
    let p = particles[0];
    p.width *= 1.01;
    p.height *= 1.01;
    p.x += deltaTime * 3;
  }

  Graphics.ticker.add(GameUpdate);
}

Graphics.loader.add(Assets.fireParticles).load(init);

// Graphics.ticker.add( deltaTime => {

//   for (let i = 0; i < particles.length; i++) {
//     particles[ i ].x += deltaTime * Math.random() * 3;
//   }
// // iterate through the sprites and update their position
// for (let i = 0; i < particles.length; i++) {
//     const dude = particles[i];
//     // dude.scale.y = 0.95 + Math.sin(tick + dude.offset) * 0.05;
//     dude.direction += dude.turningSpeed * 0.01;
//     dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
//     dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
//     dude.rotation = -dude.direction + Math.PI;

//     // wrap the maggots
//     if (dude.x < dudeBounds.x) {
//           dude.x += dudeBounds.width;
//       } else if (dude.x > dudeBounds.x + dudeBounds.width) {
//           dude.x -= dudeBounds.width;
//       }

//       if (dude.y < dudeBounds.y) {
//           dude.y += dudeBounds.height;
//       } else if (dude.y > dudeBounds.y + dudeBounds.height) {
//           dude.y -= dudeBounds.height;
//       }
//     }

//   // increment the ticker
//   tick += 0.1;
//   }
// );

// The application will create a canvas element for you that you
// can then insert into the DOM
// document.body.appendChild(app.view);

// load the texture we need
// app.loader.add('bunny', 'assets/images/fireParticle01.png').load((loader, resources) => {
//     // This creates a texture from a 'bunny.png' image
//     const bunny = new PIXI.Sprite(resources.bunny.texture);

//     // Setup the position of the bunny
//     bunny.x = app.renderer.width / 2;
//     bunny.y = app.renderer.height / 2;

//     // Rotate around the center
//     bunny.anchor.x = 0.5;
//     bunny.anchor.y = 0.5;

//     // Add the bunny to the scene we are building
//     app.stage.addChild(bunny);

//     // Listen for frame updates
//     app.ticker.add(() => {
//          // each frame we spin the bunny around a bit
//         bunny.rotation += 0.01;
//     });
// });
