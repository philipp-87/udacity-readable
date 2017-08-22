import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostDetailView extends Component {
    render() {
        return (
            <div>
                <p className="App-intro">POST DETAIL VIEW</p>
                <div>
                    <Link to="/">Back to CategoryView</Link>
                </div>
            </div>
        );
    }
}

export default PostDetailView;
