import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PostElement from './elements/PostElement';
import { Item, Header } from 'semantic-ui-react';
import AddPostModalElement from './elements/AddPostModalElement';

class CategoryView extends Component {
    render() {
        const { posts } = this.props;
        const category = this.props.location.state.category;

        return (
            <Item.Group>
                <Header as='h3' dividing>
                    Posts
                <AddPostModalElement/>
                </Header>
                {posts
                    .filter(post => post.category === category)
                    .map((post) =>
                        <PostElement key={post.id} post={post} />
                    )}
                <div />
            </Item.Group>
        );
    }
}

function mapStateToProps(state) {
    return {posts: state.reducer.posts};
}

export default withRouter(connect(mapStateToProps)(CategoryView));
