import { SHOW_CATEGORIES } from "../actions";
import { SHOW_ALL_POSTS } from "../actions";
import { VOTE_POST } from "../actions";
import { SHOW_COMMENTS_BY_POST_ID } from "../actions";
import { ADD_POST } from "../actions";
import { EDIT_POST } from "../actions";
import { GET_POST } from "../actions";
import { REMOVE_POST } from "../actions";
import { SORT_POSTS } from "../actions";
import { ADD_COMMENT } from "../actions";
import { EDIT_COMMENT } from "../actions";
import { REMOVE_COMMENT } from "../actions";
import { VOTE_COMMENT } from "../actions";
import { TOGGLE_POST_MODAL } from "../actions";
import { TOGGLE_EDIT_POST_MODAL } from "../actions";
import { TOGGLE_COMMENT_MODAL } from "../actions";
import { TOGGLE_EDIT_COMMENT_MODAL } from "../actions";

const initialState = {
    categories: [],
    posts: [],
    comments: [],
    modal: {
        postModal: false,
        editPostModal: {
            status: false,
            post: null
        },
        commentModal: false,
        editCommentModal: {
            status: false,
            comment: null
        }
    },
    postsSortType: "voteScore"
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
        case GET_POST:
            return {
                ...state,
                posts: state.posts.filter(post => {
                    return post.id === action.post.id;
                })
            };
        case EDIT_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.post.id) {
                        post = action.post;
                        return post;
                    }
                    return post;
                })
            };
        case REMOVE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => {
                    return post.id !== action.post.id;
                })
            };
        case SORT_POSTS:
            return {
                ...state,
                postsSortType: action.sortType
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
                comments: {
                    ...state.comments,
                    [action.comment.parentId]: state.comments[
                        action.comment.parentId
                    ].concat(action.comment)
                }
            };

        case EDIT_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.comment.parentId]: state.comments[
                        action.comment.parentId
                    ].map(comment => {
                        if (comment.id === action.comment.id) {
                            comment = action.comment;
                            return comment;
                        }
                        return comment;
                    })
                }
            };

        case REMOVE_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.comment.parentId]: state.comments[
                        action.comment.parentId
                    ].filter(comment => {
                        return comment.id !== action.comment.id;
                    })
                }
            };

        case VOTE_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.comment.parentId]: state.comments[
                        action.comment.parentId
                    ].map(comment => {
                        if (comment.id === action.comment.id) {
                            return { ...action.comment };
                        }
                        return comment;
                    })
                }
            };

        case TOGGLE_POST_MODAL:
            return {
                ...state,
                modal: {
                    postModal: action.isOpen
                }
            };

        case TOGGLE_EDIT_POST_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    editPostModal: {
                        status: action.isOpen,
                        post: action.post
                    }
                }
            };

        case TOGGLE_COMMENT_MODAL:
            return {
                ...state,
                modal: {
                    commentModal: action.isOpen
                }
            };

        case TOGGLE_EDIT_COMMENT_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    editCommentModal: {
                        status: action.isOpen,
                        comment: action.comment
                    }
                }
            };

        default:
            return state;
    }
}

export default Readable;
