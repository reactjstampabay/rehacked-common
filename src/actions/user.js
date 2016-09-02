import * as UserService from '../services/user';
import {KEYS} from '../constants/localStorage';

export const LOGOUT = 'LOGOUT';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const SAVE_PROFILE = 'SAVE_PROFILE';
export const UPDATE_LOGIN_FIELD = 'UPDATE_LOGIN_FIELD';

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
export function receiveLogin(response) {
  return {
    type: RECEIVE_LOGIN,
    profile: response.data,
    error: response.error
  };
}

/**
 * initiates a login request
 */
export function initiateLogin(email, password) {
  return dispatch => {
    dispatch(requestLogin());

    return UserService.login(email, password)
      .then(profile => {
        dispatch(receiveLogin({data: profile}));
        dispatch(saveProfile(profile));
        //dispatch(push('/dashboard'));
      })
      .catch(error => dispatch(receiveLogin({error: error})));
  }
}

/**
 * logout user - delete profile, redirect to /
 */
export function logout() {
  return dispatch => {
    let logout_profile = {};

    dispatch({type: LOGOUT});
    dispatch(saveProfile(logout_profile));
    // dispatch(push('/'));
  };
}

/**
 * save profile to storage - could be expanded to be cross platform (react-native-storage)
 */
export function saveProfile(profile) {
  return dispatch => {
    storage.save({key: KEYS.USER_PROFILE, rawData: profile});
    dispatch({type: SAVE_PROFILE});
  }
}

/**
 * set the value for a login field (email, password, etc.)
 */
export function updateLoginField(key, value) {
  return {
    type: UPDATE_LOGIN_FIELD,
    key: key,
    value: value
  };
}

/**
 * validates a user profile
 */
export function validateProfile() {
  return (dispatch, getState) => {
    return storage.load({key: KEYS.USER_PROFILE, autoSync: false})
      .then(profile => {
        if (profile && profile.status === 'authenticated') {
          dispatch(receiveLogin({profile: profile}));
          // dispatch(push(next_route));
        }
      })
      .catch(error => {
        // handle missing profile
        dispatch(saveProfile({}));
      });
  }
}
