import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CategoryView extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to="/edit">Go to EditView</Link>
                </div>
            </div>
        );
    }
}

export default CategoryView;
