import React, { Component } from "react";
import Post from "./post";
import { DATABASE_NAME } from "./timeline";
import axios from "axios";

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        author: "",
        content: "",
        initialLikes: 0
      }
    };
  }

  componentDidMount() {
    this.getPostFromAPI();
  }

  getPostFromAPI() {
      console.log(this.props.match.params.id);
      
    axios
      .get("http://localhost:3001/posts/" + this.props.match.params.id)
      .then(response => {
        console.log(response);
        this.setState({ post: response.data });
      })
      .catch(err => {
        this.setState({
          post: {
            content: "Post inexistente",
            author: "??",
            time: 0,
            initialLikes: -1
          }
        });
      });
  }
  getPostFromStorage() {
    const posts = JSON.parse(localStorage.getItem(DATABASE_NAME)).posts;

    const post = posts
      .filter(savedPost => {
        console.log(
          savedPost.id,
          this.props.match.params.id,
          savedPost.id === this.props.match.params.id
        );

        return savedPost.id === this.props.match.params.id;
      })
      .pop();
    return post;
  }

  render() {
    if (this.state.post == null) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
          <Post post={this.state.post} />
        </div>
      );
    }
  }
}
export default PostDetails;
