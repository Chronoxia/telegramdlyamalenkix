
const deleteMessageFailure = (err) => ({
  type: 'DELETE_MESSAGE_FAILURE',
  payload: {
    err,
  }
});

const deleteMessageSuccess = (message) => ({
  type: 'DELETE_MESSAGE_SUCCESS',
  payload: message,
});

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

