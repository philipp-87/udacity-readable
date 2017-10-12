import React, { Component } from "react";
import { connect } from "react-redux";
import PostElement from "./elements/PostElement";
import PostAddModalElement from "./elements/PostAddModalElement";
import PostsSubHeader from "./elements/PostsSubHeader";
import { Item, Header } from "semantic-ui-react";
var _ = require("lodash");

class PostsView extends Component {
    render() {
        const { posts, isOpenPostModal, sortType } = this.props;
        var sortedPosts = _.sortBy(posts, [sortType]).reverse(posts);

        return (
            <Item.Group>
                <Header as="h3" dividing>
                    Posts
                    <PostsSubHeader />
                </Header>
                <Item.Group divided>
                    {sortedPosts &&
                        sortedPosts.map(post => (
                            <PostElement
                                key={post.id}
                                post={post}
                                showControl={true}
                            />
                        ))}
                </Item.Group>
                <PostAddModalElement open={isOpenPostModal} />
            </Item.Group>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.reducer.posts,
        sortType: state.reducer.postsSortType,
        isOpenPostModal: state.reducer.modal.postModal
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsView);
