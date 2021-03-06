import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, Icon } from "semantic-ui-react";
import { toggleEditPostModal, editPost } from "../../actions";
import * as ReadableAPI from "../../utils/ReadableAPI";
import PostEditForm from "./PostEditForm";
var _ = require("lodash");

class PostEditModalElement extends Component {
    submitPost = values => {
        console.log(values);
        ReadableAPI.editPost(this.props.editedPost.id, {
            title: values.title,
            body: values.body
        })
            .then(post => {
                console.log(post);
                this.props.editPost(post);
            })
            .then(() => {
                this.toggleModal();
            });
    };

    toggleModal() {
        this.props.toggleEditPostModal(this.props.isOpenEditPostModal, null);
    }

    getTitle(post) {
        if (_.isEmpty(this.props.editedPost)) {
            return null;
        }
        return this.props.editedPost.title;
    }

    getBody(post) {
        if (_.isEmpty(this.props.editedPost)) {
            return null;
        }
        return this.props.editedPost.body;
    }

    render() {
        let post = this.props.editedPost;
        console.log(post);
        return (
            <Modal open={this.props.open}>
                <Modal.Header>
                    Edit Post
                    <Button
                        style={{ float: "right" }}
                        onClick={() => this.toggleModal()}
                        icon
                    >
                        <Icon name="close" />
                    </Button>
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <PostEditForm
                            title={this.getTitle()}
                            body={this.getBody()}
                            onSubmit={this.submitPost}
                        />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editPost: data => dispatch(editPost(data)),
        toggleEditPostModal: data => dispatch(toggleEditPostModal(data))
    };
}

function mapStateToProps(state) {
    return {
        posts: state.reducer.posts,
        isOpenEditPostModal: state.reducer.modal.editPostModal.status,
        editedPost: state.reducer.modal.editPostModal.post
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    PostEditModalElement
);
