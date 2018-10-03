import  { createAction } from 'redux-actions';

export const searchUsers = (searchValue) => (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(searchStarted());
    fetch(` http://localhost:5000/users/search/${searchValue}`, {
        headers: {
            'access-token': token
        }})
        .then(res => res.json())
        .then(users => {
            dispatch(searchComplete(users))
        })
        .catch(err => {
            dispatch(searchFailed(err))
        })
};

export const searchStarted = createAction('[searchedUsers] Search started');
export const searchComplete = createAction('[searchedUsers] Search complete');
export const searchFailed = createAction('[searchedUsers] Search failed');

export const clearSearched = createAction('[searchedUsers] Searched users cleared');