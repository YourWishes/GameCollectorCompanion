'use strict';

import {ADD_CONSOLE, SET_CONSOLES} from './../actions/consoles';

const initialState = [];

function consoles(state, action) {
    if(typeof state === typeof undefined) {
        state = initialState;
    }
    
    switch(action.type) {
        case ADD_CONSOLE:
            state.push({
                name: action.name,
                tag: action.tag,
                brand: action.brand,
                gen: action.gen,
                portable: action.portable
            });
            
            console.log("Added console reducer.");
            
            return state;
        case SET_CONSOLES:
            return action.consoles
        default:
            return state;
    }
}

export default consoles;