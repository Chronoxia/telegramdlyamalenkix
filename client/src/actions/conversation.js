import  { createAction } from 'redux-actions';
import socket from '../socket';

const requestConversations = () => ({
    type: 'REQUEST_CONVERSATIONS',
});

const getConversationsSuccess = (data) => ({
	type: 'GET_CONVERSATIONS_SUCCESS',
	payload: data
});

const getConversationsFailure = (err) => ({
	type: 'GET_CONVERSATIONS_ERROR',
	payload: {
		err: err || 'Something went wrong',
	}
});

export const changeConversation = (id) => ({
	type: 'CHANGE_CONVERSATION',
	payload: {
		id,
	}
});

export const getConversations = () => (dispatch) => {
	const token = localStorage.getItem('token');
	dispatch(requestConversations());

	return fetch(`http://localhost:5000/chat/conversations`, {
		method: 'get',
		headers: {
			'access-token': token,
		}})
		.then(res => res.json())
		.then(data => dispatch(getConversationsSuccess(data)))
		.catch(err => dispatch(getConversationsFailure(err)))
};

export const addMessage  = (text, conversationId, authorId) => (dispatch) => {
    console.log(666, text, conversationId, authorId);
    const token = localStorage.getItem('token');
    dispatch(addMessageStarted());
    fetch(`http://localhost:5000/chat/message`, {
        method: "post",
        body: JSON.stringify({
            text,
            conversationId,
            authorId
        }),
        headers: {
            'access-token': token,
            'Content-Type': 'application/json'
        }})
        .then(res => res.json())
        .then(message => {
            socket.emit('MESSAGE_ADD', message)
        })
        .catch(err => dispatch(addMessageFailed(err)))
};

export const addMessageSuccess = (message) => ({
    type: 'ADD_MESSAGE_SUCCESS',
    payload: {
        message
    }
})

export const openStarted = createAction('[Conversation] Open started');
export const openComplete = createAction('[Conversation] Open complete');
export const openFailed = createAction('[Conversation] Open failed');
export const addMessageStarted = createAction('[Conversation] Add message started');
// export const addMessageSuccess = createAction('[Conversation] Add message success');
export const addMessageFailed = createAction('[Conversation] Add message failed');