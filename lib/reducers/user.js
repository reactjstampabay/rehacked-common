'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = undefined;

var _user = require('../actions/user');

/**
 * initial reducer state
 */
var initial_user_state = {
  status: 'initial',
  email: '',
  password: ''
};

/**
 * export user reducer
 */
var user = exports.user = function user() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initial_user_state : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _user.LOGOUT:
      return logout(state, action);
    case _user.REQUEST_LOGIN:
      return requestLogin(state, action);
    case _user.RECEIVE_LOGIN:
      return receiveLogin(state, action);
    case _user.UPDATE_LOGIN_FIELD:
      return updateLoginField(state, action);
    default:
      return state;
  }
};

function logout(state, action) {
  return Object.assign({}, state, {
    status: 'logged_out',
    profile: null
  });
}

function receiveLogin(state, action) {
  return Object.assign({}, state, {
    profile: action.profile,
    error: action.error,
    status: action.error ? 'unauthorized' : 'authorized',
    password: ''
  });
}

function requestLogin(state, action) {
  return Object.assign({}, state, {
    status: 'authenticating'
  });
}

function updateLoginField(state, action) {
  var user_state = Object.assign({}, state);
  user_state[action.key] = action.value;

  return Object.assign({}, user_state, {
    error: null
  });
}
//# sourceMappingURL=user.js.map