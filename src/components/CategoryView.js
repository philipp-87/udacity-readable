import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PostElement from "./elements/PostElement";
import { Item, Header } from "semantic-ui-react";
import PostAddModalElement from "./elements/PostAddModalElement";
import PostsSubHeader from "./elements/PostsSubHeader";
var _ = require("lodash");

class CategoryView extends Component {
    render() {
        const { posts, sortType, isOpenPostModal } = this.props;
        const category = this.props.location.state.category;
        var sortedPosts = _.sortBy(posts, [sortType]).reverse(posts);

        return (
            <Item.Group>
                <Header as="h3" dividing>
                    Posts
                    <PostsSubHeader />
                </Header>
                <Item.Group divided>
                    {sortedPosts
                        .filter(post => post.category === category)
                        .map(post => <PostElement key={post.id} post={post} />)}
                    <div />
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

export default withRouter(connect(mapStateToProps)(CategoryView));
