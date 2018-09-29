import { combineReducers } from 'redux';
import userReducer from 'reducers/user';
import usersReducer from 'reducers/users';
import conversationReducer from 'reducers/conversation';
import conversations from './conversations';


export default combineReducers({
    user: userReducer,
    users: usersReducer,
    conversation: conversationReducer,
    conversations,
})