import {UPDATE_COMMENTS} from '../actions/comments'

export default (state = null, {type, payload}) => {
    switch (type) {

    case UPDATE_COMMENTS:
      return payload

    default:
      return state
  }
}
