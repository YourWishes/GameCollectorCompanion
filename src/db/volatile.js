import * as DB from './index';

//Cuz I'm a meme
let db = {
    consoles: [],
    games: []
};

export function setup() {
    return new Promise((resolve, reject) => {
        db.consoles = DB.CONSOLES;
        
        db.games = [
            DB.EXAMPLE_GAME
        ];
        
        resolve();
    });
};

export function getConsoles() {
    return new Promise((resolve, reject) => {
        resolve(db.consoles);
    });
}

export function getGames() {
    return new Promise((resolve, reject) => {
        resolve(db.games);
    });
}

export function addGame(game) {
    return new Promise((resolve, reject) => {
        let v = db.games;
        if(typeof v !== typeof []) v = [];
        v.push(game);
        db.games = v;
        resolve(v);
    });
}

export function editGame(game) {
    return new Promise((resolve, reject) => {
        let v = db.games;
        if(typeof v !== typeof []) v = [];
        for(var i = 0; i < v.length; i++) {
            if(!(v[i]) || game.id !== v[i].id) continue;
            v[i] = game;
            break;
        }
        db.games = v;
        resolve(v);
    });
}
export function deleteGame(game) {
    let id = game;
    if(game.id) id = game.id;
    
    return new Promise((resolve, reject) => {
        let v = db.games;
        if(typeof v !== typeof []) v = [];
        v = v.filter(function( obj ) {
            return obj.id !== id;
        });
        db.games = v;
        resolve(v);
    });
}

export function clearGames() {
    return new Promise((resolve, reject) => {
        db.games = [];
        resolve();
    });
}