import * as ReadableAPI from "../utils/ReadableAPI";
export const SHOW_CATEGORIES = "SHOW_CATEGORIES";
export const SHOW_ALL_POSTS = "SHOW_ALL_POSTS";
export const VOTE_POST = "VOTE_POST";
export const SHOW_COMMENTS_BY_POST_ID = "SHOW_COMMENTS_BY_POST_ID";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const GET_POST = "GET_POST";
export const REMOVE_POST = "REMOVE_POST";
export const SORT_POSTS = "SORT_POSTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const VOTE_COMMENT = "VOTE_COMMENT";
export const TOGGLE_POST_MODAL = "TOGGLE_POST_MODAL";
export const TOGGLE_EDIT_POST_MODAL = "TOGGLE_EDIT_POST_MODAL";
export const TOGGLE_COMMENT_MODAL = "TOGGLE_COMMENT_MODAL";
export const TOGGLE_EDIT_COMMENT_MODAL = "TOGGLE_EDIT_COMMENT_MODAL";

export function showCategories(categories) {
    return {
        type: SHOW_CATEGORIES,
        categories
    };
}
export const fetchCategories = () => dispatch =>
    ReadableAPI.getCategories().then(categories =>
        dispatch(showCategories(categories))
    );

export function showAllPosts(posts) {
    return {
        type: SHOW_ALL_POSTS,
        posts: posts.filter(post => post.deleted === false)
    };
}

export const fetchAllPosts = () => dispatch =>
    ReadableAPI.getPosts().then(posts => dispatch(showAllPosts(posts)));

export function votePost(post) {
    return {
        type: VOTE_POST,
        post
    };
}

export function getPost(post) {
    return {
        type: GET_POST,
        post
    };
}

export const fetchPost = id => dispatch =>
    ReadableAPI.getPost(id).then(post => dispatch(getPost(post)));

export function showComments(comments, id) {
    return {
        type: SHOW_COMMENTS_BY_POST_ID,
        comments,
        id
    };
}

export const fetchComments = id => dispatch =>
    ReadableAPI.getCommentsByPostId(id).then(comments =>
        dispatch(showComments(comments, id))
    );

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    };
}

export function editPost(post) {
    return {
        type: EDIT_POST,
        post
    };
}

export function removePost(post) {
    return {
        type: REMOVE_POST,
        post
    };
}

export function sortPosts(sortType) {
    return {
        type: SORT_POSTS,
        sortType
    };
}

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    };
}

export const addCommentAsync = data => dispatch =>
    ReadableAPI.createComment(data).then(comment =>
        dispatch(addComment(comment))
    );

export function editComment(comment) {
    return {
        type: EDIT_COMMENT,
        comment
    };
}

export function removeComment(comment) {
    return {
        type: REMOVE_COMMENT,
        comment
    };
}

export function voteComment(comment) {
    return {
        type: VOTE_COMMENT,
        comment
    };
}

export function togglePostModal(isOpen) {
    if (isOpen === false) {
        isOpen = true;
    } else {
        isOpen = false;
    }
    return {
        type: TOGGLE_POST_MODAL,
        isOpen
    };
}

export function toggleEditPostModal(isOpen, post) {
    console.log(isOpen);
    console.log(post);
    if (isOpen === false) {
        isOpen = true;
    } else {
        isOpen = false;
    }
    return {
        type: TOGGLE_EDIT_POST_MODAL,
        isOpen,
        post
    };
}

export function toggleCommentModal(isOpen) {
    if (isOpen === false) {
        isOpen = true;
    } else {
        isOpen = false;
    }
    return {
        type: TOGGLE_COMMENT_MODAL,
        isOpen
    };
}

export function toggleEditCommentModal(isOpen) {
    if (isOpen === false) {
        isOpen = true;
    } else {
        isOpen = false;
    }
    return {
        type: TOGGLE_EDIT_COMMENT_MODAL,
        isOpen
    };
}
