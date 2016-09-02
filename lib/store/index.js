'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * create and return the main store
 */


/**
 * third party middleware
 */
exports.default = function (initialState) {
  /**
   * baseline middleware used in all environments
   */
  var baseline_middlewares = [_reduxThunk2.default];

  /**
   * build store for non-production environments
   */
  if (process.env.NODE_ENV !== 'production') {
    var dev_store = require('./dev.store');
    return dev_store.default(initialState, _reducers2.default, baseline_middlewares);
  }

  /**
   * return production store
   */
  return (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, baseline_middlewares)));
};

/**
 * import root reducer
 */
//# sourceMappingURL=index.js.map