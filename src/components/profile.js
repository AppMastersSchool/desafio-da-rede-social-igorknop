import React, { Component } from "react";
import { DATABASE_NAME } from "./timeline";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", img: "" };
  }

  componentDidMount() {
    const xoxialDB = JSON.parse(localStorage.getItem(DATABASE_NAME));
    const userselected = xoxialDB.users
      .filter(user => {
        return user.username === this.props.match.params.username;
      })
      .pop();
    console.log(userselected);

    this.setState({ username: userselected.username, img: userselected.img });
  }

  render() {
    return (
      <div className={"profile"}>
        <h1>
          <img
            src={this.state.img || "http://placekitten.com/80/80"}
            width="80"
            height="80"
            style={{
              borderRadius: "50%"
            }}
            alt={this.state.username}
          />
          {this.state.username}
        </h1>
      </div>
    );
  }
}
