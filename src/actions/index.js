export const SHOW_CATEGORIES = 'SHOW_CATEGORIES';

export function showCategories({ categories }) {
    return {
        type: SHOW_CATEGORIES,
        categories
    };
}
