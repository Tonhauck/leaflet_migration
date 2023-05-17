var _excluded = ["from", "to"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 全局上下文
 */
import merge from 'lodash/merge';
import L from "leaflet";
import { DEFAULT_OPTION } from "./config";
// export interface ContextProps
export var Context = /*#__PURE__*/function () {
  function Context(_ref) {
    var _this = this;

    var container = _ref.container,
        canvas = _ref.canvas,
        data = _ref.data,
        options = _ref.options,
        map = _ref.map;

    _classCallCheck(this, Context);

    _defineProperty(this, "options", DEFAULT_OPTION);

    _defineProperty(this, "data", []);

    _defineProperty(this, "map", void 0);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "canvasCtx", void 0);

    _defineProperty(this, "mapPosi", void 0);

    this.container = container;
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d');
    this.map = map;
    this.data = this._convertData(data);
    this.setOptions(options);
    this.mapPosi = this.container.getBoundingClientRect();
    window.addEventListener('scroll', function () {
      _this.mapPosi = _this.container.getBoundingClientRect();
    });
  }

  _createClass(Context, [{
    key: "setOptions",
    value: function setOptions(options) {
      this.options = merge(this.options, options);
    }
  }, {
    key: "setData",
    value: function setData(data) {
      // this.data = data;
      this.data = this._convertData(data);
    } // convert latlng to xy

  }, {
    key: "_convertData",
    value: function _convertData(data) {
      var map = this.map;
      if (!map || !Array.isArray(data)) return [];
      var bounds = map.getBounds();

      if (bounds) {
        var getLatLng = function getLatLng(_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              lng = _ref3[0],
              lat = _ref3[1];

          var _map$latLngToContaine = map.latLngToContainerPoint(new L.LatLng(lat, lng)),
              x = _map$latLngToContaine.x,
              y = _map$latLngToContaine.y;

          return [x, y];
        }; // opt = { labels, value, color }


        return data.map(function (_ref4) {
          var from = _ref4.from,
              to = _ref4.to,
              opt = _objectWithoutProperties(_ref4, _excluded);

          return _objectSpread({
            from: getLatLng(from),
            to: getLatLng(to)
          }, opt);
        });
      }

      return [];
    }
  }]);

  return Context;
}();