import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, Icon } from "semantic-ui-react";
import { editComment, toggleEditCommentModal } from "../../actions";
import CommentEditForm from "./CommentEditForm";
import * as ReadableAPI from "../../utils/ReadableAPI";
var _ = require("lodash");

class CommentEditModalElement extends Component {
    submitComment = values => {
        ReadableAPI.editComment(this.props.editedComment.id, {
            body: values.body
        })
            .then(comment => {
                console.log(comment);
                this.props.editComment(comment);
            })
            .then(() => {
                this.toggleModal();
            });
    };

    toggleModal() {
        this.props.toggleEditCommentModal(
            this.props.isOpenEditCommentModal,
            null
        );
    }

    getBody(post) {
        if (_.isEmpty(this.props.editedComment)) {
            return null;
        }
        return this.props.editedComment.body;
    }

    render() {
        return (
            <Modal open={this.props.open}>
                <Modal.Header>
                    Edit Comment
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
                        <CommentEditForm
                            onSubmit={this.submitComment}
                            body={this.getBody()}
                        />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editComment: data => dispatch(editComment(data)),
        toggleEditCommentModal: data => dispatch(toggleEditCommentModal(data))
    };
}

function mapStateToProps(state) {
    return {
        isOpenEditCommentModal: state.reducer.modal.editCommentModal,
        editedComment: state.reducer.modal.editCommentModal.comment
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    CommentEditModalElement
);
