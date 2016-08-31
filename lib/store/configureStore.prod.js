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

exports.default = function (initialState) {

  return (0, _redux.createStore)(_rootReducer2.default, initialState, (0, _redux.compose)((0, _baseline2.default)()));
};
//# sourceMappingURL=configureStore.prod.js.map