import React, { Component } from "react";

export default class UserSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { current: this.props.current };
  }
  render() {
    return (
      <select
        value={this.props.current}
        onChange={event => {
          const value = event.target.value;
          this.setState({ current: value });
          this.props.onChangeUser(value);
        }}
      >
        {this.props.users.map((user, k) => (
          <option key={user} value={k}>
            {user}
          </option>
        ))}
      </select>
    );
  }
}
