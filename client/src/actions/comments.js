import * as request from 'superagent'
import {baseUrl} from '../constants'
import {isExpired} from '../jwt'
import {logout} from './users'

export const GET_COMMENTS = "GET_COMMENTS"
export const UPDATE_COMMENTS = "UPDATE_COMMENTS"
export const UPDATE_TICKET = "UPDATE_TICKET"
export const ADD_COMMENT = "ADD_COMMENT"

const updateComments = comments => ({
    type: UPDATE_COMMENTS,
    payload: comments
})

const addComment = comment => ({
    type: ADD_COMMENT,
    payload: comment
})

export const getTicketComments = (ticketid) => (dispatch, getState) => {
    request
      .get(`${baseUrl}/tickets/${ticketid}/comments`)
      .then(result => dispatch(updateComments(result.body)))
      .catch(err => console.error(err))
}

export const createComment = (ticketid, userId, comment) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt
    if (isExpired(jwt)) return dispatch(logout())
    
    request
      .post(`${baseUrl}/tickets/${ticketid}/comments`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({blah: comment, userid:userId, ticketid})
      .then(result => dispatch(addComment(result.body)))
      .catch(err => console.error(err))
}
