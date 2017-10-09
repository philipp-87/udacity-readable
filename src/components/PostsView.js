import React, { Component } from "react";
import { connect } from "react-redux";
import PostElement from "./elements/PostElement";
import PostAddModalElement from "./elements/PostAddModalElement";
import { Item, Header, Button, Icon, Dropdown } from "semantic-ui-react";
import { togglePostModal, sortPosts } from "../actions";

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
                {this.renderDropdown()}
                <Item.Group divided>
                {posts &&
                    posts.map(post => (
                        <PostElement key={post.id} post={post} />
                    ))}
                </Item.Group>
            </Item.Group>
        );
    }

    renderDropdown() {
        const options = [
          {
            key: 'voteScore',
            text: 'vote score',
            value: 'voteScore',
            content: 'vote score',
          },
          {
            key: 'timestamp',
            text: 'timestamp',
            value: 'timestamp',
            content: 'timestamp',
          },
        ]
        
        return (
            <Header as='h4' dividing>
                <Icon name='sort' />
                <Header.Content>
                  Sort by
                  {' '}
                  <Dropdown inline header='Adjust sort type' options={options} onChange={(e, option) => this.props.sortPosts(option.value)} defaultValue={options[0].value} />
                </Header.Content>
            </Header>
        )
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
        togglePostModal: data => dispatch(togglePostModal(data)),
        sortPosts: data => dispatch(sortPosts(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsView);
