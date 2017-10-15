import React, { Component } from "react";
import "../App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import PostsView from "./PostsView";
import CategoryView from "./CategoryView";
import PostDetailView from "./PostDetailView";
import NavigationView from "./NavigationView";
import { connect } from "react-redux";
import { fetchCategories, fetchAllPosts } from "../actions";

class App extends Component {
    componentDidMount() {
        const { fetchCategories, fetchAllPosts } = this.props;

        fetchCategories();
        fetchAllPosts();
    }

    render() {
        return (
            <div className="App">
                <NavigationView />
                <Switch>
                    <Route exact path="/" render={() => <PostsView />} />
                    <Route
                        exact
                        path="/:name"
                        render={props => <CategoryView {...props} />}
                    />
                    <Route
                        exact
                        path="/:category/:id"
                        render={props => <PostDetailView {...props} />}
                    />
                </Switch>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAllPosts: () => dispatch(fetchAllPosts()),
        fetchCategories: () => dispatch(fetchCategories())
    };
}

function mapStateToProps() {
    return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
