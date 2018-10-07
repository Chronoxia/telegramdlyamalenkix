import { handleActions } from 'redux-actions';
import { 
    loadStarted, 
    loadComplete, 
    loadFailed, 
    addUser, 
    chooseUser 
} from 'actions/users';
import { changeConversation } from 'actions/conversation';

const initialState = {
    error: null,
    loading: false,
    entities: [],
    chosenUser: null,
};

export default handleActions({
    [loadStarted]: (state) => {
        return {
            ...state,
            error: null,
            loading: true,
        }
    },
    [loadComplete]: (state, action) => {
        return {
            ...state,
            loading: false,
            entities: action.payload,
        }

    },
    [loadFailed]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload.error,
        }
    },
    [addUser]: (state, action) => {
        return {
            ...state,
            entities: state.entities.concat(action.payload)
        }
    },
    // todo
    [chooseUser]: (state, action) => {
        return {
            ...state,
            chosenUser: action.payload,
            // conversations: {
            //     ...state.conversations,
            //     activeConversation: null,
            // }
        }
    },
    [changeConversation]: (state, action) => {
        return {
            ...state,
            chosenUser: null,
        }
    }
}, initialState)