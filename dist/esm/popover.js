function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { getType } from "./utils";
import { POPOVER_OFFSET } from "./config";
import L from 'leaflet';

var Popover = /*#__PURE__*/function () {
  function Popover(ctx) {
    _classCallCheck(this, Popover);

    _defineProperty(this, "replace", void 0);

    _defineProperty(this, "onShow", void 0);

    _defineProperty(this, "onHide", void 0);

    _defineProperty(this, "el", void 0);

    _defineProperty(this, "context", void 0);

    // wrapper
    this.el = L.DomUtil.create('div', '', ctx.container);
    Object.assign(this.el.style, {
      position: 'absolute',
      left: '0',
      top: '0',
      display: 'none',
      zIndex: '11'
    });
    this.context = L.DomUtil.create('div', '', this.el);
    var _ctx$options = ctx.options,
        replacePopover = _ctx$options.replacePopover,
        onShowPopover = _ctx$options.onShowPopover,
        onHidePopover = _ctx$options.onHidePopover;

    if (getType(replacePopover) === 'Function') {
      this.replace = replacePopover;
    } else {
      Object.assign(this.context.style, {
        border: '1px solid grey',
        background: 'rgba(255,255,255,.3)',
        borderRadius: '5px',
        padding: '8px 16px'
      });
    }

    this.onShow = onShowPopover;
    this.onHide = onHidePopover;
  }

  _createClass(Popover, [{
    key: "show",
    value: function show(x, y, data, idx) {
      var value = data.value,
          labels = data.labels;
      var el = this.el,
          replace = this.replace,
          onShow = this.onShow;

      if (replace) {
        var popover = replace(x, y, data, idx); // el.appendChild(popover);

        el.replaceChild(popover, el.children[0]);
      } else {
        this.context.innerText = "".concat(labels[0], " -> ").concat(labels[1], ": ").concat(value);
      }

      if (onShow && getType(onShow) === 'Function') onShow(data, idx);
      Object.assign(el.style, {
        display: '',
        transform: "translate(".concat(x + POPOVER_OFFSET, "px, ").concat(y + POPOVER_OFFSET, "px)")
      });
    }
  }, {
    key: "hide",
    value: function hide(data, idx) {
      var el = this.el,
          onHide = this.onHide;
      if (onHide && getType(onHide) === 'Function') onHide(data, idx);
      el.style.display = 'none';
    }
  }]);

  return Popover;
}();

export default Popover;