import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getEvents, getEvent} from '../actions/events'
import {getUsers, getUser} from '../actions/users'
import {getTicketComments} from '../actions/comments'
import {getTicket, getEventTickets, getUserTickets} from '../actions/tickets'
import './EventList.css'

class Risk extends PureComponent {
    
    calculateRisk() {
        const {comments, ticket, usertickets, tickets} = this.props
        let avgprice = 0    
        let risk = 0
        let time = 0
        if(tickets) avgprice = tickets.map(ticket => ticket.price).reduce((a,b) => a+b) / tickets.length
        if(ticket && ticket.price > avgprice) risk -= (Math.min(ticket.price/avgprice*100-100, 15))
        if(ticket && ticket.price < avgprice ) risk += (100 - ticket.price/avgprice*100)
        // console.log(avgprice)
        if(usertickets && usertickets.length < 2) risk += 4
        time = new Date(ticket && ticket.created).getHours()
        if (time >= 9 && time <=17) risk -= 13
        else risk += 13
        if(comments && comments.length >3) risk +=6
        return risk
      }

    componentWillMount() {
    const{ticket, getEventTickets, getUsers, getTicketComments, getEvent, getUserTickets, } = this.props
    ticket && getTicketComments(ticket.id)
    // ticket && getEvent(ticketeventid)
    ticket && getEventTickets(ticket.eventid)
    ticket && getUserTickets(Number(ticket.userid))
    // console.log(this.props)
  }

  render() {
    let x = "green"
    if (this.calculateRisk() > 33) x="orange"
    if (this.calculateRisk() > 66) x="red"
    
    return (

        <div>
        <span style= {{color: x}}>Risk is {Math.floor(Math.max(Math.min(this.calculateRisk(), 98), 2))}%</span>
        </div>   
)
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments,
//   ticket: state.ticket,
  usertickets:state.usertickets,
  tickets: state.tickets,
//   ticketuserid
})

const mapDispatchToProps = {
  getEventTickets, getUsers, getTicketComments, getEvent, getUserTickets, 
}

export default connect(mapStateToProps, mapDispatchToProps)( Risk)
