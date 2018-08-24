import {
    ARTICLE_PAGE_LOADED,
    ARTICLE_PAGE_UNLOADED,
    FIRST_PROGRAMMING_LANGUAGE_CHANGED,
    SECOND_PROGRAMMING_LANGUAGE_CHANGED
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {    
        case ARTICLE_PAGE_UNLOADED:
            return {};
        case ARTICLE_PAGE_LOADED:
            let categories = action.payload[1].categories
            let key = Object.keys(categories.subcategories)[1]
            return {
                ...state,
                firstpl: action.firstpl,
                secondpl: action.secondpl,
                prolangs: action.payload[0].prolangs,
                categories: categories,
                currentArtName: categories.subcategories[key].subcategories[key].name,
                currentArtId: categories.subcategories[key].subcategories[key].id,
                articles: action.payload[2].articles
            };
        case FIRST_PROGRAMMING_LANGUAGE_CHANGED:
            return {
                ...state,
                categories: action.payload[0].categories,
                articles: action.payload[1].articles,
                firstpl: action.firstpl
            };
        case SECOND_PROGRAMMING_LANGUAGE_CHANGED:
            return {
                ...state,
                categories: action.payload[0].categories,
                articles: action.payload[1].articles,
                secondpl: action.secondpl
            };
        default:
            return state;
    }
};