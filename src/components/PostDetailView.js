import React, { Component } from "react";
import PostElement from "./elements/PostElement";
import { Comment, Header, Button} from "semantic-ui-react";
import { connect } from "react-redux";
import { removeComment, addCommentAsync, toggleCommentModal, toggleEditCommentModal } from "../actions";
import CommentAddModalElement from "./elements/CommentAddModalElement";
import CommentEditModalElement from "./elements/CommentEditModalElement";
import * as ReadableAPI from "../utils/ReadableAPI";

class PostDetailView extends Component {

    toggleAddCommentModal(){
        this.props.toggleCommentModal(this.props.isOpenCommentModal)
    }

    toggleEditCommentModal(){
        this.props.toggleEditCommentModal(this.props.isOpenEditCommentModal)
    }

    deleteComment(comment) {
        const { deleteComment } = this.props;
        ReadableAPI.deleteComment(comment.id).then(() => {
            deleteComment(comment);
        });
    }

    render() {
        let post = this.props.location.state.post;
        const { comments, isOpenCommentModal, isOpenEditCommentModal } = this.props;
        let id = post.id;
        let newComments = comments[id];

        return (
            <div>
                <Header as="h3" dividing>
                    Post
                </Header>
                <PostElement post={post} />
                <Comment.Group>
                    <Header as="h3" dividing>
                        Comments
                        <Button label={'Add Comment'} icon='plus' labelPosition='left' onClick={() => this.toggleAddCommentModal()}/>
                        <CommentAddModalElement open={isOpenCommentModal} postId={post.id}/>
                    </Header>
                    {newComments &&
                        newComments.map(comment => (
                            <Comment key={comment.id}>
                                <Comment.Content>
                                    <Comment.Author as='a'>
                                        {comment.author}
                                    </Comment.Author>
                                    <Comment.Metadata>
                                        <div>
                                            {new Date(
                                                comment.timestamp
                                            ).toString()}
                                        </div>
                                        <Button size='tiny' icon='edit' onClick={() => this.toggleEditCommentModal()} compact/>
                                        <CommentEditModalElement open={isOpenEditCommentModal} comment={comment}/>
                                        <Button size='tiny' color='red' onClick={() => this.deleteComment(comment)} icon='remove' compact/>
                                    </Comment.Metadata>
                                    <Comment.Text>{comment.body}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        ))}
                </Comment.Group>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteComment: data => dispatch(removeComment(data)),
        createComment: data => dispatch(addCommentAsync(data)),
        toggleCommentModal: data => dispatch(toggleCommentModal(data)),
        toggleEditCommentModal: data => dispatch(toggleEditCommentModal(data)),
    };
}

function mapStateToProps(state) {
    return { 
        comments: state.reducer.comments,
        isOpenCommentModal: state.reducer.modal.commentModal,
        isOpenEditCommentModal: state.reducer.modal.editCommentModal
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);
