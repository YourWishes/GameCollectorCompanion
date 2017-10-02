'use strict';

import {ADD_GAME, EDIT_GAME, SET_GAMES, DELETE_GAME} from './../actions/games';

const initialState = [];

function games(state, action) {
    if(typeof state === typeof undefined) {
        state = initialState;
    }
    
    switch(action.type) {
        case ADD_GAME:
            if(!(action.game) || !(action.game.name) || !(action.game.id)) return state;
            state.push(action.game);
            return state;
        case EDIT_GAME:
            if(!(action.game) || !(action.game.name) || !(action.game.id)) return state;
            //Get Game by that ID
            for(var i = 0; i < state.length; i++) {
                if(!(state[i]) || action.game.id !== state[i].id) continue;
                state[i] = action.game;
                break;
            }
            return state;
        case DELETE_GAME:
            if(!(action.id) ) return state;
            state = state.filter(function( obj ) {
                return obj.id !== action.id;
            });
            return state;
        case SET_GAMES:
            return action.games
        default:
            return state;
    }
}

export default games;