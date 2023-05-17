function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import L from 'leaflet';
import Migration from "./Migration";
import { MIN_ZOOM } from "./config";
import { Context } from "./store";

var MigrationLayer = /*#__PURE__*/function (_L$Layer) {
  _inherits(MigrationLayer, _L$Layer);

  var _super = _createSuper(MigrationLayer);

  function MigrationLayer(_data, options) {
    var _this;

    _classCallCheck(this, MigrationLayer);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_show", false);

    _defineProperty(_assertThisInitialized(_this), "mapHandles", []);

    _defineProperty(_assertThisInitialized(_this), "migration", void 0);

    _defineProperty(_assertThisInitialized(_this), "options", void 0);

    _defineProperty(_assertThisInitialized(_this), "data", void 0);

    _defineProperty(_assertThisInitialized(_this), "ctx", void 0);

    _this.data = _data;
    _this.options = options;
    return _this;
  }

  _createClass(MigrationLayer, [{
    key: "onAdd",
    value: function onAdd(map) {
      var _map$getSize = map.getSize(),
          x = _map$getSize.x,
          y = _map$getSize.y;

      var container = L.DomUtil.create('div', 'leaflet-ODLayer-container');
      var canvas = document.createElement('canvas');
      container.appendChild(canvas);
      Object.assign(this, {
        _show: true
      });
      Object.assign(container.style, {
        position: 'absolute',
        width: "".concat(x, "px"),
        height: "".concat(y, "px")
      });
      map.getPanes().overlayPane.appendChild(container);
      var data = this.data,
          options = this.options;
      this.ctx = new Context({
        container: container,
        canvas: canvas,
        data: data,
        options: options,
        map: map
      });
      this.ctx.map = map;
      this.migration = new Migration({
        ctx: this.ctx
      });

      this._bindMapEvents();

      this._draw();

      return this;
    }
  }, {
    key: "onRemove",
    value: function onRemove(map) {
      this.mapHandles.forEach(function (_ref) {
        var type = _ref.type,
            handle = _ref.handle;
        return map.off(type, handle);
      });
      this.mapHandles = [];
      this.ctx && L.DomUtil.remove(this.ctx.container);
      this.migration.clear();
      return this;
    }
  }, {
    key: "setData",
    value: function setData(data) {
      var _this$ctx;

      (_this$ctx = this.ctx) === null || _this$ctx === void 0 ? void 0 : _this$ctx.setData(data);
      this.migration.refresh(); // this._draw();

      return this;
    }
  }, {
    key: "setStyle",
    value: function setStyle(style) {
      var _this$ctx2;

      (_this$ctx2 = this.ctx) === null || _this$ctx2 === void 0 ? void 0 : _this$ctx2.setOptions(style);
      this.migration.refresh();
      return this;
    }
  }, {
    key: "setVisible",
    value: function setVisible(visible) {
      if (!this.ctx) return this;
      this.ctx.container.style.display = visible ? '' : 'none';
      this._show = visible;
      return this;
    }
  }, {
    key: "hide",
    value: function hide() {
      return this.setVisible(false);
    }
  }, {
    key: "show",
    value: function show() {
      this.setVisible(true);
    }
  }, {
    key: "play",
    value: function play() {
      this.migration.play();
      return this;
    }
  }, {
    key: "pause",
    value: function pause() {
      this.migration.pause();
      return this;
    }
  }, {
    key: "_bindMapEvents",
    value: function _bindMapEvents() {
      var _this2 = this;

      var mapHandles = this.mapHandles;

      var moveendHandle = function moveendHandle(e) {
        var zoom = e.target.getZoom();

        if (zoom < MIN_ZOOM) {
          _this2.hide();

          return;
        }

        if (!_this2._show) {
          _this2.show();
        }

        _this2.migration.play();

        _this2._draw();
      };

      if (!this.ctx) return;
      var _this$ctx3 = this.ctx,
          map = _this$ctx3.map,
          container = _this$ctx3.container;
      map.on('moveend', moveendHandle);
      mapHandles.push({
        type: 'moveend',
        handle: moveendHandle
      });

      var zoomstartHandle = function zoomstartHandle() {
        container.style.display = 'none';
      };

      map.on('zoomstart ', zoomstartHandle);
      mapHandles.push({
        type: 'zoomstart',
        handle: zoomstartHandle
      });

      var zoomendHandle = function zoomendHandle() {
        if (_this2._show) {
          container.style.display = '';

          _this2._draw();
        }
      };

      map.on('zoomend', zoomendHandle);
      mapHandles.push({
        type: 'zoomend',
        handle: zoomendHandle
      });
    }
  }, {
    key: "_draw",
    value: function _draw() {
      var _this$ctx4;

      var bounds = (_this$ctx4 = this.ctx) === null || _this$ctx4 === void 0 ? void 0 : _this$ctx4.map.getBounds();

      if (bounds && this.migration.playAnimation) {
        var _this$ctx5;

        this._resize();

        (_this$ctx5 = this.ctx) === null || _this$ctx5 === void 0 ? void 0 : _this$ctx5.setData(this.data);
        this.migration.refresh();
      }
    } // reset container size and position

  }, {
    key: "_resize",
    value: function _resize() {
      if (!this.ctx) return;
      var _this$ctx6 = this.ctx,
          map = _this$ctx6.map,
          canvas = _this$ctx6.canvas,
          container = _this$ctx6.container;
      var bounds = map.getBounds();
      var topleft = bounds.getNorthWest();

      var _map$latLngToContaine = map.latLngToContainerPoint(topleft),
          y = _map$latLngToContaine.y; // 当地图缩放或者平移到整个地图的范围小于外层容器的范围的时候，要对this.ctx.container进行上下平移操作，反之则回归原位


      if (y > 0) {
        container.style.top = "".concat(-y, "px");
      } else {
        container.style.top = '0px';
      }

      var containerStyle = window.getComputedStyle(map.getContainer());
      canvas.setAttribute('width', containerStyle.width);
      canvas.setAttribute('height', containerStyle.height);
      var posi = map.latLngToLayerPoint(topleft);
      L.DomUtil.setPosition(container, posi);
    }
  }]);

  return MigrationLayer;
}(L.Layer);

L.migrationLayer = function (data, options) {
  return new MigrationLayer(data, options);
};