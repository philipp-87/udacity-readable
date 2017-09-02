import React, { Component } from 'react';
import { Button, Label, Icon, Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { votePost, showComments, removePost } from '../../actions';
import * as ReadableAPI from '../../utils/ReadableAPI';
var _ = require('lodash');

class PostElement extends Component {
    componentDidMount() {
        const { loadComments, post } = this.props;
        ReadableAPI.getCommentsByPostId(post.id).then(comments => {
            loadComments(comments);
        });
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

    render() {
        const { post } = this.props;
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
                    <Label onClick={() => this.voteUp()}>
                        <Icon name="plus" color="green" />
                    </Label>
                    <Label onClick={() => this.voteDown()}>
                        <Icon name="minus" color="red" />
                    </Label>
                    <Link
                        to={{
                            pathname: `/category/post/${post.id}`,
                            state: { comments: this.getComments(), post: post }
                        }}
                    >
                        <Label>
                            <Icon name="comments" color="black" />
                            {this.getComments().length}
                        </Label>
                    </Link>
                    <Label onClick={() => this.deletePost()} icon='remove' color='red'/>
                </Item.Extra>
            </Item.Content>
            </Item>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        voteForPost: data => dispatch(votePost(data)),
        loadComments: data => dispatch(showComments(data)),
        deletePost: data => dispatch(removePost(data))
    };
}

function mapStateToProps({ comments}) {
    return { comments };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostElement);
