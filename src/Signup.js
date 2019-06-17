import React from 'react';
const USER_API = "http://localhost:3000/users"

export default class Signup extends React.Component {
  state = {
    name: '',
    username: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = (e) => {
    e.preventDefault();
    
  }

  render() {
    return (
      <form onSubmit={this.handleLogin}>
        <input type="text" name="name" onChange={this.handleChange} />
        <input type="text" name="username" onChange={this.handleChange} />
        <input type="password" name="password" onChange={this.handleChange} />

        <input type="submit" value="Log In" />
      </form>
    )
  }
}
