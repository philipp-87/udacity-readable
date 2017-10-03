import React, { Component } from 'react';
import { Label, Item, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { votePost, fetchComments, removePost, toggleEditPostModal } from '../../actions';
import * as ReadableAPI from '../../utils/ReadableAPI';
import PostEditModalElement from "./PostEditModalElement";
var _ = require('lodash');

class PostElement extends Component {
    componentDidMount() {
        const { loadComments, post } = this.props;
        loadComments(post.id);
    }

    voteUp() {
        const { voteForPost, post } = this.props;
        ReadableAPI.votePost(post.id, 'upVote').then(post => {
            voteForPost(post);
        });
    }

    voteDown() {
        const { voteForPost, post } = this.props;
        ReadableAPI.votePost(post.id, 'downVote').then(post => {
            voteForPost(post);
        });
    }

    deletePost(){
        const { deletePost, post } = this.props;
        ReadableAPI.deletePost(post.id).then(() => {
            deletePost(post);
        });
    }

    getComments(){
        const { post, comments } = this.props;
        var commentsArray = [];

        comments.map((comment) => {
            if(comment.parentId === post.id){
                if(!_.some(commentsArray, comment)){
                    commentsArray.push(comment);
                }
                return commentsArray
            }
            return commentsArray;
        })
        return commentsArray;

    }

    toggleModal(){
        this.props.toggleEditPostModal(this.props.isOpenEditPostModal)
    }

    render() {
        const { post, comments, isOpenEditPostModal } = this.props;
        let id = post.id
        let newComments = comments[id]

        return (
            <Item>
            <Item.Content>
                <Item.Header as='a'>
                    {post.title}
                </Item.Header>
                <Item.Meta>
                    {new Date(post.timestamp).toString()}
                </Item.Meta>
                <Item.Description>
                    {post.body}
                </Item.Description>
                <Item.Extra>
                    <Label content={post.category} />
                    <Label icon='star' content={post.voteScore} />
                    <Button size='tiny' onClick={() => this.voteUp()} icon='chevron up' compact/>
                    <Button size='tiny' onClick={() => this.voteDown()} icon='chevron down' compact/>
                    <Link
                        to={{
                            pathname: `/category/post/${post.id}`,
                            state: { comments: newComments, post: post }
                        }}
                    >
                        <Button size='tiny' content={!_.isUndefined(newComments) ? newComments.length : '0'} icon='comments' labelPosition='left' compact/>
                    </Link>
                    <Button size='tiny' icon='edit' onClick={() => this.toggleModal()} compact/>
                    <Button size='tiny' color='red' onClick={() => this.deletePost()} icon='remove' compact/>
                    <PostEditModalElement post={post} open={isOpenEditPostModal}/>
                </Item.Extra>
            </Item.Content>
            </Item>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        voteForPost: data => dispatch(votePost(data)),
        loadComments: data => dispatch(fetchComments(data)),
        deletePost: data => dispatch(removePost(data)),
        toggleEditPostModal: data => dispatch(toggleEditPostModal(data))
    };
}

function mapStateToProps(state) {
    return {
        comments: state.reducer.comments,
        isOpenEditPostModal: state.reducer.modal.editPostModal
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostElement);
