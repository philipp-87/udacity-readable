import React, { Component } from 'react';
import '../App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import PostsView from './PostsView';
import CategoryView from './CategoryView';
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
            loadPosts(posts);
        });
    }

    render() {
        return (
            <div className="App">
                <NavigationView />
                <Switch>
                    <Route exact path="/" render={() => <PostsView />} />
                    <Route
                        exact
                        path="/category/:name"
                        render={props => <CategoryView {...props} />}
                    />
                    <Route
                        exact
                        path="/category/post/:id"
                        render={() => <PostDetailView />}
                    />
                </Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
