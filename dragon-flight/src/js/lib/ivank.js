window._requestAF = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(a, b) {
      window.setTimeout(a, 1e3 / 60);
    }
  );
})();
function Point(a, b) {
  a || (a = 0);
  b || (b = 0);
  this.x = a;
  this.y = b;
}
Point.prototype.add = function(a) {
  return new Point(this.x + a.x, this.y + a.y);
};
Point.prototype.clone = function() {
  return new Point(this.x, this.y);
};
Point.prototype.copyFrom = function(a) {
  this.x = a.x;
  this.y = a.y;
};
Point.prototype.equals = function(a) {
  return this.x == a.x && this.y == a.y;
};
Point.prototype.normalize = function(a) {
  var b = Math.sqrt(this.x * this.x + this.y * this.y);
  this.x *= a / b;
  this.y *= a / b;
};
Point.prototype.offset = function(a, b) {
  this.x += a;
  this.y += b;
};
Point.prototype.setTo = function(a, b) {
  this.x = a;
  this.y = b;
};
Point.prototype.subtract = function(a) {
  return new Point(this.x - a.x, this.y - a.y);
};
Point.distance = function(a, b) {
  return Point._distance(a.x, a.y, b.x, b.y);
};
Point.interpolate = function(a, b, c) {
  return new Point(a.x + c * (b.x - a.x), a.y + c * (b.y - a.y));
};
Point.polar = function(a, b) {
  return new Point(a * Math.cos(b), a * Math.sin(b));
};
Point._distance = function(a, b, c, d) {
  return Math.sqrt((c - a) * (c - a) + (d - b) * (d - b));
};
Point._v4 = {};
Point._m4 = {};
Point._v4.create = function() {
  return new Float32Array(4);
};
Point._m4.create = function(a) {
  var b = new Float32Array(16);
  b[0] = b[5] = b[10] = b[15] = 1;
  a && Point._m4.set(a, b);
  return b;
};
Point._v4.add = function(a, b, c) {
  c[0] = a[0] + b[0];
  c[1] = a[1] + b[1];
  c[2] = a[2] + b[2];
  c[3] = a[3] + b[3];
};
Point._v4.set = function(a, b) {
  b[0] = a[0];
  b[1] = a[1];
  b[2] = a[2];
  b[3] = a[3];
};
Point._m4.set = function(a, b) {
  b[0] = a[0];
  b[1] = a[1];
  b[2] = a[2];
  b[3] = a[3];
  b[4] = a[4];
  b[5] = a[5];
  b[6] = a[6];
  b[7] = a[7];
  b[8] = a[8];
  b[9] = a[9];
  b[10] = a[10];
  b[11] = a[11];
  b[12] = a[12];
  b[13] = a[13];
  b[14] = a[14];
  b[15] = a[15];
};
Point._m4.multiply = function(a, b, c) {
  var d = a[0],
    e = a[1],
    f = a[2],
    g = a[3],
    h = a[4],
    k = a[5],
    l = a[6],
    m = a[7],
    n = a[8],
    p = a[9],
    t = a[10],
    q = a[11],
    x = a[12],
    z = a[13],
    y = a[14];
  a = a[15];
  var r = b[0],
    u = b[1],
    v = b[2],
    w = b[3];
  c[0] = r * d + u * h + v * n + w * x;
  c[1] = r * e + u * k + v * p + w * z;
  c[2] = r * f + u * l + v * t + w * y;
  c[3] = r * g + u * m + v * q + w * a;
  r = b[4];
  u = b[5];
  v = b[6];
  w = b[7];
  c[4] = r * d + u * h + v * n + w * x;
  c[5] = r * e + u * k + v * p + w * z;
  c[6] = r * f + u * l + v * t + w * y;
  c[7] = r * g + u * m + v * q + w * a;
  r = b[8];
  u = b[9];
  v = b[10];
  w = b[11];
  c[8] = r * d + u * h + v * n + w * x;
  c[9] = r * e + u * k + v * p + w * z;
  c[10] = r * f + u * l + v * t + w * y;
  c[11] = r * g + u * m + v * q + w * a;
  r = b[12];
  u = b[13];
  v = b[14];
  w = b[15];
  c[12] = r * d + u * h + v * n + w * x;
  c[13] = r * e + u * k + v * p + w * z;
  c[14] = r * f + u * l + v * t + w * y;
  c[15] = r * g + u * m + v * q + w * a;
  return c;
};
Point._m4.inverse = function(a, b) {
  var c = a[0],
    d = a[1],
    e = a[2],
    f = a[3],
    g = a[4],
    h = a[5],
    k = a[6],
    l = a[7],
    m = a[8],
    n = a[9],
    p = a[10],
    t = a[11],
    q = a[12],
    x = a[13],
    z = a[14],
    y = a[15],
    r = c * h - d * g,
    u = c * k - e * g,
    v = c * l - f * g,
    w = d * k - e * h,
    B = d * l - f * h,
    C = e * l - f * k,
    D = m * x - n * q,
    E = m * z - p * q,
    F = m * y - t * q,
    G = n * z - p * x,
    H = n * y - t * x,
    I = p * y - t * z,
    A = r * I - u * H + v * G + w * F - B * E + C * D;
  if (!A) return null;
  A = 1 / A;
  b[0] = (h * I - k * H + l * G) * A;
  b[1] = (e * H - d * I - f * G) * A;
  b[2] = (x * C - z * B + y * w) * A;
  b[3] = (p * B - n * C - t * w) * A;
  b[4] = (k * F - g * I - l * E) * A;
  b[5] = (c * I - e * F + f * E) * A;
  b[6] = (z * v - q * C - y * u) * A;
  b[7] = (m * C - p * v + t * u) * A;
  b[8] = (g * H - h * F + l * D) * A;
  b[9] = (d * F - c * H - f * D) * A;
  b[10] = (q * B - x * v + y * r) * A;
  b[11] = (n * v - m * B - t * r) * A;
  b[12] = (h * E - g * G - k * D) * A;
  b[13] = (c * G - d * E + e * D) * A;
  b[14] = (x * u - q * w - z * r) * A;
  b[15] = (m * w - n * u + p * r) * A;
  return b;
};
Point._m4.multiplyVec2 = function(a, b, c) {
  var d = b[0];
  b = b[1];
  c[0] = d * a[0] + b * a[4] + a[12];
  c[1] = d * a[1] + b * a[5] + a[13];
};
Point._m4.multiplyVec4 = function(a, b, c) {
  var d = b[0],
    e = b[1],
    f = b[2];
  b = b[3];
  c[0] = a[0] * d + a[4] * e + a[8] * f + a[12] * b;
  c[1] = a[1] * d + a[5] * e + a[9] * f + a[13] * b;
  c[2] = a[2] * d + a[6] * e + a[10] * f + a[14] * b;
  c[3] = a[3] * d + a[7] * e + a[11] * f + a[15] * b;
};
function Rectangle(a, b, c, d) {
  a || (a = 0);
  b || (b = 0);
  c || (c = 0);
  d || (d = 0);
  this.x = a;
  this.y = b;
  this.width = c;
  this.height = d;
}
Rectangle.prototype.clone = function() {
  return new Rectangle(this.x, this.y, this.width, this.height);
};
Rectangle.prototype.contains = function(a, b) {
  return (
    a >= this.x &&
    a <= this.x + this.width &&
    b >= this.y &&
    b <= this.y + this.height
  );
};
Rectangle.prototype.containsPoint = function(a) {
  return this.contains(a.x, a.y);
};
Rectangle.prototype.containsRect = function(a) {
  return (
    this.x <= a.x &&
    this.y <= a.y &&
    a.x + a.width <= this.x + this.width &&
    a.y + a.height <= this.y + this.height
  );
};
Rectangle.prototype.copyFrom = function(a) {
  this.x = a.x;
  this.y = a.y;
  this.width = a.width;
  this.height = a.height;
};
Rectangle.prototype.equals = function(a) {
  return (
    this.x == a.x &&
    this.y == a.y &&
    this.width == a.width &&
    this.height == a.height
  );
};
Rectangle.prototype.inflate = function(a, b) {
  this.x -= a;
  this.y -= b;
  this.width += 2 * a;
  this.height += 2 * b;
};
Rectangle.prototype.inflatePoint = function(a) {
  this.inflate(a.x, a.y);
};
Rectangle.prototype.intersection = function(a) {
  var b = Math.max(this.x, a.x),
    c = Math.max(this.y, a.y),
    d = Math.min(this.x + this.width, a.x + a.width);
  a = Math.min(this.y + this.height, a.y + a.height);
  return d < b || a < c ? new Rectangle() : new Rectangle(b, c, d - b, a - c);
};
Rectangle.prototype.intersects = function(a) {
  return a.y + a.height < this.y ||
    a.x > this.x + this.width ||
    a.y > this.y + this.height ||
    a.x + a.width < this.x
    ? !1
    : !0;
};
Rectangle.prototype.isEmpty = function() {
  return 0 >= this.width || 0 >= this.height;
};
Rectangle.prototype.offset = function(a, b) {
  this.x += a;
  this.y += b;
};
Rectangle.prototype.offsetPoint = function(a) {
  this.offset(a.x, a.y);
};
Rectangle.prototype.setEmpty = function() {
  this.x = this.y = this.width = this.height = 0;
};
Rectangle.prototype.setTo = function(a, b, c, d) {
  this.x = a;
  this.y = b;
  this.width = c;
  this.height = d;
};
Rectangle.prototype.union = function(a) {
  if (this.isEmpty()) return a.clone();
  if (a.isEmpty()) return this.clone();
  var b = this.clone();
  b._unionWith(a);
  return b;
};
Rectangle._temp = new Float32Array(2);
Rectangle.prototype._unionWith = function(a) {
  a.isEmpty() ||
    (this.isEmpty()
      ? this.copyFrom(a)
      : (this._unionWP(a.x, a.y),
        this._unionWP(a.x + a.width, a.y + a.height)));
};
Rectangle.prototype._unionWP = function(a, b) {
  var c = Math.min(this.x, a),
    d = Math.min(this.y, b);
  this.width = Math.max(this.x + this.width, a) - c;
  this.height = Math.max(this.y + this.height, b) - d;
  this.x = c;
  this.y = d;
};
Rectangle.prototype._unionWL = function(a, b, c, d) {
  0 == this.width && 0 == this.height ? this._setP(a, b) : this._unionWP(a, b);
  this._unionWP(c, d);
};
Rectangle.prototype._setP = function(a, b) {
  this.x = a;
  this.y = b;
  this.width = this.height = 0;
};
function Transform() {
  this._obj = null;
  this._vdirty = this._mdirty = !1;
  this._tmat = Point._m4.create();
  this._imat = Point._m4.create();
  this._atmat = Point._m4.create();
  this._aimat = Point._m4.create();
  this._pscal = Point._m4.create();
  this._cmat = Point._m4.create();
  this._cvec = Point._v4.create();
  this._cID = !0;
  this._scaleZ = this._scaleY = this._scaleX = 1;
  this._rotationZ = this._rotationY = this._rotationX = 0;
}
Transform.prototype._getTMat = function() {
  var a = this._obj,
    b = this._tmat;
  this._checkMat();
  b[12] = a.x;
  b[13] = a.y;
  b[14] = a.z;
  return b;
};
Transform.prototype._getIMat = function() {
  Point._m4.inverse(this._getTMat(), this._imat);
  return this._imat;
};
Transform.prototype._postScale = function(a, b) {
  this._checkMat();
  var c = this._pscal;
  c[10] = c[15] = 1;
  c[0] = a;
  c[5] = b;
  Point._m4.multiply(c, this._tmat, this._tmat);
  this._vdirty = !0;
};
Transform.prototype._valsToMat = function() {
  var a = this._tmat,
    b = this._scaleX,
    c = this._scaleY,
    d = this._scaleZ,
    e = -0.01745329252 * this._rotationX,
    f = -0.01745329252 * this._rotationY,
    g = -0.01745329252 * this._rotationZ,
    h = Math.cos(e),
    k = Math.cos(f),
    l = Math.cos(g);
  e = Math.sin(e);
  f = Math.sin(f);
  g = Math.sin(g);
  a[0] = k * l * b;
  a[1] = -k * g * b;
  a[2] = f * b;
  a[4] = (h * g + e * f * l) * c;
  a[5] = (h * l - e * f * g) * c;
  a[6] = -e * k * c;
  a[8] = (e * g - h * f * l) * d;
  a[9] = (e * l + h * f * g) * d;
  a[10] = h * k * d;
};
Transform.prototype._matToVals = function() {
  var a = this._tmat,
    b = a[0],
    c = a[1],
    d = a[2],
    e = a[4],
    f = a[5],
    g = a[6],
    h = a[8],
    k = a[9];
  a = a[10];
  this._scaleX = Math.sqrt(b * b + c * c + d * d);
  this._scaleY = Math.sqrt(e * e + f * f + g * g);
  this._scaleZ = Math.sqrt(h * h + k * k + a * a);
  e = 1 / this._scaleX;
  f = 1 / this._scaleZ;
  g *= 1 / this._scaleY;
  a *= f;
  this._rotationX = -57.29577951308 * Math.atan2(-g, a);
  this._rotationY =
    -57.29577951308 * Math.atan2(d * e, Math.sqrt(g * g + a * a));
  this._rotationZ = -57.29577951308 * Math.atan2(-(c * e), b * e);
};
Transform.prototype._checkVals = function() {
  this._vdirty && (this._matToVals(), (this._vdirty = !1));
};
Transform.prototype._checkMat = function() {
  this._mdirty && (this._valsToMat(), (this._mdirty = !1));
};
Transform.prototype._setOPos = function(a) {
  a = this._tmat;
  this._obj.x = a[12];
  this._obj.y = a[13];
  this._obj.z = a[14];
};
Transform.prototype._checkColorID = function() {
  var a = this._cmat,
    b = this._cvec;
  this._cID =
    1 == a[15] &&
    1 == a[0] &&
    0 == a[1] &&
    0 == a[2] &&
    0 == a[3] &&
    0 == a[4] &&
    1 == a[5] &&
    0 == a[6] &&
    0 == a[7] &&
    0 == a[8] &&
    0 == a[9] &&
    1 == a[10] &&
    0 == a[11] &&
    0 == a[12] &&
    0 == a[13] &&
    0 == a[14] &&
    1 == a[15] &&
    0 == b[0] &&
    0 == b[1] &&
    0 == b[2] &&
    0 == b[3];
};
Transform.prototype._setMat3 = function(a) {
  var b = this._tmat;
  b[0] = a[0];
  b[1] = a[1];
  b[4] = a[3];
  b[5] = a[4];
  b[12] = a[6];
  b[13] = a[7];
};
Transform.prototype._getMat3 = function(a) {
  var b = this._tmat;
  a[0] = b[0];
  a[1] = b[1];
  a[3] = b[4];
  a[4] = b[5];
  a[6] = b[12];
  a[7] = b[13];
};
Transform.prototype._setCMat5 = function(a) {
  for (var b = this._cmat, c = this._cvec, d = 0; 4 > d; d++) {
    c[d] = a[20 + d];
    for (var e = 0; 4 > e; e++) b[4 * d + e] = a[5 * d + e];
  }
};
Transform.prototype._getCMat5 = function(a) {
  var b = this._cmat,
    c = this._cvec;
  a[24] = 1;
  for (var d = 0; 4 > d; d++) {
    a[20 + d] = c[d];
    for (var e = 0; 4 > e; e++) a[5 * d + e] = b[4 * d + e];
  }
};
Transform.prototype.__defineSetter__("matrix", function(a) {
  this._checkMat();
  this._setMat3(a);
  this._setOPos();
  this._vdirty = !0;
});
Transform.prototype.__defineGetter__("matrix", function() {
  this._checkMat();
  var a = new Float32Array(9);
  this._getMat3(a);
  return a;
});
Transform.prototype.__defineSetter__("matrix3D", function(a) {
  this._checkMat();
  Point._m4.set(a, this._tmat);
  this._setOPos();
  this._vdirty = !0;
});
Transform.prototype.__defineGetter__("matrix3D", function() {
  this._checkMat();
  return Point._m4.create(this._getTMat());
});
Transform.prototype.__defineSetter__("colorTransform", function(a) {
  this._setCMat5(a);
  this._checkColorID();
});
Transform.prototype.__defineGetter__("colorTransform", function() {
  var a = new Float32Array(25);
  this._getCMat5(a);
  return a;
});
function EventDispatcher() {
  this.lsrs = {};
  this.cals = {};
}
EventDispatcher.efbc = [];
EventDispatcher.prototype.hasEventListener = function(a) {
  a = this.lsrs[a];
  return null == a ? !1 : 0 < a.length;
};
EventDispatcher.prototype.addEventListener = function(a, b) {
  this.addEventListener2(a, b, null);
};
EventDispatcher.prototype.addEventListener2 = function(a, b, c) {
  null == this.lsrs[a] && ((this.lsrs[a] = []), (this.cals[a] = []));
  this.lsrs[a].push(b);
  this.cals[a].push(c);
  a == Event.ENTER_FRAME &&
    ((a = EventDispatcher.efbc), 0 > a.indexOf(this) && a.push(this));
};
EventDispatcher.prototype.removeEventListener = function(a, b) {
  var c = this.lsrs[a];
  if (null != c) {
    var d = c.indexOf(b);
    if (!(0 > d)) {
      var e = this.cals[a];
      c.splice(d, 1);
      e.splice(d, 1);
      a == Event.ENTER_FRAME &&
        0 == c.length &&
        ((c = EventDispatcher.efbc), c.splice(c.indexOf(this), 1));
    }
  }
};
EventDispatcher.prototype.dispatchEvent = function(a) {
  a.currentTarget = this;
  null == a.target && (a.target = this);
  var b = this.lsrs[a.type];
  if (null != b)
    for (var c = this.cals[a.type], d = 0; d < b.length; d++)
      if (null == c[d]) b[d](a);
      else b[d].call(c[d], a);
};
function Event(a, b) {
  b || (b = !1);
  this.type = a;
  this.currentTarget = this.target = null;
  this.bubbles = b;
}
Event.ENTER_FRAME = "enterFrame";
Event.RESIZE = "resize";
Event.ADDED_TO_STAGE = "addedToiStage";
Event.REMOVED_FROM_STAGE = "removedFromiStage";
Event.CHANGE = "change";
Event.OPEN = "open";
Event.PROGRESS = "progress";
Event.COMPLETE = "complete";
function MouseEvent(a, b) {
  Event.call(this, a, b);
  this.movementY = this.movementX = 0;
}
MouseEvent.prototype = new Event();
MouseEvent.CLICK = "click";
MouseEvent.MOUSE_DOWN = "mouseDown";
MouseEvent.MOUSE_UP = "mouseUp";
MouseEvent.MIDDLE_CLICK = "middleClick";
MouseEvent.MIDDLE_MOUSE_DOWN = "middleMouseDown";
MouseEvent.MIDDLE_MOUSE_UP = "middleMouseUp";
MouseEvent.RIGHT_CLICK = "rightClick";
MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown";
MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp";
MouseEvent.MOUSE_MOVE = "mouseMove";
MouseEvent.MOUSE_OVER = "mouseOver";
MouseEvent.MOUSE_OUT = "mouseOut";
function TouchEvent(a, b) {
  Event.call(this, a, b);
  this.stageY = this.stageX = 0;
  this.touchPointID = -1;
}
TouchEvent.prototype = new Event();
TouchEvent.prototype._setFromDom = function(a) {
  var b = window.devicePixelRatio || 1;
  this.stageX = a.clientX * b;
  this.stageY = a.clientY * b;
  this.touchPointID = a.identifier;
};
TouchEvent.TOUCH_BEGIN = "touchBegin";
TouchEvent.TOUCH_END = "touchEnd";
TouchEvent.TOUCH_MOVE = "touchMove";
TouchEvent.TOUCH_OUT = "touchOut";
TouchEvent.TOUCH_OVER = "touchOver";
TouchEvent.TOUCH_TAP = "touchTap";
function KeyboardEvent(a, b) {
  Event.call(this, a, b);
  this.shiftKey = this.ctrlKey = this.altKey = !1;
  this.charCode = this.keyCode = 0;
}
KeyboardEvent.prototype = new Event();
KeyboardEvent.prototype._setFromDom = function(a) {
  this.altKey = a.altKey;
  this.ctrlKey = a.ctrlKey;
  this.shiftKey = a.shiftKey;
  this.keyCode = a.keyCode;
  this.charCode = a.charCode;
};
KeyboardEvent.KEY_DOWN = "keyDown";
KeyboardEvent.KEY_UP = "keyUp";
var BlendMode = {
  NORMAL: "normal",
  ADD: "add",
  SUBTRACT: "subtract",
  MULTIPLY: "multiply",
  SCREEN: "screen",
  ERASE: "erase",
  ALPHA: "alpha"
};
function DisplayObject() {
  EventDispatcher.call(this);
  this.visible = !0;
  this.stage = this.parent = null;
  this.transform = new Transform();
  this.transform._obj = this;
  this.blendMode = BlendMode.NORMAL;
  this.z = this.y = this.x = 0;
  this._trect = new Rectangle();
  this._tempP = new Point();
  this._torg = Point._v4.create();
  this._tvec4_0 = Point._v4.create();
  this._tvec4_1 = Point._v4.create();
  this._tempm = Point._m4.create();
  this._atsEv = new Event(Event.ADDED_TO_STAGE);
  this._rfsEv = new Event(Event.REMOVED_FROM_STAGE);
  this._atsEv.target = this._rfsEv.target = this;
}
DisplayObject.prototype = new EventDispatcher();
DisplayObject.prototype.dispatchEvent = function(a) {
  EventDispatcher.prototype.dispatchEvent.call(this, a);
  a.bubbles && null != this.parent && this.parent.dispatchEvent(a);
};
DisplayObject.prototype._globalToLocal = function(a, b) {
  var c = this._torg;
  iStage._main._getOrigin(c);
  Point._m4.multiplyVec4(this._getAIMat(), c, c);
  var d = this._tvec4_1;
  d[0] = a.x;
  d[1] = a.y;
  d[2] = 0;
  d[3] = 1;
  Point._m4.multiplyVec4(this._getAIMat(), d, d);
  this._lineIsc(c, d, b);
};
DisplayObject.prototype.globalToLocal = function(a) {
  var b = new Point();
  this._globalToLocal(a, b);
  return b;
};
DisplayObject.prototype.localToGlobal = function(a) {
  var b = this._torg;
  iStage._main._getOrigin(b);
  var c = this._tvec4_1;
  c[0] = a.x;
  c[1] = a.y;
  c[2] = 0;
  c[3] = 1;
  Point._m4.multiplyVec4(this._getATMat(), c, c);
  a = new Point();
  this._lineIsc(b, c, a);
  return a;
};
DisplayObject.prototype._lineIsc = function(a, b, c) {
  var d = b[0] - a[0],
    e = b[1] - a[1],
    f = b[2] - a[2];
  b = Math.sqrt(d * d + e * e + f * f);
  f = -a[2] / (f / b);
  c.x = a[0] + (d / b) * f;
  c.y = a[1] + (e / b) * f;
};
DisplayObject.prototype._transfRect = function(a, b, c, d) {
  var e = this._tvec4_0,
    f = this._tvec4_1,
    g = new Point(),
    h = Infinity,
    k = Infinity,
    l = -Infinity,
    m = -Infinity;
  e[0] = c.x;
  e[1] = c.y;
  e[2] = 0;
  e[3] = 1;
  Point._m4.multiplyVec4(a, e, f);
  this._lineIsc(b, f, g);
  h = Math.min(h, g.x);
  k = Math.min(k, g.y);
  l = Math.max(l, g.x);
  m = Math.max(m, g.y);
  e[0] = c.x + c.width;
  e[1] = c.y;
  e[2] = 0;
  e[3] = 1;
  Point._m4.multiplyVec4(a, e, f);
  this._lineIsc(b, f, g);
  h = Math.min(h, g.x);
  k = Math.min(k, g.y);
  l = Math.max(l, g.x);
  m = Math.max(m, g.y);
  e[0] = c.x;
  e[1] = c.y + c.height;
  e[2] = 0;
  e[3] = 1;
  Point._m4.multiplyVec4(a, e, f);
  this._lineIsc(b, f, g);
  h = Math.min(h, g.x);
  k = Math.min(k, g.y);
  l = Math.max(l, g.x);
  m = Math.max(m, g.y);
  e[0] = c.x + c.width;
  e[1] = c.y + c.height;
  e[2] = 0;
  e[3] = 1;
  Point._m4.multiplyVec4(a, e, f);
  this._lineIsc(b, f, g);
  h = Math.min(h, g.x);
  k = Math.min(k, g.y);
  l = Math.max(l, g.x);
  m = Math.max(m, g.y);
  d.x = h;
  d.y = k;
  d.width = l - h;
  d.height = m - k;
};
DisplayObject.prototype._getLocRect = function() {};
DisplayObject.prototype._getRect = function(a, b, c) {
  Point._m4.multiply(a, this._getATMat(), this._tempm);
  this._transfRect(this._tempm, b, this._getLocRect(), this._trect);
  return this._trect;
};
DisplayObject.prototype._getR = function(a, b) {
  iStage._main._getOrigin(this._torg);
  Point._m4.multiplyVec4(a._getAIMat(), this._torg, this._torg);
  return this._getRect(a._getAIMat(), this._torg, b);
};
DisplayObject.prototype._getParR = function(a, b) {
  null == DisplayObject._tdo && (DisplayObject._tdo = new DisplayObject());
  var c = null == this.parent;
  c && (this.parent = DisplayObject._tdo);
  var d = this._getR(this.parent, b);
  c && (this.parent = null);
  return d;
};
DisplayObject.prototype.getRect = function(a) {
  return this._getR(a, !1).clone();
};
DisplayObject.prototype.getBounds = function(a) {
  return this._getR(a, !0).clone();
};
DisplayObject.prototype._htpLocal = function(a, b) {
  var c = this._tempP;
  this._lineIsc(a, b, c);
  return this._getLocRect().contains(c.x, c.y);
};
DisplayObject.prototype.hitTestPoint = function(a, b, c) {
  null == c && (c = !1);
  var d = this._torg;
  iStage._main._getOrigin(d);
  Point._m4.multiplyVec4(this._getAIMat(), d, d);
  var e = this._tvec4_1;
  e[0] = a;
  e[1] = b;
  e[2] = 0;
  e[3] = 1;
  Point._m4.multiplyVec4(this._getAIMat(), e, e);
  return c ? this._htpLocal(d, e) : this._getR(iStage._main, !1).contains(a, b);
};
DisplayObject.prototype.hitTestObject = function(a) {
  var b = this._getR(iStage._main, !1);
  a = a._getR(iStage._main, !1);
  return b.intersects(a);
};
DisplayObject.prototype._loseFocus = function() {};
DisplayObject.prototype._getTarget = function(a, b) {
  return null;
};
DisplayObject.prototype._setiStage = function(a) {
  var b = this.stage;
  this.stage = a;
  null == b && null != a && this.dispatchEvent(this._atsEv);
  null != b && null == a && this.dispatchEvent(this._rfsEv);
};
DisplayObject.prototype._preRender = function(a) {
  var b = this.transform._getTMat();
  a._mstack.push(b);
  a._cmstack.push(
    this.transform._cmat,
    this.transform._cvec,
    this.transform._cID,
    this.blendMode
  );
};
DisplayObject.prototype._render = function(a) {};
DisplayObject.prototype._renderAll = function(a) {
  this.visible &&
    (this._preRender(a), this._render(a), a._mstack.pop(), a._cmstack.pop());
};
DisplayObject.prototype._getATMat = function() {
  if (null == this.parent) return this.transform._getTMat();
  Point._m4.multiply(
    this.parent._getATMat(),
    this.transform._getTMat(),
    this.transform._atmat
  );
  return this.transform._atmat;
};
DisplayObject.prototype._getAIMat = function() {
  if (null == this.parent) return this.transform._getIMat();
  Point._m4.multiply(
    this.transform._getIMat(),
    this.parent._getAIMat(),
    this.transform._aimat
  );
  return this.transform._aimat;
};
DisplayObject.prototype._getMouse = function() {
  var a = this._tempP;
  a.setTo(iStage._mouseX, iStage._mouseY);
  this._globalToLocal(a, a);
  return a;
};
this.dp = DisplayObject.prototype;
dp.ds = dp.__defineSetter__;
dp.dg = dp.__defineGetter__;
dp.ds("scaleX", function(a) {
  this.transform._checkVals();
  this.transform._scaleX = a;
  this.transform._mdirty = !0;
});
dp.ds("scaleY", function(a) {
  this.transform._checkVals();
  this.transform._scaleY = a;
  this.transform._mdirty = !0;
});
dp.ds("scaleZ", function(a) {
  this.transform._checkVals();
  this.transform._scaleZ = a;
  this.transform._mdirty = !0;
});
dp.dg("scaleX", function() {
  this.transform._checkVals();
  return this.transform._scaleX;
});
dp.dg("scaleY", function() {
  this.transform._checkVals();
  return this.transform._scaleY;
});
dp.dg("scaleZ", function() {
  this.transform._checkVals();
  return this.transform._scaleZ;
});
dp.ds("rotationX", function(a) {
  this.transform._checkVals();
  this.transform._rotationX = a;
  this.transform._mdirty = !0;
});
dp.ds("rotationY", function(a) {
  this.transform._checkVals();
  this.transform._rotationY = a;
  this.transform._mdirty = !0;
});
dp.ds("rotationZ", function(a) {
  this.transform._checkVals();
  this.transform._rotationZ = a;
  this.transform._mdirty = !0;
});
dp.ds("rotation", function(a) {
  this.transform._checkVals();
  this.transform._rotationZ = a;
  this.transform._mdirty = !0;
});
dp.dg("rotationX", function() {
  this.transform._checkVals();
  return this.transform._rotationX;
});
dp.dg("rotationY", function() {
  this.transform._checkVals();
  return this.transform._rotationY;
});
dp.dg("rotationZ", function() {
  this.transform._checkVals();
  return this.transform._rotationZ;
});
dp.dg("rotation", function() {
  this.transform._checkVals();
  return this.transform._rotationZ;
});
dp.ds("width", function(a) {
  this.transform._postScale(a / this.width, 1);
});
dp.ds("height", function(a) {
  this.transform._postScale(1, a / this.height);
});
dp.dg("width", function() {
  this.transform._checkVals();
  return this._getParR(this, !0).width;
});
dp.dg("height", function() {
  this.transform._checkVals();
  return this._getParR(this, !0).height;
});
dp.ds("alpha", function(a) {
  this.transform._cmat[15] = a;
  this.transform._checkColorID();
});
dp.dg("alpha", function() {
  return this.transform._cmat[15];
});
dp.dg("mouseX", function() {
  return this._getMouse().x;
});
dp.dg("mouseY", function() {
  return this._getMouse().y;
});
delete dp.ds;
delete dp.dg;
delete this.dp;
function InteractiveObject() {
  DisplayObject.call(this);
  this.buttonMode = !1;
  this.mouseChildren = this.mouseEnabled = !0;
}
InteractiveObject.prototype = new DisplayObject();
InteractiveObject.prototype._getTarget = function(a, b) {
  if (!this.visible || !this.mouseEnabled) return null;
  var c = this._getLocRect();
  if (null == c) return null;
  var d = this._tvec4_0,
    e = this._tvec4_1;
  Point._m4.multiplyVec4(this.transform._getIMat(), a, d);
  Point._m4.multiplyVec4(this.transform._getIMat(), b, e);
  var f = this._tempP;
  this._lineIsc(d, e, f);
  return c.contains(f.x, f.y) ? this : null;
};
function DisplayObjectContainer() {
  InteractiveObject.call(this);
  this._tempR = new Rectangle();
  this.numChildren = 0;
  this._children = [];
}
DisplayObjectContainer.prototype = new InteractiveObject();
DisplayObjectContainer.prototype._getRect = function(a, b, c) {
  var d = this._trect;
  d.setEmpty();
  for (var e = 0; e < this.numChildren; e++) {
    var f = this._children[e];
    f.visible && d._unionWith(f._getRect(a, b, c));
  }
  return d;
};
DisplayObjectContainer.prototype._htpLocal = function(a, b) {
  for (var c = this._children.length, d = 0; d < c; d++) {
    var e = this._children[d];
    if (e.visible) {
      c = e._tvec4_0;
      d = e._tvec4_1;
      var f = e.transform._getIMat();
      Point._m4.multiplyVec4(f, a, c);
      Point._m4.multiplyVec4(f, b, d);
      return e._htpLocal(c, d);
    }
  }
  return !1;
};
DisplayObjectContainer.prototype.addChild = function(a) {
  this._children.push(a);
  a.parent = this;
  a._setiStage(this.stage);
  ++this.numChildren;
};
DisplayObjectContainer.prototype.removeChild = function(a) {
  var b = this._children.indexOf(a);
  0 > b ||
    (this._children.splice(b, 1),
    (a.parent = null),
    a._setiStage(null),
    --this.numChildren);
};
DisplayObjectContainer.prototype.removeChildAt = function(a) {
  this.removeChild(this._children[a]);
};
DisplayObjectContainer.prototype.contains = function(a) {
  return 0 <= this._children.indexOf(a);
};
DisplayObjectContainer.prototype.getChildIndex = function(a) {
  return this._children.indexOf(a);
};
DisplayObjectContainer.prototype.setChildIndex = function(a, b) {
  var c = this._children.indexOf(a);
  if (b > c) {
    for (c += 1; c <= b; c++) this._children[c - 1] = this._children[c];
    this._children[b] = a;
  } else if (b < c) {
    for (--c; c >= b; c--) this._children[c + 1] = this._children[c];
    this._children[b] = a;
  }
};
DisplayObjectContainer.prototype.getChildAt = function(a) {
  return this._children[a];
};
DisplayObjectContainer.prototype._render = function(a) {
  for (var b = 0; b < this.numChildren; b++) this._children[b]._renderAll(a);
};
DisplayObjectContainer.prototype._getTarget = function(a, b) {
  if (!this.visible || (!this.mouseChildren && !this.mouseEnabled)) return null;
  var c = this._tvec4_0,
    d = this._tvec4_1,
    e = this.transform._getIMat();
  Point._m4.multiplyVec4(e, a, c);
  Point._m4.multiplyVec4(e, b, d);
  e = null;
  for (var f = this.numChildren - 1; -1 < f; f--) {
    var g = this._children[f]._getTarget(c, d);
    if (null != g) {
      e = g;
      break;
    }
  }
  return this.mouseChildren || null == e ? e : this;
};
DisplayObjectContainer.prototype._setiStage = function(a) {
  InteractiveObject.prototype._setiStage.call(this, a);
  for (var b = 0; b < this.numChildren; b++) this._children[b]._setiStage(a);
};
function BitmapData(a) {
  this.height = this.width = 0;
  this.rect = new Rectangle();
  this.loader = new EventDispatcher();
  this.loader.bitmapData = this;
  this._rheight = this._rwidth = 0;
  this._vBuffer = this._tcBuffer = this._texture = this._rrect = null;
  this._loaded = !1;
  this._dirty = !0;
  this._gpuAllocated = !1;
  this._ubuffer = this._buffer = null;
  if (null != a) {
    var b = document.createElement("img");
    b.crossOrigin = "Anonymous";
    b.onload = function(a) {
      this._initFromImg(b, b.width, b.height);
      a = new Event(Event.COMPLETE);
      this.loader.dispatchEvent(a);
    }.bind(this);
    b.src = a;
  }
}
BitmapData.empty = function(a, b, c) {
  null == c && (c = 4294967295);
  var d = new BitmapData(null);
  d._initFromImg(null, a, b, c);
  return d;
};
BitmapData.prototype.setPixel = function(a, b, c) {
  a = b * this.width + a;
  b = this._ubuffer;
  b[a] = (b[a] & 4278190080) + c;
  this._dirty = !0;
};
BitmapData.prototype.setPixel32 = function(a, b, c) {
  this._ubuffer[b * this.width + a] = c;
  this._dirty = !0;
};
BitmapData.prototype.setPixels = function(a, b) {
  this._copyRectBuff(b, a, this._buffer, this.rect);
  this._dirty = !0;
};
BitmapData.prototype.getPixel = function(a, b) {
  return this._ubuffer[b * this.width + a] & 16777215;
};
BitmapData.prototype.getPixel32 = function(a, b) {
  return this._ubuffer[b * this.width + a];
};
BitmapData.prototype.getPixels = function(a, b) {
  b || (b = new Uint8Array(a.width * a.height * 4));
  this._copyRectBuff(this._buffer, this.rect, b, a);
  return b;
};
BitmapData.prototype.draw = function(a) {
  this._dirty && this._syncWithGPU();
  this._setTexAsFB();
  iStage._setTEX(null);
  a._render(iStage._main);
  a = this.rect;
  gl.readPixels(
    a.x,
    a.y,
    a.width,
    a.height,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    this._buffer
  );
  iStage._main._setFramebuffer(
    null,
    iStage._main.stageWidth,
    iStage._main.stageHeight,
    !1
  );
  iStage._setTEX(this._texture);
  gl.generateMipmap(gl.TEXTURE_2D);
};
BitmapData.prototype._syncWithGPU = function() {
  var a = this.rect,
    b = this._buffer;
  if (!this._gpuAllocated) {
    var c = a.width,
      d = a.height,
      e = c / this._rwidth,
      f = d / this._rheight;
    this._texture = gl.createTexture();
    this._tcBuffer = gl.createBuffer();
    this._vBuffer = gl.createBuffer();
    iStage._setBF(this._tcBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, e, 0, 0, f, e, f]),
      gl.STATIC_DRAW
    );
    iStage._setBF(this._vBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 0, c, 0, 0, 0, d, 0, c, d, 0]),
      gl.STATIC_DRAW
    );
    c = new Uint8Array(this._rwidth * this._rheight * 4);
    d = new Uint32Array(c.buffer);
    for (e = 0; e < d.length; e++) d[e] = 16777215;
    iStage._setTEX(this._texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      this._rwidth,
      this._rheight,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      c
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_LINEAR
    );
    this._gpuAllocated = !0;
  }
  iStage._setTEX(this._texture);
  gl.texSubImage2D(
    gl.TEXTURE_2D,
    0,
    a.x,
    a.y,
    a.width,
    a.height,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    b
  );
  gl.generateMipmap(gl.TEXTURE_2D);
  this._dirty = !1;
};
BitmapData.prototype._setTexAsFB = function() {
  if (null == BitmapData._fbo) {
    BitmapData._fbo = gl.createFramebuffer();
    var a = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, a);
    gl.bindFramebuffer(gl.FRAMEBUFFER, BitmapData._fbo);
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl.DEPTH_ATTACHMENT,
      gl.RENDERBUFFER,
      a
    );
  }
  iStage._main._setFramebuffer(BitmapData._fbo, this._rwidth, this._rheight, !0);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    this._texture,
    0
  );
};
BitmapData.prototype._initFromImg = function(a, b, c, d) {
  this._loaded = !0;
  this.width = b;
  this.height = c;
  this.rect = new Rectangle(0, 0, b, c);
  this._rwidth = BitmapData._nhpot(b);
  this._rheight = BitmapData._nhpot(c);
  this._rrect = new Rectangle(0, 0, this._rwidth, this._rheight);
  var e = BitmapData._canv;
  e.width = b;
  e.height = c;
  e = BitmapData._ctx;
  null != a && e.drawImage(a, 0, 0);
  b = e.getImageData(0, 0, b, c);
  this._buffer =
    window.CanvasPixelArray && b.data instanceof CanvasPixelArray
      ? new Uint8Array(b.data)
      : new Uint8Array(b.data.buffer);
  this._ubuffer = new Uint32Array(this._buffer.buffer);
  if (null == a) for (a = 0, b = this._ubuffer; a < b.length; a++) b[a] = d;
};
BitmapData.prototype._copyRectBuff = function(a, b, c, d) {
  a = new Uint32Array(a.buffer);
  c = new Uint32Array(c.buffer);
  var e = b.intersection(d),
    f = Math.max(0, e.x - b.x),
    g = Math.max(0, e.x - d.x),
    h = Math.max(0, e.y - b.y),
    k = Math.max(0, e.y - d.y),
    l = e.width;
  e = e.height;
  for (var m = 0; m < e; m++)
    for (
      var n = (h + m) * b.width + f, p = (k + m) * d.width + g, t = 0;
      t < l;
      t++
    )
      c[p++] = a[n++];
};
BitmapData._canv = document.createElement("canvas");
BitmapData._ctx = BitmapData._canv.getContext("2d");
BitmapData._ipot = function(a) {
  return 0 == (a & (a - 1));
};
BitmapData._nhpot = function(a) {
  --a;
  for (var b = 1; 32 > b; b <<= 1) a |= a >> b;
  return a + 1;
};
function Bitmap(a) {
  DisplayObject.call(this);
  this.bitmapData = a;
}
Bitmap.prototype = new InteractiveObject();
Bitmap.prototype._getLocRect = function() {
  return this.bitmapData.rect;
};
Bitmap.prototype._render = function(a) {
  var b = this.bitmapData;
  b._loaded &&
    (b._dirty && b._syncWithGPU(),
    gl.uniformMatrix4fv(a._sprg.tMatUniform, !1, a._mstack.top()),
    a._cmstack.update(),
    iStage._setVC(b._vBuffer),
    iStage._setTC(b._tcBuffer),
    iStage._setUT(1),
    iStage._setTEX(b._texture),
    iStage._setEBF(a._unitIBuffer),
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0));
};
var gl;
function iStage(a) {
  DisplayObjectContainer.call(this);
  document.body.setAttribute("style", "margin:0; overflow:hidden");
  var b = document.createElement("meta");
  b.setAttribute("name", "viewport");
  b.setAttribute(
    "content",
    "width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0"
  );
  document.getElementsByTagName("head")[0].appendChild(b);
  this.stage = this;
  this.stageHeight = this.stageWidth = 0;
  this.focus = null;
  this._focii = [null, null, null];
  this._mousefocus = null;
  this._knM = !1;
  this._mstack = new iStage._MStack();
  this._cmstack = new iStage._CMStack();
  this._sprg = null;
  this._svec4_0 = Point._v4.create();
  this._svec4_1 = Point._v4.create();
  this._pmat = Point._m4.create([
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    1
  ]);
  this._umat = Point._m4.create([
    2,
    0,
    0,
    0,
    0,
    -2,
    0,
    0,
    0,
    0,
    2,
    0,
    -1,
    1,
    0,
    1
  ]);
  this._smat = Point._m4.create([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0.001,
    0,
    0,
    0,
    0,
    1
  ]);
  this._mcEvs = [
    new MouseEvent(MouseEvent.CLICK, !0),
    new MouseEvent(MouseEvent.MIDDLE_CLICK, !0),
    new MouseEvent(MouseEvent.RIGHT_CLICK, !0)
  ];
  this._mdEvs = [
    new MouseEvent(MouseEvent.MOUSE_DOWN, !0),
    new MouseEvent(MouseEvent.MIDDLE_MOUSE_DOWN, !0),
    new MouseEvent(MouseEvent.RIGHT_MOUSE_DOWN, !0)
  ];
  this._muEvs = [
    new MouseEvent(MouseEvent.MOUSE_UP, !0),
    new MouseEvent(MouseEvent.MIDDLE_MOUSE_UP, !0),
    new MouseEvent(MouseEvent.RIGHT_MOUSE_UP, !0)
  ];
  this._smd = [!1, !1, !1];
  this._smu = [!1, !1, !1];
  this._srs = this._smm = !1;
  this._touches = {};
  this._canvas = this.canvas = document.getElementById(a);
  iStage._main = this;
  b = {
    alpha: !0,
    antialias: 1 == window.devicePixelRatio ? !0 : !1,
    depth: !0,
    premultipliedAlpha: !0
  };
  a = this.canvas;
  (gl = a.getContext("webgl", b)) ||
    (gl = a.getContext("experimental-webgl", b));
  gl ||
    alert(
      "Could not initialize WebGL. Try to update your browser or graphic drivers."
    );
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);
  b = document;
  b.addEventListener("contextmenu", iStage._ctxt, !1);
  b.addEventListener("dragstart", iStage._blck, !1);
  a.addEventListener("touchstart", iStage._onTD, !1);
  a.addEventListener("touchmove", iStage._onTM, !1);
  a.addEventListener("touchend", iStage._onTU, !1);
  b.addEventListener("touchstart", iStage._blck, { passive: !1 });
  a.addEventListener("touchmove", iStage._blck, { passive: !1 });
  a.addEventListener("touchend", iStage._blck, { passive: !1 });
  a.addEventListener("mousedown", iStage._onMD, !1);
  a.addEventListener("mousemove", iStage._onMM, !1);
  a.addEventListener("mouseup", iStage._onMU, !1);
  a.addEventListener("mousemove", iStage._blck, !1);
  a.addEventListener("mouseup", iStage._blck, !1);
  b.addEventListener("keydown", iStage._onKD, !1);
  b.addEventListener("keyup", iStage._onKU, !1);
  b.addEventListener("keydown", iStage._blck, !1);
  b.addEventListener("keyup", iStage._blck, !1);
  window.addEventListener("resize", iStage._onRS, !1);
  this._initShaders();
  this._initBuffers();
  gl.clearColor(0, 0, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendEquation(gl.FUNC_ADD);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  this._resize();
  this._srs = !0;
  _requestAF(iStage._tick);
}
iStage.prototype = new DisplayObjectContainer();
iStage.prototype._getOrigin = function(a) {
  a[0] = this.stageWidth / 2;
  a[1] = this.stageHeight / 2;
  a[2] = -500;
  a[3] = 1;
};
iStage._mouseX = 0;
iStage._mouseY = 0;
iStage._curBF = -1;
iStage._curEBF = -1;
iStage._curVC = -1;
iStage._curTC = -1;
iStage._curUT = -1;
iStage._curTEX = -1;
iStage._curBMD = "normal";
iStage._setBF = function(a) {
  iStage._curBF != a && (gl.bindBuffer(gl.ARRAY_BUFFER, a), (iStage._curBF = a));
};
iStage._setEBF = function(a) {
  iStage._curEBF != a &&
    (gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, a), (iStage._curEBF = a));
};
iStage._setVC = function(a) {
  iStage._curVC != a &&
    (gl.bindBuffer(gl.ARRAY_BUFFER, a),
    gl.vertexAttribPointer(iStage._main._sprg.vpa, 3, gl.FLOAT, !1, 0, 0),
    (iStage._curVC = iStage._curBF = a));
};
iStage._setTC = function(a) {
  iStage._curTC != a &&
    (gl.bindBuffer(gl.ARRAY_BUFFER, a),
    gl.vertexAttribPointer(iStage._main._sprg.tca, 2, gl.FLOAT, !1, 0, 0),
    (iStage._curTC = iStage._curBF = a));
};
iStage._setUT = function(a) {
  iStage._curUT != a &&
    (gl.uniform1i(iStage._main._sprg.useTex, a), (iStage._curUT = a));
};
iStage._setTEX = function(a) {
  iStage._curTEX != a && (gl.bindTexture(gl.TEXTURE_2D, a), (iStage._curTEX = a));
};
iStage._setBMD = function(a) {
  iStage._curBMD != a &&
    (a == BlendMode.NORMAL
      ? (gl.blendEquation(gl.FUNC_ADD),
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA))
      : a == BlendMode.MULTIPLY
      ? (gl.blendEquation(gl.FUNC_ADD),
        gl.blendFunc(gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA))
      : a == BlendMode.ADD
      ? (gl.blendEquation(gl.FUNC_ADD), gl.blendFunc(gl.ONE, gl.ONE))
      : a == BlendMode.SUBTRACT
      ? (gl.blendEquationSeparate(gl.FUNC_REVERSE_SUBTRACT, gl.FUNC_ADD),
        gl.blendFunc(gl.ONE, gl.ONE))
      : a == BlendMode.SCREEN
      ? (gl.blendEquation(gl.FUNC_ADD),
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_COLOR))
      : a == BlendMode.ERASE
      ? (gl.blendEquation(gl.FUNC_ADD),
        gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_ALPHA))
      : a == BlendMode.ALPHA &&
        (gl.blendEquation(gl.FUNC_ADD), gl.blendFunc(gl.ZERO, gl.SRC_ALPHA)),
    (iStage._curBMD = a));
};
iStage._okKeys = [
  112,
  113,
  114,
  115,
  116,
  117,
  118,
  119,
  120,
  121,
  122,
  123,
  13,
  16,
  18,
  27
];
iStage._isTD = function() {
  return !!("ontouchstart" in window);
};
iStage._ctxt = function(a) {
  iStage._main.hasEventListener(MouseEvent.RIGHT_CLICK) && a.preventDefault();
};
iStage.prototype._getMakeTouch = function(a) {
  var b = this._touches["t" + a];
  null == b &&
    ((b = { touch: null, target: null, act: 0 }), (this._touches["t" + a] = b));
  return b;
};
iStage._onTD = function(a) {
  iStage._setiStageMouse(a.touches.item(0));
  iStage._main._smd[0] = !0;
  iStage._main._knM = !0;
  for (var b = iStage._main, c = 0; c < a.changedTouches.length; c++) {
    var d = a.changedTouches.item(c),
      e = b._getMakeTouch(d.identifier);
    e.touch = d;
    e.act = 1;
  }
  b._processMouseTouch();
};
iStage._onTM = function(a) {
  iStage._setiStageMouse(a.touches.item(0));
  iStage._main._smm = !0;
  iStage._main._knM = !0;
  for (var b = iStage._main, c = 0; c < a.changedTouches.length; c++) {
    var d = a.changedTouches.item(c),
      e = b._getMakeTouch(d.identifier);
    e.touch = d;
    e.act = 2;
  }
  b._processMouseTouch();
};
iStage._onTU = function(a) {
  iStage._main._smu[0] = !0;
  iStage._main._knM = !0;
  for (var b = iStage._main, c = 0; c < a.changedTouches.length; c++) {
    var d = a.changedTouches.item(c),
      e = b._getMakeTouch(d.identifier);
    e.touch = d;
    e.act = 3;
  }
  b._processMouseTouch();
};
iStage._onMD = function(a) {
  iStage._setiStageMouse(a);
  iStage._main._smd[a.button] = !0;
  iStage._main._knM = !0;
  iStage._main._processMouseTouch();
};
iStage._onMM = function(a) {
  iStage._setiStageMouse(a);
  iStage._main._smm = !0;
  iStage._main._knM = !0;
  iStage._main._processMouseTouch();
};
iStage._onMU = function(a) {
  iStage._main._smu[a.button] = !0;
  iStage._main._knM = !0;
  iStage._main._processMouseTouch();
};
iStage._onKD = function(a) {
  var b = iStage._main,
    c = new KeyboardEvent(KeyboardEvent.KEY_DOWN, !0);
  c._setFromDom(a);
  b.focus && b.focus.stage ? b.focus.dispatchEvent(c) : b.dispatchEvent(c);
};
iStage._onKU = function(a) {
  var b = iStage._main,
    c = new KeyboardEvent(KeyboardEvent.KEY_UP, !0);
  c._setFromDom(a);
  b.focus && b.focus.stage ? b.focus.dispatchEvent(c) : b.dispatchEvent(c);
};
iStage._blck = function(a) {
  null != a.keyCode
    ? "textarea" != a.target.tagName.toLowerCase() &&
      -1 == iStage._okKeys.indexOf(a.keyCode) &&
      a.preventDefault()
    : a.preventDefault();
};
iStage._onRS = function(a) {
  iStage._main._srs = !0;
};
iStage._getDPR = function() {
  return window.devicePixelRatio || 1;
};
iStage.prototype._resize = function() {
  var a = iStage._getDPR(),
    b = window.innerWidth * a;
  a *= window.innerHeight;
  this._canvas.style.width = window.innerWidth + "px";
  this._canvas.style.height = window.innerHeight + "px";
  this.stageWidth = b;
  this.stageHeight = a;
  this._canvas.width = b;
  this._canvas.height = a;
  this._setFramebuffer(null, b, a, !1);
};
iStage.prototype._getShader = function(a, b, c) {
  c = c ? a.createShader(a.FRAGMENT_SHADER) : a.createShader(a.VERTEX_SHADER);
  a.shaderSource(c, b);
  a.compileShader(c);
  return a.getShaderParameter(c, a.COMPILE_STATUS)
    ? c
    : (alert(a.getShaderInfoLog(c)), null);
};
iStage.prototype._initShaders = function() {
  var a = this._getShader(
      gl,
      "\t\t\tprecision mediump float;\t\t\tvarying vec2 texCoord;\t\t\t\t\t\tuniform sampler2D uSampler;\t\t\tuniform vec4 color;\t\t\tuniform bool useTex;\t\t\t\t\t\tuniform mat4 cMat;\t\t\tuniform vec4 cVec;\t\t\t\t\t\tvoid main(void) {\t\t\t\tvec4 c;\t\t\t\tif(useTex) { c = texture2D(uSampler, texCoord);  c.xyz *= (c.w==0.0?0.0:(1.0/c.w)); }\t\t\t\telse c = color;\t\t\t\tc = (cMat*c)+cVec;\n\t\t\t\tc.xyz *= min(c.w, 1.0);\n\t\t\t\tgl_FragColor = c;\t\t\t}",
      !0
    ),
    b = this._getShader(
      gl,
      "\t\t\tattribute vec3 verPos;\t\t\tattribute vec2 texPos;\t\t\t\t\t\tuniform mat4 tMat;\t\t\t\t\t\tvarying vec2 texCoord;\t\t\t\t\t\tvoid main(void) {\t\t\t\tgl_Position = tMat * vec4(verPos, 1.0);\t\t\t\ttexCoord = texPos;\t\t\t}",
      !1
    );
  this._sprg = gl.createProgram();
  gl.attachShader(this._sprg, b);
  gl.attachShader(this._sprg, a);
  gl.linkProgram(this._sprg);
  gl.getProgramParameter(this._sprg, gl.LINK_STATUS) ||
    alert("Could not initialise shaders");
  gl.useProgram(this._sprg);
  this._sprg.vpa = gl.getAttribLocation(this._sprg, "verPos");
  this._sprg.tca = gl.getAttribLocation(this._sprg, "texPos");
  gl.enableVertexAttribArray(this._sprg.tca);
  gl.enableVertexAttribArray(this._sprg.vpa);
  this._sprg.tMatUniform = gl.getUniformLocation(this._sprg, "tMat");
  this._sprg.cMatUniform = gl.getUniformLocation(this._sprg, "cMat");
  this._sprg.cVecUniform = gl.getUniformLocation(this._sprg, "cVec");
  this._sprg.samplerUniform = gl.getUniformLocation(this._sprg, "uSampler");
  this._sprg.useTex = gl.getUniformLocation(this._sprg, "useTex");
  this._sprg.color = gl.getUniformLocation(this._sprg, "color");
};
iStage.prototype._initBuffers = function() {
  this._unitIBuffer = gl.createBuffer();
  iStage._setEBF(this._unitIBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([0, 1, 2, 1, 2, 3]),
    gl.STATIC_DRAW
  );
};
iStage.prototype._setFramebuffer = function(a, b, c, d) {
  this._mstack.clear();
  this._mstack.push(this._pmat, 0);
  d
    ? ((this._umat[5] = 2), (this._umat[13] = -1))
    : ((this._umat[5] = -2), (this._umat[13] = 1));
  this._mstack.push(this._umat);
  this._smat[0] = 1 / b;
  this._smat[5] = 1 / c;
  this._mstack.push(this._smat);
  gl.bindFramebuffer(gl.FRAMEBUFFER, a);
  a && gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, b, c);
  gl.viewport(0, 0, b, c);
};
iStage._setiStageMouse = function(a) {
  var b = iStage._getDPR();
  iStage._mouseX = a.clientX * b;
  iStage._mouseY = a.clientY * b;
};
iStage.prototype._drawScene = function() {
  this._srs &&
    (this._resize(),
    this.dispatchEvent(new Event(Event.RESIZE)),
    (this._srs = !1));
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  for (
    var a = EventDispatcher.efbc, b = new Event(Event.ENTER_FRAME, !1), c = 0;
    c < a.length;
    c++
  )
    (b.target = a[c]), a[c].dispatchEvent(b);
  this._renderAll(this);
};
iStage.prototype._processMouseTouch = function() {
  if (this._knM) {
    var a = this._svec4_0;
    this._getOrigin(a);
    var b = this._svec4_1;
    b[0] = iStage._mouseX;
    b[1] = iStage._mouseY;
    b[2] = 0;
    b[3] = 1;
    b = this._getTarget(a, b);
    var c = this._mousefocus || this;
    a = b || this;
    if (b != this._mousefocus) {
      if (c != this) {
        var d = new MouseEvent(MouseEvent.MOUSE_OUT, !0);
        d.target = c;
        c.dispatchEvent(d);
      }
      a != this &&
        ((d = new MouseEvent(MouseEvent.MOUSE_OVER, !0)),
        (d.target = a),
        a.dispatchEvent(d));
    }
    this._smd[0] && this.focus && b != this.focus && this.focus._loseFocus();
    for (var e = 0; 3 > e; e++)
      (this._mcEvs[e].target = this._mdEvs[e].target = this._muEvs[
        e
      ].target = a),
        this._smd[e] &&
          (a.dispatchEvent(this._mdEvs[e]), (this._focii[e] = this.focus = b)),
        this._smu[e] &&
          (a.dispatchEvent(this._muEvs[e]),
          b == this._focii[e] && a.dispatchEvent(this._mcEvs[e])),
        (this._smd[e] = this._smu[e] = !1);
    this._smm &&
      ((d = new MouseEvent(MouseEvent.MOUSE_MOVE, !0)),
      (d.target = a),
      a.dispatchEvent(d),
      (this._smm = !1));
    this._mousefocus = b;
    e = !1;
    for (var f = a; null != f.parent; ) (e |= f.buttonMode), (f = f.parent);
    e = e ? "pointer" : "default";
    a instanceof TextField && a.selectable && (e = "text");
    this._canvas.style.cursor = e;
  }
  e = iStage._getDPR();
  for (var g in this._touches)
    (f = this._touches[g]),
      0 != f.act &&
        ((a = this._svec4_0),
        this._getOrigin(a),
        (b = this._svec4_1),
        (b[0] = f.touch.clientX * e),
        (b[1] = f.touch.clientY * e),
        (b[2] = 0),
        (b[3] = 1),
        (b = this._getTarget(a, b)),
        (c = f.target || this),
        (a = b || this),
        b != f.target &&
          (c != this &&
            ((d = new TouchEvent(TouchEvent.TOUCH_OUT, !0)),
            d._setFromDom(f.touch),
            (d.target = c),
            c.dispatchEvent(d)),
          a != this &&
            ((d = new TouchEvent(TouchEvent.TOUCH_OVER, !0)),
            d._setFromDom(f.touch),
            (d.target = a),
            a.dispatchEvent(d))),
        1 == f.act && (d = new TouchEvent(TouchEvent.TOUCH_BEGIN, !0)),
        2 == f.act && (d = new TouchEvent(TouchEvent.TOUCH_MOVE, !0)),
        3 == f.act && (d = new TouchEvent(TouchEvent.TOUCH_END, !0)),
        d._setFromDom(f.touch),
        (d.target = a),
        a.dispatchEvent(d),
        3 == f.act &&
          b == f.target &&
          ((d = new TouchEvent(TouchEvent.TOUCH_TAP, !0)),
          d._setFromDom(f.touch),
          (d.target = a),
          a.dispatchEvent(d)),
        (f.act = 0),
        (f.target = 3 == f.act ? null : b));
};
iStage._tick = function() {
  _requestAF(iStage._tick);
  iStage.prototype._drawScene.call(iStage._main);
};
iStage._MStack = function() {
  this.mats = [];
  this.size = 1;
  for (var a = 0; 30 > a; a++) this.mats.push(Point._m4.create());
};
iStage._MStack.prototype.clear = function() {
  this.size = 1;
};
iStage._MStack.prototype.push = function(a) {
  var b = this.size++;
  Point._m4.multiply(this.mats[b - 1], a, this.mats[b]);
};
iStage._MStack.prototype.pop = function() {
  this.size--;
};
iStage._MStack.prototype.top = function() {
  return this.mats[this.size - 1];
};
iStage._CMStack = function() {
  this.mats = [];
  this.vecs = [];
  this.isID = [];
  this.bmds = [];
  this.lnnm = [];
  this.size = 1;
  this.dirty = !0;
  for (var a = 0; 30 > a; a++)
    this.mats.push(Point._m4.create()),
      this.vecs.push(new Float32Array(4)),
      this.isID.push(!0),
      this.bmds.push(BlendMode.NORMAL),
      this.lnnm.push(0);
};
iStage._CMStack.prototype.push = function(a, b, c, d) {
  var e = this.size++;
  (this.isID[e] = c)
    ? (Point._m4.set(this.mats[e - 1], this.mats[e]),
      Point._v4.set(this.vecs[e - 1], this.vecs[e]))
    : (Point._m4.multiply(this.mats[e - 1], a, this.mats[e]),
      Point._m4.multiplyVec4(this.mats[e - 1], b, this.vecs[e]),
      Point._v4.add(this.vecs[e - 1], this.vecs[e], this.vecs[e]));
  c || (this.dirty = !0);
  this.bmds[e] = d;
  this.lnnm[e] = d == BlendMode.NORMAL ? this.lnnm[e - 1] : e;
};
iStage._CMStack.prototype.update = function() {
  if (this.dirty) {
    var a = iStage._main,
      b = this.size - 1;
    gl.uniformMatrix4fv(a._sprg.cMatUniform, !1, this.mats[b]);
    gl.uniform4fv(a._sprg.cVecUniform, this.vecs[b]);
    this.dirty = !1;
  }
  iStage._setBMD(this.bmds[this.lnnm[this.size - 1]]);
};
iStage._CMStack.prototype.pop = function() {
  this.isID[this.size - 1] || (this.dirty = !0);
  this.size--;
};
function Graphics() {
  this._conf = {
    ftype: 0,
    fbdata: null,
    fcolor: null,
    lwidth: 0,
    lcolor: null
  };
  this._points = [0, 0];
  this._fills = [];
  this._afills = [];
  this._lfill = null;
  this._rect = new Rectangle(0, 0, 0, 0);
  this._srect = new Rectangle(0, 0, 0, 0);
  this._startNewFill();
}
Graphics._delTgs = {};
Graphics._delNum = 0;
Graphics.prototype._startNewFill = function() {
  this._endLine();
  var a = new Graphics.Fill(this._points.length / 2 - 1, this._conf);
  this._fills.push(a);
  this._afills.push(a);
  this._lfill = a;
};
Graphics.prototype._startLine = function() {
  var a = this._points.length / 2,
    b = this._fills[this._fills.length - 1],
    c = b.lines.length;
  0 < c && b.lines[c - 1].isEmpty()
    ? b.lines[c - 1].Set(a - 1, this._conf)
    : b.lines.push(new Graphics.Line(a - 1, this._conf));
};
Graphics.prototype._endLine = function() {
  if (0 != this._fills.length) {
    var a = this._points.length / 2,
      b = this._fills[this._fills.length - 1];
    0 != b.lines.length && (b.lines[b.lines.length - 1].end = a - 1);
  }
};
Graphics.prototype._render = function(a) {
  this._endLine();
  gl.uniformMatrix4fv(a._sprg.tMatUniform, !1, a._mstack.top());
  a._cmstack.update();
  for (var b = 0; b < this._afills.length; b++)
    this._afills[b].render(a, this._points, this._rect);
};
Graphics.prototype.lineStyle = function(a, b, c) {
  b || (b = 0);
  c || (c = 1);
  this._conf.lwidth = a;
  this._conf.lcolor = Graphics.makeColor(b, c);
  this._endLine();
  this._startLine();
};
Graphics.prototype.beginFill = function(a, b) {
  null == b && (b = 1);
  this._conf.ftype = 1;
  this._conf.fcolor = Graphics.makeColor(a, b);
  this._startNewFill();
};
Graphics.prototype.beginBitmapFill = function(a) {
  this._conf.ftype = 2;
  this._conf.fbdata = a;
  this._startNewFill();
};
Graphics.prototype.endFill = function() {
  this._conf.ftype = 0;
  this._startNewFill();
};
Graphics.prototype.moveTo = function(a, b) {
  this._endLine();
  this._points.push(a, b);
  this._startLine();
};
Graphics.prototype.lineTo = function(a, b) {
  var c = this._points;
  if (a != c[c.length - 2] || b != c[c.length - 1])
    0 < c.length &&
      0 < this._conf.ftype &&
      this._rect._unionWL(c[c.length - 2], c[c.length - 1], a, b),
      0 < this._conf.lwidth &&
        this._srect._unionWL(c[c.length - 2], c[c.length - 1], a, b),
      c.push(a, b);
};
Graphics.prototype.curveTo = function(a, b, c, d) {
  var e = this._points,
    f = e[e.length - 2];
  e = e[e.length - 1];
  var g = 2 / 3;
  this.cubicCurveTo(
    f + g * (a - f),
    e + g * (b - e),
    c + g * (a - c),
    d + g * (b - d),
    c,
    d
  );
};
Graphics.prototype.cubicCurveTo = function(a, b, c, d, e, f, g) {
  g || (g = 40);
  var h = this._points,
    k = h[h.length - 2];
  h = h[h.length - 1];
  for (
    var l = a - k,
      m = b - h,
      n = c - a,
      p = d - b,
      t = e - c,
      q = f - d,
      x = 1 / g,
      z = 1;
    z < g;
    z++
  ) {
    var y = z * x,
      r = k + y * l,
      u = h + y * m,
      v = a + y * n,
      w = b + y * p;
    r += y * (v - r);
    u += y * (w - u);
    this.lineTo(
      r + y * (v + y * (c + y * t - v) - r),
      u + y * (w + y * (d + y * q - w) - u)
    );
  }
  this.lineTo(e, f);
};
Graphics.prototype.drawCircle = function(a, b, c) {
  this.drawEllipse(a, b, 2 * c, 2 * c);
};
Graphics.prototype.drawEllipse = function(a, b, c, d) {
  c /= 2;
  d /= 2;
  this.moveTo(a, b - d);
  this.cubicCurveTo(a + 0.553 * c, b - d, a + c, b - 0.553 * d, a + c, b, 16);
  this.cubicCurveTo(a + c, b + 0.553 * d, a + 0.553 * c, b + d, a, b + d, 16);
  this.cubicCurveTo(a - 0.553 * c, b + d, a - c, b + 0.553 * d, a - c, b, 16);
  this.cubicCurveTo(a - c, b - 0.553 * d, a - 0.553 * c, b - d, a, b - d, 16);
};
Graphics.prototype.drawRect = function(a, b, c, d) {
  this.moveTo(a, b);
  this.lineTo(a + c, b);
  this.lineTo(a + c, b + d);
  this.lineTo(a, b + d);
  this.lineTo(a, b);
};
Graphics.prototype.drawRoundRect = function(a, b, c, d, e, f) {
  e /= 2;
  f /= 2;
  var g = a + e,
    h = a + c - e,
    k = b + f,
    l = b + d - f;
  this.moveTo(g, b);
  this.lineTo(h, b);
  this.cubicCurveTo(h + 0.553 * e, b, a + c, k - 0.553 * f, a + c, k, 16);
  this.lineTo(a + c, l);
  this.cubicCurveTo(a + c, l + 0.553 * f, h + 0.553 * e, b + d, h, b + d, 16);
  this.lineTo(g, b + d);
  this.cubicCurveTo(g - 0.553 * e, b + d, a, l + 0.553 * f, a, l, 16);
  this.lineTo(a, k);
  this.cubicCurveTo(a, k - 0.553 * f, g - 0.553 * e, b, g, b, 16);
};
Graphics.prototype.drawTriangles = function(a, b, c) {
  Graphics.Fill.updateRect(a, this._rect);
  for (var d = [], e = 0; e < a.length; e += 2) d.push(a[e], a[e + 1], 0);
  a = Graphics._makeTgs(d, b, c, this._conf.fcolor, this._conf.fbdata);
  this._afills.push(a);
  this._lfill = a;
};
Graphics.prototype.drawTriangles3D = function(a, b, c) {
  a = Graphics._makeTgs(a, b, c, this._conf.fcolor, this._conf.fbdata);
  this._afills.push(a);
  this._lfill = a;
};
Graphics.prototype.clear = function() {
  this._conf.ftype = 0;
  this._conf.bdata = null;
  this._conf.fcolor = null;
  this._conf.lwidth = 0;
  this._points = [0, 0];
  this._fills = [];
  for (var a = 0; a < this._afills.length; a++) {
    var b = this._afills[a];
    if (b instanceof Graphics.Fill) {
      b.tgs && Graphics._freeTgs(b.tgs);
      for (var c = 0; c < b.lineTGS.length; c++)
        Graphics._freeTgs(b.lineTGS[c]);
    } else Graphics._freeTgs(b);
  }
  this._afills = [];
  this._lfill = null;
  this._rect.setEmpty();
  this._startNewFill();
};
Graphics.prototype._getLocRect = function(a) {
  return 0 == a ? this._rect : this._rect.union(this._srect);
};
Graphics.prototype._hits = function(a, b) {
  return this._rect.contains(a, b);
};
Graphics.makeColor = function(a, b) {
  var c = new Float32Array(4);
  c[0] = 0.0039215686 * ((a >> 16) & 255);
  c[1] = 0.0039215686 * ((a >> 8) & 255);
  c[2] = 0.0039215686 * (a & 255);
  c[3] = b;
  return c;
};
Graphics.equalColor = function(a, b) {
  return a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3];
};
Graphics.len = function(a, b) {
  return Math.sqrt(a * a + b * b);
};
Graphics.Fill = function(a, b) {
  this.type = b.ftype;
  this.color = b.fcolor;
  this.bdata = b.fbdata;
  this.lines = [new Graphics.Line(a, b)];
  this.lineTGS = [];
  this.dirty = !0;
  this.tgs = null;
};
Graphics.Fill.prototype.Build = function(a, b) {
  for (
    var c = [], d = [], e = [], f = null, g = -1, h = null, k = 0;
    k < this.lines.length;
    k++
  ) {
    var l = this.lines[k];
    if (l.begin != l.end) {
      var m = 2 * l.begin,
        n = 2 * l.end,
        p = a[m] == a[n] && a[m + 1] == a[n + 1];
      p && (n -= 2);
      0 < l.width &&
        ((null != f && l.width == g && Graphics.equalColor(h, l.color)) ||
          ((f = { vrt: [], ind: [], color: l.color }),
          e.push(f),
          (g = l.width),
          (h = l.color)),
        Graphics.Line.GetTriangles(
          a,
          m,
          n,
          l,
          0 != this.type || p,
          f.ind,
          f.vrt
        ));
      if (0 != this.type && 2 < n - m) {
        l = a.slice(2 * l.begin, 2 * l.end + 2);
        p && (l.pop(), l.pop());
        0 > Graphics.PolyK.GetArea(l) && (l = Graphics.PolyK.Reverse(l));
        p = c.length / 3;
        m = Graphics.PolyK.Triangulate(l);
        for (n = 0; n < m.length; n++) d.push(m[n] + p);
        for (n = 0; n < l.length / 2; n++) c.push(l[2 * n], l[2 * n + 1], 0);
      }
    }
  }
  for (n = 0; n < e.length; n++)
    this.lineTGS.push(Graphics._makeTgs(e[n].vrt, e[n].ind, null, e[n].color));
  0 < c.length &&
    (this.tgs = Graphics._makeTgs(c, d, null, this.color, this.bdata));
};
Graphics.Fill.prototype.isEmpty = function() {
  return 0 == this.lines.length ? !0 : this.lines[0].isEmpty();
};
Graphics.Fill.prototype.render = function(a, b, c) {
  this.dirty && (this.Build(b, c), (this.dirty = !1));
  this.tgs && this.tgs.render(a);
  for (b = 0; b < this.lineTGS.length; b++) this.lineTGS[b].render(a);
};
Graphics.Fill.updateRect = function(a, b) {
  var c = Infinity,
    d = Infinity,
    e = -Infinity,
    f = -Infinity;
  b.isEmpty() ||
    ((c = b.x), (d = b.y), (e = b.x + b.width), (f = b.y + b.height));
  for (var g = 0; g < a.length; g += 2)
    (c = Math.min(c, a[g])),
      (d = Math.min(d, a[g + 1])),
      (e = Math.max(e, a[g])),
      (f = Math.max(f, a[g + 1]));
  b.x = c;
  b.y = d;
  b.width = e - c;
  b.height = f - d;
};
Graphics.Line = function(a, b) {
  this.begin = a;
  this.end = -1;
  this.width = b.lwidth;
  this.color = b.lcolor;
};
Graphics.Line.prototype.Set = function(a, b) {
  this.begin = a;
  this.end = -1;
  this.width = b.lwidth;
  this.color = b.lcolor;
};
Graphics.Line.prototype.isEmpty = function() {
  return this.begin == this.end;
};
Graphics.Line.GetTriangles = function(a, b, c, d, e, f, g) {
  var h = g.length / 3,
    k = c - b - 2;
  e
    ? Graphics.Line.AddJoint(a, c, b, b + 2, d.width, g)
    : Graphics.Line.AddEnd(a, b, b + 2, !0, d.width, g);
  for (c = 0; c < k; c += 2)
    Graphics.Line.AddJoint(a, b + c, b + c + 2, b + c + 4, d.width, g),
      f.push(h + c + 0, h + c + 1, h + c + 2, h + c + 1, h + c + 2, h + c + 3);
  e
    ? (Graphics.Line.AddJoint(a, b + k, b + k + 2, b, d.width, g),
      f.push(h + k + 0, h + k + 1, h + k + 2, h + k + 1, h + k + 2, h + k + 3),
      f.push(h + k + 2, h + k + 3, h + 0, h + k + 3, h + 0, h + 1))
    : (Graphics.Line.AddEnd(a, b + k, b + k + 2, !1, d.width, g),
      f.push(h + 0 + k, h + 1 + k, h + 2 + k, h + 1 + k, h + 2 + k, h + 3 + k));
};
Graphics.Line.AddEnd = function(a, b, c, d, e, f) {
  var g = a[b];
  b = a[b + 1];
  var h = a[c];
  a = a[c + 1];
  e = (0.5 * e) / Graphics.len(g - h, b - a);
  c = e * (b - a);
  dy = -e * (g - h);
  d
    ? f.push(g + c, b + dy, 0, g - c, b - dy, 0)
    : f.push(h + c, a + dy, 0, h - c, a - dy, 0);
};
Graphics.Line.AddJoint = function(a, b, c, d, e, f) {
  var g = new Point(),
    h = new Point(),
    k = new Point(),
    l = new Point(),
    m = new Point(),
    n = a[b];
  b = a[b + 1];
  var p = a[c];
  c = a[c + 1];
  var t = a[d];
  a = a[d + 1];
  var q = (0.5 * e) / Graphics.len(n - p, b - c);
  d = (0.5 * e) / Graphics.len(p - t, c - a);
  e = q * (b - c);
  q = -q * (n - p);
  var x = d * (c - a);
  d = -d * (p - t);
  1e-7 > Math.abs(e - x) + Math.abs(q - d)
    ? (f.push(p + e, c + q, 0), f.push(p - e, c - q, 0))
    : (g.setTo(n + e, b + q),
      h.setTo(p + e, c + q),
      k.setTo(p + x, c + d),
      l.setTo(t + x, a + d),
      Graphics.PolyK._GetLineIntersection(g, h, k, l, m),
      f.push(m.x, m.y, 0),
      g.setTo(n - e, b - q),
      h.setTo(p - e, c - q),
      k.setTo(p - x, c - d),
      l.setTo(t - x, a - d),
      Graphics.PolyK._GetLineIntersection(g, h, k, l, m),
      f.push(m.x, m.y, 0));
};
Graphics._makeTgs = function(a, b, c, d, e) {
  var f = Graphics._delTgs["t_" + a.length + "_" + b.length];
  if (null == f || 0 == f.length) return new Graphics.Tgs(a, b, c, d, e);
  f = f.pop();
  Graphics._delNum--;
  f.Set(a, b, c, d, e);
  return f;
};
Graphics._freeTgs = function(a) {
  var b = Graphics._delTgs[a.name];
  null == b && (b = []);
  b.push(a);
  Graphics._delNum++;
  Graphics._delTgs[a.name] = b;
};
Graphics.Tgs = function(a, b, c, d, e) {
  this.color = d;
  this.bdata = e;
  this.name = "t_" + a.length + "_" + b.length;
  this.useTex = null != e;
  this.dirtyUVT = !0;
  this.emptyUVT = null == c;
  (this.useIndex = 65536 >= a.length / 3)
    ? ((this.ind = new Uint16Array(b)),
      (this.vrt = new Float32Array(a)),
      (this.uvt = c
        ? new Float32Array(c)
        : new Float32Array((2 * a.length) / 3)),
      (this.ibuf = gl.createBuffer()),
      iStage._setEBF(this.ibuf),
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.ind, gl.STATIC_DRAW))
    : ((this.vrt = new Float32Array(3 * b.length)),
      Graphics.Tgs.unwrapF32(b, a, 3, this.vrt),
      (this.uvt = new Float32Array(2 * b.length)),
      c && Graphics.Tgs.unwrapF32(b, c, 2, this.uvt));
  this.vbuf = gl.createBuffer();
  iStage._setBF(this.vbuf);
  gl.bufferData(gl.ARRAY_BUFFER, this.vrt, gl.STATIC_DRAW);
  this.tbuf = gl.createBuffer();
  iStage._setBF(this.tbuf);
  gl.bufferData(gl.ARRAY_BUFFER, this.uvt, gl.STATIC_DRAW);
};
Graphics.Tgs.prototype.Set = function(a, b, c, d, e) {
  this.color = d;
  this.bdata = e;
  this.useTex = null != e;
  this.dirtyUVT = !0;
  this.emptyUVT = null == c;
  if (this.useIndex) {
    d = b.length;
    e = a.length;
    for (var f = 0; f < d; f++) this.ind[f] = b[f];
    for (f = 0; f < e; f++) this.vrt[f] = a[f];
    if (c) for (f = 0; f < c.length; f++) this.uvt[f] = c[f];
    iStage._setEBF(this.ibuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.ind, gl.STATIC_DRAW);
  } else
    Graphics.Tgs.unwrapF32(b, a, 3, this.vrt),
      c && Graphics.Tgs.unwrapF32(b, c, 2, this.uvt);
  iStage._setBF(this.vbuf);
  gl.bufferData(gl.ARRAY_BUFFER, this.vrt, gl.STATIC_DRAW);
  iStage._setBF(this.tbuf);
  gl.bufferData(gl.ARRAY_BUFFER, this.uvt, gl.STATIC_DRAW);
};
Graphics.Tgs.prototype.render = function(a) {
  if (this.useTex) {
    a = this.bdata;
    if (0 == a._loaded) return;
    a._dirty && a._syncWithGPU();
    if (this.dirtyUVT) {
      this.dirtyUVT = !1;
      if (this.emptyUVT) {
        this.emptyUVT = !1;
        for (
          var b = 1 / a._rwidth, c = 1 / a._rheight, d = 0;
          d < this.uvt.length;
          d++
        )
          (this.uvt[2 * d] = b * this.vrt[3 * d]),
            (this.uvt[2 * d + 1] = c * this.vrt[3 * d + 1]);
      } else if (a.width != a._rwidth || a.height != a._rheight)
        for (
          b = a.width / a._rwidth, c = a.height / a._rheight, d = 0;
          d < this.uvt.length;
          d++
        )
          (this.uvt[2 * d] *= b), (this.uvt[2 * d + 1] *= c);
      iStage._setBF(this.tbuf);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.uvt);
    }
    iStage._setUT(1);
    iStage._setTEX(a._texture);
  } else iStage._setUT(0), gl.uniform4fv(a._sprg.color, this.color);
  iStage._setTC(this.tbuf);
  iStage._setVC(this.vbuf);
  this.useIndex
    ? (iStage._setEBF(this.ibuf),
      gl.drawElements(gl.TRIANGLES, this.ind.length, gl.UNSIGNED_SHORT, 0))
    : gl.drawArrays(gl.TRIANGLES, 0, this.vrt.length / 3);
};
Graphics.Tgs.unwrapF32 = function(a, b, c, d) {
  for (var e = a.length, f = 0; f < e; f++)
    for (var g = 0; g < c; g++) d[f * c + g] = b[a[f] * c + g];
};
Graphics.PolyK = {};
Graphics.PolyK.Triangulate = function(a) {
  var b = a.length >> 1;
  if (3 > b) return [];
  var c = [];
  if (Graphics.PolyK.IsConvex(a)) {
    for (var d = 1; d < b - 1; d++) c.push(0, d, d + 1);
    return c;
  }
  var e = [];
  for (d = 0; d < b; d++) e.push(d);
  for (d = 0; 3 < b; ) {
    var f = e[(d + 0) % b],
      g = e[(d + 1) % b],
      h = e[(d + 2) % b],
      k = a[2 * f],
      l = a[2 * f + 1],
      m = a[2 * g],
      n = a[2 * g + 1],
      p = a[2 * h],
      t = a[2 * h + 1],
      q = !1;
    if (Graphics.PolyK._convex(k, l, m, n, p, t)) {
      q = !0;
      for (var x = 0; x < b; x++) {
        var z = e[x];
        if (
          z != f &&
          z != g &&
          z != h &&
          Graphics.PolyK._PointInTriangle(
            a[2 * z],
            a[2 * z + 1],
            k,
            l,
            m,
            n,
            p,
            t
          )
        ) {
          q = !1;
          break;
        }
      }
    }
    if (q) c.push(f, g, h), e.splice((d + 1) % b, 1), b--, (d = 0);
    else if (d++ > 3 * b) break;
  }
  c.push(e[0], e[1], e[2]);
  return c;
};
Graphics.PolyK.IsConvex = function(a) {
  if (6 > a.length) return !0;
  for (var b = a.length - 4, c = 0; c < b; c += 2)
    if (
      !Graphics.PolyK._convex(
        a[c],
        a[c + 1],
        a[c + 2],
        a[c + 3],
        a[c + 4],
        a[c + 5]
      )
    )
      return !1;
  return Graphics.PolyK._convex(
    a[b],
    a[b + 1],
    a[b + 2],
    a[b + 3],
    a[0],
    a[1]
  ) && Graphics.PolyK._convex(a[b + 2], a[b + 3], a[0], a[1], a[2], a[3])
    ? !0
    : !1;
};
Graphics.PolyK._convex = function(a, b, c, d, e, f) {
  return 0 <= (b - d) * (e - c) + (c - a) * (f - d);
};
Graphics.PolyK._PointInTriangle = function(a, b, c, d, e, f, g, h) {
  g -= c;
  h -= d;
  e -= c;
  f -= d;
  a -= c;
  c = b - d;
  b = g * g + h * h;
  d = g * e + h * f;
  g = g * a + h * c;
  h = e * e + f * f;
  e = e * a + f * c;
  f = 1 / (b * h - d * d);
  h = (h * g - d * e) * f;
  g = (b * e - d * g) * f;
  return 0 <= h && 0 <= g && 1 > h + g;
};
Graphics.PolyK._GetLineIntersection = function(a, b, c, d, e) {
  var f = a.x - b.x,
    g = c.x - d.x,
    h = a.y - b.y,
    k = c.y - d.y,
    l = f * k - h * g;
  if (0 == l) return null;
  a = a.x * b.y - a.y * b.x;
  c = c.x * d.y - c.y * d.x;
  e.x = (a * g - f * c) / l;
  e.y = (a * k - h * c) / l;
};
Graphics.PolyK.GetArea = function(a) {
  if (6 > a.length) return 0;
  for (var b = a.length - 2, c = 0, d = 0; d < b; d += 2)
    c += (a[d + 2] - a[d]) * (a[d + 1] + a[d + 3]);
  c += (a[0] - a[b]) * (a[b + 1] + a[1]);
  return 0.5 * -c;
};
Graphics.PolyK.Reverse = function(a) {
  for (var b = [], c = a.length - 2; 0 <= c; c -= 2) b.push(a[c], a[c + 1]);
  return b;
};
function Sprite() {
  DisplayObjectContainer.call(this);
  this._trect2 = new Rectangle();
  this.graphics = new Graphics();
}
Sprite.prototype = new DisplayObjectContainer();
Sprite.prototype._getRect = function(a, b, c) {
  var d = DisplayObjectContainer.prototype._getRect.call(this, a, b, c);
  c = this.graphics._getLocRect(c);
  Point._m4.multiply(a, this._getATMat(), this._tempm);
  this._transfRect(this._tempm, b, c, this._trect2);
  return d.union(this._trect2);
};
Sprite.prototype._render = function(a) {
  this.graphics._render(a);
  DisplayObjectContainer.prototype._render.call(this, a);
};
Sprite.prototype._getTarget = function(a, b) {
  if (!this.visible || (!this.mouseChildren && !this.mouseEnabled)) return null;
  var c = DisplayObjectContainer.prototype._getTarget.call(this, a, b);
  if (null != c) return c;
  if (!this.mouseEnabled) return null;
  c = this._tvec4_0;
  var d = this._tvec4_1,
    e = this.transform._getIMat();
  Point._m4.multiplyVec4(e, a, c);
  Point._m4.multiplyVec4(e, b, d);
  e = this._tempP;
  this._lineIsc(c, d, e);
  return this.graphics._hits(e.x, e.y) ? this : null;
};
Sprite.prototype._htpLocal = function(a, b) {
  var c = this._tempP;
  this._lineIsc(a, b, c);
  return this.graphics._hits(c.x, c.y)
    ? !0
    : DisplayObjectContainer.prototype._htpLocal.call(this, a, b);
};
var TextFormatAlign = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
  JUSTIFY: "justify"
};
function TextFormat(a, b, c, d, e, f, g) {
  this.font = a ? a : "Times New Roman";
  this.size = b ? b : 12;
  this.color = c ? c : 0;
  this.bold = d ? d : !1;
  this.italic = e ? e : !1;
  this.align = f ? f : TextFormatAlign.LEFT;
  this.leading = g ? g : 0;
  this.maxW = 0;
  this.data = { image: null, tw: 0, th: 0, rw: 0, rh: 0 };
}
TextFormat.prototype.clone = function() {
  return new TextFormat(
    this.font,
    this.size,
    this.color,
    this.bold,
    this.italic,
    this.align,
    this.leading
  );
};
TextFormat.prototype.set = function(a) {
  this.font = a.font;
  this.size = a.size;
  this.color = a.color;
  this.bold = a.bold;
  this.italic = a.italic;
  this.align = a.align;
  this.leading = a.leading;
};
TextFormat.prototype.setContext = function(a) {
  var b = this.color;
  a.textBaseline = "top";
  a.fillStyle = a.strokeStyle =
    "rgb(" + ((b >> 16) & 255) + "," + ((b >> 8) & 255) + "," + (b & 255) + ")";
  a.font =
    (this.italic ? "italic " : "") +
    (this.bold ? "bold " : "") +
    this.size +
    "px " +
    this.font;
};
TextFormat.prototype.getImageData = function(a, b) {
  var c = TextFormat._canvas,
    d = TextFormat._ctxext,
    e = this.data;
  c.width = e.rw = this._nhpt(b._areaW);
  c.height = e.rh = this._nhpt(b._areaH);
  b._background &&
    ((d.fillStyle = "rgba(255,255,255,1)"),
    d.fillRect(0, 0, b._areaW, b._areaH));
  b._border &&
    ((d.strokeStyle = "rgb(0,0,0)"),
    d.beginPath(),
    d.rect(0.5, 0.5, b._areaW - 1, b._areaH - 1),
    d.stroke());
  this.setContext(d);
  var f = [];
  this.maxW = 0;
  for (
    var g = a.split("\n"), h = 0, k = 0, l = 1.25 * this.size, m = 0, n = 0;
    n < g.length;
    n++
  ) {
    var p = this.renderPar(g[n], k, l, d, b, m, f);
    h += p;
    k += p * (l + this.leading);
    m += g[n].length + 1;
  }
  this.align == TextFormatAlign.JUSTIFY &&
    (this.maxW = Math.max(this.maxW, b._areaW));
  e.tw = this.maxW;
  e.th = (l + this.leading) * h - this.leading;
  b._metrics = f;
  if (b._selectable && b._select && b._select.from < b._select.to)
    if (
      ((l = b._select),
      (h = b.getLineIndexOfChar(l.from)),
      (g = b.getLineIndexOfChar(l.to - 1)),
      (k = b.getCharBoundaries(l.from)),
      (l = b.getCharBoundaries(l.to - 1)),
      (d.fillStyle = "rgba(0,0,0,0.25)"),
      h == g)
    )
      d.fillRect(k.x, k.y, l.x + l.width - k.x, l.y + l.height - k.y);
    else {
      d.fillRect(
        k.x,
        k.y,
        f[h].x + f[h].width - k.x,
        f[h].y + f[h].height - k.y
      );
      for (h += 1; h < g; h++)
        d.fillRect(f[h].x, f[h].y, f[h].width, f[h].height);
      d.fillRect(
        f[g].x,
        f[g].y,
        l.x + l.width - f[g].x,
        l.y + l.height - f[g].y
      );
    }
  else
    "input" == b._type &&
      -1 < b._curPos &&
      ((k = b.getCharBoundaries(b._curPos)),
      d.beginPath(),
      d.moveTo(Math.round(k.x) + 0.5, k.y),
      d.lineTo(Math.round(k.x) + 0.5, k.y + k.height),
      d.stroke());
  e.canvas = c;
  c = d.getImageData(0, 0, e.rw, e.rh);
  e.ui8buff =
    window.CanvasPixelArray && c.data instanceof CanvasPixelArray
      ? new Uint8Array(c.data)
      : new Uint8Array(c.data.buffer);
  return e;
};
TextFormat.prototype.renderPar = function(a, b, c, d, e, f, g) {
  var h = e._wordWrap ? a.split(" ") : [a];
  a = d.measureText(" ").width;
  var k = 0;
  e = e._areaW;
  for (var l = 0, m = [[]], n = [], p = 0; p < h.length; p++) {
    var t = h[p],
      q = d.measureText(t).width;
    k + q <= e || 0 == k
      ? (m[l].push(t), (k += q + a))
      : (n.push(e - k + a), m.push([]), l++, (k = 0), p--);
  }
  n.push(e - k + a);
  for (p = 0; p < m.length; p++) {
    h = { x: 0, y: 0, width: 0, height: 0, charOffset: f, words: [] };
    h.height = 1.25 * this.size + this.leading;
    var x = m[p];
    this.maxW = Math.max(this.maxW, e - n[p]);
    var z = b + (c + this.leading) * p;
    k = 0;
    var y = a;
    this.align == TextFormatAlign.CENTER && (k = 0.5 * n[p]);
    this.align == TextFormatAlign.RIGHT && (k = n[p]);
    this.align == TextFormatAlign.JUSTIFY && (y = a + n[p] / (x.length - 1));
    h.x = k;
    h.y = z;
    for (var r = 0; r < x.length; r++)
      (t = x[r]),
        d.fillText(t, k, z),
        (q = d.measureText(t).width),
        h.words.push({
          x: k,
          y: z,
          width: q,
          height: h.height,
          charOffset: f,
          word: t
        }),
        (k = p < m.length - 1 ? k + (q + y) : k + (q + a)),
        (f += t.length + 1);
    h.width = k - h.x;
    p == m.length - 1 && (h.width -= a);
    g.push(h);
  }
  return l + 1;
};
TextFormat.prototype._nhpt = function(a) {
  --a;
  for (var b = 1; 32 > b; b <<= 1) a |= a >> b;
  return a + 1;
};
TextFormat._canvas = document.createElement("canvas");
TextFormat._ctxext = TextFormat._canvas.getContext("2d");
function TextField() {
  InteractiveObject.call(this);
  this._tarea = document.createElement("textarea");
  this._tareaAdded = !1;
  this._tarea.setAttribute(
    "style",
    "font-family:Times New Roman; font-size:12px; z-index:-1; \t\t\t\t\t\t\t\t\t\t\tposition:absolute; top:0px; left:0px; opacity:0; pointer-events:none; user-select:none; width:100px; height:100px;"
  );
  this._tarea.addEventListener("input", this._tfInput.bind(this), !1);
  this._stage = null;
  this._type = "dynamic";
  this._selectable = !0;
  this._mdown = !1;
  this._curPos = -1;
  this._metrics = this._select = null;
  this._wordWrap = !1;
  this._textH = this._textW = 0;
  this._areaH = this._areaW = 100;
  this._text = "";
  this._tForm = new TextFormat();
  this._rheight = this._rwidth = 0;
  this._border = this._background = !1;
  this._texture = gl.createTexture();
  this._tcArray = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0]);
  this._tcBuffer = gl.createBuffer();
  iStage._setBF(this._tcBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, this._tcArray, gl.STATIC_DRAW);
  this._fArray = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  this._vBuffer = gl.createBuffer();
  iStage._setBF(this._vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, this._fArray, gl.STATIC_DRAW);
  this.addEventListener2(Event.ADDED_TO_STAGE, this._tfATS, this);
  this.addEventListener2(Event.REMOVED_FROM_STAGE, this._tfRFS, this);
  this.addEventListener2(MouseEvent.MOUSE_DOWN, this._tfMD, this);
  this.addEventListener2(KeyboardEvent.KEY_UP, this._tfKU, this);
  this._brect = new Rectangle();
}
TextField.prototype = new InteractiveObject();
TextField.prototype._getLocRect = function() {
  return this._brect;
};
TextField.prototype._loseFocus = function() {
  this._tareaAdded && document.body.removeChild(this._tarea);
  this._tareaAdded = !1;
  this._curPos = -1;
  this._update();
};
TextField.prototype._tfKU = function(a) {
  this._tfInput(null);
};
TextField.prototype._tfInput = function(a) {
  "input" == this._type &&
    ((this._text = this._tarea.value),
    (this._select = null),
    (this._curPos = this._tarea.selectionStart),
    this.setSelection(this._tarea.selectionStart, this._tarea.selectionEnd));
};
TextField.prototype._tfATS = function(a) {
  this._stage = this.stage;
};
TextField.prototype._tfRFS = function(a) {
  this._loseFocus();
};
TextField.prototype._tfMD = function(a) {
  this._selectable &&
    ("input" == this._type &&
      ((this._tareaAdded = !0),
      document.body.appendChild(this._tarea),
      (this._tarea.value = this._text),
      this._tarea.focus()),
    (a = this.getCharIndexAtPoint(this.mouseX, this.mouseY)),
    (this._mdown = !0),
    (this._curPos = a),
    this.setSelection(a, a),
    this._update(),
    this.stage.addEventListener2(MouseEvent.MOUSE_MOVE, this._tfMM, this),
    this.stage.addEventListener2(MouseEvent.MOUSE_UP, this._tfMU, this));
};
TextField.prototype._tfMM = function(a) {
  this._selectable &&
    this._mdown &&
    ((a = this.getCharIndexAtPoint(this.mouseX, this.mouseY)),
    this.setSelection(this._curPos, a));
};
TextField.prototype._tfMU = function(a) {
  this._selectable &&
    ((this._mdown = !1),
    "input" == this._type && this._tarea.focus(),
    this._stage.removeEventListener(MouseEvent.MOUSE_MOVE, this._tfMM),
    this._stage.removeEventListener(MouseEvent.MOUSE_UP, this._tfMU));
};
TextField.prototype.appendText = function(a) {
  this._text += a;
  this._update();
};
TextField.prototype.getCharBoundaries = function(a) {
  var b = TextFormat._ctxext;
  this._tForm.setContext(b);
  var c = this._metrics,
    d = this.getLineIndexOfChar(a);
  if (0 == c[d].words.length)
    return new Rectangle(c[d].x, c[d].y, c[d].width, c[d].height);
  for (
    var e = 0;
    e + 1 < c[d].words.length && c[d].words[e + 1].charOffset <= a;

  )
    e++;
  var f = c[d].words[e],
    g = f.word.substring(0, a - f.charOffset);
  f = new Rectangle(f.x + b.measureText(g).width, f.y, 0, f.height);
  f.width = b.measureText(this._text.charAt(a)).width;
  (b = c[d].words[e + 1]) && b.charOffset == a + 1 && (f.width = b.x - f.x);
  return f;
};
TextField.prototype.getCharIndexAtPoint = function(a, b) {
  if (0 == this._text.length) return 0;
  var c = TextFormat._ctxext;
  this._tForm.setContext(c);
  var d = this._metrics,
    e = this.getLineIndexAtPoint(a, b);
  a = Math.max(d[e].x, Math.min(d[e].x + d[e].width, a));
  for (var f = 0; f + 1 < d[e].words.length && d[e].words[f + 1].x <= a; ) f++;
  e = d[e].words[f];
  d = e.charOffset;
  for (e = e.x; ; )
    if (
      ((f = c.measureText(this._text.charAt(d)).width),
      e + 0.5 * f < a && 0 != f)
    )
      (e += f), d++;
    else break;
  return d;
};
TextField.prototype.getLineIndexAtPoint = function(a, b) {
  for (var c = this._metrics, d = 0; d + 1 < c.length && c[d + 1].y <= b; ) d++;
  return d;
};
TextField.prototype.getLineIndexOfChar = function(a) {
  for (
    var b = this._metrics, c = 0;
    c + 1 < b.length && b[c + 1].charOffset <= a;

  )
    c++;
  return c;
};
TextField.prototype.getTextFormat = function(a) {
  return this._tForm.clone();
};
TextField.prototype.setTextFormat = function(a) {
  this._tForm.set(a);
  this._tarea.style.fontFamily = a.font;
  this._tarea.style.fontSize = a.size + "px";
  this._tarea.style.textAlign = a.align;
  this._update();
};
TextField.prototype.setSelection = function(a, b) {
  var c = Math.min(a, b),
    d = Math.max(a, b),
    e = this._select;
  if (null == e || e.from != c || e.to != d)
    (this._select = { from: c, to: d }),
      (this._tarea.selectionStart = c),
      (this._tarea.selectionEnd = d),
      this._update();
};
TextField.prototype._update = function() {
  var a = (this._brect.width = this._areaW),
    b = (this._brect.height = this._areaH);
  if (0 != a && 0 != b) {
    var c = this._tForm.getImageData(this._text, this);
    this._textW = c.tw;
    this._textH = c.th;
    if (c.rw != this._rwidth || c.rh != this._rheight)
      gl.deleteTexture(this._texture), (this._texture = gl.createTexture());
    iStage._setTEX(this._texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      c.rw,
      c.rh,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      c.ui8buff
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_LINEAR
    );
    gl.generateMipmap(gl.TEXTURE_2D);
    this._rwidth = c.rw;
    this._rheight = c.rh;
    var d = b / c.rh,
      e = this._tcArray;
    e[2] = e[6] = a / c.rw;
    e[5] = e[7] = d;
    iStage._setBF(this._tcBuffer);
    gl.vertexAttribPointer(iStage._main._sprg.tca, 2, gl.FLOAT, !1, 0, 0);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, e);
    c = this._fArray;
    c[3] = c[9] = a;
    c[7] = c[10] = b;
    iStage._setBF(this._vBuffer);
    gl.vertexAttribPointer(iStage._main._sprg.vpa, 3, gl.FLOAT, !1, 0, 0);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, c);
  }
};
TextField.prototype._render = function(a) {
  0 != this._areaW &&
    0 != this._areaH &&
    (gl.uniformMatrix4fv(a._sprg.tMatUniform, !1, a._mstack.top()),
    a._cmstack.update(),
    iStage._setVC(this._vBuffer),
    iStage._setTC(this._tcBuffer),
    iStage._setUT(1),
    iStage._setTEX(this._texture),
    iStage._setEBF(a._unitIBuffer),
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0));
};
this.tp = TextField.prototype;
tp.ds = tp.__defineSetter__;
tp.dg = tp.__defineGetter__;
tp.dg("textWidth", function() {
  return this._textW;
});
tp.dg("textHeight", function() {
  return this._textH;
});
tp.ds("wordWrap", function(a) {
  this._wordWrap = a;
  this._update();
});
tp.dg("wordWrap", function() {
  return this._wordWrap;
});
tp.ds("width", function(a) {
  this._areaW = Math.max(0, a);
  this._tarea.style.width = this._areaW + "px";
  this._update();
});
tp.dg("width", function() {
  return this._areaW;
});
tp.ds("height", function(a) {
  this._areaH = Math.max(0, a);
  this._tarea.style.height = this._areaH + "px";
  this._update();
});
tp.dg("height", function() {
  return this._areaH;
});
tp.ds("text", function(a) {
  this._text = a + "";
  this._update();
});
tp.dg("text", function() {
  return this._text;
});
tp.ds("selectable", function(a) {
  this._selectable = a;
  this._update();
});
tp.dg("selectable", function() {
  return this._selectable;
});
tp.ds("type", function(a) {
  this._type = a;
  this._update();
});
tp.dg("type", function() {
  return this._type;
});
tp.ds("background", function(a) {
  this._background = a;
  this._update();
});
tp.dg("background", function() {
  return this._background;
});
tp.ds("border", function(a) {
  this._border = a;
  this._update();
});
tp.dg("border", function() {
  return this._border;
});
delete tp.ds;
delete tp.dg;
delete this.tp;
