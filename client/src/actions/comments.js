import * as request from 'superagent'
import {baseUrl} from '../constants'

export const GET_COMMENTS = "GET_COMMENTS"
export const UPDATE_COMMENTS = "UPDATE_COMMENTS"
export const UPDATE_TICKET = "UPDATE_TICKET"

const updateComments = comments => ({
    type: UPDATE_COMMENTS,
    payload: comments
})

export const getTicketComments = (ticketid) => (dispatch, getState) => {
    request
      .get(`${baseUrl}/tickets/${ticketid}/comments`)
      .then(result => dispatch(updateComments(result.body)))
      .catch(err => console.error(err))
}
