import { SHOW_CATEGORIES } from '../actions';
import { SHOW_ALL_POSTS } from '../actions';
import { VOTE_POST } from '../actions';
import { SHOW_COMMENTS_BY_POST_ID } from '../actions';
import { ADD_POST } from '../actions';
import { REMOVE_POST } from '../actions';
import { ADD_COMMENT } from '../actions';

const initialState = {
    categories: [],
    posts: [],
    comments: []
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
        case ADD_POST:
            return {
                ...state,
                posts: state.posts.concat(action.post)
            };
        case REMOVE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => {
                        return post.id !== action.post.id
                       })
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
        case SHOW_COMMENTS_BY_POST_ID:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.id]: action.comments
                }
                            
            };

        case ADD_COMMENT:
            return {
                ...state,
                comments: state.comments.concat(action.comment)
            };
        default:
            return state;
    }
}

export default Readable;
