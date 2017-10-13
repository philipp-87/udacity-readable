import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, Icon } from "semantic-ui-react";
import { editComment, toggleEditCommentModal } from "../../actions";
import CommentEditForm from "./CommentEditForm";
import * as ReadableAPI from "../../utils/ReadableAPI";

class CommentEditModalElement extends Component {
    submitComment = values => {
        ReadableAPI.editComment(this.props.comment.id, {
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
        this.props.toggleEditCommentModal(this.props.isOpenEditCommentModal);
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
                            body={this.props.comment.body}
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
        isOpenEditCommentModal: state.reducer.modal.editCommentModal
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    CommentEditModalElement
);
