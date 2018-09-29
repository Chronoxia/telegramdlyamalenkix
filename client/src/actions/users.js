import  { createAction } from 'redux-actions';

export const loadUsers = () => (dispatch, getState) => {
    const state = getState();
    const token = localStorage.getItem('token');
    dispatch(loadStarted());
    fetch(`http://localhost:5000/chat/users`, {
        method: "get",
        headers: {
            'access-token': token
        }})
        .then(res => res.json())
        .then(comments => {
            dispatch(loadComplete(comments))
        })
        .catch(err => {
            dispatch(loadFailed(err))
        })
};

export const addUser = createAction('[Users] Add user')

export const loadStarted = createAction('[Users] Load started');
export const loadComplete = createAction('[Users] Load complete');
export const loadFailed = createAction('[Users] Load failed');