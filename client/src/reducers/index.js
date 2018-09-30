import { combineReducers } from 'redux';
import userReducer from './user';
import usersReducer from './users';
import conversations from './conversations';
import searchedUsers from './searchedUsers';


export default combineReducers({
    user: userReducer,
    users: usersReducer,
    conversations,
    searchedUsers
})