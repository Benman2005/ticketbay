import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../actions/users'
import {userId} from '../jwt'
import Paper from 'material-ui/Paper'
import Card, { CardContent } from 'material-ui/Card'
import {getEventTickets} from '../actions/tickets'
import {risk} from './TicketDetails'

import './EventList.css'
import { Link } from 'react-router-dom'

class Tickets extends PureComponent {

  componentDidMount() {
    this.props.getEventTickets(this.props.event.id)  
  }
  componentDidUpdate(prevProps) {
    if (this.props.event.id !== prevProps.event.id) {
        this.props.getEventTickets(this.props.event.id)  
    }
  }

  renderTicket= (ticket) =>{

    return(
        <Link to= {`/tickets/${ticket.id}`}>
        <Card key={ticket.id} className="ticketcard"><img src={ticket.photo}></img><CardContent>€{ticket.price}{this.props.risk}</CardContent> 
        {/* {ticket.eventid} */}
            Click to see details
        </Card>
        </Link>
    )
}

  render() {
    // console.log(this.props.event.id)


    const { tickets} = this.props

    if (tickets === null) return 'Loading...'
    if (!tickets) return 'Tickets Not found'

    return (
        
        <Paper className="outer-paper">
            <div><Card className="ticketlist">
            {this.props.tickets && this.props.tickets.map(ticket => this.renderTicket(ticket))}
            </Card>
            </div>   
        </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  event: state.event && state.event,
//   event: state.events && state.events[props.match.params.id],
  users: state.users,
  tickets: state.tickets,
//   ticket: state.tickets && state.tickets[0]
  
})

const mapDispatchToProps = {
  getEventTickets, getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)( Tickets)
