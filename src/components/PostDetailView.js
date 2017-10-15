import React, { Component } from "react";
import PostElement from "./elements/PostElement";
import { Comment, Header, Button, Label, Item } from "semantic-ui-react";
import { connect } from "react-redux";
import {
    removeComment,
    addCommentAsync,
    toggleEditCommentModal,
    voteComment,
    fetchPost
} from "../actions";
import CommentAddModalElement from "./elements/CommentAddModalElement";
import CommentEditModalElement from "./elements/CommentEditModalElement";
import PostEditModalElement from "./elements/PostEditModalElement";
import * as ReadableAPI from "../utils/ReadableAPI";
import CommentsSubHeader from "./elements/CommentsSubHeader";
var _ = require("lodash");

class PostDetailView extends Component {
    // componentWillMount() {
    //     const { fetchPost } = this.props;
    //     fetchPost(this.props.location.state.post.id);
    // }

    toggleEditCommentModal(comment) {
        this.props.toggleEditCommentModal(
            this.props.isOpenEditCommentModal,
            comment
        );
    }

    deleteComment(comment) {
        const { deleteComment } = this.props;
        ReadableAPI.deleteComment(comment.id).then(() => {
            deleteComment(comment);
        });
    }

    voteUp(id) {
        const { voteForComment } = this.props;
        ReadableAPI.voteComment(id, "upVote").then(comment => {
            voteForComment(comment);
        });
    }

    voteDown(id) {
        const { voteForComment } = this.props;
        ReadableAPI.voteComment(id, "downVote").then(comment => {
            voteForComment(comment);
        });
    }

    render() {
        const { posts } = this.props;
        let post = this.props.location.state.post;

        posts.map(postFromStore => {
            if (postFromStore.id === this.props.location.state.post.id) {
                post = postFromStore;
            }
            return post;
        });

        const {
            comments,
            isOpenCommentModal,
            isOpenEditCommentModal
        } = this.props;
        let id = post.id;
        let newComments = comments[id];
        newComments = _.sortBy(newComments, ["voteScore"]);
        newComments = _.reverse(newComments);

        return (
            <Item.Group>
                <Header as="h3" dividing>
                    Post
                </Header>
                <PostElement key={post.id} post={post} />
                <Header as="h3" dividing>
                    Comments
                    <CommentsSubHeader />
                </Header>
                <Comment.Group>
                    {newComments &&
                        newComments.map(comment => (
                            <Comment key={comment.id}>
                                <Comment.Content>
                                    <Comment.Author as="a">
                                        {comment.author}
                                    </Comment.Author>
                                    <Comment.Metadata>
                                        <div>
                                            {new Date(
                                                comment.timestamp
                                            ).toString()}
                                        </div>
                                        <Label
                                            icon="star"
                                            content={comment.voteScore}
                                        />
                                        <Button
                                            size="tiny"
                                            onClick={() =>
                                                this.voteUp(comment.id)}
                                            icon="chevron up"
                                            compact
                                        />
                                        <Button
                                            size="tiny"
                                            onClick={() =>
                                                this.voteDown(comment.id)}
                                            icon="chevron down"
                                            compact
                                        />
                                        <Button
                                            size="tiny"
                                            icon="edit"
                                            onClick={() =>
                                                this.toggleEditCommentModal(
                                                    comment
                                                )}
                                            compact
                                        />
                                        <Button
                                            size="tiny"
                                            color="red"
                                            onClick={() =>
                                                this.deleteComment(comment)}
                                            icon="remove"
                                            compact
                                        />
                                    </Comment.Metadata>
                                    <Comment.Text>{comment.body}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        ))}
                </Comment.Group>
                <CommentAddModalElement
                    open={isOpenCommentModal}
                    postId={post.id}
                />
                <CommentEditModalElement
                    open={isOpenEditCommentModal}
                    comment={this.props.editedComment}
                />
                <PostEditModalElement
                    post={post}
                    open={this.props.isOpenEditPostModal}
                />
            </Item.Group>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteComment: data => dispatch(removeComment(data)),
        createComment: data => dispatch(addCommentAsync(data)),
        toggleEditCommentModal: (data, data2) =>
            dispatch(toggleEditCommentModal(data, data2)),
        voteForComment: data => dispatch(voteComment(data)),
        fetchPost: data => dispatch(fetchPost(data))
    };
}

function mapStateToProps(state) {
    return {
        posts: state.reducer.posts,
        comments: state.reducer.comments,
        isOpenCommentModal: state.reducer.modal.commentModal,
        isOpenEditCommentModal: state.reducer.modal.editCommentModal.status,
        editedComment: state.reducer.modal.editCommentModal.comment,
        isOpenEditPostModal: state.reducer.modal.editPostModal.status,
        editPostModalPost: state.reducer.modal.editPostModal.post
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);
