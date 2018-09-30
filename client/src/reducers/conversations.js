import { chooseUser } from 'actions/users'
const initialState = {
  conversations: {},
  activeConversation: null,
  isFetching: false,
  error: null
};

const conversations = (state = initialState, action) => {
  const copy = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'REQUEST_CONVERSATIONS': 
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case 'GET_CONVERSATIONS_SUCCESS': 
      return {
        ...state,
        isFetching: false,
        conversations: {
          ...action.payload.conversations
        }
      };
    case 'GET_CONVERSATIONS_FAILURE': 
      return {
        ...state,
        isFetching: false,
        error: action.payload.error
      };
    case 'CHANGE_CONVERSATION':
      return {
        ...state,
        activeConversation: action.payload.id
      };
    case 'ADD_MESSAGE_SUCCESS': 
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.payload.message.conversationId]: {
            ...state.conversations[action.payload.message.conversationId],
            lastMessages: state.conversations[action.payload.message.conversationId].lastMessages.concat(action.payload.message)
          }
        }
      };
      case '[Users] New user was chosen':
        return {
          ...state,
            activeConversation: null,
        };
    default:
      return state;
  }
};

export const getConversationsById = (state) => {
  return Object.keys(state.conversations.conversations);
};

export const getAllConversations = (state) => {
  return getConversationsById(state).map(id => state.conversations.conversations[id])
};

export default conversations;