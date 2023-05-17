function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { IconType } from "./typings/base";

var Marker = /*#__PURE__*/function () {
  function Marker(options) {
    _classCallCheck(this, Marker);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "img", void 0);

    this.options = options;
    var style = options.style;

    if (style.type === IconType.img) {
      var img = document.createElement('img');
      img.src = style;
      img.width = style.size;
      img.height = style.size;
      this.img = img;
    }
  }

  _createClass(Marker, [{
    key: "draw",
    value: function draw(context, position) {
      var _this$options = this.options,
          borderWidth = _this$options.borderWidth,
          borderColor = _this$options.borderColor,
          color = _this$options.color,
          style = _this$options.style;
      var size = style.size / 2;
      var x = position.x,
          y = position.y,
          angle = position.angle;
      context.translate(x, y);
      Object.assign(context, {
        lineWidth: borderWidth || 0,
        strokeStyle: borderColor || '#000',
        fillStyle: color || '#000'
      }); // 目前先只支持圆

      context.beginPath();
      context.rotate(angle + Math.PI);

      if (style.type === IconType.circle) {
        context.arc(0, 0, size, 0, Math.PI * 2, false);
      } else if (style.type === IconType.arrow) {
        context.moveTo(size, size);
        context.lineTo(0, -size);
        context.lineTo(-size, size);
        context.lineTo(0, size / 4);
        context.lineTo(size, size);
      } else if (style.type === IconType.img && this.img) {
        var _this$img = this.img,
            width = _this$img.width,
            height = _this$img.height;
        context.drawImage(this.img, -width / 2, -height, width, height);
      }

      context.closePath();
      context.stroke();
      context.fill();
    }
  }]);

  return Marker;
}();

export default Marker;