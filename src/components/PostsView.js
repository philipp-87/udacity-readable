import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostElement from './elements/PostElement';
import AddPostModalElement from './elements/AddPostModalElement';
import { Item, Header } from 'semantic-ui-react';

class PostsView extends Component {

    render() {
        const { posts } = this.props;
        return (
            <Item.Group>
                <Header as='h3' dividing>
                    Posts
                <AddPostModalElement/>
                </Header>
                {posts &&
                    posts.map((post) =>
                        <PostElement key={post.id} post={post} />
                    )}
            </Item.Group>
        );
    }
}

function mapStateToProps({ posts }) {
    return { posts };
}

export default connect(mapStateToProps)(PostsView);
