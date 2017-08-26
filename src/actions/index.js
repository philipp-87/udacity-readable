export const SHOW_CATEGORIES = 'SHOW_CATEGORIES';
export const SHOW_ALL_POSTS = 'SHOW_ALL_POSTS';
export const VOTE_POST = 'VOTE_POST';

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
