import React, {Component}from 'react';
import Post from './post';
import {DATABASE_NAME} from './timeline';

class PostDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            post: {
                author: '',
                content:'',
                initialLikes: 0
            }
        }
    }

    componentDidMount(){
        const posts = JSON.parse(localStorage.getItem(DATABASE_NAME)).posts;
        
        const post = posts.filter(savedPost => {
            
            return savedPost.time*1 === this.props.match.params.time*1;
        }).pop();
        
        this.setState({post:post});
    }

    render(){
        if(this.state.post == null){
            return (<div>Loading</div>)
        } else {
            return(
                <div>
                    <Post post={this.state.post} />
                </div>
            ) 
        }
        
    }
}
export default PostDetails;