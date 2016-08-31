'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return (0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reduxLogger2.default)());
}; /**
    * returns the baseline middleware used by all stores (dev, prod, etc)
    */
//# sourceMappingURL=baseline.js.map