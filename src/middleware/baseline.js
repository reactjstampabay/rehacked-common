/**
 * returns the baseline middleware used by all stores (dev, prod, etc)
 */

import {applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

export default () => {
  return applyMiddleware(thunkMiddleware, createLogger());
};
