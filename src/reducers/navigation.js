'use strict';

import {SET_TITLE,SET_BACK,SET_TITLE_AND_BACK,SET_GAMES_SEARCH} from './../actions/navigation';

const initialState = {
    title: "Untitled"
};

//To try and fight React's really annoying non deep happy objects we have this
let updateState = function(original, changes) {
    let newState = {};
    //Set the newState to have all the old state stuff
    let keys = Object.keys(original);
    for(var i = 0; i < keys.length; i++) {
        newState[keys[i]] = original[keys[i]];
    }
    
    keys = Object.keys(changes);
    for(var i = 0; i < keys.length; i++) {
        newState[keys[i]] = changes[keys[i]];
    }
    
    return newState;
}

function navigation(state, action) {
    if(typeof state === typeof undefined) {
        state = initialState;
    }
    
    switch(action.type) {
        case SET_TITLE:
            return updateState(state, {title:action.title});
        case SET_BACK:
            return updateState(state, {back: action.back});
            return state;
        case SET_TITLE_AND_BACK:
            return updateState(state, {title:action.title, back: action.back});
        case SET_GAMES_SEARCH:
            return updateState(state, {games_search: action.search});
        default:
            return state;
    }
}

export default navigation;