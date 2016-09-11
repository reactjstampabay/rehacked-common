'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPDATE_LOGIN_FIELD = exports.SAVE_PROFILE = exports.RECEIVE_LOGIN = exports.REQUEST_LOGIN = exports.LOGOUT = undefined;
exports.initiateLogin = initiateLogin;
exports.logout = logout;
exports.receiveLogin = receiveLogin;
exports.saveProfile = saveProfile;
exports.updateLoginField = updateLoginField;
exports.validateProfile = validateProfile;

var _user = require('../services/user');

var UserService = _interopRequireWildcard(_user);

var _localStorage = require('../constants/localStorage');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var LOGOUT = exports.LOGOUT = 'LOGOUT';
var REQUEST_LOGIN = exports.REQUEST_LOGIN = 'REQUEST_LOGIN';
var RECEIVE_LOGIN = exports.RECEIVE_LOGIN = 'RECEIVE_LOGIN';
var SAVE_PROFILE = exports.SAVE_PROFILE = 'SAVE_PROFILE';
var UPDATE_LOGIN_FIELD = exports.UPDATE_LOGIN_FIELD = 'UPDATE_LOGIN_FIELD';

/**
 * invoked when a login is requested
 */
function requestLogin() {
  return {
    type: REQUEST_LOGIN
  };
}

/**
 * initiates a login request
 */
function initiateLogin(email, password) {
  return function (dispatch) {
    dispatch(requestLogin());

    return UserService.login(email, password).then(function (profile) {
      dispatch(receiveLogin({ profile: profile }));
      dispatch(saveProfile(profile));
      //dispatch(push('/dashboard'));
    }).catch(function (error) {
      return dispatch(receiveLogin({ error: error }));
    });
  };
}

/**
 * logout user - delete profile, redirect to /
 */
function logout() {
  return function (dispatch) {
    var logout_profile = {};

    dispatch({ type: LOGOUT });
    dispatch(saveProfile(logout_profile));
    // dispatch(push('/'));
  };
}

/**
 * invoked when a login is received - success or error
 */
function receiveLogin(response) {
  return {
    type: RECEIVE_LOGIN,
    profile: response.profile,
    error: response.error
  };
}

/**
 * save profile to storage - could be expanded to be cross platform (react-native-storage)
 */
function saveProfile(profile) {
  return function (dispatch) {
    storage.save({ key: _localStorage.KEYS.USER_PROFILE, rawData: profile });
    dispatch({ type: SAVE_PROFILE });
  };
}

/**
 * set the value for a login field (email, password, etc.)
 */
function updateLoginField(key, value) {
  return {
    type: UPDATE_LOGIN_FIELD,
    key: key,
    value: value
  };
}

/**
 * validates a user profile
 */
function validateProfile() {
  return function (dispatch, getState) {
    return storage.load({ key: _localStorage.KEYS.USER_PROFILE, autoSync: false }).then(function (profile) {
      if (profile && profile.status === 'authenticated') {
        dispatch(receiveLogin({ profile: profile }));
        // dispatch(push(next_route));
      }
    }).catch(function (error) {
      // handle missing profile
      dispatch(saveProfile({}));
    });
  };
}
//# sourceMappingURL=user.js.map