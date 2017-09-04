import React, { Component } from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
var _ = require('lodash');

class NavigationView extends Component {
    render() {
        const { categories } = this.props;
        return (
            <Menu inverted>
                <img src={logo} className="App-logo" alt="logo" />
                        <Menu.Item name='all'>
                            <Link to="/">
                                All
                            </Link>
                        </Menu.Item>
                        {categories &&
                            categories.map((category, index) =>
                                <Menu.Item name={category.name} key={index}>
                                    <Link
                                        to={{
                                            pathname: `/category/${category.name}`,
                                            state: { category: category.name }
                                        }}
                                    >
                                        {_.upperFirst(category.name)}
                                        
                                    </Link>
                                </Menu.Item>
                        )}
                    
            </Menu>
        );
    }
}

function mapStateToProps(state) {
    return {categories: state.reducer.categories};
}

export default connect(mapStateToProps)(NavigationView);
