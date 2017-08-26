import React, { Component } from 'react';
import { Button, Label } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PostDetailView from '../PostDetailView';
import { connect } from 'react-redux';
import { votePost } from '../../actions';
import * as ReadableAPI from '../../utils/ReadableAPI';
var _ = require('lodash');

class PostElement extends Component {
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

    render() {
        const { post } = this.props;
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

                    <Link to="/post">Go to CategoryView</Link>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        voteForPost: data => dispatch(votePost(data))
    };
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostElement);
