import React, { Component } from "react";
import Post from "./post";
import PostCreator from "./post-creator";
import UserSelector from "./user-selector";

const DATABASE_NAME = "xoxialDB";
const DATABASE_DEFAULT = {
  posts: [],
  users: ["jfbaraky", "igorknop", "thigouvea"],
  currentUser: -1
};

class Timeline extends Component {
  constructor() {
    super();
    this.state = DATABASE_DEFAULT;
  }

  componentDidMount() {
    console.log("Loading previous data...");
    this.readFromStorage();
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

  saveInStorage() {
    const xoxialDB = JSON.stringify(this.state);
    localStorage.setItem("xoxialDB", xoxialDB);
  }

  onNavigate(post) {
    this.props.history.push("/post/" + post.time);
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
        <PostCreator onCreate={this.insertPost.bind(this)} getUser={()=>this.state.users[this.state.currentUser]}/>
        <button onClick={() => this.props.history.push("/sobre")}>
          Ver sobre
        </button>
        {this.state.posts.map((post, i) => {
          return (
            <Post
              onNavigate={() => this.onNavigate(post)}
              key={post.time}
              post={post}
            />
          );
        })}
      </div>
    );
  }
}

export default Timeline;
