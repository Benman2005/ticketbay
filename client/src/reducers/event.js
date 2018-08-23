import {UPDATE_EVENT} from '../actions/events'



export default (state = null, {type, payload}) => {
  switch (type) {

    case UPDATE_EVENT:
      return payload

    default:
      return state
  }
}
