import {
    ARTICLE_PAGE_LOADED,
    ARTICLE_PAGE_UNLOADED,
    FIRST_PROGRAMMING_LANGUAGE_CHANGED,
    SECOND_PROGRAMMING_LANGUAGE_CHANGED,
    CATEGORY_CHANGED
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {    
        case ARTICLE_PAGE_UNLOADED:
            return {};
        case ARTICLE_PAGE_LOADED:
            return {
                ...state,
                firstpl: action.firstpl,
                secondpl: action.secondpl,
                prolangs: action.payload[0].prolangs,
                categories: action.payload[1].categories,
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
        case CATEGORY_CHANGED:
            return {
                ...state,
                articles: action.payload.articles
            }
        default:
            return state;
    }
};