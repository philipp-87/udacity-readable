import { SHOW_CATEGORIES } from '../actions';
import { SHOW_ALL_POSTS } from '../actions';
import { combineReducers } from 'redux';

const initialState = {
    categories: [],
    posts: {},
    comments: {}
};

function categories(state = initialState, action) {
    console.log(action.categories);
    const { categories } = action;
    switch (action.type) {
        case SHOW_CATEGORIES:
            return {
                ...state,
                categories
            };

        default:
            return state;
    }
}

function posts(state = initialState, action) {
    const { posts } = action;
    switch (action.type) {
        case SHOW_ALL_POSTS:
            return {
                ...state,
                posts
            };
        default:
            return state;
    }
}

export default combineReducers({
    categories,
    posts
});
