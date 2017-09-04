import React, { Component } from 'react';
import PostElement from './elements/PostElement';
import { Comment, Header, Label } from 'semantic-ui-react';
import AddCommentElement from './elements/AddCommentElement';
import { connect } from 'react-redux';
import { removeComment } from '../actions';
import * as ReadableAPI from '../utils/ReadableAPI';


class PostDetailView extends Component {

    deleteComment(comment){
        const { deleteComment } = this.props;
        ReadableAPI.deleteComment(comment.id).then(() => {
            deleteComment(comment);
        });
    }

    render() {

        let post = this.props.location.state.post;
        const { comments } = this.props
        let id = post.id
        let newComments = comments[id]


        return (
            <div>
                <Header as='h3' dividing>Post</Header>
                <PostElement post={post} />
                <Comment.Group>
                    <Header as='h3' dividing>Comments</Header>
                    {newComments &&
                        newComments.map((comment) =>
                            <Comment key={comment.id}>
                            <Comment.Content>
                                <Comment.Author>
                                    {comment.author}
                                    <Label onClick={() => this.deleteComment(comment)} icon='remove' color='red'/>
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
                    <AddCommentElement post={post}/>
                </Comment.Group>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteComment: data => dispatch(removeComment(data))
    };
}

function mapStateToProps(state) {
    return {comments: state.reducer.comments};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);
