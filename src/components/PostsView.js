import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostElement from './elements/PostElement';
import AddPostModalElement from './elements/AddPostModalElement';
import { Item, Header } from 'semantic-ui-react';
import PostForm from './elements/PostForm'
import { addPost } from '../actions';
import * as ReadableAPI from '../utils/ReadableAPI';

class PostsView extends Component {

    submitPost = (values) => {

    console.log(values)
    ReadableAPI.createPost({
            title: values.title, 
            owner: values.author, 
            category: values.category, 
            body: values.body}).then(post => {
            this.props.createPost(post);
        });
    }


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
                <PostForm onSubmit={this.submitPost} />
            </Item.Group>
        );
    }
}

function mapStateToProps(state) {
    return {posts: state.reducer.posts};
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: data => dispatch(addPost(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsView);
