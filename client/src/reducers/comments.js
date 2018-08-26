import {UPDATE_COMMENTS, ADD_COMMENT} from '../actions/comments'
import {ADD_COMMENTS} from '../actions/comments'

export default (state = null, {type, payload}) => {
    switch (type) {

    case UPDATE_COMMENTS:
      return payload
    
    case ADD_COMMENT:
      return [...state, payload]

    default:
      return state
  }
}
