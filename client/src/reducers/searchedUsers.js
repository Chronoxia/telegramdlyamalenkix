import { handleActions } from 'redux-actions';
import { searchStarted, searchComplete, searchFailed, clearSearched } from 'actions/searchedUsers'

const initialState = {
    error: null,
    loading: false,
    users: [],
};

export default handleActions({
    [searchStarted]: (state, action) => {
        return {
            ...state,
            loading: true,
            error: null,
        }
    },
    [searchComplete]: (state, action) => {
        return {
            ...state,
            loading: false,
            users: action.payload
        }
    },
    [searchFailed]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    },
    [clearSearched]: (state, action) => {
        return {
            ...state,
            users: []
        }
    },

}, initialState)