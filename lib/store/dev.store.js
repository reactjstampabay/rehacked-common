'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxDevtools = require('redux-devtools');

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * create store for non-production environments
                                                                                                                                                                                                     */


exports.default = function (initialState, rootReducer, middlewares) {
  /**
   * apply any development specific middleware
   */
  middlewares.push((0, _reduxLogger2.default)());

  /**
   * returns the final function obtained by composing the given functions from right to left
   */
  var enhancer = (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, _toConsumableArray(middlewares)), (0, _reduxDevtools.persistState)(getDebugSessionKey()),

  // chrome redux dev tools extension
  window.devToolsExtension ? window.devToolsExtension() : function (f) {
    return f;
  });

  /**
   * create development redux store
   */
  var store = (0, _redux.createStore)(rootReducer, initialState, enhancer);

  /**
   * allow hot swap of reducers
   */
  handleHotModule(store);

  return store;
};

/**
 * You can write custom logic here!
 * By default we try to read the key from ?debug_session=<key> in the address bar
 */


function getDebugSessionKey() {
  var matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return matches && matches.length > 0 ? matches[1] : null;
}

/**
 * hot swap root reducer
 */
function handleHotModule(store) {
  if (module.hot) {
    module.hot.accept('../reducers', function () {
      var nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
}
//# sourceMappingURL=dev.store.js.map