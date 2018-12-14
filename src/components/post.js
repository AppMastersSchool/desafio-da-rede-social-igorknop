import React, { Component } from "react";
import "./post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: props.post.initialLikes
    };
    this.doLike = this.doLike.bind(this);
  }
  doLike() {
    this.setState({ likes: this.state.likes + 1 }, () => {
      this.saveLikesInStorage();
    });
  }
  saveLikesInStorage() {
    const posts = JSON.parse(localStorage.getItem("savedPosts"));
    const updatePosts = posts.map(savedPost => {
      if (savedPost.time === this.props.post.time) {
        savedPost.initialLikes = this.state.likes;
      }
      return savedPost;
    });
    localStorage.setItem("savedPosts", JSON.stringify(updatePosts));
    console.table(updatePosts);
  }
  render() {
    const post = this.props.post;
    console.log(this.props);
    return (
      <div className={"post"}>
        <div className={"message"}>{post.content}</div>
        <div className={"metadata"}>
          <span onClick={()=>this.props.onProfileNavigate()}>{post.author}</span> at{" "}
          <span
            onClick={() => this.props.onNavigate()}
          >
            {new Date(post.time).toLocaleString()}
          </span>
          <button onClick={this.doLike}>{this.state.likes} Likes</button>
        </div>
      </div>
    );
  }
}

export default Post;
