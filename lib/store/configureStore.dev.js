'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _rootReducer = require('../reducers/rootReducer');

var _rootReducer2 = _interopRequireDefault(_rootReducer);

var _baseline = require('../middleware/baseline');

var _baseline2 = _interopRequireDefault(_baseline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * hot swap root reducer
 */
var handleHotModule = function handleHotModule(store) {
  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', function () {
      var nextRootReducer = require('../reducers/rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }
};

exports.default = function (initialState) {

  var enhancer = (0, _redux.compose)((0, _baseline2.default)());

  var store = (0, _redux.createStore)(_rootReducer2.default, initialState, enhancer);

  handleHotModule(store);

  return store;
};
//# sourceMappingURL=configureStore.dev.js.map