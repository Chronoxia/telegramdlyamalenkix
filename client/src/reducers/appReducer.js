import { combineReducers } from "redux";
import userReducer from "reducers/user";
import usersReducer from "reducers/users";
import conversations from "reducers/conversations";
import searchedUsers from "reducers/searchedUsers";

const appReducer = combineReducers({
    user: userReducer,
    users: usersReducer,
    conversations,
    searchedUsers
});

export default appReducer;