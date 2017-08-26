import React, { Component } from 'react';
import { Button, Label } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PostDetailView from '../PostDetailView';
var _ = require('lodash');

class PostElement extends Component {
    render() {
        const { post } = this.props;
        return (
            <div
                style={{
                    marginTop: 20,
                    border: '1px solid black'
                }}
            >
                <h3 style={{ color: 'powderblue' }}>
                    {post.title}
                </h3>
                <h3>
                    {post.body}
                </h3>
                <p>
                    {new Date(post.timestamp).toString()}
                </p>
                <div>
                    <Button>
                        {post.category}
                    </Button>

                    <Label size="large">
                        <Icon name="star" color="yellow" /> {post.voteScore}
                    </Label>

                    <Icon name="plus" color="green" />
                    <Icon name="minus" color="red" />
                    <Link to="/post">Go to CategoryView</Link>
                </div>
            </div>
        );
    }
}

export default PostElement;
