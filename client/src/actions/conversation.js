import  { createAction } from 'redux-actions';
import socket from '../socket';

export const openConversation = (myId, userId) => (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(openStarted());
    fetch(`http://localhost:5000/chat/conversation?myId=${myId}&userId=${userId}`, {
        method: "get",
        headers: {
            'access-token': token || '',
        }})
        .then(res => res.json())
        .then(data => {
            console.log(99999999999, data)
            return data;
        })
        .then(conversationData => dispatch(openComplete(conversationData)))
        .catch(err => dispatch(openFailed(err)))
};

export const addMessage  = (message, conversationId, author) => (dispatch) => {
    console.log(message, conversationId, author);
    const token = localStorage.getItem('token');
    dispatch(addMessageStarted());
    fetch(`http://localhost:5000/chat/message`, {
        method: "post",
        body: JSON.stringify({
            message,
            conversationId,
            author
        }),
        headers: {
            'access-token': token,
            'Content-Type': 'application/json'
        }})
        .then(res => res.json())
        .then(message => {
            socket.emit('MESSAGE_ADD', message.message)
        })
        .catch(err => dispatch(addMessageFailed(err)))
};

export const openStarted = createAction('[Conversation] Open started');
export const openComplete = createAction('[Conversation] Open complete');
export const openFailed = createAction('[Conversation] Open failed');
export const addMessageStarted = createAction('[Conversation] Add message started');
export const addMessageSuccess = createAction('[Conversation] Add message success');
export const addMessageFailed = createAction('[Conversation] Add message failed');