import React, { Component } from 'react';
import PostElement from './elements/PostElement';
import { Comment, Header } from 'semantic-ui-react';

class PostDetailView extends Component {

    render() {
        let comments = this.props.location.state.comments;
        let post = this.props.location.state.post;
        console.log(comments);
        return (
            <div>
                <Header as='h3' dividing>Post</Header>
                <PostElement post={post} />
                <Comment.Group>
                    <Header as='h3' dividing>Comments</Header>
                    {comments &&
                        comments.map((comment, index) =>
                            <Comment key={index}>
                            <Comment.Content>
                                <Comment.Author>
                                    {comment.author}
                                </Comment.Author>
                                <Comment.Metadata>
                                    <div>{new Date(comment.timestamp).toString()}</div>
                                </Comment.Metadata>
                                <Comment.Text>
                                    {comment.body}
                                </Comment.Text>
                            </Comment.Content>
                            </Comment>
                    )}
                </Comment.Group>
            </div>
        );
    }
}

export default PostDetailView;
