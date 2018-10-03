import  { createAction } from 'redux-actions';
import history from '../history';

export const register = (user) => (dispatch) => {
    dispatch(registerRequest());

    fetch(`http://localhost:5000/auth/register`, {
        method: "post",
        body: JSON.stringify({ ...user }),
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(res => res.json())
        .then(res => {
            dispatch(registerSuccess(res.user));
            localStorage.setItem('token', res.token);
            history.push("/chat")
        })
        .catch(err => {
            dispatch(registerFailed(err))
        })
};


export const login = (user) => (dispatch) => {
    dispatch(loginRequest());

    fetch(`http://localhost:5000/auth/login`, {
        method: "post",
        body: JSON.stringify({
            email: user.email,
            password: user.password,
        }),
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(res => res.json())
        .then(res => {
            dispatch(loginSuccess(res.user));
            localStorage.setItem('token', res.token);
            history.push("/chat")
        })
        .catch(err => {
            dispatch(loginFailed(err))
        })
};

export const checkAuth = () => (dispatch) => {
    dispatch(checkAuthRequest());

    const token = localStorage.getItem('token');

    fetch(`http://localhost:5000/auth/check-token`, {
        headers: {
            'access-token': token,
        }})
        .then(res => res.json())
        .then(res => {
            dispatch(checkAuthSuccess(res.user));
            console.log("success");
            history.push("/chat")
        })
        .catch(err => {
            dispatch(checkAuthFailed(err));
            history.push("/login")
        })
};

export const registerRequest = createAction('[User] Register request');
export const registerSuccess = createAction('[User] Register success');
export const registerFailed = createAction('[User] Register failed');

export const loginRequest = createAction('[User] Login request');
export const loginSuccess = createAction('[User] Login success');
export const loginFailed = createAction('[User] Login failed');

export const checkAuthRequest = createAction('[User] Check auth request');
export const checkAuthSuccess = createAction('[User] Check auth success');
export const checkAuthFailed = createAction('[User] Check auth failed');