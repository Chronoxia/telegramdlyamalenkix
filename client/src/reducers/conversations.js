import {handleActions} from "redux-actions";

import { chooseUser } from 'actions/users';
import {
    changeConversation,
    createConversationSuccess,
    getConversationsFailure,
    getConversationsSuccess,
    requestConversations,
    deleteConversationSuccess
} from "../actions/conversation";
import { addMessageSuccess, deleteMessageSuccess } from "../actions/message";

const initialState = {
  conversations: {},
  activeConversation: null,
  isFetching: false,
  error: null
};

export default handleActions({
    [requestConversations]: (state, action) => {
        return {
            ...state,
            isFetching: true,
            error: null,
        }
    },
    [getConversationsSuccess]: (state, action) => {
        return {
            ...state,
            isFetching: false,
            conversations: {
                ...action.payload.conversations
            }
        }
    },
    [getConversationsFailure]: (state, action) => {
        return {
            ...state,
            isFetching: false,
            error: action.payload.error
        }
    },
    [changeConversation]: (state, action) => {
        return {
            ...state,
            activeConversation: action.payload
        }
    },
    [addMessageSuccess]: (state, action) => {
        return {
            ...state,
            conversations: {
                ...state.conversations,
                [action.payload.conversationId]: {
                    ...state.conversations[action.payload.conversationId],
                    messages: state.conversations[action.payload.conversationId].messages.concat(action.payload)
                }
            }
        }
    },
    [chooseUser]: (state, action) => {
        return {
            ...state,
            activeConversation: null,
        };
    },
    [createConversationSuccess]: (state, action) => {
        return {
            ...state,
            conversations: {
                ...state.conversations,
                [action.payload._id]: {
                    ...action.payload,
                }
            }
        };
    },
    [deleteMessageSuccess]: (state, action) => {
        const copy = JSON.parse(JSON.stringify(state));
        copy.conversations[action.payload.conversationId].messages = copy.conversations[action.payload.conversationId].messages.filter(m => m._id !== action.payload._id);
        return copy;
    },
    [deleteConversationSuccess]: (state, action) => {
        return {
            ...state,
            conversations: {
                ...state.conversations,
                [action.payload.id]: {
                    ...state.conversations[action.payload.id],
                    messages: []
                }
            }
        }
    },
}, initialState)


export const getConversationsById = (state) => {
  return Object.keys(state.conversations.conversations);
};

export const getAllConversations = (state) => {
  return getConversationsById(state).map(id => state.conversations.conversations[id])
};

