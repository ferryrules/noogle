import React, { Component } from 'react';

export default class Notes extends Component {
  render() {
    console.log(this.props.user);
    return (
      <div>
        <button
          id={this.props.id}
          onClick={this.props.deleteMe}>x</button>
        <cite>{this.props.user.username}: </cite>
        {this.props.note}
        <ul>
          <a href={this.props.url}>{this.props.url}</a>
        </ul>
      </div>
    )
  }
}
