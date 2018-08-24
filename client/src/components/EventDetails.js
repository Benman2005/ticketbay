import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
// import {getGames, joinGame, updateGame} from '../../actions/games'
import {getEvents, getEvent} from '../actions/events'
import {getUsers} from '../actions/users'
import {userId} from '../jwt'
import Paper from 'material-ui/Paper'
import Tickets from './Tickets'
import EditEventForm from './EditEventForm'
import TicketForm from './TicketForm'

class EventDetails extends PureComponent {

  componentDidMount() {
      this.props.getEvent(this.props.match.params.id)
      console.log(this.props.match.params.id)
      if (this.props.events === null) this.props.getEvents()
      if (this.props.users === null) this.props.getUsers()
  }

  render() {

    const {event, authenticated, userId} = this.props

    if (event === null ) return 'Loading...'
    if (!event) return 'Not found'

    function author(){
      if(Number(userId) === Number(event.userid)){
          return true       
      }
      else return false
    }
    const adminIds = [1, 2, 3]
        function admin(){
            if(adminIds.includes(Number(userId))){
                console.log(userId)
                return true       
            }
            else return false
          }
    return (

      <Paper className="outer-paper">
        {authenticated && admin()&&  <EditEventForm event={event}/>}
        {console.log(userId)}
        {console.log(event.userid)}
        <img className="eventphoto" src={event.photo} style={{width: '100%'}}></img>
        <h1>{event.eventname}</h1>
        <h4>{new Date(event.date).toLocaleString()}</h4>
        <p>{event.description}</p>
        {authenticated && <TicketForm event={event}/>}   
        <Tickets />
      </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  events: state.events,
  event: state.event,
  users: state.users
})

const mapDispatchToProps = {
  getEvents, getUsers, getEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)
