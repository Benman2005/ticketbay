import {GET_USER} from '../actions/users'
import {USER_LOGOUT} from '../actions/users'
  
export default (state = null, {type, payload}) => {
  switch (type) {
    case USER_LOGOUT:
      return null
      
    case GET_USER:
      return payload

    default:
      return state
  }
}
