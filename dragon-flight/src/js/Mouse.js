'use strict';

Engine.Mouse = {
  x: 0,
  y: 0,
};

Engine.Mouse.UpdateMousePosition = function (e) {
  let v = e || window.event;
  // if ( !v ) return [ this.x, this.y ];
  let x = v.pageX;
  let y = v.pageY;

  // IE 8
  if (x === undefined || x === null) {
    const { scrollLeft, scrollTop } = document.body;
    const { documentElement } = document;
    x = v.clientX + scrollLeft + documentElement.scrollLeft;
    y = v.clientY + scrollTop + documentElement.scrollTop;
  }

  this.x = x;
  this.y = y;

  // return [ x, y ];
};

Engine.Mouse.GetPointToMouseAngle = function (px, py) {
  const { x, y } = this;
  return Math.atan2(x - px, py - y) - Math.PI / 2;
  // return Math.atan2( x - px, py - y ) * 180 / Math.PI;
};
