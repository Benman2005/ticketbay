import React, {PureComponent} from 'react'
import {createComment} from '../actions/comments'
import { connect } from 'react-redux';
import {userId} from '../jwt'


class CommentForm extends PureComponent {
    state = {}
    
	handleSubmit = async (e) => {
        e.preventDefault()
        const userId = this.props.userId
        const ticketid  = this.props.ticket.id
        this.props.userId && this.props.createComment(ticketid, userId, this.state.comment)
	}

	handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

	render() {
		return (
      <div>
      
      <div className="login-form">
      <form onSubmit={this.handleSubmit}>
      <label>
      Add Comment
      <input type="text" name="comment" value={
        this.state.comment || ''
      } onChange={ this.handleChange } required/>
      </label>

      <button type="submit">Submit Comment</button>
      </form>
      </div>
      </div>
    )

	}
}
const mapStateToProps = function (state) {
	return {
        // signup: state.signup
        userId: state.currentUser && userId(state.currentUser.jwt),

	}
}

export default connect(mapStateToProps, {createComment})( CommentForm)
