import React from 'react';
const USER_API = "http://localhost:3000/users"

export default class LoginPage extends React.Component {
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
    let user = this.props.users.find(u=>u.username===this.state.username)
    if (!user) {
      fetch(USER_API, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          username: this.state.username,
          password: this.state.password
        })
      })
      .then(r=>r.json())
      .then(user=>{
        this.props.newUser(user)
        this.props.okToFetch(user.username)
      })
    } else {
      this.props.okToFetch(user.username)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleLogin}>
        <label>Login or Signup!</label>
        <input type="text" name="name" placeholder="name" onChange={this.handleChange} />
        <input type="text" name="username" placeholder="username" onChange={this.handleChange} />
        <input type="password" name="password" placeholder="password" onChange={this.handleChange} />

        <input type="submit" value="Log In" />
      </form>
    )
  }
}
