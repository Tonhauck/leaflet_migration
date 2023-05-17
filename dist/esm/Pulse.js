function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 脉冲， label 圆环扩散
// 动效用 css 实现
var domCache = [];

var Pulse = /*#__PURE__*/ function() {
    function Pulse(props) {
        var _this = this;

        _classCallCheck(this, Pulse);

        _defineProperty(this, "options", void 0);

        _defineProperty(this, "scale", 1);

        _defineProperty(this, "pulse", void 0);

        _defineProperty(this, "ring", void 0);

        _defineProperty(this, "showPopover", function(e) {
            var clientX = e.clientX,
                clientY = e.clientY;
            var _this$options = _this.options,
                data = _this$options.data,
                index = _this$options.index,
                popover = _this$options.popover,
                ctx = _this$options.ctx;
            var _ctx$mapPosi = ctx.mapPosi,
                top = _ctx$mapPosi.top,
                left = _ctx$mapPosi.left;
            popover.show(clientX - left, clientY - top, data, index);
        });

        _defineProperty(this, "hidePopover", function() {
            var _this$options2 = _this.options,
                data = _this$options2.data,
                index = _this$options2.index,
                popover = _this$options2.popover;
            popover.hide(data, index);
        });

        // const { color, value, labels } = data;
        // const r = radius;
        // 根据用户设置的 radius, data[x].value, zoom 来决定半径
        this.options = props;
        this.initDom();
    }

    _createClass(Pulse, [{
        key: "clear",
        value: function clear() {
            var pulse = this.pulse;
            domCache.push(pulse);
            pulse.removeEventListener('mouseover', this.showPopover);
            pulse.removeEventListener('mouseout', this.hidePopover);
            this.options.ctx.container.removeChild(pulse);
        }
    }, {
        key: "initDom",
        value: function initDom() {
            if (domCache.length > 0) {
                this.pulse = domCache.pop();
                this.ring = this.pulse.children[0];
            } else {
                this.pulse = document.createElement('div');
                this.ring = document.createElement('div');
                this.pulse.appendChild(this.ring);
            }

            var _this$options3 = this.options,
                x = _this$options3.x,
                y = _this$options3.y,
                radius = _this$options3.radius,
                color = _this$options3.data.color;
            var pulse = this.pulse,
                ring = this.ring;
            Object.assign(pulse.style, {
                position: 'absolute',
                zIndex: '1',
                borderRadius: '50%',
                width: "".concat(2 * radius, "px"),
                height: "".concat(2 * radius, "px"),
                left: "-".concat(radius, "px"),
                top: "-".concat(radius, "px"),
                background: color,
                // boxShadow: `0 0 10px ${color}`,
                transform: "translate(".concat(x, "px, ").concat(y, "px)")
            });
            Object.assign(ring.style, {
                position: 'absolute',
                borderRadius: '50%',
                width: "".concat(2 * radius, "px"),
                height: "".concat(2 * radius, "px"),
                left: "".concat(-1, "px"),
                top: "".concat(-1, "px"),
                border: "1px solid ".concat(color)
            });
            ring.animate([{
                    transform: 'scale(1)'
                }, {
                    transform: 'scale(2)'
                } // { transform: 'scale(1)' }
            ], {
                duration: 1000,
                iterations: Infinity
            });
            this.options.ctx.container.appendChild(pulse);
            pulse.addEventListener('mouseover', this.showPopover);
            pulse.addEventListener('mouseout', this.hidePopover);
        }
    }, {
        key: "draw",
        value: function draw() {}
    }]);

    return Pulse;
}();

_defineProperty(Pulse, "domCache", []);

export default Pulse;