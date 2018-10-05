import  { createAction } from 'redux-actions';
import { chooseUser } from 'actions/users';
import socket from '../socket';

const requestConversations = () => ({
    type: 'REQUEST_CONVERSATIONS',
});

const getConversationsSuccess = (data) => ({
	type: 'GET_CONVERSATIONS_SUCCESS',
	payload: data
});

const getConversationsFailure = (err) => ({
	type: 'GET_CONVERSATIONS_FAILURE',
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

	return fetch(`http://localhost:5000/conversations/privates`, {
		method: 'get',
		headers: {
			'access-token': token,
		}})
		.then(res => res.json())
		.then(data => dispatch(getConversationsSuccess(data)))
		.catch(err => dispatch(getConversationsFailure(err)))
};

export const addMessage  = (text, conversationId, authorId, companionId) => (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(addMessageStarted());
    fetch(`http://localhost:5000/messages/create`, {
        method: "post",
        body: JSON.stringify({
            text,
            conversationId,
            authorId,
            companionId
        }),
        headers: {
            'access-token': token,
            'Content-Type': 'application/json'
        }})
        .then(res => res.json())
        .then(message => {
			console.log(message);
            socket.emit('MESSAGE_ADD', message)
        })
        .catch(err => dispatch(addMessageFailed(err)))
};

export const addMessageSuccess = (message) => ({
    type: 'ADD_MESSAGE_SUCCESS',
    payload: {
        message
    }
});

export const checkConversation = (companionId) => (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(checkConversationStarted());
    fetch(`http://localhost:5000/conversations/conversationByCompanion/${companionId}`, {
        method: "get",
        headers: {
            'access-token': token,
            'Content-Type': 'application/json'
        }})
        .then(res => res.json())
        .then(conversation => {
            if (conversation) {
                dispatch(changeConversation(conversation._id))
            } else {
                dispatch(chooseUser(companionId))
            }
        })
        .catch(err => dispatch(checkConversationFailed(err)))
};

const createConversationRequest = () => ({
	type: 'CREATE_CONVERSATION_REQUEST',
});

export const createConversationSuccess = (conversation) => ({
	type: 'CREATE_CONVERSATION_SUCCESS',
	payload: {
		conversation
	}
});

const createConversationFailure = (err) => ({
	type: 'CREATE_CONVERSATION_FAILURE',
	payload: {
		err: err || 'Something went wrong'
	}
})

export const createConversation = (title, participants, image) => (dispatch) => {
	const token = localStorage.getItem('token');
	console.log(title, participants);
	dispatch(createConversationRequest());

	return fetch('http://localhost:5000/conversations/create', {
		method: 'post',
		body: JSON.stringify({
			title,
			participants,
			image
		}),
		headers: {
			'access-token': token,
			'Content-Type': 'application/json',
		}})
		.then(res => res.json())
		.then(data => {
			socket.emit('CREATE_CONVERSATION', data)
		})
		.catch(err => {
			console.log(err)
		})
}



export const addMessageStarted = createAction('[Conversation] Add message started');
export const addMessageFailed = createAction('[Conversation] Add message failed');

export const checkConversationStarted = createAction('[Conversation] Check started');
export const checkConversationFailed = createAction('[Conversation] Check failed');