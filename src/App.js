import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as ReadableAPI from './utils/ReadableAPI';
import { connect } from 'react-redux';
import { showCategories } from './actions';

class App extends Component {
    componentDidMount() {
        const { loadCategories } = this.props;
        ReadableAPI.getCategories().then(categories => {
            loadCategories({ categories });
        });
    }

    render() {
        console.log(this.props.categories);
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
