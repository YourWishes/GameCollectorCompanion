import * as Driver from './localforage';

export function setup() {return Driver.setup();};
export function getConsoles() {return Driver.getConsoles();}
export function getGames() {return Driver.getGames();}
export function addGame(game) {return Driver.addGame(game);}
export function editGame(game) {return Driver.editGame(game);}
export function deleteGame(game) {return Driver.deleteGame(game);}
export function clearGames() {return Driver.clearGames();}

export const DB_VERSION_CURRENT = '1.00';

export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const EXAMPLE_GAME = {
    id: uuid(),
    name: "Wii Sports",
    console: "Wii",
    region: "PAL-EU",
    gameWear: "Good",
    manualWear: "Good",
    caseWear: "Good"
};

export const portable = true;

export const CONSOLES = [
    {name: "Xbox", tag: "XBOX", brand: "Microsoft", gen: 6},
    {name: "Xbox 360", tag: "360", brand: "Microsoft", gen: 7},
    {name: "Xbox One", tag: "XBONE", brand: "Microsoft", gen: 8},
    
    {name: "Atari 2600", tag: "2600", brand: "Atari", gen: 2},
    
    {name: "Sega Genesis", tag: "GEN", brand: "Sega", gen: 4},
    {name: "Sega Mega Drive", tag: "MD", brand: "Sega", gen: 4},
    {name: "Sega Saturn", tag: "SS", brand: "Sega", gen: 5},
    {name: "Sega Dreamcast", tag: "DC", brand: "Sega", gen: 6},
    
    {name: "Nintendo Entertainment System", tag: "NES", brand: "Nintendo", gen: 3},
    {name: "Famicom", tag: "FC", brand: "Nintendo", gen: 3},
    {name: "Super Famicom", tag: "SFC", brand: "Nintendo", gen: 4},
    {name: "Super Nintendo", tag: "SNES", brand: "Nintendo", gen: 4},
    {name: "Nintendo 64", tag: "N64", brand: "Nintendo", gen: 5},
    {name: "Nintendo Gamecube", tag: "NGC", brand: "Nintendo", gen: 6},
    {name: "Nintendo Wii", tag: "Wii", brand: "Nintendo", gen: 7},
    {name: "Nintendo Wii U", tag: "Wii U", brand: "Nintendo", gen: 8},
    {name: "Nintendo Switch", tag: "NS", brand: "Nintendo", gen: 9, portable},
    
    {name: "Playstation", tag: "PS1", brand: "Sony", gen: 5},
    {name: "Playstation 2", tag: "PS2", brand: "Sony", gen: 6},
    {name: "Playstation 3", tag: "PS3", brand: "Sony", gen: 7},
    {name: "Playstation 4", tag: "PS4", brand: "Sony", gen: 8},
    
    {name: "Gameboy", tag: "GB", brand: "Nintendo", gen: 4, portable},
    {name: "Gameboy Color", tag: "GBC", brand: "Nintendo", gen: 5, portable},
    {name: "Gameboy Advance", tag: "GBA", brand: "Nintendo", gen: 6, portable},
    {name: "Nintendo DS", tag: "NDS", brand: "Nintendo", gen: 7, portable},
    {name: "Nintendo 3DS", tag: "3DS", brand: "Nintendo", gen: 8, portable},
    
    {name: "Playstation Vita", tag: "Vita", brand: "Sony", gen: 8, portable},
    {name: "Playstation Portable", tag: "PSP", brand: "Sony", gen: 7, portable}
];