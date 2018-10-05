import appReducer from './appReducer';

const rootReducer = (state, action) => {
    if (action.type === '[User] logout') {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;