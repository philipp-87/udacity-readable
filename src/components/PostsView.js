import React, { Component } from "react";
import { connect } from "react-redux";
import PostElement from "./elements/PostElement";
import PostAddModalElement from "./elements/PostAddModalElement";
import { Item, Header, Button } from "semantic-ui-react";
import { togglePostModal } from "../actions";

class PostsView extends Component {

    toggleModal(){
        this.props.togglePostModal(this.props.isOpenPostModal)
    }

    render() {
        const { posts, isOpenPostModal } = this.props;
        return (
            <Item.Group>
                <Header as="h3" dividing>
                    Posts
                    <Button size='tiny' style={{marginLeft: 20}} onClick={() => this.toggleModal()}>Add Post</Button>
                    <PostAddModalElement open={isOpenPostModal}/>
                </Header>
                <Item.Group divided>
                {posts &&
                    posts.map(post => (
                        <PostElement key={post.id} post={post} />
                    ))}
                </Item.Group>
            </Item.Group>
        );
    }
}

function mapStateToProps(state) {
    return { 
        posts: state.reducer.posts, 
        isOpenPostModal: state.reducer.modal.postModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        togglePostModal: data => dispatch(togglePostModal(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsView);
