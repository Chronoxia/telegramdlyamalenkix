const initialState = {
  conversations: {},
  activeConversation: null,
  isFetching: false,
  error: null
}

const conversations = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_CONVERSATIONS': 
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    case 'GET_CONVERSATIONS_SUCCESS': 
      return {
        ...state,
        isFetching: false,
        conversations: {
          ...action.payload.conversations
        }
      }
    case 'GET_CONVERSATIONS_FAILURE': 
      return {
        ...state,
        isFetching: false,
        error: action.payload.error
      }
    case 'CHANGE_CONVERSATION':
      return {
        ...state,
        activeConversation: action.payload.id
      }
    default:
      return state;
  }
}

export const getConversationsById = (state) => {
  return Object.keys(state.conversations.conversations);
}

export const getAllConversations = (state) => {
  return getConversationsById(state).map(id => state.conversations.conversations[id])
}

export default conversations;