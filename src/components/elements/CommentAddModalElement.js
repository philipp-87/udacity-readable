import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Icon } from 'semantic-ui-react';
import { addCommentAsync, toggleCommentModal } from '../../actions';
import CommentAddForm from "./CommentAddForm";

class CommentAddModalElement extends Component {

    submitComment = values => {
        const { createComment, postId } = this.props;
        createComment({
            body: values.body,
            owner: values.author,
            parentId: postId
        }).then(() => {
            this.toggleModal();
        });
    };

    toggleModal(){
        this.props.toggleCommentModal(this.props.isOpenCommentModal)
    }

    render() {
        return (
            <Modal open={this.props.open}>
                <Modal.Header>
                    Add Comment
                    <Button style={{float: 'right'}} onClick={() => this.toggleModal()} icon>
                        <Icon name='close'/>
                    </Button>
                </Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <CommentAddForm onSubmit={this.submitComment} />
                  </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createComment: data => dispatch(addCommentAsync(data)),
        toggleCommentModal: data => dispatch(toggleCommentModal(data)),
    };
}

function mapStateToProps(state) {
    return {
        isOpenCommentModal: state.reducer.modal.commentModal
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentAddModalElement);
