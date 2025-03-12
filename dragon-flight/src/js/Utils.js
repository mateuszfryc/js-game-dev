'use strict';

(function () {
  Engine.Utils = {};

  Engine.Utils.GetMousePosition = function (e) {
    let v = e || window.event;
    let x = v.pageX;
    let y = v.pageY;

    // IE 8
    if (x === undefined || x === null) {
      const { scrollLeft, scrollTop } = document.body;
      const { documentElement } = document;
      x = v.clientX + scrollLeft + documentElement.scrollLeft;
      y = v.clientY + scrollTop + documentElement.scrollTop;
    }

    return { x, y };
  };

  Engine.Utils.GetWindowInnerSize = function () {
    return {
      width:
        window.innerWidth && document.documentElement.clientWidth
          ? Math.min(window.innerWidth, document.documentElement.clientWidth)
          : window.innerWidth ||
            document.documentElement.clientWidth ||
            document.getElementsByTagName('body')[0].clientWidth,

      height:
        window.innerHeight && document.documentElement.clientHeight
          ? Math.min(window.innerHeight, document.documentElement.clientHeight)
          : window.innerHeight ||
            document.documentElement.clientHeight ||
            document.getElementsByTagName('body')[0].clientHeight,
    };
  };

  Engine.Utils.ArrayToObject = function (array, callback) {
    const object = {};
    array.forEach((item) => {
      callback(object, item);
    });
    return object;
  };

  Engine.Utils.Clamp = function (number, min, max) {
    if (number < min) {
      return min;
    }
    if (number > max) {
      return max;
    }
    return number;
  };

  Engine.Utils.GetRandomIntInRange = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  Engine.Utils.IsInRange = function (number, min, max) {
    return number >= min && number <= max;
  };

  Engine.Utils.GetCanvasAspectRatio = function (context) {
    const devicePixelRatio = window.devicePixelRatio || 1;

    const backingStoreRatio =
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio ||
      1;

    const ratio = devicePixelRatio / backingStoreRatio;

    return ratio;
  };
})();
