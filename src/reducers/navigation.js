'use strict';

import {SET_TITLE,SET_BACK,SET_TITLE_AND_BACK} from './../actions/navigation';

const initialState = {
    title: "Untitled"
};

function navigation(state, action) {
    if(typeof state === typeof undefined) {
        state = initialState;
    }
    
    switch(action.type) {
        case SET_TITLE:
            state = {
                title: action.title,
                back: state.back
            };
            return state;
        case SET_BACK:
            state = {
                title: state.title,
                back: action.back
            };
            return state;
        case SET_TITLE_AND_BACK:
            state = {
                title: action.title,
                back: action.back
            };
            return state;
        default:
            return state;
    }
}

export default navigation;