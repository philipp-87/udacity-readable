import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Dropdown, Button } from "semantic-ui-react";
import { sortPosts, togglePostModal } from "../../actions";

class PostsSubHeader extends Component {
    toggleModal() {
        this.props.togglePostModal(this.props.isOpenPostModal);
    }

    render() {
        const options = [
            {
                key: "voteScore",
                text: "Vote score",
                value: "voteScore",
                content: "Vote score"
            },
            {
                key: "timestamp",
                text: "Timestamp",
                value: "timestamp",
                content: "Timestamp"
            }
        ];

        return (
            <Header.Subheader>
                <Button
                    icon="plus"
                    content="Add Post"
                    labelPosition="left"
                    onClick={() => this.toggleModal()}
                />
                <Dropdown
                    style={{ marginLeft: 10 }}
                    header="Sort by"
                    options={options}
                    onChange={(e, option) => this.props.sortPosts(option.value)}
                    defaultValue={this.props.sortType}
                    icon="sort"
                    floating
                    labeled
                    button
                    className="icon"
                />
            </Header.Subheader>
        );
    }
}

function mapStateToProps(state) {
    return {
        sortType: state.reducer.postsSortType,
        isOpenPostModal: state.reducer.modal.postModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sortPosts: data => dispatch(sortPosts(data)),
        togglePostModal: data => dispatch(togglePostModal(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsSubHeader);
