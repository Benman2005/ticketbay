import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getEvents, getEvent} from '../actions/events'
import {getUsers, getUser} from '../actions/users'
import {getTicketComments} from '../actions/comments'
import {getTicket, getEventTickets, getUserTickets} from '../actions/tickets'
import {userId} from '../jwt'
import Paper from 'material-ui/Paper'
import Comments from './Comments'
import { Link } from 'react-router-dom'
import './games/GamesList.css'
import EditTicketForm from './EditTicketForm'
import CommentForm from './CommentForm'

class TicketDetails extends PureComponent {
  state= {ticket:{}, event:{}, usertickets:[]}
  
  calculateRisk() {
    const {comments, ticket, usertickets, tickets} = this.props
    let avgprice = 0    
    let risk = 0
    let time = 0
    if(tickets) avgprice = tickets.map(ticket => ticket.price).reduce((a,b) => a+b) / tickets.length
    console.log(avgprice, '   ' + risk)
    if(usertickets && usertickets.length < 2) risk += 4
    console.log("userticketslength"+ risk)
    if(ticket.price < avgprice ) risk += (100 - ticket.price/avgprice*100)
    if(ticket.price > avgprice) risk -= (Math.min(ticket.price/avgprice*100-100, 15))
    console.log("avgpricecheck"+ risk)
    time = new Date(ticket.created).getHours()
    console.log(time)
    if (time >= 9 && time <=17) risk -= 13
    else risk += 13
    console.log("officetimecheck"+ risk)
    if(comments && comments.length >3) risk +=6
    console.log("commentslength"+ risk)
    return risk
  }
 
  componentDidMount() {
    const {users, ticket, event, getUsers, getTicket, getTicketComments} = this.props
    getTicket(this.props.match.params.id)
    getTicketComments(this.props.match.params.id)
    if (users === null) getUsers()
  }
  componentDidUpdate(prevProps) {
    const {ticket, tickets, event, getEvent, getEventTickets,getUserTickets, usertickets} = this.props
    ticket && !event && getEvent(ticket.eventid)
    // ticket && prevProps.ticket && ticket.eventid !== prevProps.ticket.eventid && getEvent(ticket.eventid)
    ticket && !tickets && getEventTickets(ticket.eventid)
    ticket && !usertickets && getUserTickets(Number(ticket.userid))
  }
  
  render() {
    const {authenticated,userId, event, comments, ticket, usertickets, tickets, getEvent, getEventTickets, getUserTickets, users} = this.props
   

    if (ticket === null ) return 'Loading...' 
    if (!ticket) return 'Not found'

    function author(){
      if(Number(userId) === Number(ticket.userid)){
          return true       
      }
      else return false
    }
    function admin(){
      const adminIds = [1, 2, 3]
        if(adminIds.includes(Number(userId))){
            return true       
        }
        else return false
    }
    const id = Number(ticket.userid)  

    return (
        
      <Paper className="outer-paper">
        <Link to= {`/events/${ticket.eventid}`}>
          <h4>&lt;&lt; Back to event details</h4>
        </Link>
        {authenticated && (admin() || author() )&& <EditTicketForm ticket={ticket} event={event}/>}
        <div>
          {<h1>Ticket from &nbsp; 
          {users && users[id].firstName.slice(0, users[id].firstName.indexOf('@')).toUpperCase()}</h1>}
          We calculated that the risk of this ticket being a fraud is {Math.floor(Math.max(Math.min(this.calculateRisk(), 98), 2))}%
          <img className="ticketphoto" src={ticket.photo} style={{width: '100%'}}></img> 
          {event ? <h1>{event.eventname}</h1> : ""}
          <h3>€{ticket.price}</h3>
          <p>{ticket.description}</p>
          {authenticated && <CommentForm ticket={ticket}/>}
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
  usertickets: state.usertickets,
  comments: state.comments,
  user: state.user,
  // risk: this.calculateRisk() 

})
const mapDispatchToProps = {
  getEvents, getEvent, getUsers, getUser, getEventTickets, getTicket,getEventTickets, getUserTickets, getTicketComments
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetails)
