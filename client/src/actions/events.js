import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'


export const UPDATE_EVENTS = "UPDATE_EVENTS"
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const ADD_EVENT = 'ADD_EVENT'

const updateEvents = events => ({
    type: UPDATE_EVENTS,
    payload: events
})

const addEvent = event => ({
    type: ADD_EVENT,
    payload: event
})

const updateEvent = event => ({
    type: UPDATE_EVENT,
    payload: event
  })

export const getEvents = () => (dispatch) => {  
    request
      .get(`${baseUrl}/events`)
      .then(result => dispatch(updateEvents(result.body)))
      .catch(err => console.error(err))
}

export const getEvent = (eventId) => (dispatch) => {
  request
    .get(`${baseUrl}/events/${eventId}`)
    .then(result => dispatch(updateEvent(result.body)))
    .catch(err => console.error(err))
}

export const createEvent = (name, userId, description, photo, date, ) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  
  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({eventname: name, userid: userId, description: description, photo: photo, date: date})
    .then(result => addEvent(result.body))
    .catch(err => console.error(err))
}
export const editEvent = (eventId, name, userId, description, photo, date, ) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .patch(`${baseUrl}/events/${eventId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({eventname: name, userid: userId, description: description, photo: photo, date: date})
    .then(result => editEvent(result.body))
    .catch(err => console.error(err))
}