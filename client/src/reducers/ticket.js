import {UPDATE_TICKET} from '../actions/tickets'

export default (state = null, {type, payload}) => {
  switch (type) {

    case UPDATE_TICKET:
      return payload

    default:
      return state
  }
}
