/**
 * create store for non-production environments
 */
import {createStore, applyMiddleware, compose} from 'redux';
import {persistState} from 'redux-devtools';
import createLogger from 'redux-logger';

export default (initialState, rootReducer, middlewares) => {
  /**
   * apply any development specific middleware
   */
  middlewares.push(createLogger());

  /**
   * returns the final function obtained by composing the given functions from right to left
   */
  const enhancer = compose(
    applyMiddleware(...middlewares),

    persistState(getDebugSessionKey()),

    // chrome redux dev tools extension
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  /**
   * create development redux store
   */
  const store = createStore(rootReducer, initialState, enhancer);

  /**
   * allow hot swap of reducers
   */
  handleHotModule(store);

  return store;
}

/**
 * You can write custom logic here!
 * By default we try to read the key from ?debug_session=<key> in the address bar
 */
function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

/**
 * hot swap root reducer
 */
function handleHotModule(store) {
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
}
