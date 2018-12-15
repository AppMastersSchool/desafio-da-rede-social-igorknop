import React, { Component } from "react";
import Post from "./post";
import PostCreator from "./post-creator";
import UserSelector from "./user-selector";
//import axios from 'axios';

const DATABASE_NAME = "xoxialDB";
const DATABASE_DEFAULT = {
  posts: [],
  users: [
    {
      username: "jfbaraky",
      img: "https://avatars1.githubusercontent.com/u/20716607?s=460&v=4"
    },
    { username: "igorknop" },
    {
      username: "tiagogouvea",
      img: "https://avatars2.githubusercontent.com/u/2242549?s=400&v=4"
    }
  ],
  currentUser: 0
};

export default class Timeline extends Component {
  constructor() {
    super();
    this.state = DATABASE_DEFAULT;
  }

  componentDidMount() {
    this.readFromStorage();
    //this.readFromAPI();
  }

  changeUser(newCurrent) {
    const newState = Object.assign({}, this.state, { currentUser: newCurrent });
    this.setState(newState, () => this.saveInStorage());
  }

  insertPost(post) {
    const newState = Object.assign({}, this.state);
    newState.posts.unshift(post);
    this.setState(newState);
    this.saveInStorage();
  }

  readFromStorage() {
    const xoxialDB = localStorage.getItem(DATABASE_NAME);
    if (xoxialDB) {
      this.setState(JSON.parse(xoxialDB));
    } else {
      this.setState(DATABASE_DEFAULT);
    }
  }

  readFromAPI() {
    //const xoxialDB = axios.get("http://localhost:3001/posts").then(response =>{
    //  console.log(response);
    //});
  }

  saveInStorage() {
    const xoxialDB = JSON.stringify(this.state);
    localStorage.setItem(DATABASE_NAME, xoxialDB);
  }

  onNavigate(post) {
    this.props.history.push("/post/" + post.time);
  }
  onProfileNavigate(post) {
    this.props.history.push("/profile/" + post.author);
  }

  render() {
    return (
      <div>
        <h1>XoXial</h1>
        <UserSelector
          users={this.state.users}
          current={this.state.currentUser}
          onChangeUser={this.changeUser.bind(this)}
        />
        <PostCreator
          onCreate={this.insertPost.bind(this)}
          getUser={() => this.state.users[this.state.currentUser]}
        />
        <button onClick={() => this.props.history.push("/sobre")}>
          Ver sobre
        </button>
        {this.state.posts.map((post, i) => {
          return (
            <Post
              onNavigate={() => this.onNavigate(post)}
              onProfileNavigate={() => this.onProfileNavigate(post)}
              key={post.time}
              post={post}
            />
          );
        })}
      </div>
    );
  }
}

export { DATABASE_NAME };
