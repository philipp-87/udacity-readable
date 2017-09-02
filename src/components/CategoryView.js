import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PostElement from './elements/PostElement';
import { Item, Header } from 'semantic-ui-react';

class CategoryView extends Component {
    render() {
        console.log(this.props.location.state.category);
        console.log(this.props.posts);

        const { posts } = this.props;
        const category = this.props.location.state.category;

        return (
            <Item.Group>
                <Header as='h3' dividing>Posts</Header>
                {posts
                    .filter(post => post.category === category)
                    .map((post, index) =>
                        <PostElement key={index} post={post} />
                    )}
                <div />
            </Item.Group>
        );
    }
}

function mapStateToProps({ posts }) {
    return { posts };
}

export default withRouter(connect(mapStateToProps)(CategoryView));
