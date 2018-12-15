import React, { Component } from "react";
import uuidv4 from "uuid/v4";

class PostCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      user: this.props.getUser()
    };
  }

  createPost() {
    const newPost = {
      id: uuidv4(),
      content: this.state.text,
      author: this.props.getUser().username,
      time: new Date().getTime(),
      initialLikes: 0
    };
    this.props.onCreate(newPost);
  }

  render() {
    return (
      <div style={{ padding: 15 }}>
        <h3>Novo Post</h3>
        <textarea
          onChange={event => {
            const value = event.target.value;
            this.setState({ text: value });
          }}
          value={this.state.text}
          rows="5"
          style={{ width: "100%" }}
        />
        <button onClick={() => this.createPost()}>Postar</button>
      </div>
    );
  }
}

export default PostCreator;
