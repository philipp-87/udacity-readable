import React, { Component } from 'react';
import '../App.css';
import { Route } from 'react-router-dom';
import CategoryView from './CategoryView';
import EditView from './EditView';
import PostDetailView from './PostDetailView';
import NavigationView from './NavigationView';

class App extends Component {
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

export default App;
