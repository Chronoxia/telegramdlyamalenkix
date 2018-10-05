import socket from "../socket";
import {createAction} from "redux-actions";

export const deleteMessage = (id) => (dispatch) => {
  const token = localStorage.getItem('token');
  return fetch(`http://localhost:5000/messages/removeById`, {
    method: 'put',
    body: JSON.stringify({ messageId: id }),
    headers: {
      'access-token': token,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => dispatch(deleteMessageSuccess(data)))
    .catch(err => dispatch(deleteMessageFailure(err)))
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

export const deleteMessageSuccess = createAction('[Message] Delete message success');
export const deleteMessageFailure = createAction('[Message] Delete message failed');

export const addMessageStarted = createAction('[Message] Add message started');
export const addMessageSuccess = createAction('[Message] Add message success');
export const addMessageFailed = createAction('[Message] Add message failed');
