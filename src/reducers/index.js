import { SHOW_CATEGORIES } from '../actions';
import { combineReducers } from 'redux';

function categories(state = {}, action) {
    switch (action.type) {
        case SHOW_CATEGORIES:
            const { categories } = action;

            return {
                ...state,
                categories: categories
            };
        default:
            return state;
    }
}

export default combineReducers({
    categories
});
