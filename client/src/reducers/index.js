import { combineReducers } from 'redux';
import userReducer from 'reducers/user';
import usersReducer from 'reducers/users'
import conversationReducer from 'reducers/conversation'


export default combineReducers({
    user: userReducer,
    users: usersReducer,
    conversation: conversationReducer,
})