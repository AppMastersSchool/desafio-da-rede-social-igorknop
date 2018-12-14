import React, { Component } from "react";

class PostCreator extends Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }

  createPost() {
    const newPost = {
      content: this.state.text,
      author: "Baraky",
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
            rows="5"
          onChange={event => {
            const value = event.target.value;
            this.setState({ text: value });
          }}
          style={{ width: "100%" }}
        >
          {this.state.text}
        </textarea>
        <button onClick={() => this.createPost()}>Postar</button>
      </div>
    );
  }
}

export default PostCreator;
