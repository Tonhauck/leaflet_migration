function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) {
        _d = true;
        _e = err;
    } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } }
    return _arr;
}

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
}

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 曲线， 基类
import { FACTOR } from "./config";
import { getDistance } from "./utils";

var Arc = /*#__PURE__*/ function() {
    function Arc(options) {
        _classCallCheck(this, Arc);

        _defineProperty(this, "startX", void 0);

        _defineProperty(this, "startY", void 0);

        _defineProperty(this, "endX", void 0);

        _defineProperty(this, "endY", void 0);

        _defineProperty(this, "centerX", void 0);

        _defineProperty(this, "centerY", void 0);

        _defineProperty(this, "startAngle", void 0);

        _defineProperty(this, "endAngle", void 0);

        _defineProperty(this, "radius", void 0);

        _defineProperty(this, "color", void 0);

        _defineProperty(this, "lineWidth", 1);

        _defineProperty(this, "ctx", void 0);

        var from = options.from,
            to = options.to,
            width = options.width,
            _options$color = options.color,
            color = _options$color === void 0 ? '#fff' : _options$color,
            ctx = options.ctx;

        var _from = _slicedToArray(from, 2),
            startX = _from[0],
            startY = _from[1];

        var _to = _slicedToArray(to, 2),
            endX = _to[0],
            endY = _to[1];

        this.ctx = ctx; // 两点之间的圆有多个，通过两点及半径便可以定出两个圆，根据需要选取其中一个圆

        var l = getDistance(startX - endX, startY - endY);
        var m = (startX + endX) / 2; // 横轴中点

        var n = (startY + endY) / 2; // 纵轴中点

        var centerX = (startY - endY) * FACTOR + m;
        var centerY = (endX - startX) * FACTOR + n;
        var radius = getDistance(l / 2, l * FACTOR);
        var startAngle = Math.atan2(startY - centerY, startX - centerX);
        var endAngle = Math.atan2(endY - centerY, endX - centerX);
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.centerX = centerX;
        this.centerY = centerY;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.radius = radius;
        this.color = color;
        this.lineWidth = width || 1;
    }

    _createClass(Arc, [{
        key: "draw",
        value: function draw(context) {}
    }]);

    return Arc;
}();

export default Arc;