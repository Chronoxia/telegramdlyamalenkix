import { handleActions } from 'redux-actions';

import { loadStarted, loadComplete, loadFailed, addUser } from 'actions/users'

const initialState = {
    error: null,
    loading: false,
    entities: [],
};

export default handleActions({
    [loadStarted]: (state, action) => {
        return {
            ...state,
            error: null,
            loading: true,
        }
    },
    [loadComplete]: (state, action) => {
        return {
            ...state,
            loading: false,
            entities: action.payload,
        }

    },
    [loadFailed]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload.error,
        }
    },
    [addUser]: (state, action) => {
        console.log(5555555555, state, action)
        return {
            ...state,
            entities: state.entities.concat(action.payload)
        }
    }

}, initialState)