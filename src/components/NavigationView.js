import React, { Component } from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
var _ = require('lodash');

class NavigationView extends Component {
    getNavigation() {
        const { categories } = this.props;
        return (
            <ol>
                <Button>All</Button>
                {categories[0] &&
                    categories[0].map((category, index) =>
                        <Button key={index}>
                            {category.name}
                        </Button>
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
    console.log(categories);
    return { categories };
}

export default connect(mapStateToProps)(NavigationView);
