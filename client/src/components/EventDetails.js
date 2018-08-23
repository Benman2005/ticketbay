import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
// import {getGames, joinGame, updateGame} from '../../actions/games'
import {getEvents, getEvent} from '../actions/events'
import {getUsers} from '../actions/users'
import {userId} from '../jwt'
import Paper from 'material-ui/Paper'
import Tickets from './Tickets'

class EventDetails extends PureComponent {

  componentDidMount() {
      this.props.getEvent(this.props.match.params.id)
      console.log(this.props.match.params.id)
      if (this.props.events === null) this.props.getEvents()
      if (this.props.users === null) this.props.getUsers()
  }

  render() {

    const {event} = this.props

    if (event === null ) return 'Loading...'
    if (!event) return 'Not found'

const date = Date.parse(this.props.event.date)

    return (

      <Paper className="outer-paper">
      <img className="eventphoto" src={event.photo} style={{width: '100%'}}></img>

        <h1>{event.eventname}</h1>
        <h4>{new Date(event.date).toLocaleString()}</h4>
        <p>{event.description}</p>
        
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
