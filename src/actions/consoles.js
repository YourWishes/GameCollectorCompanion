export const ADD_CONSOLE = "ADD_CONSOLE";
export const SET_CONSOLES = "SET_CONSOLES";

import * as DB from './../db/index';

export function addConsole(name, tag, brand, gen, portable) {
    return {
        type: ADD_CONSOLE,
        name,
        tag,
        brand,
        gen,
        portable,
        portable: portable ? true : false
    }
}

export function setConsoles(consoles) {
    return {
        type: SET_CONSOLES,
        consoles
    }
}

export function fetchConsoles() {
    //Refreshes the consoles from the database.
    return function(dispatch) {
        DB.getConsoles().then(function(value) {
            dispatch(setConsoles(value));
        });
    }
}

export function getLogoFromTag(tag) {
    return "/src/images/consoles/"+tag+".png"
}