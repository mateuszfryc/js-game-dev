'use strict';

Engine.Animation = function ({
  frameDuration = 3,
  frames = null,
  from = null,
  infinitLoop = true,
  repeatNTimes = 1,
  resolveToDefault = false,
  to = null,
  type = 'default',
}) {
  this.frameDuration = frameDuration;
  this.frames = frames;
  this.from = from;
  this.infinitLoop = infinitLoop;
  this.repeatNTimes = repeatNTimes;
  this.resolveToDefault = resolveToDefault;
  this.to = to;
  this.type = type;
};
