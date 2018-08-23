import React, {PureComponent} from 'react'

import { connect } from 'react-redux'
import {getEvents} from '../actions/events'
import {getUsers} from '../actions/users'
import Card, { CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import EventForm from './EventForm'

import './EventList.css'



class EventList extends PureComponent {
    componentDidMount(){
            this.props.getEvents()
            if (this.props.users === null) this.props.getUsers()
    }
    renderEvent= (event) =>{
        const {history} = this.props
        if (new Date(event.date) < new Date()) return
        else
        return(
            <Card key={event.id} className="eventcard"><img src={event.photo}></img> <CardContent>{event.eventname}</CardContent> 
            <Button size="small" onClick={() => history.push(`/events/${event.id}`)}>See details</Button>
            </Card>
        )
    }
    render(){
        
        // const {games, users, authenticated, createGame} = this.props

        return (
            <div><Card className="eventlist">
            {this.props.events && this.props.events.map(event => this.renderEvent(event))}
            </Card>
            {this.props.authenticated && <EventForm />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.currentUser !== null,
    users: state.users === null ? null : state.users,
    events: state.events
  })
  

export default connect(mapStateToProps, {getEvents, getUsers})(EventList)