(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AE = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],4:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":3,"_process":2,"inherits":1}],5:[function(require,module,exports){
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

      _this.title = '';
      return _this;
    }

    _createClass(Button, [{
      key: "_render",
      value: function _render() {
        _get(_getPrototypeOf(Button.prototype), "_render", this).call(this);

        this.$el.html(this.text);
        this.$el.attr('type', 'button');

        if (this.title) {
          this.$el.attr('title', this.title);
        }
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

},{"../core/component":12}],6:[function(require,module,exports){
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

},{"../core/component":12,"./button":5}],7:[function(require,module,exports){
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
    KEY_A: 65,
    KEY_B: 66,
    KEY_C: 67,
    KEY_D: 68,
    KEY_E: 69,
    KEY_F: 70,
    KEY_G: 71,
    KEY_H: 72,
    KEY_I: 73,
    KEY_J: 74,
    KEY_K: 75,
    KEY_L: 76,
    KEY_M: 77,
    KEY_N: 78,
    KEY_O: 79,
    KEY_P: 80,
    KEY_Q: 81,
    KEY_R: 82,
    KEY_S: 83,
    KEY_T: 84,
    KEY_U: 85,
    KEY_V: 86,
    KEY_W: 87,
    KEY_X: 88,
    KEY_Y: 89,
    KEY_Z: 90,
    KEY_F1: 112,
    KEY_F2: 113,
    KEY_F3: 114,
    KEY_F4: 115,
    KEY_F5: 116,
    KEY_F6: 117,
    KEY_F7: 118,
    KEY_F8: 119,
    KEY_F9: 120,
    KEY_F10: 121,
    KEY_F11: 122,
    KEY_F12: 123,
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

},{}],8:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../model/image", "../view/layer/image", "../view/property/base", "../view/property/image", "../model/layer", "../core/observer"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../model/image"), require("../view/layer/image"), require("../view/property/base"), require("../view/property/image"), require("../model/layer"), require("../core/observer"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.image, global.image, global.base, global.image, global.layer, global.observer);
    global.image = mod.exports;
  }
})(this, function (_image, _image2, _base, _image3, _layer, _observer) {
  "use strict";

  _image = _interopRequireDefault(_image);
  _image2 = _interopRequireDefault(_image2);
  _base = _interopRequireDefault(_base);
  _image3 = _interopRequireDefault(_image3);
  _layer = _interopRequireDefault(_layer);
  _observer = _interopRequireDefault(_observer);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  /**
   * 图片层类
   * 图片层会触发属性框
   * 图片层的数据与属性框是一致
   * 属性框改变属性会影响到图片层
   * 
   */
  var ImageLayer =
  /*#__PURE__*/
  function (_Observer) {
    _inherits(ImageLayer, _Observer);

    function ImageLayer(options) {
      var _this;

      _classCallCheck(this, ImageLayer);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageLayer).call(this, options));

      var self = _assertThisInitialized(_this); // 图层数据


      _this.info = new _image["default"](); // 基础数据

      _this.base = new _layer["default"]();
      /**
       * 属性区
       */

      _this.property = options.property; // 图层的视图比较特殊，是由多个model组成

      _this.view = new _image2["default"]({
        model: {
          base: _this.base,
          info: _this.info
        },
        events: {
          click: function click() {
            self.activated();
          }
        },
        property: _this.property
      }); // 基础属性信息

      _this.baseProperty = new _base["default"]({
        model: _this.base
      }); // 层信息，层的数据受到基础数据影响，也会影响到基础数据，比如图片上传后，基础数据的大小会跟着更新

      _this.infoProperty = new _image3["default"]({
        model: _this.info
      });
      /**
       * view会产生变化的是基础数据，信息数据只有填写内容时才会变化
       * 数据变动需要更新图层的状态
       * 上传图片后，数据也要更新，图片的大小与base的大小同步
       * 怎么数据驱动视图？
       * 做一下如下改动
       * 把每个区域当成一个视图，model传入这些视图里，如果视图发生变化，则更新model
       * model发生变化，也会更新对应的视图，这样model需要提供订阅能力，让每个视图都能订阅，触发时能及时更新
       */

      _this.options = options;
      return _this;
    }

    _createClass(ImageLayer, [{
      key: "init",
      value: function init() {
        var self = this; // 激活时做什么事
        // 激活就展示属性

        this.view.on('layer:activated', function () {
          self.activated();
        });
        /**
         * 更新属性时做什么事
         */

        this.view.on('layer:moving', function (result) {
          if (result) {
            self.base.y = result.top;
            self.base.x = result.left;
            console.log(self.base);
          }
        }); // 显示图层

        this.view.init();

        if (this.options.width) {
          this.view.setWidth(this.options.width);
        }

        if (this.options.height) {
          this.view.setHeight(this.options.height);
        }

        this.baseProperty.init();
        this.infoProperty.init();
      }
    }, {
      key: "activated",
      value: function activated() {
        this.base.active = true;
        this.view.activated();

        if (this.property) {
          this.property.clear();
          this.property.$el.append(this.baseProperty.$el);
          this.property.$el.append(this.infoProperty.$el);
          this.property.show();
        }
      }
      /**
       * 
       * @param {*} property 属性区
       */

    }, {
      key: "setProperty",
      value: function setProperty(property) {
        this.property = property;
        this.view.property = property;
      }
    }]);

    return ImageLayer;
  }(_observer["default"]);

  module.exports = ImageLayer;
});

},{"../core/observer":14,"../model/image":17,"../model/layer":18,"../view/layer/image":29,"../view/property/base":31,"../view/property/image":32}],9:[function(require,module,exports){
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

},{"../core/observer":14,"../model/page":20,"../view/page":30}],10:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../view/topbar", "../view/topbar/newLayer", "../core/observer", "../component/button", "./image"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../view/topbar"), require("../view/topbar/newLayer"), require("../core/observer"), require("../component/button"), require("./image"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.topbar, global.newLayer, global.observer, global.button, global.image);
    global.topbar = mod.exports;
  }
})(this, function (_topbar, _newLayer, _observer, _button, _image) {
  "use strict";

  _topbar = _interopRequireDefault(_topbar);
  _newLayer = _interopRequireDefault(_newLayer);
  _observer = _interopRequireDefault(_observer);
  _button = _interopRequireDefault(_button);
  _image = _interopRequireDefault(_image);

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

  var LayerEnum = {
    Text: 'text',
    Image: 'image',
    EditImage: 'editimage',
    Video: 'video',
    Audio: 'audio'
    /**
     * 点击事件驱动视图
     * 所以按钮的事件放在controller
     */

  };

  var TopbarController =
  /*#__PURE__*/
  function (_Observer) {
    _inherits(TopbarController, _Observer);

    function TopbarController(options) {
      var _this;

      _classCallCheck(this, TopbarController);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(TopbarController).call(this, options)); // 顶部栏视图

      _this.view = new _topbar["default"]();
      return _this;
    }

    _createClass(TopbarController, [{
      key: "init",
      value: function init() {
        this.view.init(); // 先渲染再添加进去

        this.addLeftButton();
        this.addRightButton();
        this.addMoreMenuList();
      }
      /**
       * 添加左侧按钮
       */

    }, {
      key: "addLeftButton",
      value: function addLeftButton() {
        var self = this;
        this.view.addButton([new _button["default"]({
          text: '<span class="fa fa-plus"></span>',
          title: '添加图层',
          handler: function handler(e) {
            self.onNewLayerDialog(e);
          }
        }), new _button["default"]({
          text: '<span class="fa fa-folder-open"></span>',
          title: '素材列表',
          handler: function handler(e) {
            self.onFileManagerDialog(e);
          }
        }), new _button["default"]({
          text: '<span class="fa fa-navicon"></span>',
          title: '图层管理器',
          handler: function handler(e) {
            self.onLayerManagerDialog(e);
          }
        }), new _button["default"]({
          text: '<span class="fa fa-cloud"></span>',
          title: '动态图层',
          handler: function handler(e) {
            self.onDynamicDataDialog(e);
          }
        }), new _button["default"]({
          text: '<span class="fa fa-cubes"></span>',
          title: '自定义组件',
          handler: function handler(e) {
            self.onAddComponentsDialog(e);
          }
        }), new _button["default"]({
          text: '<span class="fa fa-history"></span>',
          title: '用户操作',
          handler: function handler(e) {
            self.onUserBehaviorDialog(e);
          }
        })], 'left');
      }
      /**
       * 添加右侧按钮
       */

    }, {
      key: "addRightButton",
      value: function addRightButton() {
        var self = this;
        this.view.addButton([new _button["default"]({
          text: '<span class="fa fa-file"></span> 新建',
          handler: function handler() {
            self.onCreatePage();
          }
        }), new _button["default"]({
          text: '<span class="fa fa-floppy-o"></span> 保存',
          handler: function handler() {
            self.onSavePage();
          }
        }), new _button["default"]({
          text: '<span class="fa fa-file-o"></span> 页面设置',
          handler: function handler() {
            self.onPageSettings();
          }
        })], 'right');
      }
      /**
       * 添加更多下拉菜单
       */

    }, {
      key: "addMoreMenuList",
      value: function addMoreMenuList() {
        this.view.addMenuList([{
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
        }]);
      }
    }, {
      key: "onNewLayerDialog",
      value: function onNewLayerDialog() {
        var self = this; // 弹窗组件，用于展示需要添加各种图层，目前是作为视图

        var view = new _newLayer["default"]();
        view.addLayerType([{
          icon: 'font',
          text: '文本',
          type: 'text'
        }, {
          icon: 'image',
          text: '元素',
          type: 'image'
        }, {
          icon: 'object-group',
          text: '编辑图片',
          type: 'editimage'
        }, {
          icon: 'film',
          text: '视频',
          type: 'video'
        }, {
          icon: 'music',
          text: '音频',
          type: 'audio'
        }]); // 点击之后

        view.on('click:layer', function (e, type) {
          self.createLayer(type);
        });
        view.show();
      }
    }, {
      key: "createLayer",
      value: function createLayer(type) {
        var instance = null; // 先展示再放到页面里面

        switch (type) {
          // 文本框
          case LayerEnum.Text:
            break;
          // 元素框

          case LayerEnum.Image:
            instance = new _image["default"]({
              width: 200,
              height: 200
            });
            break;
          // 编辑图片框

          case LayerEnum.EditImage:
            break;
          // 视频框

          case LayerEnum.Video:
            break;
          // 音频框

          case LayerEnum.Audio:
            break;
        }

        if (instance) {
          instance.init();
        }

        this.emit('create:layer', instance);
      }
    }]);

    return TopbarController;
  }(_observer["default"]);

  module.exports = TopbarController;
});

},{"../component/button":5,"../core/observer":14,"../view/topbar":34,"../view/topbar/newLayer":35,"./image":8}],11:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./observer", "util"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("./observer"), require("util"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.observer, global.util);
    global.base = mod.exports;
  }
})(this, function (_observer, _util) {
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
      /**
       * 样式类名
       */

      _this.className = '';
      /**
       * 添加到指定对象
       */

      _this.appendTo = null;
      /**
       * 元素ID属性，有些地方需要通过ID来取得，所以增加这个属性
       */

      _this.id = '';
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

        return $(document.createElement(this.tagName)).attr('id', this.id);
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
      value: function bind(args) {
        this.emit('beforeBind');

        this._bind(args);

        this.emit('afterBind');
      }
      /**
       * 绑定事件
       * 子类可以继承以及重写
       */

    }, {
      key: "_bind",
      value: function _bind(args) {
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
      value: function _destroy() {
        this.$el.off();
        this.$el.remove();
      }
    }]);

    return Base;
  }(_observer["default"]);

  module.exports = Base;
});

},{"./observer":14,"util":4}],12:[function(require,module,exports){
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
            child.init(); // 添加到指定的元素，有个风险，如果appendTo不是当前组件下的话，添加是其他地方的，可能会出问题

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
          if (child.appendTo) {
            child.appendTo.append(child.$el);
          } else {
            this.$el.append(child.$el);
          }
        }

        return this;
      }
      /**
       * 移除某个子组件
       * @param {Component} child 子组件
       */

    }, {
      key: "removeChild",
      value: function removeChild(child) {
        var _this5 = this;

        this.children.forEach(function (c, i) {
          if (child === c) {
            child.destroy();

            _this5.children.splice(i, 1);
          }
        });
        return this;
      }
      /**
       * 移除所有子组件
       */

    }, {
      key: "removeAllChild",
      value: function removeAllChild() {
        var _this6 = this;

        this.children.forEach(function (child, i) {
          child.destroy();

          _this6.children.splice(i, 1);
        });
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

},{"./base":11}],13:[function(require,module,exports){
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
      return _this;
    }

    _createClass(Model, [{
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

},{"./observer":14}],14:[function(require,module,exports){
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
    }, {
      key: "once",
      value: function once(name) {
        var _this3 = this;

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        if (this.listeners.hasOwnProperty(name)) {
          this.listeners[name].forEach(function (item, key, arr) {
            item.apply(_this3, args);

            _this3.off(name, item);
          });
        }

        return this;
      }
    }]);

    return Observer;
  }();

  module.exports = Observer;
});

},{}],15:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./core/observer", "./controller/topbar", "./constant/keyCode", "./controller/page", "./view/property/property"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("./core/observer"), require("./controller/topbar"), require("./constant/keyCode"), require("./controller/page"), require("./view/property/property"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.observer, global.topbar, global.keyCode, global.page, global.property);
    global.index = mod.exports;
  }
})(this, function (_observer, _topbar, _keyCode, _page, _property) {
  "use strict";

  _observer = _interopRequireDefault(_observer);
  _topbar = _interopRequireDefault(_topbar);
  _keyCode = _interopRequireDefault(_keyCode);
  _page = _interopRequireDefault(_page);
  _property = _interopRequireDefault(_property);

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
    /**
     * 初始化先加载数据，比如字典等
     */


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
        var topbar = new _topbar["default"]();
        var property = new _property["default"](); // 点击文件的图片时

        topbar.on('click:image', function (instance) {// page.add(instance);
        }); // 点击保存时

        topbar.on('save', function () {}); // 导出JSON时

        topbar.on('export', function () {}); // 导入json时

        topbar.on('import', function () {}); // 点击操作历史时

        topbar.on('history', function () {}); // 新建页面时

        topbar.on('newpage', function () {}); // 添加图层时

        topbar.on('add', function () {}); // 点击图层时

        topbar.on('layer', function () {}); // 页面设置

        topbar.on('pagesettings', function () {});
        topbar.on('create:layer', function (instance) {
          if (instance) {
            // 属性展示在哪里
            instance.setProperty(property); // 插入所在元素

            instance.view.appendTo = page.view.$page; // 拖动限制区域

            instance.view.restrict = page.view.$page;
            page.view.addChild(instance.view);
          }
        });
        topbar.init();
        property.init();
        page.init();
        $('#app').append(property.$el);
        $('#app').append(topbar.view.$el);
        this.bind();
        this.topbar = topbar;
        this.property = property; // 很多都是在页面上操作的，或者跟页面有关联，但是如果要降低耦合，就不能有太多关联

        $('#app').append(page.view.$el); // 居中

        page.center();
        property.initHeight();
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

          if (e.ctrlKey && e.keyCode === _keyCode["default"].KEY_S) {
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
          if (e.ctrlKey && e.keyCode === _keyCode["default"].KEY_S) {
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

},{"./constant/keyCode":7,"./controller/page":9,"./controller/topbar":10,"./core/observer":14,"./view/property/property":33}],16:[function(require,module,exports){
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

        function _class(args) {
          var _this;

          _classCallCheck(this, _class);

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
            e.stopPropagation(); // 点击执行之前

            this.emit('layer:beforemove', e);
            var $el = this.$el;
            this.dragging = true;
            $(document).on('mousemove', $.proxy(this.onMouseMove, this));
            $(document).on('mouseup', $.proxy(this.onMouseUp, this));
            this.startX = e.pageX;
            this.startY = e.pageY;
            this.origin.x = $el.position().left;
            this.origin.y = $el.position().top; // 点击执行之后

            this.emit('layer:movestart', {
              startX: this.startX,
              startY: this.startY
            }, e);
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
              this.$el.css('top', t + 'px'); // 拖动中

              this.emit('layer:moving', {
                left: l,
                top: t
              }, e);
            }
          }
        }, {
          key: "onMouseUp",
          value: function onMouseUp(e) {
            e.preventDefault();
            e.stopPropagation();
            this.dragging = false;
            $(document).off('mousemove', $.proxy(this.onMouseMove, this));
            $(document).off('mouseup', $.proxy(this.onMouseUp, this)); // 拖动结束

            this.emit('layer:moveend', {
              left: this.$el.position().left,
              top: this.$el.position().top
            }, e);
          }
        }]);

        return _class;
      }(superClass)
    );
  };
});

},{}],17:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../core/model", "../util/index"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../core/model"), require("../util/index"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.model, global.index);
    global.image = mod.exports;
  }
})(this, function (_model, _index) {
  "use strict";

  _model = _interopRequireDefault(_model);

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

  var ImageModel =
  /*#__PURE__*/
  function (_Model) {
    _inherits(ImageModel, _Model);

    function ImageModel(options) {
      var _this;

      _classCallCheck(this, ImageModel);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageModel).call(this, options));

      if (!_this.data) {
        _this.data = {
          url: '',
          imageWidth: 0,
          imageHeight: 0
        };
      }

      return _this;
    }

    _createClass(ImageModel, [{
      key: "url",
      set: function set(url) {
        var img = new Image();
        var self = this;
        img.src = url;

        if (img.complete) {
          complete();
        } else {
          img.onload = function () {
            complete();
          };
        }

        function complete() {
          self.width = img.width;
          self.height = img.height; // 订阅触发更新地址

          self.emit('sync:url');
        }

        this.data.url = url;
      },
      get: function get() {
        return this.data.url;
      }
    }, {
      key: "width",
      set: function set(width) {
        this.data.imageWidth = _index.convert.toInt(width);
        this.emit('sync:width', width);
      },
      get: function get() {
        return this.data.imageWidth;
      }
    }, {
      key: "height",
      set: function set(height) {
        this.data.imageHeight = _index.convert.toInt(height);
        this.emit('sync:height', height);
      },
      get: function get() {
        return this.data.imageHeight;
      }
    }]);

    return ImageModel;
  }(_model["default"]);

  module.exports = ImageModel;
});

},{"../core/model":13,"../util/index":26}],18:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../core/model", "./position", "../util/index"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../core/model"), require("./position"), require("../util/index"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.model, global.position, global.index);
    global.layer = mod.exports;
  }
})(this, function (_model, _position, _index) {
  "use strict";

  _model = _interopRequireDefault(_model);
  _position = _interopRequireDefault(_position);

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
   * 基础信息层
   * 只展示坐标，大小，层级，透明度，角度
   */
  var BaseLayerModel =
  /*#__PURE__*/
  function (_Model) {
    _inherits(BaseLayerModel, _Model);

    function BaseLayerModel(options) {
      var _this;

      _classCallCheck(this, BaseLayerModel);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseLayerModel).call(this, options));
      _this.data = {
        level: 1,
        alpha: 1,
        angle: 0,
        loop: false,
        animationSequence: [],
        position: new _position["default"](),
        editEnable: false,
        interfaceHook: '',
        isFillToParentLayerVisibleRectangle: false
      };
      return _this;
    }

    _createClass(BaseLayerModel, [{
      key: "setData",
      value: function setData(data) {
        var _this2 = this;

        if (data && _typeof(data) === 'object') {
          data.forEach(function (value, key) {
            if (_this2.data.hasOwnProperty(key)) {
              _this2.data[key] = value;
            }
          });
        }
      }
    }, {
      key: "getData",
      value: function getData() {
        return this.data;
      }
    }, {
      key: "level",
      set: function set(level) {
        this.data.level = _index.convert.toInt(level);
        this.emit('sync:level', level);
      },
      get: function get() {
        return this.data.level;
      }
    }, {
      key: "alpha",
      set: function set(alpha) {
        this.data.alpha = _index.convert.toInt(alpha);
        this.emit('sync:alpha', alpha);
      },
      get: function get() {
        return this.data.alpha;
      }
    }, {
      key: "x",
      set: function set(x) {
        this.data.position.x = x;
        this.emit('sync:x', x);
      },
      get: function get() {
        return this.data.position.x;
      }
    }, {
      key: "y",
      set: function set(y) {
        this.data.position.y = y;
        this.emit('sync:y', y);
      },
      get: function get() {
        return this.data.position.y;
      }
    }, {
      key: "width",
      set: function set(width) {
        this.data.position.width = width;
        this.emit('sync:width', width);
      },
      get: function get() {
        return this.data.position.width;
      }
    }, {
      key: "height",
      set: function set(height) {
        this.data.position.height = height;
        this.emit('sync:height', height);
      },
      get: function get() {
        return this.data.position.height;
      }
    }, {
      key: "angle",
      set: function set(angle) {
        this.data.angle = angle;
        this.emit('sync:angle', angle);
      },
      get: function get() {
        return this.data.angle;
      }
    }, {
      key: "active",
      set: function set(active) {
        this._active = active;
      },
      get: function get() {
        return this._active;
      }
    }]);

    return BaseLayerModel;
  }(_model["default"]);

  module.exports = BaseLayerModel;
});

},{"../core/model":13,"../util/index":26,"./position":21}],19:[function(require,module,exports){
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
    global.origin = mod.exports;
  }
})(this, function () {
  "use strict";

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var Origin = function Origin() {
    _classCallCheck(this, Origin);

    this.x = 0;
    this.y = 0;
  };

  module.exports = Origin;
});

},{}],20:[function(require,module,exports){
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

},{"../core/model":13,"./size":22}],21:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./size", "./origin", "../util/index"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("./size"), require("./origin"), require("../util/index"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.size, global.origin, global.index);
    global.position = mod.exports;
  }
})(this, function (_size, _origin, _index) {
  "use strict";

  _size = _interopRequireDefault(_size);
  _origin = _interopRequireDefault(_origin);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var Position =
  /*#__PURE__*/
  function () {
    function Position() {
      _classCallCheck(this, Position);

      this.size = new _size["default"]();
      this.origin = new _origin["default"]();
    }

    _createClass(Position, [{
      key: "x",
      set: function set(v) {
        this.origin.x = _index.convert.toInt(v);
      },
      get: function get() {
        return this.origin.x;
      }
    }, {
      key: "y",
      set: function set(v) {
        this.origin.y = _index.convert.toInt(v);
      },
      get: function get() {
        return this.origin.y;
      }
    }, {
      key: "width",
      set: function set(w) {
        this.size.width = _index.convert.toInt(w);
      },
      get: function get() {
        return this.size.width;
      }
    }, {
      key: "height",
      set: function set(h) {
        this.size.height = _index.convert.toInt(h);
      },
      get: function get() {
        return this.size.height;
      }
    }]);

    return Position;
  }();

  module.exports = Position;
});

},{"../util/index":26,"./origin":19,"./size":22}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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
    global.convert = mod.exports;
  }
})(this, function () {
  "use strict";

  module.exports = {
    toNumber: function toNumber(v) {
      if (typeof v !== 'number') {
        v = Number(v);
      }

      if (isNaN(v)) {
        v = 0;
      }

      return v;
    },

    /**
     * 转换成整形
     * @param {Any} v 需要转换的值
     */
    toInt: function toInt(v) {
      return parseInt(this.toNumber(v));
    },
    toFloat: function toFloat(v) {
      return parseFloat(this.toNumber(v));
    },
    toBoolean: function toBoolean(v) {
      if (v === 'false' || v === '0') {
        v = false;
      }

      return !!v;
    }
  };
});

},{}],24:[function(require,module,exports){
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
    global.deepClone = mod.exports;
  }
})(this, function () {
  "use strict";

  /**
   * 深度拷贝
   * 后续参数
   *
   * 浅拷贝用Object.assign即可
   */
  function deepClone() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var target = args[0];

    for (var i = 1; i < args.length; i++) {
      for (var k in args[i]) {
        if (args[i].hasOwnProperty(k)) {
          target[k] = args[i][k];
        }
      }
    }

    return target;
  }

  module.exports = deepClone;
});

},{}],25:[function(require,module,exports){
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
    global.firstUpperCase = mod.exports;
  }
})(this, function () {
  "use strict";

  function firstUpperCase(s) {
    return s.toLowerCase().replace(/( |^)[a-z]/g, function (L) {
      return L.toUpperCase();
    });
  }

  module.exports = firstUpperCase;
});

},{}],26:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./firstUpperCase", "./deepClone", "./convert", "./validate"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("./firstUpperCase"), require("./deepClone"), require("./convert"), require("./validate"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.firstUpperCase, global.deepClone, global.convert, global.validate);
    global.index = mod.exports;
  }
})(this, function (_firstUpperCase, _deepClone, _convert, _validate) {
  "use strict";

  _firstUpperCase = _interopRequireDefault(_firstUpperCase);
  _deepClone = _interopRequireDefault(_deepClone);
  _convert = _interopRequireDefault(_convert);
  _validate = _interopRequireDefault(_validate);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  module.exports = {
    firstUpperCase: _firstUpperCase["default"],
    deepClone: _deepClone["default"],
    convert: _convert["default"],
    validate: _validate["default"]
  };
});

},{"./convert":23,"./deepClone":24,"./firstUpperCase":25,"./validate":27}],27:[function(require,module,exports){
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
    global.validate = mod.exports;
  }
})(this, function () {
  "use strict";

  module.exports = {
    isNumber: function isNumber(v) {
      return /^\d+$/.test(v);
    }
  };
});

},{}],28:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../../core/base", "../../mixins/draggable"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../../core/base"), require("../../mixins/draggable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.base, global.draggable);
    global.base = mod.exports;
  }
})(this, function (_base, _draggable) {
  "use strict";

  _base = _interopRequireDefault(_base);
  _draggable = _interopRequireDefault(_draggable);

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
   * 图层基础类
   * 基础功能清单：
   * 1.点击监视，可做激活图层
   * 2.
   */
  var BaseLayer =
  /*#__PURE__*/
  function (_Draggable) {
    _inherits(BaseLayer, _Draggable);

    function BaseLayer(options) {
      var _this;

      _classCallCheck(this, BaseLayer);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseLayer).call(this, options));
      /**
       * 层类型
       * @type {string}
       */

      _this.type = 0;
      /**
       * 基础数据模型
       * @type {Model}
       */

      _this.baseModel = null;
      /**
       * 层信息数据模型
       */

      _this.infoModel = null;
      /**
       * 默认样式
       * @type {[*]}
       */

      _this.className = _this.prefix + 'layer';
      /**
       * 自定义事件
       * click, mouseover, mouseleave
       */

      _this.events = {};
      /**
       * 属性区，用于判断点击图层时是否取消激活
       */

      _this.property = null;
      return _this;
    }

    _createClass(BaseLayer, [{
      key: "init",
      value: function init() {
        _get(_getPrototypeOf(BaseLayer.prototype), "init", this).call(this);
      }
    }, {
      key: "_render",
      value: function _render() {
        _get(_getPrototypeOf(BaseLayer.prototype), "_render", this).call(this); // jquery对象，可使用jquery的方法


        var $el = this.$el;
        /**
         * 添加模板内容
         * 共三个层，内容层，标签层，子层，提示层
         * 
         * 标签需要判断位置，根据子层来做判断
         * 与子层的切换可以用tab支持，避免层重叠无法操作的情况，也可以用层管理器操作
         * body为层内容，比如图片，图标等
         * children是子层，子层比body层级高
         * type为层标签，用于标识这个层是什么类型的层 ==== 到时用颜色区分
         * tooltip为层提示信息，用于提示层的一些关键信息
         * 
         * 无法解决层重叠的问题，已经内容切换问题，怎么通过tab来解决？
         * 
         * 提示层应该改成mixin的方式
         * 
         * layer-btns是放图层的按钮，可放：删除、切换类型、复制、加号
         */

        $el.html("\n            <div class=\"layer-body\"></div>\n            <div class=\"layer-children\"></div>\n            <div class=\"layer-type\"></div>\n            <div class=\"layer-btns\">\n                <button>+</button>\n            </div>\n        "); // 图层内容区，内容

        this.$body = $el.find('.layer-body'); // 显示图层的分类

        this.$name = $el.find('.layer-type'); // 子层

        this.$children = $el.find('.layer-children'); // 提示

        this.$tooltip = $el.find('.layer-tooltip');
      }
    }, {
      key: "_bind",
      value: function _bind() {
        _get(_getPrototypeOf(BaseLayer.prototype), "_bind", this).call(this);

        var $el = this.$el;
        var self = this;
        var $body = this.$body;
        $el.on('click', function (e) {
          e.stopPropagation();
        }); // 选中，选中会激活当前层，并取消其他层的激活状态，同时显示基础信息和层信息

        $body.on('click', $.proxy(this.clickHandler, this));
        $el.on('mousedown', function () {
          $el.addClass('active');
        }); // 点击空白处时，激活消失，但点击属性区，激活不能消失

        $(document).on('mousedown', function (e) {
          var property = self.property;

          if (!($el.is(e.target) || $el.has(e.target).length) && !(property && (property.$el.is(e.target) || property.$el.has(e.target).length))) {
            $el.removeClass('active');
          }
        });
      }
    }, {
      key: "clickHandler",
      value: function clickHandler(e) {
        // 阻止冒泡到父元素
        e.stopPropagation(); // $el.addClass('layer-focused');
        // this.$el.addClass('active');

        console.log('layer clicked'); // 点击当前层

        if (this.events['click']) {
          this.events['click'].call(this, e);
        }
      }
    }, {
      key: "activated",
      value: function activated() {
        this.$el.addClass('active');
      }
    }, {
      key: "getClassName",
      value: function getClassName() {
        return this.className;
      }
    }]);

    return BaseLayer;
  }((0, _draggable["default"])(_base["default"]));

  module.exports = BaseLayer;
});

},{"../../core/base":11,"../../mixins/draggable":16}],29:[function(require,module,exports){
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
    global.image = mod.exports;
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

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

  function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  var ImageLayer =
  /*#__PURE__*/
  function (_BaseLayer) {
    _inherits(ImageLayer, _BaseLayer);

    function ImageLayer(options) {
      var _this;

      _classCallCheck(this, ImageLayer);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageLayer).call(this, options));
      _this.className = _get(_getPrototypeOf(ImageLayer.prototype), "getClassName", _assertThisInitialized(_this)).call(_assertThisInitialized(_this)) + ' ' + _this.prefix + 'layer-image';

      if (options.model) {
        if (options.model.base) {
          _this.base = options.model.base;
        }

        if (options.model.info) {
          _this.info = options.model.info;
        }
      }

      return _this;
    }

    _createClass(ImageLayer, [{
      key: "_render",
      value: function _render() {
        _get(_getPrototypeOf(ImageLayer.prototype), "_render", this).call(this);

        this.$el.find('.layer-type').text('图片');
      }
    }, {
      key: "_bind",
      value: function _bind() {
        _get(_getPrototypeOf(ImageLayer.prototype), "_bind", this).call(this);

        var self = this; // 给图层信息赋值图片地址后，会给图片宽高赋值
        // 等赋值后，再同步到基础属性里
        // 基础属性改变大小则影响到视图的长相，不会影响到数据

        this.info.on('sync:width', function (width) {
          self.base.width = width;
        });
        this.info.on('sync:height', function (height) {
          self.base.height = height;
        });
      }
      /**
       * 上传图片后设置
       * @param {String} url 
       */

    }, {
      key: "setUrl",
      value: function setUrl(url) {
        if (!url) {
          return false;
        }

        var img = new Image();
        var self = this;
        img.src = url;

        function complete() {
          self.$body.append(img);
          self.info.url = url;
        }

        if (img.complete) {
          complete();
        } else {
          img.onload = function () {
            complete();
          };
        }

        img.onerror = function () {
          throw '图层Id' + this.id + '设置图片失败';
        };
      }
    }, {
      key: "setWidth",
      value: function setWidth(width) {
        if (!width) {
          return false;
        }

        this.$el.css('width', width);
        this.base.width = width;
      }
    }, {
      key: "setHeight",
      value: function setHeight(height) {
        if (!height) {
          return false;
        }

        this.$el.css('height', height);
        this.base.height = height;
      }
    }]);

    return ImageLayer;
  }(_base["default"]);

  module.exports = ImageLayer;
});

},{"./base":28}],30:[function(require,module,exports){
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
          // e.preventDefault();
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

},{"../../core/component":12,"../../mixins/draggable":16}],31:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../../core/component", "../../util/index"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../../core/component"), require("../../util/index"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.component, global.index);
    global.base = mod.exports;
  }
})(this, function (_component, _index) {
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
   * 基础信息
   * 定位，大小，层级，旋转，透明度
   * 
   */
  var BaseProperty =
  /*#__PURE__*/
  function (_Component) {
    _inherits(BaseProperty, _Component);

    function BaseProperty(options) {
      var _this;

      _classCallCheck(this, BaseProperty);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseProperty).call(this, options));
      _this.tpl = "\n        <header>\u57FA\u7840\u5C5E\u6027</header>\n        <section>\n            <div class=\"field-group\">\n                <label for=\"\">\u4F4D\u7F6E</label>\n                <input type=\"text\" name=\"x\" class=\"input-text\">\n                <input type=\"text\" name=\"y\" class=\"input-text\">\n            </div>\n            <div class=\"field-group\">\n                <label for=\"\">\u5927\u5C0F</label>\n                <input type=\"text\" name=\"width\" class=\"input-text\">\n                <input type=\"text\" name=\"height\" class=\"input-text\">\n            </div>\n            <div class=\"field-group\">\n                <label for=\"\">\u4E0D\u900F\u660E\u5EA6</label>\n                <input type=\"text\" name=\"alpha\" class=\"input-text input-text-full\">\n            </div>\n            <div class=\"field-group\">\n                <label for=\"\">\u89D2\u5EA6</label>\n                <input type=\"text\" name=\"angle\" class=\"input-text input-text-full\">\n            </div>\n            <div class=\"field-group\">\n                <label for=\"\">\u5C42\u7EA7</label>\n                <input type=\"text\" name=\"level\" class=\"input-text input-text-full\">\n            </div>\n        </section>\n        ";
      _this.model = options.model;
      return _this;
    }

    _createClass(BaseProperty, [{
      key: "_render",
      value: function _render() {
        _get(_getPrototypeOf(BaseProperty.prototype), "_render", this).call(this);

        this.initValue();
      }
    }, {
      key: "_bind",
      value: function _bind() {
        var $el = this.$el;
        $el.on('blur', 'input[name=level]', $.proxy(this.onLevel, this));
        $el.on('blur', 'input[name=x]', $.proxy(this.onPositionX, this));
        $el.on('blur', 'input[name=y]', $.proxy(this.onPositionY, this));
        $el.on('blur', 'input[name=width]', $.proxy(this.onWidth, this));
        $el.on('blur', 'input[name=height]', $.proxy(this.onHeight, this));
        $el.on('blur', 'input[name=angle]', $.proxy(this.onAngle, this));
        $el.on('blur', 'input[name=alpha]', $.proxy(this.onAlpha, this)); // model同步到输入框

        this.model.on('sync:level', function (level) {
          $el.find('input[name=level]').val(level);
        });
        this.model.on('sync:x', function (x) {
          $el.find('input[name=x]').val(x);
        });
        this.model.on('sync:y', function (y) {
          $el.find('input[name=y]').val(y);
        });
        this.model.on('sync:width', function (width) {
          $el.find('input[name=width]').val(width);
        });
        this.model.on('sync:height', function (height) {
          $el.find('input[name=height]').val(height);
        });
        this.model.on('sync:angle', function (angle) {
          $el.find('input[name=angle]').val(angle);
        });
        this.model.on('sync:alpha', function (alpha) {
          $el.find('input[name=alpha]').val(alpha);
        });
      }
    }, {
      key: "onPositionY",
      value: function onPositionY(e) {
        var v = $.trim(e.target.value); // 非纯整数

        if (!_index.validate.isNumber(v)) {
          layer.msg('请输入整数');
          e.target.value = '';
          return false;
        }

        this.model.x = v;
      }
    }, {
      key: "onPositionX",
      value: function onPositionX(e) {
        var v = $.trim(e.target.value); // 非纯整数

        if (!_index.validate.isNumber(v)) {
          layer.msg('请输入整数');
          e.target.value = '';
          return false;
        }

        this.model.x = v;
      }
    }, {
      key: "onLevel",
      value: function onLevel(e) {
        var v = $.trim(e.target.value); // 非纯整数

        if (!_index.validate.isNumber(v)) {
          layer.msg('请输入整数');
          e.target.value = '';
          return false;
        }

        this.model.level = v;
      }
    }, {
      key: "onWidth",
      value: function onWidth(e) {
        var v = $.trim(e.target.value); // 非纯整数

        if (!_index.validate.isNumber(v)) {
          layer.msg('请输入整数');
          e.target.value = '';
          return false;
        }

        this.model.width = v;
      }
    }, {
      key: "onHeight",
      value: function onHeight(e) {
        var v = $.trim(e.target.value); // 非纯整数

        if (!_index.validate.isNumber(v)) {
          layer.msg('请输入整数');
          e.target.value = '';
          return false;
        }

        this.model.height = v;
      }
    }, {
      key: "onAngle",
      value: function onAngle(e) {
        var v = $.trim(e.target.value); // 非纯整数

        if (!_index.validate.isNumber(v)) {
          layer.msg('请输入整数');
          e.target.value = '';
          return false;
        }

        this.model.agnle = v;
      }
    }, {
      key: "onAlpha",
      value: function onAlpha(e) {
        var v = $.trim(e.target.value); // 非纯整数

        if (!_index.validate.isNumber(v)) {
          layer.msg('请输入整数');
          e.target.value = '';
          return false;
        }

        this.model.alpha = v;
      }
    }, {
      key: "initValue",
      value: function initValue() {
        var model = this.model;
        var inputList = this.$el.find('input[type=text]');
        console.log(model);
        inputList.each(function () {
          var $this = $(this);
          var name = $this.attr('name');

          if (model[name] != 'undefined') {
            $this.val(model[name]);
          }
        });
      }
    }]);

    return BaseProperty;
  }(_component["default"]);

  module.exports = BaseProperty;
});

},{"../../core/component":12,"../../util/index":26}],32:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../../core/component"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../../core/component"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.component);
    global.image = mod.exports;
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

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  /**
   * 图片属性层
   */
  var ImageProperty =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ImageProperty, _Component);

    function ImageProperty(options) {
      var _this;

      _classCallCheck(this, ImageProperty);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageProperty).call(this, options));
      _this.tpl = "\n        <header>\u56FE\u7247\u4FE1\u606F</header>\n        <section>\n            <div class=\"field-group\">\n                <label for=\"\">\u5927\u5C0F</label>\n                <input type=\"text\" name=\"width\" readonly class=\"input-text\">\n                <input type=\"text\" name=\"height\" readonly class=\"input-text\">\n            </div>\n        </section>\n        ";
      _this.model = options.model;
      return _this;
    }

    _createClass(ImageProperty, [{
      key: "_bind",
      value: function _bind() {
        var $el = this.$el;
        this.model.on('sync:width', function (width) {
          $el.find('input[name=width]').val(width);
        });
        this.model.on('sync:height', function (height) {
          $el.find('input[name=height]').val(height);
        });
      }
    }]);

    return ImageProperty;
  }(_component["default"]);

  module.exports = ImageProperty;
});

},{"../../core/component":12}],33:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../../core/component"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../../core/component"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.component);
    global.property = mod.exports;
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

  var Property =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Property, _Component);

    function Property(options) {
      var _this;

      _classCallCheck(this, Property);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Property).call(this, options));
      _this.className = _this.prefix + 'property';
      return _this;
    }

    _createClass(Property, [{
      key: "init",
      value: function init() {
        _get(_getPrototypeOf(Property.prototype), "init", this).call(this);

        this.hide();
      }
      /**
       * alias
       */

    }, {
      key: "clear",
      value: function clear() {
        // this.removeAllChild();
        this.$el.html('');
      }
    }, {
      key: "show",
      value: function show() {
        this.$el.css('right', '0');
      }
    }, {
      key: "hide",
      value: function hide() {
        this.$el.css('right', '-300px');
      }
    }, {
      key: "initHeight",
      value: function initHeight() {
        this.$el.css('height', '100%');
      }
    }]);

    return Property;
  }(_component["default"]);

  module.exports = Property;
});

},{"../../core/component":12}],34:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../../core/component", "../../component/button", "../../component/dropdown"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../../core/component"), require("../../component/button"), require("../../component/dropdown"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.component, global.button, global.dropdown);
    global.index = mod.exports;
  }
})(this, function (_component, _button, _dropdown) {
  "use strict";

  _component = _interopRequireDefault(_component);
  _button = _interopRequireDefault(_button);
  _dropdown = _interopRequireDefault(_dropdown);

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
   * 
   * 只做视图的事情，展示和添加子视图，不涉及数据
   */
  var Topbar =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Topbar, _Component);

    function Topbar(args) {
      var _this;

      _classCallCheck(this, Topbar);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Topbar).call(this, args));
      /**
       * 模板分左右两边，还有一个展示更多
       * 这些都可以放按钮，除了更多是下拉框之外
       */

      _this.tpl = "\n            <div class=\"topbar-operation topbar-left\"></div>\n            <div class=\"topbar-operation topbar-right\"></div>\n            <div class=\"topbar-operation-more\"></div>\n        ";
      _this.className = _this.prefix + 'topbar';
      _this.popupList = {};
      _this.menuList = []; // this.leftButtons = [];
      // this.rightButtons = [];

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
        this.$more = $el.find('.topbar-operation-more'); // this.createLeft();
        // this.createRight();
        // this.createMore();
      }
      /**
       * 添加左边或者右边的按钮
       * @param {Array|Button} buttons 按钮配置
       * @param {String} leftOrRight 左边还是右边
       */

    }, {
      key: "addButton",
      value: function addButton(buttons, leftOrRight) {
        var _this2 = this;

        if (!buttons) {
          return this;
        }

        if (buttons.constructor === Array) {
          buttons.forEach(function (button) {
            if (!(button instanceof _button["default"])) {
              button = new _button["default"](button);
            }

            if (!button.renderred) {
              button.init();
            }

            (leftOrRight === 'left' ? _this2.$left : _this2.$right).append(button.$el);
          });
        } else if (buttons.constructor === Object) {
          if (!(buttons instanceof _button["default"])) {
            buttons = new _button["default"](buttons);
          }

          if (!buttons.renderred) {
            buttons.init();
          }

          (leftOrRight === 'left' ? this.$left : this.$right).append(buttons.$el);
        }
      }
    }, {
      key: "addMenuList",
      value: function addMenuList(menuList) {
        this.menuList = menuList;
        var dropdown = new _dropdown["default"]({
          text: '<span class="glyphicon glyphicon-option-vertical"></span>',
          appendTo: this.$more,
          menuList: this.menuList
        });
        this.$more.append(dropdown.$el);
      } // /**
      //  * 创建左边按钮
      //  */
      // createLeft(){
      //     const self = this;
      //     const btns = [new Button({
      //         text: '<span class="fa fa-plus"></span>',
      //         title: '添加图层',
      //         handler: function(e){
      //             self.onNewLayerDialog(e)
      //         },
      //         appendTo: this.$left
      //     }), new Button({
      //         text: '<span class="fa fa-folder-open"></span>',
      //         title: '素材列表',
      //         handler: function(e){
      //             self.onFileManagerDialog(e)
      //         },
      //         appendTo: this.$left
      //     }), new Button({
      //         text: '<span class="fa fa-navicon"></span>',
      //         title: '图层管理器',
      //         handler: function(e){
      //             self.onLayerManagerDialog(e)
      //         },
      //         appendTo: this.$left
      //     }), new Button({
      //         text: '<span class="fa fa-cloud"></span>',
      //         title: '动态图层',
      //         handler: function(e){
      //             self.onDynamicDataDialog(e)
      //         },
      //         appendTo: this.$left
      //     }), new Button({
      //         text: '<span class="fa fa-cubes"></span>',
      //         title: '自定义组件',
      //         handler: function(e){
      //             self.onAddComponentsDialog(e)
      //         },
      //         appendTo: this.$left
      //     }), new Button({
      //         text: '<span class="fa fa-history"></span>',
      //         title: '用户操作',
      //         handler: function(e){
      //             self.onUserBehaviorDialog(e)
      //         },
      //         appendTo: this.$left
      //     })]
      //     this.addChildren(btns);
      // }
      // /**
      //  * 创建右边按钮
      //  */
      // createRight(){
      //     const btns = [new Button({
      //         text:'<span class="fa fa-file"></span> 新建',
      //         handler: this.onCreatePage,
      //         appendTo: this.$right
      //     }), new Button({
      //         text:'<span class="fa fa-floppy-o"></span> 保存',
      //         handler: this.onSavePage,
      //         appendTo: this.$right
      //     }), new Button({
      //         text:'<span class="fa fa-file-o"></span> 页面设置',
      //         handler: this.onPageSettings,
      //         appendTo: this.$right
      //     }), new Button({
      //         text:'<span class="fa fa-file-o"></span> 客户端预览',
      //         handler: this.onAppPreview,
      //         appendTo: this.$right
      //     })];
      //     this.addChildren(btns);
      // }
      // /**
      //  * 隐藏的更多按钮
      //  */
      // createMore(){
      //     const dropdown = new DropDown({
      //         text: '<span class="glyphicon glyphicon-option-vertical"></span>',
      //         appendTo: this.$more,
      //         menuList: [{
      //             text: '导入素材',
      //             handler: function(e){
      //                 console.log('导入素材')
      //             }
      //         }, {
      //             text: '导入JSON',
      //             handler: function(e){
      //                 console.log('导入JSON')
      //             }
      //         }, {
      //             text: '导出JSON',
      //             handler: function(e){
      //                 console.log('导出JSON')
      //             }
      //         }, {
      //             text: '关于',
      //             handler: function(e){
      //                 console.log('version 2.0');
      //             }
      //         }]
      //     });
      //     this.addChild(dropdown);
      // }
      // onNewLayerDialog(e){
      //     console.log('弹窗显示要添加图层类型');
      //     // if(!this.popupList['layer']){
      //     //     const $el = $(e.currentTarget);
      //     //     const offset = $el.offset();
      //     //     const popup = new Popup({
      //     //         direction: 'top',
      //     //         animation: true,
      //     //         trigger: e.currentTarget,
      //     //         width: 200,
      //     //         height: 500,
      //     //         // 当前触发者起始位置
      //     //         position: {
      //     //             left: offset.left + $el.outerWidth() / 2, // 中间点
      //     //             top: offset.top + this.$el.outerHeight() + 5
      //     //         }
      //     //     });
      //     //     popup.init();
      //     //     this.popupList['layer'] = popup;
      //     // }
      //     // this.popupList['layer'].show();
      //     // 改成弹窗的形式
      //     const layerIndex = layer.open({
      //         title: '选择图层',
      //         area: ['800px', '400px'],
      //         content: '',
      //         success: function(o, index){
      //         },
      //         btns: ['确定', '取消'],
      //         yes: function(index, o){
      //             layer.close(index)
      //         }
      //     })
      // }
      // onFileManagerDialog(e){
      //     console.log('弹窗显示已上传的图片文件')
      //     // if(!this.popupList['file']){
      //     //     const $el = $(e.currentTarget);
      //     //     const offset = $el.offset();
      //     //     const popup = new Popup({
      //     //         direction: 'top',
      //     //         animation: true,
      //     //         trigger: e.currentTarget,
      //     //         width: 200,
      //     //         height: 500,
      //     //         // 当前触发者起始位置
      //     //         position: {
      //     //             left: offset.left + $el.outerWidth() / 2, // 中间点
      //     //             top: offset.top + this.$el.outerHeight() + 5
      //     //         }
      //     //     });
      //     //     popup.init();
      //     //     this.popupList['file'] = popup;
      //     // }
      //     // this.popupList['file'].show();
      //     const layerIndex = layer.open({
      //         title: '素材列表',
      //         area: ['90%', '90%'],
      //         content: '',
      //         success: function(o, index){
      //         },
      //         btns: ['确定', '取消'],
      //         yes: function(index, o){
      //             layer.close(index)
      //         }
      //     })
      // }
      // onLayerManagerDialog(e){
      //     console.log('弹窗显示图层列表');
      //     // 从右往左滑动出现
      //     // 鼠标点其他地方时候收起来
      // }
      // onDynamicDataDialog(e){
      //     console.log('添加动态数据组件，减少用户选择用户动态数据的操作');
      //     // 弹窗显示动态数据的组件，非自定义组件
      // }
      // onAddComponentsDialog(e){
      //     console.log('添加自定义组件');
      //     // 弹窗显示自定义组件，比如音频、视频、页码、目录等组件
      // }
      // onUserBehaviorDialog(e){
      //     console.log('弹窗显示用户操作记录');
      //     // 记录用户在场景中心操作的任何记录，保存到临时缓存中，或者保存当前JSON
      //     // 展示一个下拉操作的列表
      // }
      // onCreatePage(e){
      //     console.log('弹窗显示新建页面要填写的内容');
      // }
      // onSavePage(e){
      //     console.log('保存页面');
      // }
      // onPageSettings(e){
      //     console.log('弹窗显示页面设置');
      //     // 弹窗展示页面设置
      // }
      // onAppPreview(e){
      //     console.log('客户端预览')
      //     // 弹窗展示客户端界面进行预览，默认750尺寸
      // }

    }]);

    return Topbar;
  }(_component["default"]);

  module.exports = Topbar;
});

},{"../../component/button":5,"../../component/dropdown":6,"../../core/component":12}],35:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../../core/component"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../../core/component"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.component);
    global.newLayer = mod.exports;
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
   * 弹窗展示要添加的图层，共有以下几个图层：
   * 1.文本框
   * 2.元素框(其实就是展示图片)
   * 3.图片框(包含子层，且只有一张图片，并且有可视区域)
   * 4.视频框(包含一个二维码的子层，无可视区域，二维码仅打印可用)
   * 5.音频框(包含一个二维码的子层，无可视区域)
   * 6.分组框(目录分组，仅目录页使用)
   * 7.目录框(一个弹窗选择？)
   * 8.背景框(由于打印限定一个固定背景，目前以层级是1为背景，且唯一)
   * 
   * 分页固定，不能删除，所以不在这边显示，这边只显示可添加到页面的东西
   * 这里不需要创建元素，所以只继承
   */
  var NewLayerDialog =
  /*#__PURE__*/
  function (_Component) {
    _inherits(NewLayerDialog, _Component);

    function NewLayerDialog(options) {
      var _this;

      _classCallCheck(this, NewLayerDialog);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(NewLayerDialog).call(this, options));
      _this.instance = null; // 应该改成灵活插入，写死了就只能更新这里的东西了

      /**
       * <div class="fa fa-text" type="text">添加文本</div>
              <div class="fa fa-image" type="image">添加元素</div>
              <div class="fa fa-object-group" type="editimage">添加图片</div>
              <div class="fa fa-film" type="video">添加视频</div>
              <div class="fa fa-music" type="audio">添加音频</div>
       */

      _this.className = _this.prefix + 'layer-list-content';
      _this.layerList = [];
      return _this;
    }
    /**
     * 添加图层类型
     * layerType: {
     *  icon:
     *  text:
     *  type:
     * }
     */


    _createClass(NewLayerDialog, [{
      key: "addLayerType",
      value: function addLayerType(layerTypeList) {
        var _this2 = this;

        if (!layerTypeList) {
          return;
        }

        if (layerTypeList.constructor === Array) {
          layerTypeList.forEach(function (layerType) {
            _this2.layerList.push(layerType);
          });
        } else {
          this.layerList.push(layerTypeList);
        }
      }
    }, {
      key: "_render",
      value: function _render() {
        var _this3 = this;

        _get(_getPrototypeOf(NewLayerDialog.prototype), "_render", this).call(this);

        if (this.layerList.length) {
          this.layerList.forEach(function (layerType) {
            _this3.$el.append("<div class=\"layer-item\" type=\"".concat(layerType.type, "\"><span class=\"fa fa-").concat(layerType.icon, "\"></span><span class=\"layer-name\">").concat(layerType.text, "</span></div>"));
          });
        }
      }
      /**
       * 显示弹窗
       */

    }, {
      key: "show",
      value: function show() {
        var self = this;
        this.init(); // 不需要确定按钮，点击之后就执行添加到页面的事件

        this._index = layer.open({
          type: 1,
          title: null,
          content: '',
          shadeClose: true,
          success: function success(o, index) {
            o.find('.layui-layer-content').append(self.$el);
            self.bindLayer(o);
          },
          area: ['800px', '400px']
        });
      }
    }, {
      key: "bindLayer",
      value: function bindLayer(o) {
        o.on('click', '.layer-item', $.proxy(this.add, this));
      }
    }, {
      key: "add",
      value: function add(e) {
        var type = $(e.currentTarget).attr('type'); // 点击执行之后

        this.emit('click:layer', e, type);
        layer.close(this._index);
      }
    }]);

    return NewLayerDialog;
  }(_component["default"]);

  module.exports = NewLayerDialog;
});

},{"../../core/component":12}]},{},[15])(15)
});
