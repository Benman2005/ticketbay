import React, {PureComponent} from 'react'
import {createTicket} from '../actions/tickets'
import { connect } from 'react-redux';
import {userId} from '../jwt'
// import './LoginForm.css'

class EventForm extends PureComponent {
    state = {}
    

	handleSubmit = async (e) => {
        e.preventDefault()
        const userId = this.props.userId
        const eventid  = this.props.event.id
        console.log(userId)
        this.props.userId && this.props.createTicket(eventid, this.state.price, this.state.description, userId, this.state.photo, new Date())
        window.location.reload(true)

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
            <h3>Create Ticket</h3>
      <div className="login-form">
  			<form onSubmit={this.handleSubmit}>
  				<label>
            Ticket Price
            <input type="number" name="price" value={
  						this.state.price || ''
  					} onChange={ this.handleChange } required/>
          </label>

            <label>
            Description
            <input maxLength="80" size="70" type="text" name="description" value={
  						this.state.description || ''
  					} onChange={ this.handleChange } required/>
            </label>
            <label>
            Photo URL (optional)
                <input  type="text" name="photo" value={this.state.photo || ''} onChange={ this.handleChange } />
            </label>
            

  				<button type="submit">Submit Ticket</button>
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

export default connect(mapStateToProps, {createTicket})( EventForm)
