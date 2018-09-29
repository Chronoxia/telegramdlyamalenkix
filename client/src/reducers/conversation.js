import { handleActions } from 'redux-actions';

import { openStarted, openComplete, openFailed, addMessageStarted, addMessageSuccess, addMessageFailed } from 'actions/conversation'

const initialState = {
    _id: null,
    title: null,
    messages: [],
    error: null,
    loading: false,
    fetchingMessage: false,
};

export default handleActions({
    [openStarted]: (state, ) => {
        return {
            ...state,
            error: null,
            loading: true,
        }
    },
    [openComplete]: (state, action) => {
        console.log(1, action.payload);
        console.log(2, action.payload.conversationData._id);
        const {conversation, messages, _id } = action.payload.conversationData;
        console.log(3, conversation, messages);
        return {
            ...state,
            loading: false,
            _id: conversation._id || _id,
            title: conversation.title,
            messages: messages || [],
        }

    },
    [openFailed]: (state, action) => {
        console.log(action.payload)
        console.log(action.payload.err)
        return {
            ...state,
            loading: false,
            error: action.payload.err,
        }
    },
    [addMessageStarted]: (state, action) => {
        return {
            ...state,
            error: null,
            fetchingMessage: true,
        }
    },
    // [addMessageSuccess]: (state, action) => {
    //     console.log("act", action);
    //     console.log(777, state.messages);
    //     return {
    //         ...state,
    //         messages: state.messages.concat(action.payload)
    //     }
    // },
    [addMessageFailed]: (state, action) => {
        console.log(state);
        return {
            ...state,
            fetchingMessage: false,
            error: action.payload.error,
        }
    }
}, initialState)