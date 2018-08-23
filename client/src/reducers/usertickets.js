import {UPDATE_USER_TICKETS} from '../actions/tickets'

export default (state = null, {type, payload}) => {
  switch (type) {

    case UPDATE_USER_TICKETS:
      return payload

    default:
      return state
  }
}
