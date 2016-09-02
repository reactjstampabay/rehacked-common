import {createStore, applyMiddleware, compose} from 'redux';

/**
 * third party middleware
 */
import thunkMiddleware from 'redux-thunk';

/**
 * import root reducer
 */
import rootReducer from '../reducers';

/**
 * create and return the main store
 */
export default (initialState) => {
  /**
   * baseline middleware used in all environments
   */
  const baseline_middlewares = [thunkMiddleware];

  /**
   * build store for non-production environments
   */
  if (process.env.NODE_ENV !== 'production') {
    const dev_store = require('./dev.store');
    return dev_store.default(initialState, rootReducer, baseline_middlewares);
  }

  /**
   * return production store
   */
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...baseline_middlewares))
  );
};
