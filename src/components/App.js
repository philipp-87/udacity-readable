import React, { Component } from 'react';
import '../App.css';
import { Route } from 'react-router-dom';
import CategoryView from './CategoryView';
import EditView from './EditView';
import PostDetailView from './PostDetailView';
import NavigationView from './NavigationView';
import { connect } from 'react-redux';
import { showCategories, showAllPosts } from '../actions';
import * as ReadableAPI from '../utils/ReadableAPI';

class App extends Component {
    componentDidMount() {
        const { loadCategories } = this.props;
        ReadableAPI.getCategories().then(categories => {
            console.log(categories);
            loadCategories(categories);
        });

        const { loadPosts } = this.props;
        ReadableAPI.getPosts().then(posts => {
            loadPosts({ posts });
        });
    }

    render() {
        return (
            <div className="App">
                <NavigationView />
                <Route exact path="/" render={() => <CategoryView />} />
                <Route exact path="/edit" render={() => <EditView />} />
                <Route exact path="/post" render={() => <PostDetailView />} />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadPosts: data => dispatch(showAllPosts(data)),
        loadCategories: data => dispatch(showCategories(data))
    };
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
