import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditView extends Component {
    render() {
        return (
            <div>
                <p className="App-intro">EDIT VIEW</p>
                <div>
                    <Link to="/post">Go to PostDetailView</Link>
                </div>
            </div>
        );
    }
}

export default EditView;
