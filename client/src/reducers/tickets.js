import {UPDATE_TICKETS, ADD_TICKET} from '../actions/tickets'

export default (state = null, {type, payload}) => {
  switch (type) {

    case UPDATE_TICKETS:
      return payload

    case ADD_TICKET:
      return [...state, payload]

    default:
      return state
  }
}
