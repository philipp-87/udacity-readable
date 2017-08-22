import { SHOW_CATEGORIES } from '../actions';
import { combineReducers } from 'redux';

const initialState = {
    categories: {}
};

function categories(state = initialState, action) {
    switch (action.type) {
        case SHOW_CATEGORIES:
            const { categories } = action;

            return {
                ...state,
                categories
            };
        default:
            return state;
    }
}

export default combineReducers({
    categories
});
