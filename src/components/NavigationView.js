import React, { Component } from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux';
import { showCategories } from '../actions';
import * as ReadableAPI from '../utils/ReadableAPI';
import { Button } from 'semantic-ui-react';
var _ = require('lodash');

class NavigationView extends Component {
    componentDidMount() {
        const { loadCategories } = this.props;
        ReadableAPI.getCategories().then(categories => {
            loadCategories({ categories });
        });
    }

    getNavigation() {
        const { categories } = this.props;
        return (
            <ol>
                <Button>All</Button>
                {!_.isEmpty(categories)
                    ? categories.map((category, index) =>
                          <Button key={index} onClick={this._onClick}>
                              {category.name}
                          </Button>
                      )
                    : null}
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
    return categories;
}

function mapDispatchToProps(dispatch) {
    return {
        loadCategories: data => dispatch(showCategories(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationView);
