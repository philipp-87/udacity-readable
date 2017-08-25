import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showAllPosts } from '../actions';
import * as ReadableAPI from '../utils/ReadableAPI';
import PostElement from './elements/PostElement';
var _ = require('lodash');

class CategoryView extends Component {
    render() {
        const { posts } = this.props;
        return (
            <ul>
                {!_.isEmpty(posts.posts)
                    ? posts.posts.map((post, index) =>
                          <PostElement key={index} post={post} />
                      )
                    : null}
            </ul>
        );
    }
}

function mapStateToProps({ posts }) {
    return { posts };
}

export default connect(mapStateToProps)(CategoryView);
