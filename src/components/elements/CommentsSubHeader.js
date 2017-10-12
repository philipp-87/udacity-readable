import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Button } from "semantic-ui-react";
import { toggleCommentModal } from "../../actions";

class CommentsSubHeader extends Component {
    toggleModal() {
        this.props.toggleCommentModal(this.props.isOpenCommentModal);
    }

    render() {
        return (
            <Header.Subheader>
                <Button
                    icon="plus"
                    content="Add Comment"
                    labelPosition="left"
                    onClick={() => this.toggleModal()}
                />
                <div />
            </Header.Subheader>
        );
    }
}

function mapStateToProps(state) {
    return {
        isOpenCommentModal: state.reducer.modal.commentModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleCommentModal: data => dispatch(toggleCommentModal(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsSubHeader);
