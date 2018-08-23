import * as request from 'superagent'
import {baseUrl} from '../constants'
// import {isExpired} from '../jwt'
// import {logout} from './users'

export const GET_TICKETS = "GET_TICKETS"
export const UPDATE_TICKETS = "UPDATE_TICKETS"
export const UPDATE_TICKET = "UPDATE_TICKET"
export const UPDATE_USER_TICKETS = "UPDATE_USER_TICKETS"

const updateTickets = tickets => ({
    type: UPDATE_TICKETS,
    payload: tickets
})

const updateTicket = ticket => ({
    type: UPDATE_TICKET,
    payload: ticket
})

const updateUserTickets = tickets => ({
    type: UPDATE_USER_TICKETS,
    payload: tickets
})

export const getEventTickets = (eventId) => (dispatch, getState) => {
    request
      .get(`${baseUrl}/events/${eventId}/tickets`)
      .then(result => dispatch(updateTickets(result.body)))
      .catch(err => console.error(err))
}

export const getTicket = (id) => (dispatch, getState) => {
    request
      .get(`${baseUrl}/tickets/${id}`)
      .then(result => dispatch(updateTicket(result.body)))
      .catch(err => console.error(err))
}

export const getUserTickets = (id) => (dispatch) => {
    request
        .get(`${baseUrl}/users/${id}/tickets`)
        .then(result =>dispatch(updateUserTickets(result.body)))
        .catch(err => console.error(err))
}