import React, {PureComponent} from 'react'
import {userId} from '../jwt'
import { connect } from 'react-redux'
import {getEvents} from '../actions/events'
import {getUsers} from '../actions/users'
import Card, { CardContent } from 'material-ui/Card'
import EventForm from './EventForm'
import { Link } from 'react-router-dom'

import './EventList.css'

class EventList extends PureComponent {
    componentDidMount(){
            this.props.getEvents()
            if (this.props.users === null) this.props.getUsers()
    }

    renderEvent= (event) =>{
        if (new Date(event.date) < new Date()) return
        else
        return(
            <Card key={event.id} className="eventcard">
            <Link to= {`/events/${event.id}`}>
            <CardContent>
            <img src={event.photo}></img> {event.eventname}<br/>
            </CardContent> 
            </Link>
            </Card>)
    }
    
    render(){
        const { users, authenticated, userId} = this.props

        const adminIds = [1, 2, 3]
        function admin(){
            if(adminIds.includes(Number(userId))){
                console.log(userId)
                return true       
            }
            else return false
          }

        return (
            <div>
                {authenticated && admin()&& <Card className="create-edit"><EventForm /></Card>}

                <Card className="eventlist">
                {this.props.events && this.props.events.sort((a, b)=> {return b.id-a.id}).map(event => this.renderEvent(event))}
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.currentUser !== null,
    userId: state.currentUser && userId(state.currentUser.jwt),
    users: state.users === null ? null : state.users,
    events: state.events
  })
  

export default connect(mapStateToProps, {getEvents, getUsers})(EventList)