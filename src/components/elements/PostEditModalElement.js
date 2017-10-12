import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, Icon } from "semantic-ui-react";
import { toggleEditPostModal, editPost } from "../../actions";
import * as ReadableAPI from "../../utils/ReadableAPI";
import PostEditForm from "./PostEditForm";

class PostEditModalElement extends Component {
    submitPost = values => {
        console.log(values);
        ReadableAPI.editPost(this.props.post.id, {
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
        this.props.toggleEditPostModal(this.props.isOpenEditPostModal);
    }

    render() {
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
                            title={this.props.title}
                            body={this.props.body}
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
        isOpenEditPostModal: state.reducer.modal.editPostModal
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    PostEditModalElement
);
