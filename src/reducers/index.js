import { SHOW_CATEGORIES } from '../actions';
import { SHOW_ALL_POSTS } from '../actions';

const initialState = {
    categories: [],
    posts: []
};

function Readable(state = initialState, action) {
    console.log(action.categories);
    const { categories, posts } = action;
    switch (action.type) {
        case SHOW_CATEGORIES:
            return {
                ...state,
                categories
            };
        case SHOW_ALL_POSTS:
            return {
                ...state,
                posts
            };

        default:
            return state;
    }
}

export default Readable;
