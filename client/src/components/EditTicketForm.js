import React, {PureComponent} from 'react'
import {editTicket} from '../actions/tickets'
import { connect } from 'react-redux';
import {userId} from '../jwt'
// import './LoginForm.css'

class EditTicketForm extends PureComponent {
    state = {price: this.props.ticket.price, description: this.props.ticket.description, photo: this.props.ticket.photo}
    
	handleSubmit = async (e) => {
        e.preventDefault()
        const {userId, ticket, editTicket} = this.props
        userId && editTicket(ticket.id, this.state.price, this.state.description, this.state.photo)
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
      <h3>Edit Ticket</h3>
      <div className="login-form">
      <form onSubmit={this.handleSubmit}>
      <label>
      Ticket Price
      <input type="number" name="price" value={
        this.state.price || ''
      } onChange={ this.handleChange } />
      </label>
      <label>
      Description
      <input maxLength="80" type="text" name="description" value={
        this.state.description || ''
      } onChange={ this.handleChange } />
      </label>
      <label>
      Photo URL (optional)
          <input  type="text" name="photo" value={this.state.photo || ''} onChange={ this.handleChange } />
      </label>
      <button type="submit" >Submit Ticket</button>
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

export default connect(mapStateToProps, {editTicket})( EditTicketForm)
