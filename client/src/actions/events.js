import * as request from 'superagent'
import {baseUrl} from '../constants'

export const UPDATE_EVENTS = "UPDATE_EVENTS"
export const UPDATE_EVENT = 'UPDATE_EVENT'

const updateEvents = events => ({
    type: UPDATE_EVENTS,
    payload: events
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