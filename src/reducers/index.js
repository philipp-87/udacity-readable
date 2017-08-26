import { SHOW_CATEGORIES } from '../actions';
import { SHOW_ALL_POSTS } from '../actions';
import { VOTE_POST } from '../actions';

const initialState = {
    categories: [],
    posts: []
};

function Readable(state = initialState, action) {
    switch (action.type) {
        case SHOW_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        case SHOW_ALL_POSTS:
            return {
                ...state,
                posts: action.posts
            };
        case VOTE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.post.id) {
                        return { ...action.post };
                    }
                    return post;
                })
            };

        default:
            return state;
    }
}

export default Readable;
