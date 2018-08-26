import {UPDATE_EVENTS} from '../actions/events'
import {UPDATE_EVENT} from '../actions/events'
import {ADD_EVENT} from '../actions/events'

export default (state = null, {type, payload}) => {
  switch (type) {

    case UPDATE_EVENTS:
      return payload.events

    case ADD_EVENT:
      return [...state, payload]

    default:
      return state
  }
}
