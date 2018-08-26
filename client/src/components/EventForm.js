import React, {PureComponent} from 'react'
import {createEvent} from '../actions/events'
import { connect } from 'react-redux';
import {userId} from '../jwt'
// import './LoginForm.css'

class EventForm extends PureComponent {
    state = {}
    

	handleSubmit = async (e) => {
        e.preventDefault()
        const userId = this.props.userId
        this.props.userId && this.props.createEvent(this.state.eventname, userId, this.state.description, this.state.photo, this.state.date)
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
            <h3>Create Event</h3>
      <div className="login-form">
  			<form onSubmit={this.handleSubmit}>
  				<label>
            Event Name
            <input type="text" name="eventname" value={
  						this.state.eventname || ''
  					} onChange={ this.handleChange } required />
          </label>

            <label>
            Description
            <input maxLength="80" type="text" name="description" value={
  						this.state.description || ''
  					} onChange={ this.handleChange } required/>
            </label>
            <label>
              Date
                <input  type="datetime-local" name="date" value={this.state.date} onChange={ this.handleChange } required/>
               
            </label>
            <label>
            Photo(URL)
            <input type="text" name="photo" value={
  						this.state.photo || ''
  					} onChange={ this.handleChange } />
            </label>
            

  				<button type="submit">Submit Event</button>
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

export default connect(mapStateToProps, {createEvent})( EventForm)
