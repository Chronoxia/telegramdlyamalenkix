import { handleError } from '../utils';
import  { createAction } from 'redux-actions';
import { chooseUser } from 'actions/users';
import socket from '../socket';

export const getConversations = () => (dispatch) => {
	const token = localStorage.getItem('token');
	dispatch(requestConversations());

	return fetch(`http://localhost:5000/conversations`, {
		method: 'get',
		headers: {
			'access-token': token,
		}})
		.then(res => res.json())
		.then(data => dispatch(getConversationsSuccess(data)))
		.catch(err => dispatch(getConversationsFailure(err)))
};

export const checkConversation = (companionId) => (dispatch, getState) => {
    const token = localStorage.getItem('token');
	dispatch(checkConversationStarted());

	const user = getState().searchedUsers.users.find(user => user._id === companionId);
	
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
                dispatch(chooseUser(user))
            }
        })
        .catch(err => dispatch(checkConversationFailed(err)))
};

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
};


export const requestConversations = createAction('[Conversation] Get request conversations');
export const getConversationsSuccess = createAction('[Conversation] Get conversations success');
export const getConversationsFailure = createAction('[Conversation] get conversations failure');

export const createConversationRequest = createAction('[Conversation] create request');
export const createConversationSuccess = createAction('[Conversation] create success');
export const createConversationFailure = createAction('[Conversation] create failure');

export const changeConversation = createAction('[Conversation] change conversation');

export const checkConversationStarted = createAction('[Conversation] Check started');
export const checkConversationFailed = createAction('[Conversation] Check failed');

export const deleteConversationRequest = createAction('[Conversation] delete request');
export const deleteConversationSuccess = createAction('[Conversation] delete success');
export const deleteConversationFailure = createAction('[Conversation] delete failure');

export const deleteConversation = (id) => (dispatch) => {
	const token = localStorage.getItem('token');
	dispatch(deleteConversationRequest());

	return fetch('http://localhost:5000/messages/removeAllMessages', {
		method: 'put',
		body: JSON.stringify({ conversationId: id }),
		headers: {
			'access-token': token,
			'Content-Type': 'application/json',
		}})
		.then(res => res.json())
		.then(data => dispatch(deleteConversationSuccess(data)))
		.catch(err => dispatch(deleteConversationFailure(err)))
}
