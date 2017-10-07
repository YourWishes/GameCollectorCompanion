import * as DB from './index';
import fetch from 'node-fetch';

let base = "http://localhost/";//NOTE Put your server here.

export function setup() {
    return new Promise((resolve, reject) => {
        
        resolve();
    });
};

export function getConsoles() {
    return new Promise((resolve, reject) => {
        fetch(base+'getConsoles', {mode: 'cors'}).then(data => {
            resolve(data.json());
        }).catch(err => {
            reject(err);
        });
    });
}

export function getGames() {
    return new Promise((resolve, reject) => {
        fetch(base+'getGames', {mode: 'cors'}).then(data => {
            resolve(data.json());
        }).catch(err => {
            reject(err);
        });
    });
}

export function addGame(game) {
    return new Promise((resolve, reject) => {
        fetch(base+'addGame', {
            method: "POST",
            body: JSON.stringify(game),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        }).then(data => {
            resolve(data.json());
        }).catch(err => {
            reject(err);
        });
    });
}

export function editGame(game) {
    return new Promise((resolve, reject) => {
        window.fetch(base+'editGame', {
            method: "POST",
            body: JSON.stringify(game),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        }).then(data => {
            resolve(data.json());
        }).catch(err => {
            reject(err);
        });
    });
}

export function deleteGame(game) {
    return new Promise((resolve, reject) => {
        fetch(base+'deleteGame', {
            method: "POST",
            body: JSON.stringify(game),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        }).then(data => {
            resolve(data.json());
        }).catch(err => {
            reject(err);
        });
    });
}