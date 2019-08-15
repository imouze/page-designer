(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AE = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../core/component"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../core/component"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.component);
    global.button = mod.exports;
  }
})(this, function (_component) {
  "use strict";

  _component = _interopRequireDefault(_component);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

  function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  /**
   * 按钮类
   *
   */
  var Button =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Button, _Component);

    function Button(options) {
      var _this;

      _classCallCheck(this, Button);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Button).call(this, options));
      _this.text = '';
      _this.tagName = 'button';
      _this.className = _this.prefix + 'button';

      _this.handler = function () {};

      return _this;
    }

    _createClass(Button, [{
      key: "_render",
      value: function _render() {
        _get(_getPrototypeOf(Button.prototype), "_render", this).call(this);

        this.$el.html(this.text);
        this.$el.attr('type', 'button');
      }
    }, {
      key: "_bind",
      value: function _bind() {
        _get(_getPrototypeOf(Button.prototype), "_bind", this).call(this);

        this.$el.on('click', $.proxy(this.onClick, this));
      }
    }, {
      key: "onClick",
      value: function onClick(e) {
        this.emit('beforeClick', e);

        if (this.handler) {
          this.handler.call(this, e);
        }

        this.emit('afterClick', e);
      }
    }, {
      key: "addChild",
      value: function addChild() {
        throw '暂时不支持添加子组件';
      }
    }]);

    return Button;
  }(_component["default"]);

  module.exports = Button;
});

},{"../core/component":7}],2:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../core/component", "./button"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../core/component"), require("./button"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.component, global.button);
    global.dropdown = mod.exports;
  }
})(this, function (_component, _button) {
  "use strict";

  _component = _interopRequireDefault(_component);
  _button = _interopRequireDefault(_button);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

  function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  var Dropdown =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown(options) {
      var _this;

      _classCallCheck(this, Dropdown);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this, options));
      _this.text = '';
      _this.menuList = [];
      _this.className = (_this.prefix ? _this.prefix + '-' : '') + 'dropdown';
      return _this;
    }

    _createClass(Dropdown, [{
      key: "_render",
      value: function _render() {
        _get(_getPrototypeOf(Dropdown.prototype), "_render", this).call(this);

        this.addToggle();
        this.addMenuList();
      }
    }, {
      key: "_bind",
      value: function _bind() {
        _get(_getPrototypeOf(Dropdown.prototype), "_bind", this).call(this);

        var self = this; // 点击非下拉菜单位置的隐藏弹窗

        $(document).on('click', function (e) {
          if (!(self.$el.is(e.target) || self.$el.has(e.target).length > 0 || self.$dropdownMenu.is(e.target) || self.$dropdownMenu.has(e.target).length)) {
            self.$dropdownMenu.hide();
          }
        });
      }
    }, {
      key: "addToggle",
      value: function addToggle() {
        var self = this;
        this.addChild(new _button["default"]({
          text: this.text,
          className: 'dropdown-toggle',
          handler: function handler() {
            self.$dropdownMenu.show();
          }
        }));
      }
    }, {
      key: "addMenuList",
      value: function addMenuList() {
        var _this2 = this;

        var $wrap = $('<ul class="dropdown-menu"></ul>');

        if (this.menuList.length) {
          this.menuList.forEach(function (menu, i) {
            var $item = $('<li><a href="javascript:;">菜单' + (i + 1) + '</a></li>');
            var $link = $item.find('a');

            if (menu.handler) {
              $link.on('click', $.proxy(menu.handler, _this2));
            } else {
              $link.attr('href', menu.href);
            }

            if (menu.text) {
              $link.html(menu.text);
            }

            $wrap.append($item);
          });
        }

        this.$el.append($wrap);
        this.$dropdownMenu = $wrap;
      }
    }]);

    return Dropdown;
  }(_component["default"]);

  module.exports = Dropdown;
});

},{"../core/component":7,"./button":1}],3:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../core/component"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../core/component"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.component);
    global.popup = mod.exports;
  }
})(this, function (_component) {
  "use strict";

  _component = _interopRequireDefault(_component);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

  function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  /**
   * 弹出层仅支持编辑器
   */
  var Popup =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Popup, _Component);

    function Popup(options) {
      var _this;

      _classCallCheck(this, Popup);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Popup).call(this, options));
      _this.className = _this.prefix + 'popup'; // 默认箭头方向

      _this.direction = 'left';
      _this.animation = false;
      _this.tpl = "\n            <div class=\"arrow arrow-top\"></div>\n            <div class=\"popup-body\"></div>\n        ";
      _this.appendTo = $('body');
      _this.position = {
        left: 0,
        top: 0
      };
      _this.width = 0;
      _this.height = 0;
      return _this;
    }

    _createClass(Popup, [{
      key: "_render",
      value: function _render() {
        _get(_getPrototypeOf(Popup.prototype), "_render", this).call(this);

        this.$arrow = this.$el.find('.arrow');
        this.$arrow.css({
          left: this.position.left
        });
        this.$el.css({
          width: this.width,
          height: this.height,
          left: this.position.left,
          top: this.position.top
        }); // 弹出位置不能超出屏幕宽度
        // 箭头要对准触发弹出的中间位置
        // 点击当前不能隐藏，只有点击空白地方才能隐藏
        // 包含动画效果

        if (this.appendTo && this.appendTo.length) {
          this.$el.appendTo(this.appendTo);
        }

        if (this.animation) {
          this.$el.addClass('fadeInDown animated');
        }
      }
    }]);

    return Popup;
  }(_component["default"]);

  module.exports = Popup;
});

},{"../core/component":7}],4:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.keyCode = mod.exports;
  }
})(this, function () {
  "use strict";

  module.exports = {
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    BackSpace: 8,
    Tab: 9,
    Clear: 12,
    Enter: 13,
    Shift: 16,
    Control: 17,
    Alt: 18,
    CapeLock: 20,
    Esc: 27,
    Spacebar: 32,
    PageUp: 33,
    PageDown: 34,
    End: 35,
    Home: 36,
    LeftArrow: 37,
    UpArrow: 38,
    RightArrow: 39,
    DownArrow: 40,
    Insert: 45,
    Delete: 46,
    NumLock: 144,
    // 非数字键盘的数字
    Number_0: 48,
    Number_1: 49,
    Number_2: 50,
    Number_3: 51,
    Number_4: 52,
    Number_5: 53,
    Number_6: 54,
    Number_7: 55,
    Number_8: 56,
    Number_9: 57,
    Cancel: 3,
    Help: 6,
    // 数字键盘的数字
    NumPad_0: 96,
    NumPad_1: 97,
    NumPad_2: 98,
    NumPad_3: 99,
    NumPad_4: 100,
    NumPad_5: 101,
    NumPad_6: 102,
    NumPad_7: 103,
    NumPad_8: 104,
    NumPad_9: 105
  };
});

},{}],5:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../model/page", "../view/page", "../core/observer"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../model/page"), require("../view/page"), require("../core/observer"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.page, global.page, global.observer);
    global.page = mod.exports;
  }
})(this, function (_page, _page2, _observer) {
  "use strict";

  _page = _interopRequireDefault(_page);
  _page2 = _interopRequireDefault(_page2);
  _observer = _interopRequireDefault(_observer);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  /**
   * 页面控制器
   * 全局应用于主场景
   * 旧模式：页面中的层被激活，要弹出属性框，用于填写属性数据
   * 
   */
  var PageController =
  /*#__PURE__*/
  function (_Observer) {
    _inherits(PageController, _Observer);

    function PageController(options) {
      var _this;

      _classCallCheck(this, PageController);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(PageController).call(this, options));
      _this.model = null;
      _this.view = null;
      return _this;
    }

    _createClass(PageController, [{
      key: "init",
      value: function init() {
        this.model = new _page["default"]();
        this.view = new _page2["default"]();
        this.view.init();
      }
    }, {
      key: "center",
      value: function center() {
        var $page = this.view.$page;
        var $el = this.view.$el;
        $page.css({
          left: ($el.width() - $page.width()) / 2 + 'px',
          top: ($el.height() - $page.height()) / 2 + 'px'
        });
      }
    }]);

    return PageController;
  }(_observer["default"]);

  module.exports = PageController;
});

},{"../core/observer":9,"../model/page":12,"../view/page":14}],6:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./observer"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("./observer"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.observer);
    global.base = mod.exports;
  }
})(this, function (_observer) {
  "use strict";

  _observer = _interopRequireDefault(_observer);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  /**
   * 基础类
   */
  var Base =
  /*#__PURE__*/
  function (_Observer) {
    _inherits(Base, _Observer);

    /**
     * 构造函数
     * @param options
     */
    function Base(options) {
      var _this;

      _classCallCheck(this, Base);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Base).call(this, options)); // 取得第一个参数为配置

      _this.options = options;
      /**
       * 组件命名空间
       * @type {string}
       */

      _this.namespace = '';
      /**
       * Html标签
       * @type {string}
       */

      _this.tagName = 'div';
      /**
       * 当前元素
       * @type {null} jQuery对象| HtmlElement
       */

      _this.$el = null;
      /**
       * 是否渲染
       * @type {boolean}
       */

      _this.renderred = false;
      /**
       * 模板
       * @type {string}
       */

      _this.tpl = '';
      /**
       * 前缀
       */

      _this.prefix = '';
      _this.className = '';
      /**
       * 添加到指定对象
       */

      _this.appendTo = null;
      return _this;
    }
    /**
     * 初始化
     * 钩子可以放到初始化里面定义
     */


    _createClass(Base, [{
      key: "init",
      value: function init() {
        var options = this.options; // 把传入参数都赋值到预定的属性上，所以需要先声明属性，否则会出现赋值不了的情况
        // 如果传入的是已定义的方法怎么办？会覆盖掉，一旦方法被重写了，功能就会失效

        for (var k in options) {
          if (this.hasOwnProperty(k) && (options[k] !== null || options[k] !== undefined)) {
            this[k] = options[k];
          }
        }

        this.render();
        this.bind();
      }
      /**
       * 创建元素
       */

    }, {
      key: "createElement",
      value: function createElement() {
        if (!this.tagName) {
          this.tagName = 'div';
        }

        return $(document.createElement(this.tagName));
      }
      /**
       * 渲染
       * 不需要继承以及重写
       */

    }, {
      key: "render",
      value: function render() {
        // 新增四个钩子
        this.emit('beforeRender');

        this._render();

        this.emit('afterRender'); // 已经执行渲染，不包括异步

        this.renderred = true;
      }
      /**
       * 子类可以继承以及重写
       */

    }, {
      key: "_render",
      value: function _render() {
        this.$el = this.$el || this.createElement();
        this.$el.attr('tabindex', 0);

        if (this.className) {
          this.$el.addClass(this.className);
        }

        if (this.tpl) {
          this.$el.html(this.tpl);
        }
      }
      /**
       * 异步渲染
       */

    }, {
      key: "asyncRender",
      value: function asyncRender() {
        this.emit('beforeAsyncRender');

        this._asyncRender();

        this.emit('afterAsyncRender');
      }
    }, {
      key: "_asyncRender",
      value: function _asyncRender() {}
      /**
       * 绑定事件
       * 子类不需要继承以及重写
       */

    }, {
      key: "bind",
      value: function bind() {
        this.emit('beforeBind');

        this._bind();

        this.emit('afterBind');
      }
      /**
       * 绑定事件
       * 子类可以继承以及重写
       */

    }, {
      key: "_bind",
      value: function _bind() {
        var self = this;
        this.$el.on('click', function (e) {
          self.$el.addClass('focused');
        });
        $(document).on('click', function (e) {
          if (!(self.$el.is(e.target) || self.$el.has(e.target).length)) {
            self.$el.removeClass('focused');
          }
        });
      }
      /**
       * 销毁
       * 子类不需要继承以及重写
       */

    }, {
      key: "destroy",
      value: function destroy() {
        this.emit('beforeDestroy');

        this._destroy();

        this.emit('afterDestroy');
      }
      /**
       * 销毁
       * 子类可以继承以及重写
       */

    }, {
      key: "_destroy",
      value: function _destroy() {}
    }]);

    return Base;
  }(_observer["default"]);

  module.exports = Base;
});

},{"./observer":9}],7:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./base"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("./base"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.base);
    global.component = mod.exports;
  }
})(this, function (_base) {
  "use strict";

  _base = _interopRequireDefault(_base);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

  function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  /**
   * 组件管理抽象类
   */
  var Component =
  /*#__PURE__*/
  function (_Base) {
    _inherits(Component, _Base);

    function Component(options) {
      var _this;

      _classCallCheck(this, Component);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Component).call(this, options));
      _this.children = [];
      _this.parent = null;
      return _this;
    } // init(){
    //     // 等创建完，并执行了组件的添加子组件操作之后，再去执行渲染子组件
    //     this.on('afterRender', this.afterRender)
    //     super.init();
    // }

    /**
     * render父级render不做其他事情，子类继承只要写_render即可，所以只要在这里执行这个，唯一要确认的是，是否会出现渲染子组件会比订阅的早
     */


    _createClass(Component, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        _get(_getPrototypeOf(Component.prototype), "render", this).call(this);

        if (this.children.length === 0) {
          return;
        }

        this.children.forEach(function (child) {
          if (!child.renderred) {
            // 如果是异步渲染则会出问题
            child.init(); // 添加到指定的元素

            if (child.appendTo) {
              child.$el.appendTo(child.appendTo);
            } else {
              _this2.$el.append(child.$el);
            }
          }
        });
      }
      /**
       * 添加多个子组件
       * @param {Array} children 子组件对象
       */

    }, {
      key: "addChildren",
      value: function addChildren(children) {
        var _this3 = this;

        if (!children || children.constructor !== Array) {
          return this;
        }

        children.forEach(function (child) {
          _this3.addChild(child);
        });
        return this;
      }
      /**
       * 添加单个子组件
       * @param {Object} child 子组件
       */

    }, {
      key: "addChild",
      value: function addChild(child) {
        var _this4 = this;

        if (!child) {
          return this;
        }

        this.children.forEach(function (c) {
          if (c === child) {
            return _this4;
          }
        });
        this.children.push(child);

        if (child.renderred) {
          this.$el.append(child.$el);
        }

        return this;
      }
    }, {
      key: "removeChild",
      value: function removeChild(child) {
        var _this5 = this;

        this.children.forEach(function (c, i) {
          if (child === c) {
            child.$el.off();
            child.$el.remove();

            _this5.children.splice(i, 1);
          }
        });
        return this;
      }
    }, {
      key: "getChildren",
      value: function getChildren() {
        return this.children;
      }
    }, {
      key: "remove",
      value: function remove() {
        if (this.parent) {
          this.parent.removeChild(this);
        }

        return this;
      }
    }, {
      key: "getChild",
      value: function getChild(index) {
        return this.children[index];
      }
    }, {
      key: "getIndex",
      value: function getIndex(child) {
        this.children.forEach(function (c, i) {
          if (c === child) {
            return i;
          }
        });
        return -1;
      }
    }, {
      key: "getAncestor",
      value: function getAncestor(parent) {
        if (this.parent) {
          if (this.parent === parent) {
            return this.parent;
          }

          return this.parent.getAncestor(parent);
        }

        return null;
      }
    }, {
      key: "hasChild",
      value: function hasChild(child) {
        this.children.forEach(function (c) {
          if (c === child) {
            return true;
          }
        });
        return false;
      }
    }, {
      key: "filter",
      value: function filter(fn) {
        if (!fn) {
          return null;
        }

        var ret = [];
        this.children.forEach(function (c, i) {
          if (fn(c, i)) {
            ret.push(c);
          }
        });
        return ret;
      }
    }]);

    return Component;
  }(_base["default"]);

  module.exports = Component;
});

},{"./base":6}],8:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./observer"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("./observer"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.observer);
    global.model = mod.exports;
  }
})(this, function (_observer) {
  "use strict";

  _observer = _interopRequireDefault(_observer);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  var Model =
  /*#__PURE__*/
  function (_Observer) {
    _inherits(Model, _Observer);

    function Model(options) {
      var _this;

      _classCallCheck(this, Model);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Model).call(this, options));
      _this.data = {};
      _this.views = [];
      return _this;
    }

    _createClass(Model, [{
      key: "addView",
      value: function addView(view) {
        this.views.push(view);
      }
    }, {
      key: "removeView",
      value: function removeView(view) {
        var _this2 = this;

        this.views.forEach(function (i, v) {
          if (v === view) {
            _this2.views.splice(i, 1);
          }
        });
      }
    }, {
      key: "removeAllView",
      value: function removeAllView() {
        this.views.length = 0;
      }
    }, {
      key: "getViews",
      value: function getViews() {
        return this.views;
      }
    }, {
      key: "set",
      value: function set(key, value) {
        this.data[key] = value;
      }
    }, {
      key: "get",
      value: function get(key) {
        return this.data[key];
      }
    }]);

    return Model;
  }(_observer["default"]);

  module.exports = Model;
});

},{"./observer":9}],9:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.observer = mod.exports;
  }
})(this, function () {
  "use strict";

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  /**
   * 观察者类
   */
  var Observer =
  /*#__PURE__*/
  function () {
    function Observer() {
      _classCallCheck(this, Observer);

      this.listeners = {};
    }

    _createClass(Observer, [{
      key: "on",
      value: function on(name, fn) {
        if (!this.listeners.hasOwnProperty(name)) {
          this.listeners[name] = [];
        }

        if (typeof fn === 'function') {
          this.listeners[name].push(fn);
        }

        return this;
      }
    }, {
      key: "emit",
      value: function emit(name) {
        var _this = this;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (this.listeners.hasOwnProperty(name)) {
          this.listeners[name].forEach(function (item, key, arr) {
            item.apply(_this, args);
          });
        }

        return this;
      }
    }, {
      key: "off",
      value: function off(name, fn) {
        var _this2 = this;

        if (this.listeners.hasOwnProperty(name)) {
          if (fn) {
            this.listeners[name].forEach(function (item, key, arr) {
              if (item === fn) {
                _this2.listeners[name].splice(key, 1);
              }
            });
          } else {
            delete this.listeners[name];
          }
        }

        return this;
      }
    }]);

    return Observer;
  }();

  module.exports = Observer;
});

},{}],10:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./core/observer", "./view/topbar", "./constant/keyCode", "./controller/page"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("./core/observer"), require("./view/topbar"), require("./constant/keyCode"), require("./controller/page"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.observer, global.topbar, global.keyCode, global.page);
    global.index = mod.exports;
  }
})(this, function (_observer, _topbar, _keyCode, _page) {
  "use strict";

  _observer = _interopRequireDefault(_observer);
  _topbar = _interopRequireDefault(_topbar);
  _keyCode = _interopRequireDefault(_keyCode);
  _page = _interopRequireDefault(_page);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  /**
   * 编辑器主界面
   */
  var AlbumEditor =
  /*#__PURE__*/
  function (_Observer) {
    _inherits(AlbumEditor, _Observer);

    function AlbumEditor() {
      _classCallCheck(this, AlbumEditor);

      return _possibleConstructorReturn(this, _getPrototypeOf(AlbumEditor).call(this));
    }

    _createClass(AlbumEditor, [{
      key: "init",
      value: function init() {
        /**
         * 主要分几个区域：
         * 1.操作区
         * 2.展示区
         * 3.属性弹窗
         * 页面属性放在topbar，需要有一个数据进行传递
         */
        var page = new _page["default"]();
        var topbar = new _topbar["default"](); // 点击文件的图片时

        topbar.on('click:image', function () {}); // 点击保存时

        topbar.on('save', function () {}); // 导出JSON时

        topbar.on('export', function () {}); // 导入json时

        topbar.on('import', function () {}); // 点击操作历史时

        topbar.on('history', function () {}); // 新建页面时

        topbar.on('newpage', function () {}); // 添加图层时

        topbar.on('add', function () {}); // 点击图层时

        topbar.on('layer', function () {}); // 页面设置

        topbar.on('pagesettings', function () {});
        topbar.init();
        $('#app').append(topbar.$el);
        this.bind();
        this.topbar = topbar; // 很多都是在页面上操作的，或者跟页面有关联，但是如果要降低耦合，就不能有太多关联
        // 

        page.init();
        $('#app').append(page.view.$el); // 居中

        page.center(); // $('.property').css('height', $('#app').height() + 'px');
      }
    }, {
      key: "bind",
      value: function bind() {
        $('#app').on('click', function (e) {
          $(e.target).focus();
        }); // 要监听元素的按键需要加上tabindex

        $('#app').on('keydown', function (e) {
          e.stopPropagation();
          console.log(e.keyCode);

          if (e.ctrlKey && e.keyCode === _keyCode["default"].S) {
            console.log('ctrl + s');
            return false;
          }

          return true;
        }); // 当没有获得焦点时，按了ctrl+s也要可以执行，元素获得焦点也要支持通用快捷键按键
        // ctrl+i 插入元素  i:image
        // ctrl+a 插入音乐  a:audio
        // ctrl+m 插入视频  m:media
        // ctrl+q 插入二维码 q:qrcode
        // ctrl+e 插入编辑图片 e:edit image
        // ctrl+t 插入文本  t:text
        // ctrl+p 插入页码  p:pagination
        // ctrl+l 弹出插入目录设置 l:catalog

        $(document).on('keydown', function (e) {
          // 命中快捷键return false,否则会执行浏览器的操作
          if (e.ctrlKey && e.keyCode === _keyCode["default"].S) {
            console.log('ctrl + s');
            return false;
          } // return false;
          // 否则正常走流程


          return true;
        });
      }
    }, {
      key: "test",
      value: function test(restrict) {
        var $restrict = $(restrict);
        var $el = $('<div class="box"><div class="dragEl"></div></div>').appendTo($restrict);
        var $dragEl = $el.find('.dragEl');
        var dragging = false; // let moveX = 0;
        // let moveY = 0;
        // let $num = 0;

        var startX = 0;
        var startY = 0;
        var width = $el.width();
        var height = $el.height();
        var restrictWidth = $restrict.width();
        var restrictHeight = $restrict.height();
        var origin = {
          x: 0,
          y: 0
        };
        $dragEl.on('mousedown', function (e) {
          e.preventDefault();
          e.stopPropagation();
          $(document).on('mousemove', mousemove);
          $(document).on('mouseup', mouseup); //更改鼠标状态
          //参数e为鼠标

          dragging = true; //获取鼠标坐标

          startX = e.pageX;
          startY = e.pageY; // //鼠标拖动初始化
          // moveX = 0;
          // moveY = 0;

          origin.x = $el.position().left;
          origin.y = $el.position().top;
        });
        $dragEl.on('mousemove', mousemove);
        $dragEl.on('mouseup', mouseup);

        function mouseup(e) {
          e.preventDefault();
          e.stopPropagation();
          $(document).off('mousemove', mousemove);
          $(document).off('mouseup', mouseup);
          dragging = false; // let  l = 0;
          // let  t = 0;
          // // 如果松开后超出，则以最边缘为准
          // // 分四种情况：
          // // 1.左坐标超出屏幕左边
          // // 2.上坐标超出屏幕上边
          // // 3.右坐标超出屏幕右边
          // // 4.下坐标超出屏幕下边
          // if(moveX + origin.x + width > restrictWidth){
          //     l = restrictWidth - width
          // } else if(moveX + origin.x < 0){
          //     l = 0
          // } else {
          //     l = moveX + origin.x;
          // }
          // if(moveY + origin.y + height > restrictHeight){
          //     t = restrictHeight - height
          // } else if(moveY + origin.y < 0){
          //     t = 0
          // } else {
          //     t = moveY + origin.y
          // }
          // $el.animate({
          //     'left': l + 'px',
          //     'top': t + 'px'
          // }, 400);
        }

        function mousemove(e) {
          e.preventDefault();
          e.stopPropagation(); //判断鼠标是不是被按下中移动

          if (dragging) {
            // e.pageX是鼠标坐标，坐标减去元素改变后的元素坐标是否大于容器
            // 计算可移动距离
            var moveX = e.pageX - startX;
            var moveY = e.pageY - startY;
            var l = 0;
            var t = 0; // 如果松开后超出，则以最边缘为准
            // 分四种情况：
            // 1.左坐标超出屏幕左边
            // 2.上坐标超出屏幕上边
            // 3.右坐标超出屏幕右边
            // 4.下坐标超出屏幕下边

            if (moveX + origin.x + width > restrictWidth) {
              l = restrictWidth - width;
            } else if (moveX + origin.x < 0) {
              l = 0;
            } else {
              l = moveX + origin.x;
            }

            if (moveY + origin.y + height > restrictHeight) {
              t = restrictHeight - height;
            } else if (moveY + origin.y < 0) {
              t = 0;
            } else {
              t = moveY + origin.y;
            }

            $el.css('left', l + 'px');
            $el.css('top', t + 'px');
          }
        }

        $(window).resize(function () {
          restrictWidth = $restrict.width();
          restrictHeight = $restrict.height();
        });
        var contextmenuList = [{
          text: '新建页面',
          handle: function handle(e) {
            console.log(this.innerText);
          }
        }, {
          text: '添加元素',
          handle: function handle(e) {
            console.log(this.innerText);
          }
        }, {
          text: '添加文本',
          handle: function handle(e) {
            console.log(this.innerText);
          }
        }];
        $(document).on('contextmenu', function (e) {
          if ($el.is(e.target)) {
            var $contextMenu = $('.contextmenu');

            if (!$contextMenu.length) {
              $contextMenu = $('<div class="contextmenu"></div>').appendTo('body');

              if (contextmenuList.length) {
                contextmenuList.forEach(function (item) {
                  var $item = $('<div class="contextmenu-item">' + item.text + '</div>');
                  $item.on('click', item.handle);
                  $contextMenu.append($item);
                });
              }
            }

            $contextMenu.css({
              'left': e.pageX,
              'top': e.pageY
            });
            return false;
          }

          return true;
        });
        $(document).on('click', function () {
          var $contextMenu = $('.contextmenu');

          if ($contextMenu.length) {
            $contextMenu.off('click');
            $contextMenu.remove();
          }
        });
      }
    }]);

    return AlbumEditor;
  }(_observer["default"]);

  module.exports = AlbumEditor;
});

},{"./constant/keyCode":4,"./controller/page":5,"./core/observer":9,"./view/topbar":15}],11:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.draggable = mod.exports;
  }
})(this, function () {
  "use strict";

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

  function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  /**
   * 混入拖动功能
   * @param superClass
   */
  module.exports = function (superClass) {
    return (
      /*#__PURE__*/
      function (_superClass) {
        _inherits(_class, _superClass);

        function _class() {
          var _this;

          _classCallCheck(this, _class);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, args)); // 受到约束的区域

          _this.restrict = null; // 起始横坐标

          _this.startX = 0; // 起始纵坐标

          _this.startY = 0; // 原始坐标

          _this.origin = {
            x: 0,
            y: 0
          }; // 是否拖动状态

          _this.dragging = false; // 拖动的元素，默认是整个组件

          _this.$dragEl = _this.$el;
          return _this;
        }

        _createClass(_class, [{
          key: "_render",
          value: function _render() {
            _get(_getPrototypeOf(_class.prototype), "_render", this).call(this);

            this.$dragEl = this.dragEl ? $(this.dragEl) : this.$el;
          }
        }, {
          key: "_bind",
          value: function _bind() {
            _get(_getPrototypeOf(_class.prototype), "_bind", this).call(this);

            if (this.$dragEl.length) {
              this.$dragEl.on('mousedown', $.proxy(this.onMouseDown, this));
              this.$dragEl.on('mousemove', $.proxy(this.onMouseMove, this));
              this.$dragEl.on('mouseup', $.proxy(this.onMouseUp, this));
            }
          }
        }, {
          key: "onMouseDown",
          value: function onMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
            var $el = this.$el;
            this.dragging = true;
            $(document).on('mousemove', $.proxy(this.onMouseMove, this));
            $(document).on('mouseup', $.proxy(this.onMouseUp, this));
            this.startX = e.pageX;
            this.startY = e.pageY;
            this.origin.x = $el.position().left;
            this.origin.y = $el.position().top;
          }
        }, {
          key: "onMouseMove",
          value: function onMouseMove(e) {
            e.preventDefault();
            e.stopPropagation();

            if (this.dragging) {
              var moveX = e.pageX - this.startX;
              var moveY = e.pageY - this.startY;
              var $el = this.$el;
              var origin = this.origin;
              var width = $el.width();
              var height = $el.height();
              var l = 0;
              var t = 0;
              var $restrict = this.restrict;
              var restrictWidth = 0;
              var restrictHeight = 0; // 存在约束区域

              if ($restrict && $restrict.length) {
                restrictWidth = $restrict.width();
                restrictHeight = $restrict.height();
              } // 如果松开后超出，则以最边缘为准
              // 分四种情况：
              // 1.左坐标超出屏幕左边
              // 2.上坐标超出屏幕上边
              // 3.右坐标超出屏幕右边
              // 4.下坐标超出屏幕下边
              // 如果有约束，需要不能超出限定值


              if ($restrict) {
                if (moveX + origin.x + width > restrictWidth) {
                  l = restrictWidth - width;
                } else if (moveX + origin.x < 0) {
                  l = 0;
                } else {
                  l = moveX + origin.x;
                }
              } else {
                l = moveX + origin.x;
              }

              if ($restrict) {
                if (moveY + origin.y + height > restrictHeight) {
                  t = restrictHeight - height;
                } else if (moveY + origin.y < 0) {
                  t = 0;
                } else {
                  t = moveY + origin.y;
                }
              } else {
                t = moveY + origin.y;
              }

              this.$el.css('left', l + 'px');
              this.$el.css('top', t + 'px');
            }
          }
        }, {
          key: "onMouseUp",
          value: function onMouseUp(e) {
            e.preventDefault();
            e.stopPropagation();
            this.dragging = false;
            $(document).off('mousemove', $.proxy(this.onMouseMove, this));
            $(document).off('mouseup', $.proxy(this.onMouseUp, this));
          }
        }]);

        return _class;
      }(superClass)
    );
  };
});

},{}],12:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../core/model", "./size"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../core/model"), require("./size"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.model, global.size);
    global.page = mod.exports;
  }
})(this, function (_model, _size) {
  "use strict";

  _model = _interopRequireDefault(_model);
  _size = _interopRequireDefault(_size);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  var PageModel =
  /*#__PURE__*/
  function (_Model) {
    _inherits(PageModel, _Model);

    function PageModel(options) {
      var _this;

      _classCallCheck(this, PageModel);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(PageModel).call(this, options));
      _this.data = {
        pegeStyleId: 0,
        name: '',
        handToChangeType: 1,
        autoToChangeType: 0,
        autoToChangeDuration: 0,
        fillLayoutImage: '',
        previewImage: '',
        mainBundle: new _size["default"]()
      };
      return _this;
    }

    _createClass(PageModel, [{
      key: "pageStyleId",
      set: function set(styleId) {
        this.data.pegeStyleId = styleId;
      },
      get: function get() {
        return this.data.pegeStyleId;
      }
    }, {
      key: "name",
      set: function set(name) {
        this.data.name = name;
      },
      get: function get() {
        return this.data.name;
      }
    }, {
      key: "previewImage",
      set: function set(url) {
        this.data.previewImage = url;
      },
      get: function get() {
        return this.data.previewImage;
      }
    }, {
      key: "width",
      set: function set(width) {
        this.data.mainBundle.width = width;
      },
      get: function get() {
        return this.data.mainBundle.width;
      }
    }, {
      key: "height",
      set: function set(height) {
        this.data.mainBundle.height = height;
      },
      get: function get() {
        return this.data.mainBundle.height;
      }
    }]);

    return PageModel;
  }(_model["default"]);

  module.exports = PageModel;
});

},{"../core/model":8,"./size":13}],13:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.size = mod.exports;
  }
})(this, function () {
  "use strict";

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var Size = function Size() {
    _classCallCheck(this, Size);

    this.width = 0;
    this.height = 0;
  };

  module.exports = Size;
});

},{}],14:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../../core/component", "../../mixins/draggable"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../../core/component"), require("../../mixins/draggable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.component, global.draggable);
    global.index = mod.exports;
  }
})(this, function (_component, _draggable2) {
  "use strict";

  _component = _interopRequireDefault(_component);
  _draggable2 = _interopRequireDefault(_draggable2);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

  function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  var Page =
  /*#__PURE__*/
  function (_draggable) {
    _inherits(Page, _draggable);

    function Page(options) {
      var _this;

      _classCallCheck(this, Page);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Page).call(this, options));
      _this.className = _this.prefix + 'scene';
      /**
       * 为了避免影响，最好加下前缀
       */

      _this.tpl = "\n            <div class=\"".concat(_this.prefix, "page\"></div>\n        ");
      _this.dragEl = $(document);
      return _this;
    }

    _createClass(Page, [{
      key: "_bind",
      value: function _bind() {
        _get(_getPrototypeOf(Page.prototype), "_bind", this).call(this);

        this.$page.on('click', function (e) {
          e.preventDefault();
          console.log('page clicked');
        });
      }
    }, {
      key: "_render",
      value: function _render() {
        _get(_getPrototypeOf(Page.prototype), "_render", this).call(this);

        this.$page = this.$el.find('.' + this.prefix + 'page');
      }
    }]);

    return Page;
  }((0, _draggable2["default"])(_component["default"]));

  module.exports = Page;
});

},{"../../core/component":7,"../../mixins/draggable":11}],15:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../../core/component", "../../component/button", "../../component/dropdown", "../../component/popup"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../../core/component"), require("../../component/button"), require("../../component/dropdown"), require("../../component/popup"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.component, global.button, global.dropdown, global.popup);
    global.index = mod.exports;
  }
})(this, function (_component, _button, _dropdown, _popup) {
  "use strict";

  _component = _interopRequireDefault(_component);
  _button = _interopRequireDefault(_button);
  _dropdown = _interopRequireDefault(_dropdown);
  _popup = _interopRequireDefault(_popup);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

  function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  /**
   * 顶部操作区
   * 我想实现既可以添加到子组件，又可以添到指定的子标签
   * 分成两边：
   * 一边是添加和查看
   * 一边是保存
   */
  var Topbar =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Topbar, _Component);

    function Topbar() {
      var _this;

      _classCallCheck(this, Topbar);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Topbar).call(this, args));
      _this.tpl = "\n            <div class=\"topbar-operation topbar-left\"></div>\n            <div class=\"topbar-operation topbar-right\"></div>\n            <div class=\"topbar-operation-more\"></div>\n        ";
      _this.className = _this.prefix + 'topbar';
      return _this;
    }

    _createClass(Topbar, [{
      key: "init",
      value: function init() {
        _get(_getPrototypeOf(Topbar.prototype), "init", this).call(this);

        console.log(this.getChildren());
      }
    }, {
      key: "_render",
      value: function _render() {
        // 渲染获取到$el
        _get(_getPrototypeOf(Topbar.prototype), "_render", this).call(this);

        var $el = this.$el;
        this.$left = $el.find('.topbar-left');
        this.$right = $el.find('.topbar-right');
        this.$more = $el.find('.topbar-operation-more');
        this.createLeft();
        this.createRight();
        this.createMore();
      }
      /**
       * 创建左边按钮
       */

    }, {
      key: "createLeft",
      value: function createLeft() {
        var btns = [new _button["default"]({
          text: '<span class="fa fa-plus"></span>',
          handler: this.onNewLayerDialog,
          appendTo: this.$left
        }), new _button["default"]({
          text: '<span class="fa fa-folder-open"></span>',
          handler: this.onFileManagerDialog,
          appendTo: this.$left
        }), new _button["default"]({
          text: '<span class="fa fa-navicon"></span>',
          handler: this.onLayerManagerDialog,
          appendTo: this.$left
        }), new _button["default"]({
          text: '<span class="fa fa-wrench"></span>',
          handler: this.onDynamicDataDialog,
          appendTo: this.$left
        }), new _button["default"]({
          text: '<span class="fa fa-cubes"></span>',
          handler: this.onAddComponentsDialog,
          appendTo: this.$left
        }), new _button["default"]({
          text: '<span class="fa fa-history"></span>',
          handler: this.onUserBehaviorDialog,
          appendTo: this.$left
        })];
        this.addChildren(btns);
      }
      /**
       * 创建右边按钮
       */

    }, {
      key: "createRight",
      value: function createRight() {
        var btns = [new _button["default"]({
          text: '<span class="fa fa-file"></span> 新建',
          handler: this.onCreatePage,
          appendTo: this.$right
        }), new _button["default"]({
          text: '<span class="fa fa-floppy-o"></span> 保存',
          handler: this.onSavePage,
          appendTo: this.$right
        }), new _button["default"]({
          text: '<span class="fa fa-file-o"></span> 页面设置',
          handler: this.onPageSettings,
          appendTo: this.$right
        }), new _button["default"]({
          text: '<span class="fa fa-file-o"></span> 客户端预览',
          handler: this.onAppPreview,
          appendTo: this.$right
        })];
        this.addChildren(btns);
      }
      /**
       * 隐藏的更多按钮
       */

    }, {
      key: "createMore",
      value: function createMore() {
        var dropdown = new _dropdown["default"]({
          text: '<span class="glyphicon glyphicon-option-vertical"></span>',
          appendTo: this.$more,
          menuList: [{
            text: '导入素材',
            handler: function handler(e) {
              console.log('导入素材');
            }
          }, {
            text: '导入JSON',
            handler: function handler(e) {
              console.log('导入JSON');
            }
          }, {
            text: '导出JSON',
            handler: function handler(e) {
              console.log('导出JSON');
            }
          }, {
            text: '关于',
            handler: function handler(e) {
              console.log('version 2.0');
            }
          }]
        });
        this.addChild(dropdown);
      }
    }, {
      key: "onNewLayerDialog",
      value: function onNewLayerDialog(e) {
        console.log('弹窗显示要添加图层类型');
        var $el = $(e.target);
        var offset = $el.offset();
        var popup = new _popup["default"]({
          direction: 'top',
          animation: true,
          width: 200,
          height: 500,
          // 当前触发者起始位置
          position: {
            left: offset.left - $el.width() / 2,
            top: offset.top + this.$el.outerHeight() + 25
          }
        });
        popup.init();
      }
    }, {
      key: "onFileManagerDialog",
      value: function onFileManagerDialog() {
        console.log('弹窗显示已上传的图片文件');
      }
    }, {
      key: "onLayerManagerDialog",
      value: function onLayerManagerDialog() {
        console.log('弹窗显示图层列表');
      }
    }, {
      key: "onDynamicDataDialog",
      value: function onDynamicDataDialog() {
        console.log('添加动态数据组件，减少用户选择用户动态数据的操作');
      }
    }, {
      key: "onAddComponentsDialog",
      value: function onAddComponentsDialog() {
        console.log('添加自定义组件');
      }
    }, {
      key: "onUserBehaviorDialog",
      value: function onUserBehaviorDialog() {
        console.log('弹窗显示用户操作记录');
      }
    }, {
      key: "onCreatePage",
      value: function onCreatePage() {
        console.log('弹窗显示新建页面要填写的内容');
      }
    }, {
      key: "onSavePage",
      value: function onSavePage() {
        console.log('保存页面');
      }
    }, {
      key: "onPageSettings",
      value: function onPageSettings() {
        console.log('弹窗显示页面设置');
      }
    }, {
      key: "onAppPreview",
      value: function onAppPreview() {
        console.log('客户端预览');
      }
    }]);

    return Topbar;
  }(_component["default"]);

  module.exports = Topbar;
});

},{"../../component/button":1,"../../component/dropdown":2,"../../component/popup":3,"../../core/component":7}]},{},[10])(10)
});
