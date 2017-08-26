export const SHOW_CATEGORIES = 'SHOW_CATEGORIES';
export const SHOW_ALL_POSTS = 'SHOW_ALL_POSTS';

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
