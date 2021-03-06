import React, { Component } from "react";
import Post from "./post";
import PostCreator from "./post-creator";
import UserSelector from "./user-selector";
import axios from "axios";
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
  currentUser: [0]
};

export default class Timeline extends Component {
  constructor() {
    super();
    this.state = DATABASE_DEFAULT;
  }

  componentDidMount() {
    //this.readFromStorage();
    this.readFromAPI();
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
  insertPostAPI(post) {
    axios.post("http://localhost:3001/posts", post).then(()=>{
      this.readFromAPI();
    });
  }
  updatePostAPI(post) {
    axios.put("http://localhost:3001/posts/"+post.id, post).then(() => {
      this.readFromAPI();
    });
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
    Promise.all([
      axios.get("http://localhost:3001/posts"),
      axios.get("http://localhost:3001/users")
    ])
      .then(responses => {
        const newState = Object.assign({}, this.state, {
          posts: responses[0].data.sort((a,b)=>b.time-a.time),
          users: responses[1].data
        });
        console.log(newState);

        this.setState(newState, function(resp) {
          console.log("API", resp);
        });
      })
      .catch(err => {
        console.error(err);
        this.setState(DATABASE_DEFAULT);
      });
  }

  saveInStorage() {
    const xoxialDB = JSON.stringify(this.state);
    localStorage.setItem(DATABASE_NAME, xoxialDB);
  }

  onNavigate(post) {
    this.props.history.push("/post/" + post.id);
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
          current={this.state.currentUser[0]}
          onChangeUser={this.changeUser.bind(this)}
        />
        <PostCreator
          onCreate={this.insertPostAPI.bind(this)}
          getUser={() => this.state.users[this.state.currentUser[0]]}
        />
        <button onClick={() => this.props.history.push("/sobre")}>
          Ver sobre
        </button>
        {this.state.posts.map((post, i) => {
          return (
            <Post
              onNavigate={() => this.onNavigate(post)}
              onUpdate={this.updatePostAPI.bind(this)}
              onProfileNavigate={() => this.onProfileNavigate(post)}
              key={post.id}
              post={post}
            />
          );
        })}
      </div>
    );
  }
}

export { DATABASE_NAME };
