import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
// import {getGames, joinGame, updateGame} from '../../actions/games'
import {getEvents, getEvent} from '../actions/events'
import {getUsers} from '../actions/users'
import {userId} from '../jwt'
import Paper from 'material-ui/Paper'
import Card, { CardContent } from 'material-ui/Card'
import Tickets from './Tickets'
import EditEventForm from './EditEventForm'
import TicketForm from './TicketForm'

class EventDetails extends PureComponent {

  componentDidMount() {
      this.props.getEvent(this.props.match.params.id)
      // this.props.getUsers()
  }
  render() {
    const {event, authenticated, userId} = this.props
    if (event === null ) return 'Loading...'
    if (!event) return 'Not found'

    const adminIds = [1, 2, 3]
    
    function admin(){
      if(adminIds.includes(Number(userId))){
        return true       
      } else return false
    }

    return (
      <Paper className="outer-paper">
        {authenticated && admin()&& <Card className='create-edit'> <EditEventForm event={event}/>} </Card>}
        <h1>{event.eventname}</h1>
        <img className="eventphoto" src={event.photo} style={{width: '100%'}}></img>
        <h4>{new Date(event.date).toLocaleString()}</h4>
        <p>{event.description}</p>
        {authenticated && <Card className="create-edit"><TicketForm event={event}/> </Card>}   
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
