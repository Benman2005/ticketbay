import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import {getUsers} from '../actions/users'
import {userId} from '../jwt'
import Paper from 'material-ui/Paper'
import Card, { CardContent } from 'material-ui/Card'

import {getEventTickets} from '../actions/tickets'
import './EventList.css'

import {getTicketComments} from '../actions/comments'

class Comments extends PureComponent {

  componentWillMount(){
    this.props.getUsers()
    // this.props.getTicketComments(this.props.ticketid)
  }
  componentDidMount() {
      if (this.props.users === null) this.props.getUsers()
    this.props.getTicketComments(this.props.ticketid)
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.users === null) this.props.getUsers()
    if (this.props.ticketid !== prevProps.ticketid) {
        this.props.getTicketComments(this.props.ticketid)  
    }
  }

  renderComment= (comment) =>{
    const {users} = this.props
    let id = Number(comment.userid)
    return(
        <Card key={comment.id} className="commentcard">
        <CardContent>
        <h4>{comment.blah}</h4><br/>
        {/* {comment.ticketid} */}
        {/* {comment.userid} */}
        - {users[id].firstName !== undefined && users[id].firstName.slice(0, users[id].firstName.indexOf('@'))}
        </CardContent> 
        </Card>
    )
    }
  render() {

    const {comments} = this.props

    return (

        <div>
        Comments

        <Card className="commentlist">
        {comments && comments.map(comment => this.renderComment(comment))}
        </Card>
        </div>   
)
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  users: state.users,
  ticketid: state.ticket.id,
  comments: state.comments
})

const mapDispatchToProps = {
  getEventTickets, getUsers, getTicketComments
}

export default connect(mapStateToProps, mapDispatchToProps)( Comments)
