import React, {PureComponent} from 'react'
import {editEvent} from '../actions/events'
import { connect } from 'react-redux';
import {userId} from '../jwt'
// import './LoginForm.css'

class EventForm extends PureComponent {

    state = {eventname: this.props.event.eventname, description: this.props.event.description, date: this.props.event.date, photo: this.props.event.photo}
    

	handleSubmit = async (e) => {
        e.preventDefault()
        const userId = this.props.userId
        this.props.userId && this.props.editEvent(this.props.eventId, this.state.eventname, userId, this.state.description, this.state.photo, this.state.date)
        window.location.reload(true)

	}

	handleChange = (event) => { 
        console.log(this.state) 
        const {name, value} = event.target
        console.log(event.target.defaultValue)

    this.setState({
      [name]: value
      
    })
    console.log(this.state)
  }

	render() {
        const {event} = this.props

		return (
            <div>
            <h3>Edit Event</h3>
      <div className="login-form">
  			<form onSubmit={this.handleSubmit}>
  				<label>
            Event Name
            <input type="text" name="eventname" value={
  						this.state.eventname || ''
  					} onChange={ this.handleChange } />
          </label>

            <label>
            Description
            <input maxLength="80" size="70" type="text" name="description" value={
  						this.state.description || ''
  					} onChange={ this.handleChange } />
            </label>
            <label>
                <input  type="datetime-local" name="date" value={this.state.date || event.date} onChange={ this.handleChange } />
               
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
        eventId:state.event.id,
        event: state.event

	}
}

export default connect(mapStateToProps, { editEvent})( EventForm)
