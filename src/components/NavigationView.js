import React, { Component } from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
var _ = require('lodash');

class NavigationView extends Component {
    getNavigation() {
        const { categories } = this.props;
        return (
            <ol>
                <Link to="/">
                    <Button>All</Button>
                </Link>
                {categories &&
                    categories.map((category, index) =>
                        <Link
                            to={{
                                pathname: `/category/${category.name}`,
                                state: { category: category.name }
                            }}
                            key={index}
                        >
                            <Button key={index}>
                                {category.name}
                            </Button>
                        </Link>
                    )}
            </ol>
        );
    }

    render() {
        return (
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {this.getNavigation()}
            </div>
        );
    }
}

function mapStateToProps({ categories }) {
    return { categories };
}

export default connect(mapStateToProps)(NavigationView);
