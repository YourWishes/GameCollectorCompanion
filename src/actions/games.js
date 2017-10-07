export const ADD_GAME = "ADD_GAME";
export const EDIT_GAME = "EDIT_GAME";
export const SET_GAMES = "SET_GAMES";
export const DELETE_GAME = "DELETE_GAME";

import * as DB from './../db/index';

import FLAG_AUSTRALIA from './../images/flags/au.png';
import FLAG_EUROPE from './../images/flags/eu.png';
import FLAG_JAPAN from './../images/flags/jp.png';
import FLAG_KOREA from './../images/flags/korea.png';
import FLAG_USA from './../images/flags/us.png';
import FLAG_UNKNOWN from './../images/flags/unknown.png';

export function addGame(game) {
    return {
        type: ADD_GAME,
        game
    }
}

export function setGames(games) {
    return {
        type: SET_GAMES,
        games
    }
}

export function editGame(game) {
    return {
        type: EDIT_GAME,
        game
    }
}

export function deleteGame(game) {
    let id = game;
    if(game.id) id = game.id;
    return {
        type: DELETE_GAME,
        id
    }
}

export function fetchGames() {
    //Refreshes the consoles from the database.
    return function(dispatch) {
        DB.getGames().then(function(value) {
            dispatch(setGames(value));
        });
    }
}
    
export function getFlagFromRegion(reg) {
    switch(reg) {
        case "PAL-AU/NZ":
            return FLAG_AUSTRALIA;
        case "PAL-EU":
            return FLAG_EUROPE;
        case "NTSC-J":
            return FLAG_JAPAN;
        case "NTSC-K":
            return FLAG_KOREA;
        case "NTSC-U/C":
            return FLAG_USA;
        case "Region Free":
            return FLAG_UNKNOWN;
        default:
            return FLAG_UNKNOWN;
    }
}
    
export function getClassFromWear(wear) {
    switch(wear) {
        case "Sealed":
            return "pink";
        case "Great":
            return "green";
        case "Good":
            return "blue";
        case "Ok":
            return "orange";
        case "Bad":
            return "red";
        case "Very Bad":
            return "black";
        case "No":
            return "black";
        case "N/A":
            return "blank";
        default:
            return "blank";
    }
}