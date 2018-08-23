import {UPDATE_EVENTS} from '../actions/events'


/*
The state will contain the games in an object with the game ID as key
*/

export default (state = null, {type, payload}) => {
  switch (type) {

    case UPDATE_EVENTS:
      return payload.events

    default:
      return state
  }
}
