import {UPDATE_TICKETS} from '../actions/tickets'

export default (state = null, {type, payload}) => {
  switch (type) {

    case UPDATE_TICKETS:
      return payload


    default:
      return state
  }
}
