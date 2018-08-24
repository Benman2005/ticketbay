import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getEvents, getEvent} from '../actions/events'
import {getUsers, getUser} from '../actions/users'
import {getEventTickets, getUserTickets} from '../actions/tickets'
import {getTicketComments} from '../actions/comments'
import {getTicket} from '../actions/tickets'
import {userId} from '../jwt'
import Paper from 'material-ui/Paper'
import Comments from './Comments'
import { Link } from 'react-router-dom'
import './games/GamesList.css'
import EditTicketForm from './EditTicketForm'

class TicketDetails extends PureComponent {

  componentWillMount() {
    this.props.getTicket(this.props.match.params.id)
    if (this.props.users === null) this.props.getUsers()
  }
  componentDidMount() {
    if (this.props.users === null) this.props.getUsers()
  this.props.getTicketComments(this.props.ticketid)
  if(this.props.ticket && this.props.userTickets === null) this.props.getUserTickets(this.props.ticket.userid)

}
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.users === null) this.props.getUsers()
    if (this.props.ticketid !== prevProps.ticketid) {
        this.props.getTicketComments(this.props.ticketid)  
    }
  }

  render() {
    const {authenticated,userId, event, comments, ticket, userTickets, tickets, getEvent, getEventTickets, getUserTickets, getUser, user, users} = this.props

    if(ticket && user === null) getUser(Number(ticket.userid))
    if (ticket && event === null) getEvent(ticket.eventid)
    if(ticket && tickets === null) getEventTickets(ticket.eventid)
    if(ticket && userTickets === null) getUserTickets(Number(ticket.userid))
    if(ticket && comments === null) getTicketComments(ticket.id)
    let avgprice = 0    
    if(tickets) avgprice = tickets.map(ticket => ticket.price).reduce((a,b) => a+b) / tickets.length
    let risk = 0
    if(userTickets && userTickets.length < 2) risk += 4
    console.log(risk)
    if(ticket && ticket.price < avgprice ) risk += (100 - ticket.price/avgprice*100)
    if(ticket && ticket.price < avgprice )console.log('percentage?' + (100 - ticket.price/avgprice*100))
    console.log(risk)
    if(ticket && ticket.price > avgprice) risk -= (Math.min(ticket.price/avgprice*100-100, 15))
    if(ticket && ticket.price > avgprice) console.log('percentage more expensive than avgprice ' + Math.min(ticket.price/avgprice*100-100, 15))
    console.log(`risk is now` + risk)
    let time = 0
    if(ticket) time = new Date(ticket.created).getHours()
    console.log(time)
    if (ticket && time >= 9 && time <=17) risk -= 13
    else risk += 13
    if(comments && comments.length >3) risk +=6

    ticket && console.log(new Date(ticket.created).getHours())

    console.log(`risk is now` + risk)

    if (ticket === null ) return 'Loading...' 
    if (!ticket) return 'Not found'
    
    console.log('average price is ' + avgprice)
    console.log(risk)
    console.log(userTickets)

    function author(){
      if(Number(userId) === Number(ticket.userid)){
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
const id = Number(ticket.userid)
console.log(this.props)

    return (
        
      <Paper className="outer-paper">
        {authenticated && (admin() || author() )&& <EditTicketForm ticket={ticket} event={event}/>}
        {/* {authenticated && author() && <EditTicketForm ticket={ticket} event={event}/>} */}
        <div>
        { <h1>Ticket from - 
        {users && users[id].firstName.slice(0, users[id].firstName.indexOf('@')).toUpperCase()}</h1>}
        We calculated that the risk of this ticket being a fraud is {Math.floor(Math.max(Math.min(risk, 98), 2))}%
        <img className="ticketphoto" src={ticket.photo} style={{width: '100%'}}></img> 
        {event ? <h1>{event.eventname}</h1> : ""}
        <h3>€{ticket.price}</h3>
        <p>{ticket.description}</p>
        <Link to= {`/events/${ticket.eventid}`}>
            <p>Back to event details</p></Link>
        <Comments users={this.props.users}/>
        </div>
      </Paper>)

  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  events: state.events,
  ticket: state.ticket,
  tickets:state.tickets,
  event: state.event,
  users: state.users,
  userTickets: state.usertickets,
  comments: state.comments,
  user: state.user,
  // risk: this.risk
})
const mapDispatchToProps = {
  getEvents, getEvent, getUsers, getUser, getEventTickets, getTicket, getUserTickets, getTicketComments
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetails)
