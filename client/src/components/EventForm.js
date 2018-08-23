import React, {PureComponent} from 'react'
// import './LoginForm.css'

export default class EventForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
      <div className="login-form">
  			<form onSubmit={this.handleSubmit}>
  				<label>
            Event Name
            <input type="text" name="eventname" value={
  						this.state.email || ''
  					} onChange={ this.handleChange } />
          </label>

  				<label>
            Description
            <input type="password" name="description" value={
  						this.state.password || ''
  					} onChange={ this.handleChange } />
          </label>

  				<button type="submit">Login</button>
  			</form>
		  </div>)
	}
}
