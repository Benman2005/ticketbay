import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../actions/users'
import {userId} from '../jwt'
import Card, { CardContent } from 'material-ui/Card'
import {getEventTickets} from '../actions/tickets'
import { Link } from 'react-router-dom'
import './Tickets.css'


class Tickets extends PureComponent {

  componentDidMount() {
    this.props.getEventTickets(this.props.event.id)
    this.props.getUsers()  
  }
  componentDidUpdate(prevProps) {
    if (this.props.event.id !== prevProps.event.id) {
        this.props.getEventTickets(this.props.event.id)  
    }
  }

  renderTicket= (ticket) =>{
    const id = Number(ticket.userid)
    const {users} = this.props
    if(users === null)return 'loading users'
    return(
      <Link to= {`/tickets/${ticket.id}`}>
      <Card key={ticket.id} className="ticketcard">
        <CardContent className="ticketss">
        <img src={ticket.photo}></img>
        Price: €{ticket.price}<br />
        Seller: {users && users[id].firstName.slice(0, users[id].firstName.indexOf('@')).toLowerCase()}
        </CardContent> 
      </Card>
      </Link>
    )
  }

  render() {
    const { tickets} = this.props

    return (
      <div>
      <h1>Tickets:</h1>
      <Card className="ticketlist">
      {tickets && tickets.sort((a, b) => {return b.id-a.id}).map(ticket => this.renderTicket(ticket))}
      </Card>
      </div>   
    )
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  event: state.event && state.event,
  users: state.users,
  tickets: state.tickets,  
})

const mapDispatchToProps = {
  getEventTickets, getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)( Tickets)