'use strict';

Engine.DebugDraw = new Sprite();

Engine.DebugDraw.pinPoint = function (x, y) {
  const g = this.graphics;
  g.lineStyle(1, 0xff0000);
  g.moveTo(x, 0);
  g.lineTo(x, canvas.height);
  g.moveTo(0, y);
  g.lineTo(canvas.width, y);
};

Engine.Layers.addToLayer('front', Engine.DebugDraw);
