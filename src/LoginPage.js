import React from 'react';
import { Button, Form } from 'semantic-ui-react'


class LoginPage extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin = (event) => {
    event.preventDefault();
    this.props.okToFetch(this.state.username)
  }

  render() {
    return (
      <Form onSubmit={this.handleLogin}>
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

export default LoginPage;
