import React, {PureComponent} from 'react'
import {editTicket} from '../actions/tickets'
import { connect } from 'react-redux';
import {userId} from '../jwt'
// import './LoginForm.css'

class EditTicketForm extends PureComponent {
    state = {price: this.props.ticket.price, description: this.props.ticket.description, photo: this.props.ticket.photo}
    

	handleSubmit = async (e) => {
        e.preventDefault()
        const userId = this.props.userId
        const ticketid  = this.props.ticket.id
        const { match, location, history } = this.props
        console.log(userId)
        this.props.userId && this.props.editTicket(ticketid, this.state.price, this.state.description, this.state.photo)

		// history.push("/tickets/"+ this.props.ticket.id);
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
      
    })
    console.log(this.state)

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
            <input maxLength="80" size="70" type="text" name="description" value={
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
