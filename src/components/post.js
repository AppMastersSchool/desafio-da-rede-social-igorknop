import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LikeIcon from "@material-ui/icons/ThumbUp";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

import "./post.css";
import {DATABASE_NAME} from "./timeline";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        author: props.post.author,
        likes: props.post.initialLikes,
        content: props.post.content
      }
    };
    this.doLike = this.doLike.bind(this);
  }

  doLike() {
    let newState = Object.assign({}, this.state);
    newState.post.likes++;
    this.setState(newState, () => {
      this.saveLikesInStorage();
    });
  }

  saveLikesInStorage() {
    const xoxialDB = JSON.parse(localStorage.getItem(DATABASE_NAME));
    const updatePosts = xoxialDB.posts.map(savedPost => {
      if (savedPost.time * 1 === this.props.post.time * 1) {
        savedPost.initialLikes = this.state.likes;
      }
      return savedPost;
    });
    Object.assign({}, xoxialDB, { posts: updatePosts });
    localStorage.setItem(DATABASE_NAME, JSON.stringify(xoxialDB));
  }
  render() {
    const post = this.props.post;

    return (
      <Card className={"card"}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {post.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container alignItems="center" spacing={16}>
            <Avatar>{post.author.substr(0, 2).toUpperCase()}</Avatar>
            <Typography
              onClick={() => this.props.onProfileNavigate()}
              color="textSecondary"
              gutterBottom
            >
              {post.author}
            </Typography>
            <Typography
              onClick={() => this.props.onNavigate()}
              color="textSecondary"
              gutterBottom
            >
              {new Date(post.time).toLocaleString()}
            </Typography>
          </Grid>
          <IconButton aria-label="Like" onClick={this.doLike}>
            {this.state.post.likes} <LikeIcon fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default Post;
