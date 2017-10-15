import React, { Component } from "react";
import { Label, Item, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
    votePost,
    fetchComments,
    removePost,
    toggleEditPostModal
} from "../../actions";
import * as ReadableAPI from "../../utils/ReadableAPI";
var _ = require("lodash");

class PostElement extends Component {
    componentDidMount() {
        const { loadComments, post } = this.props;
        loadComments(post.id);
    }

    voteUp() {
        const { voteForPost, post } = this.props;
        ReadableAPI.votePost(post.id, "upVote").then(post => {
            voteForPost(post);
        });
    }

    voteDown() {
        const { voteForPost, post } = this.props;
        ReadableAPI.votePost(post.id, "downVote").then(post => {
            voteForPost(post);
        });
    }

    deletePost() {
        const { deletePost, post } = this.props;
        ReadableAPI.deletePost(post.id).then(() => {
            deletePost(post);
        });
    }

    getComments() {
        const { post, comments } = this.props;
        var commentsArray = [];

        comments.map(comment => {
            if (comment.parentId === post.id) {
                if (!_.some(commentsArray, comment)) {
                    commentsArray.push(comment);
                }
                return commentsArray;
            }
            return commentsArray;
        });
        return commentsArray;
    }

    toggleModal() {
        let post = this.props.post;
        console.log(post);
        this.props.toggleEditPostModal(this.props.isOpenEditPostModal, post);
    }

    renderControls() {
        const { post, comments } = this.props;
        let id = post.id;
        let newComments = comments[id];

        return (
            <Item.Extra>
                <Label content={post.category} />
                <Label icon="star" content={post.voteScore} />
                <Button
                    size="tiny"
                    onClick={() => this.voteUp()}
                    icon="chevron up"
                    compact
                />
                <Button
                    size="tiny"
                    onClick={() => this.voteDown()}
                    icon="chevron down"
                    compact
                />
                <Link
                    to={{
                        pathname: `/${post.category}/${post.id}`,
                        state: {
                            comments: newComments,
                            post: post
                        }
                    }}
                >
                    <Button
                        size="tiny"
                        content={
                            !_.isUndefined(newComments) ? (
                                newComments.length
                            ) : (
                                "0"
                            )
                        }
                        icon="comments"
                        labelPosition="left"
                        compact
                    />
                </Link>
                <Button
                    size="tiny"
                    icon="edit"
                    onClick={() => this.toggleModal()}
                    compact
                />
                <Button
                    size="tiny"
                    color="red"
                    onClick={() => this.deletePost()}
                    icon="remove"
                    compact
                />
            </Item.Extra>
        );
    }

    render() {
        const { post, comments } = this.props;
        let id = post.id;
        let newComments = comments[id];

        return (
            <Item>
                <Item.Content>
                    <Item.Header>
                        <Link
                            to={{
                                pathname: `/${post.category}/${post.id}`,
                                state: { comments: newComments, post: post }
                            }}
                        >
                            {post.title}
                        </Link>
                    </Item.Header>
                    <Item.Meta>{new Date(post.timestamp).toString()}</Item.Meta>
                    <Item.Description>
                        {post.body}
                        <br />
                        <br />
                        <p>Author: {post.author}</p>
                    </Item.Description>
                    {this.renderControls()}
                </Item.Content>
            </Item>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        voteForPost: data => dispatch(votePost(data)),
        loadComments: data => dispatch(fetchComments(data)),
        deletePost: data => dispatch(removePost(data)),
        toggleEditPostModal: (data, data2) =>
            dispatch(toggleEditPostModal(data, data2))
    };
}

function mapStateToProps(state) {
    return {
        comments: state.reducer.comments,
        posts: state.reducer.posts,
        isOpenEditPostModal: state.reducer.modal.editPostModal.status
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostElement);
