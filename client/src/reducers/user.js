import { handleActions } from 'redux-actions';

import { registerRequest, registerSuccess, registerFailed,
         loginRequest, loginSuccess, loginFailed } from 'actions/user'
import {checkAuthFailed, checkAuthRequest, checkAuthSuccess} from "../actions/user";

const initialState = {
    error: null,
    user: null,
};

export default handleActions({
    [registerRequest]: (state, action) => {
        return {
            ...state,
            error: null,
        }
    },
    [registerSuccess]: (state, action) => {
        return {
            ...state,
            user: action.payload
        }

    },
    [registerFailed]: (state, action) => {
        return {
            ...state,
            error: action.payload.error,
        }
    },
    [loginRequest]: (state, action) => {
        return {
            ...state,
            error: null,
        }
    },
    [loginSuccess]: (state, action) => {
        return {
            ...state,
            user: action.payload
        }

    },
    [loginFailed]: (state, action) => {
        return {
            ...state,
            error: action.payload.error,
        }
    },
    [checkAuthRequest]: (state, action) => {
        return {
            ...state,
            error: null,
        }
    },
    [checkAuthSuccess]: (state, action) => {
        return {
            ...state,
            user: action.payload
        }

    },
    [checkAuthFailed]: (state, action) => {
        return {
            ...state,
            error: action.payload.error,
        }
    },

}, initialState)