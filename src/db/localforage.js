'use strict';
import localforage from 'localforage';
import * as DB from './index';

export function setup() {
    return new Promise((resolve, reject) => {
        //First we're going to get the DB version
        localforage.getItem('db.version').then(function(value) {
            localforage.setItem('db.version', DB.DB_VERSION_CURRENT).then(function(value) {
                //Database version is set, let's create the default data
                localforage.setItem('db.consoles', DB.CONSOLES).then(function() {
                    localforage.getItem('db.games').then(function(e) {
                        if(typeof e === typeof []) {
                            resolve();
                            return;
                        }
                        
                        localforage.setItem('db.games', [
                            DB.EXAMPLE_GAME
                        ]).then(function(e) {
                            resolve();
                        });
                    });
                });
            }).catch(err => {
                reject(err)
            });
        }).catch(err => {reject(err)});
    });
};

export function getConsoles() {
    return localforage.getItem('db.consoles');
}

export function getGames() {
    return localforage.getItem('db.games');
}

export function addGame(game) {
    return new Promise((resolve, reject) => {
        localforage.getItem('db.games').then(v => {
            if(typeof v !== typeof []) v = [];
            v.push(game);
            localforage.setItem('db.games', v).then(e => {
                resolve(e);
            }).catch(err => {reject(err)});
        }).catch(err => {reject(err)});
    });
}

export function editGame(game) {
    return new Promise((resolve, reject) => {
        localforage.getItem('db.games').then(v => {
            if(typeof v !== typeof []) v = [];
            for(var i = 0; i < v.length; i++) {
                if(!(v[i]) || game.id !== v[i].id) continue;
                v[i] = game;
                break;
            }
            localforage.setItem('db.games', v).then(e => {
                resolve(e);
            }).catch(err => {reject(err)});
        }).catch(err => {reject(err)});
    });
}
export function deleteGame(game) {
    let id = game;
    if(game.id) id = game.id;
    
    return new Promise((resolve, reject) => {
        localforage.getItem('db.games').then(v => {
            if(typeof v !== typeof []) v = [];
            v = v.filter(function( obj ) {
                return obj.id !== id;
            });
            localforage.setItem('db.games', v).then(e => {
                resolve(e);
            }).catch(err => {reject(err)});
        }).catch(err => {reject(err)});
    });
}

export function clearGames() {
    return localforage.setItem('db.games', []);
}