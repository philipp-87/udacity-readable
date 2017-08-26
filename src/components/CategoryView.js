import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PostElement from './elements/PostElement';

class CategoryView extends Component {
    render() {
        console.log(this.props.location.state.category);
        console.log(this.props.posts);

        const { posts } = this.props;
        const category = this.props.location.state.category;

        return (
            <div>
                {posts
                    .filter(post => post.category === category)
                    .map((post, index) =>
                        <PostElement key={index} post={post} />
                    )}
                <p className="App-intro">CATEGORY VIEW</p>
                <div />
            </div>
        );
    }
}

function mapStateToProps({ posts }) {
    return { posts };
}

export default withRouter(connect(mapStateToProps)(CategoryView));
