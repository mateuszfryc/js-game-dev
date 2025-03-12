const Sprite = function({
  path,
  x = 0,
  y = 0,
  type = 0,
  rows = 1,
  delay = 4,
  columns = 1,
  scale = 100,
  frameCount = columns * rows,
  holdBreathTime = 10
}) {
  let that = this;
  const file = new Image();
  file.src = path;
  file.onload = function() {
    that.frameWidth = file.naturalWidth / that.columns;
    that.frameHeight = file.naturalHeight / that.rows;
  }

  this.file = file;

  this.rows = rows;
  this.columns = columns;
  this.frameCount = frameCount;
  this.currentFrame = 0;
  // canvas coordinates of the sprite
  this.x = x;
  this.y = y;
  // offset allowing to start animation in different column or row
  this.offsetX = 0; 
  this.offsetY = 0;
  this.delay = delay;
  this.dalayCounter = 0;
  this.scale = scale / 100;
  // type of animation: 0: simple (loop), 1: breathing
  this.type = type;

  // once animation will reach frameCount it will stop for a while and than turn back in revers order
  this.holdBreathTime = holdBreathTime;
  this.hold = 0;

  this.updateFrame = type === 0 ? this.simpleUpdate : this.breathingUpdate;
}

Sprite.prototype.simpleUpdate = function() {
  let s = this;
  if(s.delayCounter < s.delay){
    s.delayCounter++;
  }
  else {
    s.currentFrame = ++s.currentFrame % s.frameCount;
    s.delayCounter = 0;
  }
  s.offsetX = s.currentFrame * s.frameWidth;
}

Sprite.prototype.breathingUpdate = function() {
  let s = this;
  if(s.delayCounter < s.delay){
    s.delayCounter++;
  }
  else {
    if(s.currentFrame < s.frameCount && s.currentFrame >= 0) {
      s.currentFrame = ++s.currentFrame;
      s.delayCounter = 0;
    }
    else if(s.currentFrame === s.frameCount) {
      if(s.hold < s.holdBreathTime) {
        s.hold++;
      } else {
        s.hold = 0;
        s.currentFrame = -s.frameCount;
      }
    }
    else if(s.currentFrame < 0){
      s.currentFrame = ++s.currentFrame;
      s.delayCounter = 0;
    }
  }
  s.offsetX = Math.abs(s.currentFrame) < s.frameCount ? Math.abs(s.currentFrame) * s.frameWidth : (s.frameCount - 1) * s.frameWidth; 
}

Sprite.prototype.render = function() {
  this.updateFrame();
  ctx.drawImage(this.file,
    this.offsetX,
    this.offsetY,
    this.frameWidth,
    this.frameHeight,
    this.x,
    this.y,
    this.frameWidth * this.scale,
    this.frameHeight * this.scale
  );
};