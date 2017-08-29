export const SHOW_CATEGORIES = 'SHOW_CATEGORIES';
export const SHOW_ALL_POSTS = 'SHOW_ALL_POSTS';
export const VOTE_POST = 'VOTE_POST';
export const SHOW_COMMENTS_BY_POST_ID = 'SHOW_COMMENTS_BY_POST_ID'

export function showCategories(categories) {
    return {
        type: SHOW_CATEGORIES,
        categories
    };
}

export function showAllPosts(posts) {
    return {
        type: SHOW_ALL_POSTS,
        posts
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
