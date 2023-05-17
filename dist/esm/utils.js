function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { FACTOR } from "./config";
export function getDistance(width, height) {
  var pow = function pow(length) {
    return length * length;
  };

  return Math.sqrt(pow(width) + pow(height));
}
export function getLineCenter(start, end) {
  var center = (start + end) / 2;
  return (start - end) * FACTOR + center;
}
export function extend(arr, handler) {
  var min = 0;
  var max = 0;
  arr.forEach(function (i) {
    var value = handler(i);

    if (min === undefined) {
      max = value;
      min = value;
    } else {
      if (min > value) min = value;
      if (max < value) max = value;
    }
  });
  return [min, max];
}
export function getType(target) {
  return Object.prototype.toString.call(target).slice(8, -1);
}
export var CanvasCache = /*#__PURE__*/function () {
  function CanvasCache(target) {
    _classCallCheck(this, CanvasCache);

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "ctx", void 0);

    _defineProperty(this, "target", void 0);

    _defineProperty(this, "targetCtx", void 0);

    this.target = target;
    this.targetCtx = target.getContext('2d');
    this.canvas = document.createElement('canvas'); // debug
    // document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    var _this$target = this.target,
        width = _this$target.width,
        height = _this$target.height;
    Object.assign(this.canvas, {
      width: width,
      height: height
    });
  }

  _createClass(CanvasCache, [{
    key: "clear",
    value: function clear() {
      var _this$ctx;

      var _this$target2 = this.target,
          width = _this$target2.width,
          height = _this$target2.height;
      Object.assign(this.canvas, {
        width: width,
        height: height
      });
      (_this$ctx = this.ctx) === null || _this$ctx === void 0 ? void 0 : _this$ctx.clearRect(0, 0, width, height);
    }
  }, {
    key: "restore",
    value: function restore() {
      var _this$targetCtx;

      (_this$targetCtx = this.targetCtx) === null || _this$targetCtx === void 0 ? void 0 : _this$targetCtx.drawImage(this.canvas, 0, 0);
    }
  }]);

  return CanvasCache;
}();