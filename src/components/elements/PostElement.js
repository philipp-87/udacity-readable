import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Label } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
var _ = require('lodash');

class PostElement extends Component {
    render() {
        const { post } = this.props;
        return (
            <div>
                <h1>
                    {post.title}
                </h1>
                <h2>
                    {post.body}
                </h2>
                <h3>
                    {new Date(post.timestamp).toString()}
                </h3>
                <div>
                    <Button>
                        {post.category}
                    </Button>

                    <Label size="large">
                        <Icon name="star" color="yellow" /> {post.voteScore}
                    </Label>

                    <Icon name="plus" color="green" />
                    <Icon name="minus" color="red" />
                </div>
            </div>
        );
    }
}

export default PostElement;
