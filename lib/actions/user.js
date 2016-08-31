'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPDATE_LOGIN_FIELD = exports.SAVE_PROFILE = exports.RECEIVE_LOGIN = exports.REQUEST_LOGIN = exports.LOGOUT = undefined;
exports.receiveLogin = receiveLogin;
exports.initiateLogin = initiateLogin;
exports.logout = logout;
exports.saveProfile = saveProfile;
exports.updateLoginField = updateLoginField;
exports.validateProfile = validateProfile;

var _user = require('../services/user');

var UserService = _interopRequireWildcard(_user);

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
 * invoked when a login is received - success or error
 */
function receiveLogin(response) {
  return {
    type: RECEIVE_LOGIN,
    profile: response.data,
    error: response.error
  };
}

/**
 * initiates a login request
 */
function initiateLogin(email, password) {
  return function (dispatch) {
    dispatch(requestLogin());

    return UserService.login(email, password).then(function (profile) {
      dispatch(receiveLogin({ data: profile }));
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
    delete localStorage['USER_PROFILE'];
    //dispatch(push('/'));
    dispatch({ type: LOGOUT });
  };
}

/**
 * save profile to storage - could be expanded to be cross platform (react-native-storage)
 */
function saveProfile(profile) {
  return function (dispatch) {
    //localStorage['USER_PROFILE'] = JSON.stringify(profile);
    dispatch({ type: SAVE_PROFILE });
  };
}

/**
 * set the value for a login field (email, password, etc.)
 */
function updateLoginField(key, value) {
  return function (dispatch) {
    var dispatch_payload = {
      type: UPDATE_LOGIN_FIELD,
      key: key,
      value: value
    };

    dispatch(dispatch_payload);
  };
}

/**
 * validates a user profile
 */
function validateProfile() {
  return function (dispatch, getState) {

    // let user_profile = getState().user.profile || JSON.parse(localStorage['USER_PROFILE'] || '{}');

    // if (user_profile && user_profile.status === 'authenticated') {
    // get next routing state - default to /dashboard if next route is not available
    // let routing_location = getState().routing.locationBeforeTransitions || {};
    // let next_route = routing_location.state && routing_location.state.nextPathname || '/dashboard';

    // dispatch(receiveLogin({data: user_profile}));
    //dispatch(push(next_route));
    // }
  };
}
//# sourceMappingURL=user.js.map