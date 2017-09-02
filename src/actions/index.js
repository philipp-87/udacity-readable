export const SHOW_CATEGORIES = 'SHOW_CATEGORIES';
export const SHOW_ALL_POSTS = 'SHOW_ALL_POSTS';
export const VOTE_POST = 'VOTE_POST';
export const SHOW_COMMENTS_BY_POST_ID = 'SHOW_COMMENTS_BY_POST_ID'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'

export function showCategories(categories) {
    return {
        type: SHOW_CATEGORIES,
        categories
    };
}

export function showAllPosts(posts) {
    return {
        type: SHOW_ALL_POSTS,
        posts: posts.filter(post => post.deleted === false)
    };
}

export function votePost(post) {
    return {
        type: VOTE_POST,
        post
    };
}

export function showComments(comments) {
    return {
        type: SHOW_COMMENTS_BY_POST_ID,
        comments
    };
}

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    };
}

export function removePost(post) {
    return {
        type: REMOVE_POST,
        post
    };
}
