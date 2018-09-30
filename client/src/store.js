import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from 'reducers';

// const logger = (store) => (next) => (action) => {
//     console.log('Action', action.type);
//     const result = next(action);
//     console.log("State", store.getState());

//     return result;
// };


export default createStore(
    rootReducer,
    applyMiddleware(thunk, logger),
);