import { chooseUser } from 'actions/users';

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
            messages: state.conversations[action.payload.message.conversationId].messages.concat(action.payload.message)
          }
        }
      };
      case '[Users] New user was chosen':
        return {
          ...state,
          activeConversation: null,
        };
      case 'CREATE_CONVERSATION_SUCCESS':
         return {
           ...state,
           conversations: {
             ...state.conversations,
             [action.payload.conversation._id]: {
               ...action.payload.conversation,
             }
           }
         };
      case 'DELETE_MESSAGE_SUCCESS':
        copy.conversations[action.payload.conversationId].lastMessages = copy.conversations[action.payload.conversationId].lastMessages.filter(m => m._id !== action.payload._id);
        return copy;  
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