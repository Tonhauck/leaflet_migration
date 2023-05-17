function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) { return typeof obj; } : function(obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
    Object.defineProperty(subClass, "prototype", { writable: false });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
            result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else { result = Super.apply(this, arguments); }
        return _possibleConstructorReturn(this, result);
    };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 飞线， 根据曲线的路径飞行
import Arc from "./Arc";
import Marker from "./Marker";

var Spark = /*#__PURE__*/ function(_Arc) {
    _inherits(Spark, _Arc);

    var _super = _createSuper(Spark);

    // arcAngle: number
    function Spark(options) {
        var _this;

        _classCallCheck(this, Spark);

        _this = _super.call(this, options);

        _defineProperty(_assertThisInitialized(_this), "factor", void 0);

        _defineProperty(_assertThisInitialized(_this), "deltaAngle", void 0);

        _defineProperty(_assertThisInitialized(_this), "trailAngle", void 0);

        _defineProperty(_assertThisInitialized(_this), "tailPointsCount", void 0);

        _defineProperty(_assertThisInitialized(_this), "animateBlur", void 0);

        _defineProperty(_assertThisInitialized(_this), "marker", void 0);

        _this.tailPointsCount = 10; // 拖尾点数
        // 飞线速度

        _this.factor = 0.4 / _this.radius;
        _this.deltaAngle = 80 / Math.min(_this.radius, 400) / _this.tailPointsCount;
        _this.trailAngle = _this.startAngle; // this.arcAngle = this.startAngle;
        // 是否有阴影
        // this.animateBlur = true;

        if (Math.abs(_this.startAngle - _this.endAngle) > Math.PI) {
            _this.endAngle += Math.PI * 2;
        }

        _this.marker = new Marker({
            style: options.marker,
            color: 'rgb(255, 255, 255)',
            borderWidth: 1,
            borderColor: _this.color
        });
        return _this;
    }

    _createClass(Spark, [{
        key: "drawArc",
        value: function drawArc(context, strokeColor, lineWidth, startAngle, endAngle) {
            Object.assign(context, {
                lineWidth: lineWidth,
                strokeStyle: strokeColor,
                shadowColor: strokeColor,
                lineCap: 'round'
            });
            context.beginPath();
            context.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle, false);
            context.closePath();
            context.stroke();
        }
    }, {
        key: "draw",
        value: function draw(context, order) {
            var endAngle = this.endAngle,
                trailAngle = this.trailAngle,
                factor = this.factor,
                color = this.color; // 匀速

            var angle = trailAngle + factor;
            this.trailAngle = angle; // 拖尾效果

            var tailLineWidth = 5;
            this.drawArc(context, color, tailLineWidth, trailAngle, trailAngle);

            if (this.isEnd && !order) {
                this.restart();
            }
        }
    }, {
        key: "drawMarker",
        value: function drawMarker(context) {
                context.save();
                context.translate(this.centerX, this.centerY); // 画箭头

                this.marker.draw(context, {
                    x: Math.cos(this.trailAngle) * this.radius,
                    y: Math.sin(this.trailAngle) * this.radius,
                    angle: this.trailAngle
                });
                context.restore();
            } // 检查飞线是否抵达终点

    }, {
        key: "isEnd",
        get: function get() {
                return (this.endAngle - this.trailAngle) * 180 / Math.PI < 0.0001;
            } // 重新发射射线

    }, {
        key: "restart",
        value: function restart() {
            this.trailAngle = this.startAngle;
        }
    }]);

    return Spark;
}(Arc);

export default Spark;