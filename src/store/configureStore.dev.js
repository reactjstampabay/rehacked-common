import {createStore, compose} from 'redux';

import rootReducer from '../reducers/rootReducer';
import baselineMiddleware from '../middleware/baseline';

/**
 * hot swap root reducer
 */
const handleHotModule = (store) => {
  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
      const nextRootReducer = require('../reducers/rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }
};

export default (initialState) => {

  const enhancer = compose(
    baselineMiddleware()
  );

  const store = createStore(rootReducer, initialState, enhancer);

  handleHotModule(store);

  return store;
}
