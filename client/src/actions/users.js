import  { createAction } from 'redux-actions';

export const loadUsers = () => (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(loadStarted());
    fetch(`http://localhost:5000/chat/users`, {
        method: "get",
        headers: {
            'access-token': token
        }})
        .then(res => res.json())
        .then(users => {
            dispatch(loadComplete(users))
        })
        .catch(err => {
            dispatch(loadFailed(err))
        })
};



export const addUser = createAction('[Users] Add user');

export const loadStarted = createAction('[Users] Load started');
export const loadComplete = createAction('[Users] Load complete');
export const loadFailed = createAction('[Users] Load failed');

export const chooseUser = createAction('[Users] New user was chosen');