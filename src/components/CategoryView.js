import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostElement from './elements/PostElement';
var _ = require('lodash');

class CategoryView extends Component {
    render() {
        const { posts } = this.props;
        return (
            <div style={{ margin: 'auto', width: '50%' }}>
                {posts &&
                    posts.map((post, index) =>
                        <PostElement key={index} post={post} />
                    )}
            </div>
        );
    }
}

function mapStateToProps({ posts }) {
    return { posts };
}

export default connect(mapStateToProps)(CategoryView);
