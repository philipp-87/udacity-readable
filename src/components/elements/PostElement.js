import React, { Component } from 'react';
import { Button, Label } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PostDetailView from '../PostDetailView';
import { connect } from 'react-redux';
import { votePost, showComments } from '../../actions';
import * as ReadableAPI from '../../utils/ReadableAPI';
var _ = require('lodash');

class PostElement extends Component {
    componentDidMount() {
        const { loadComments, post } = this.props;
        ReadableAPI.getCommentsByPostId(post.id).then(comments => {
            console.log(comments);
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
        console.log(commentsArray);
        return commentsArray;

    }

    render() {
        const { post, comments } = this.props;
        console.log(post);
        return (
            <div
                style={{
                    marginTop: 20,
                    border: '1px solid black',
                    width: '25%',
                    margin: 'auto'
                }}
            >
                <h3 style={{ color: 'powderblue', textAlign: 'left' }}>
                    {post.title}
                </h3>
                <h3 style={{ textAlign: 'left' }}>
                    {post.body}
                </h3>
                <p style={{ textAlign: 'left' }}>
                    {new Date(post.timestamp).toString()}
                </p>
                <div style={{ textAlign: 'left' }}>
                    <Button>
                        {post.category}
                    </Button>

                    <Label size="large">
                        <Icon name="star" color="yellow" /> {post.voteScore}
                    </Label>
                    <Button onClick={() => this.voteUp()}>
                        <Icon name="plus" color="green" />
                    </Button>
                    <Button onClick={() => this.voteDown()}>
                        <Icon name="minus" color="red" />
                    </Button>
                    <Link
                            to={{
                                pathname: `/category/post/${post.id}`,
                                state: { comments: this.getComments() }
                            }}
                        >
                            <Button>
                                <Icon name="comments" color="black" />
                                {this.getComments().length}
                            </Button>
                        </Link>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        voteForPost: data => dispatch(votePost(data)),
        loadComments: data => dispatch(showComments(data))
    };
}

function mapStateToProps({ comments}) {
    return { comments };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostElement);
