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

/**
 * 核心类
 */
import linearScale from 'uc-fun/lib/linearScale';
import Line from "./Line";
import Pulse from "./Pulse";
import Spark from "./Spark";
import { CanvasCache, extend } from "./utils";
import Popover from "./popover";

var Migration = /*#__PURE__*/ function() {
    // 顺序播放的时候记录下标
    // 飞线缓存
    // 扫尾缓存
    // options = { map, canvas, data, options, container }
    function Migration(_ref) {
        var ctx = _ref.ctx;

        _classCallCheck(this, Migration);

        _defineProperty(this, "ctx", void 0);

        _defineProperty(this, "started", false);

        _defineProperty(this, "playAnimation", true);

        _defineProperty(this, "store", {
            arcs: [],
            pulses: [],
            sparks: []
        });

        _defineProperty(this, "popover", void 0);

        _defineProperty(this, "index", 0);

        _defineProperty(this, "requestAnimationId", 0);

        _defineProperty(this, "lineCache", void 0);

        _defineProperty(this, "sparkCache", void 0);

        this.ctx = ctx;
        this.popover = new Popover(ctx);
        this.lineCache = new CanvasCache(ctx.canvas);
        this.sparkCache = new CanvasCache(ctx.canvas);
    }
    /*
     * 更新数据
     */


    _createClass(Migration, [{
        key: "refresh",
        value: function refresh() {
            var _this = this;

            var _this$ctx = this.ctx,
                data = _this$ctx.data,
                _this$ctx$options = _this$ctx.options,
                _this$ctx$options$mar = _slicedToArray(_this$ctx$options.marker.radius, 2),
                minRadius = _this$ctx$options$mar[0],
                maxRadius = _this$ctx$options$mar[1],
                icon = _this$ctx$options.line.icon;

            if (!data || data.length === 0) {
                return;
            }

            this.clear();
            var dataRange = extend(data, function(i) {
                return i.value;
            });
            var popover = this.popover;
            var radiusScale = linearScale(dataRange, [minRadius, maxRadius || 2 * minRadius]); // 缓存位置信息， 相同位置的就只初始化一份就行

            var pulsePosi = new Set();
            this.drawLines();
            data.forEach(function(item, index) {
                var from = item.from,
                    to = item.to,
                    color = item.color; // 计算每一个圆环的大小

                var radius = radiusScale(item.value);

                var genPulse = function genPulse(latlng) {
                    var posi = latlng.join('_');
                    if (pulsePosi.has(posi)) return;
                    pulsePosi.add(posi);
                    var pulse = new Pulse({
                        x: latlng[0],
                        y: latlng[1],
                        // dataRange,
                        radius: radius,
                        // maxRadius,
                        index: index,
                        data: item,
                        popover: popover,
                        ctx: _this.ctx
                    });

                    _this.store.pulses.push(pulse);
                };

                genPulse(from);
                genPulse(to); // 扫尾

                var spark = new Spark({
                    from: from,
                    to: to,
                    // style: this.ctx.options.line,
                    width: minRadius,
                    color: color,
                    marker: icon,
                    ctx: _this.ctx
                });

                _this.store.sparks.push(spark);
            });
            this.index = 0;
            this.start();
        }
    }, {
        key: "clear",
        value: function clear() {
            this.store.pulses.forEach(function(pulse) {
                return pulse.clear();
            });
            this.store = {
                arcs: [],
                pulses: [],
                sparks: []
            }; // 更新状态

            this.playAnimation = true;
            this.started = false; // 清除绘画实例，如果没有这个方法，多次调用start，相当于存在多个动画队列同时进行

            window.cancelAnimationFrame(this.requestAnimationId);
        }
    }, {
        key: "draw",
        value: function draw(shapes) {
            var canvasCtx = this.ctx.canvasCtx;
            shapes.forEach(function(shap) {
                return shap.draw(canvasCtx);
            });

            for (var i = 0, len = shapes.length; i < len; i++) {
                shapes[i].draw(canvasCtx);
            }
        }
    }, {
        key: "drawLines",
        value: function drawLines() {
            var _this$ctx2 = this.ctx,
                data = _this$ctx2.data,
                _this$ctx2$options = _this$ctx2.options,
                label = _this$ctx2$options.marker.textVisible,
                arcWidth = _this$ctx2$options.line.width;
            var canvasCtx = this.lineCache.ctx;
            this.lineCache.clear();
            this.sparkCache.clear();
            data.map(function(item) {
                canvasCtx === null || canvasCtx === void 0 ? void 0 : canvasCtx.beginPath(); // console.log('item',item);

                var from = item.from,
                    to = item.to,
                    labels = item.labels,
                    color = item.color;
                new Line({
                    from: from,
                    to: to,
                    labels: labels,
                    label: label,
                    width: arcWidth,
                    color: color,
                    canvasCtx: canvasCtx
                });
                canvasCtx === null || canvasCtx === void 0 ? void 0 : canvasCtx.stroke();
            });
            this.lineCache.restore();
        }
    }, {
        key: "restoreLines",
        value: function restoreLines() {
            this.lineCache.restore();
        }
    }, {
        key: "drawSpark",
        value: function drawSpark() {
            var order = this.ctx.options.line.order;
            var context = this.sparkCache.ctx;
            if (!context) return;
            context.save();
            context.fillStyle = "rgba(0, 0, 0, 0.9)";
            context.globalCompositeOperation = 'destination-in';
            var _this$ctx$canvas = this.ctx.canvas,
                width = _this$ctx$canvas.width,
                height = _this$ctx$canvas.height;
            context.fillRect(0, 0, width, height);
            context.restore();
            var shapes = this.store.sparks; // console.time(key);

            if (order) {
                var item = shapes[this.index];
                item.draw(context, order);

                if (item.isEnd) {
                    item.restart();

                    if (this.index < shapes.length - 1) {
                        this.index += 1;
                    } else {
                        this.index = 0;
                    }
                }
            } else {
                shapes.forEach(function(shap) {
                    return shap.draw(context);
                });
            }

            this.sparkCache.restore();
        }
    }, {
        key: "drawSparkMarkers",
        value: function drawSparkMarkers() {
            var _this2 = this;

            this.store.sparks.forEach(function(item) {
                item.drawMarker(_this2.ctx.canvasCtx);
            });
        }
    }, {
        key: "start",
        value: function start() {
            var _this3 = this;

            var started = this.started,
                store = this.store;
            var _this$ctx3 = this.ctx,
                context = _this$ctx3.canvasCtx,
                order = _this$ctx3.options.line.order,
                _this$ctx3$canvas = _this$ctx3.canvas,
                width = _this$ctx3$canvas.width,
                height = _this$ctx3$canvas.height;

            if (!started) {
                this.draw(store.pulses);

                var drawFrame = function drawFrame() {
                    // console.time('draw');
                    _this3.requestAnimationId = window.requestAnimationFrame(drawFrame);

                    if (_this3.playAnimation && context) {
                        context.clearRect(0, 0, width, height); // console.time('line');

                        _this3.restoreLines(); // console.timeEnd('line');
                        // console.time('spark');


                        _this3.drawSpark(); // console.timeEnd('spark');
                        // console.time('sparkMarker');


                        _this3.drawSparkMarkers(); // console.timeEnd('sparkMarker');
                        // console.timeEnd('draw');

                    }
                };

                drawFrame();
                this.started = true;
            }
        }
    }, {
        key: "play",
        value: function play() {
            this.playAnimation = true;
        }
    }, {
        key: "pause",
        value: function pause() {
            this.playAnimation = false;
        }
    }]);

    return Migration;
}();

export default Migration;