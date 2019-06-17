import React from 'react';
import { Button, Form } from 'semantic-ui-react'
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
      <Form onSubmit={this.handleLogin}>
        <Form.Field>
          <label>Name</label>
          <input type="text" name="name" onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Username</label>
          <input type="text" name="username" onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type="password" name="password" onChange={this.handleChange} />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}
