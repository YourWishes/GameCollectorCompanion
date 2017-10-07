export const ADD_CONSOLE = "ADD_CONSOLE";
export const SET_CONSOLES = "SET_CONSOLES";

import * as DB from './../db/index';

//Add your system logos here.
import LOGO_3DS from './../images/consoles/3DS.png';
import LOGO_360 from './../images/consoles/360.png';
import LOGO_2600 from './../images/consoles/2600.png';
import LOGO_DC from './../images/consoles/DC.png';
import LOGO_FC from './../images/consoles/FC.png';
import LOGO_GB from './../images/consoles/GB.png';
import LOGO_GBA from './../images/consoles/GBA.png';
import LOGO_GBC from './../images/consoles/GBC.png';
import LOGO_GEN from './../images/consoles/GEN.png';
import LOGO_MD from './../images/consoles/MD.png';
import LOGO_N64 from './../images/consoles/N64.png';
import LOGO_NDS from './../images/consoles/NDS.png';
import LOGO_NES from './../images/consoles/NES.png';
import LOGO_NGC from './../images/consoles/NGC.png';
import LOGO_NS from './../images/consoles/NS.png';
import LOGO_PS1 from './../images/consoles/PS1.png';
import LOGO_PS2 from './../images/consoles/PS2.png';
import LOGO_PS3 from './../images/consoles/PS3.png';
import LOGO_PS4 from './../images/consoles/PS4.png';
import LOGO_PSP from './../images/consoles/PSP.png';
import LOGO_SFC from './../images/consoles/SFC.png';
import LOGO_SNES from './../images/consoles/SNES.png';
import LOGO_SS from './../images/consoles/SS.png';
import LOGO_UMD from './../images/consoles/UMD.png';
import LOGO_Vita from './../images/consoles/Vita.png';
import LOGO_Wii_U from './../images/consoles/Wii U.png';
import LOGO_Wii from './../images/consoles/Wii.png';
import LOGO_WSC from './../images/consoles/WSC.png';
import LOGO_Xbox from './../images/consoles/Xbox.png';

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
    switch(tag) {
        case "3DS": return LOGO_3DS;
        case "360": return LOGO_360;
        case "2600": return LOGO_2600;
        case "DC": return LOGO_DC;
        case "FC": return LOGO_FC;
        case "GB": return LOGO_GB;
        case "GBA": return LOGO_GBA;
        case "GBC": return LOGO_GBC;
        case "GEN": return LOGO_GEN;
        case "MD": return LOGO_MD;
        case "N64": return LOGO_N64;
        case "NDS": return LOGO_NDS;
        case "NES": return LOGO_NES;
        case "NGC": return LOGO_NGC;
        case "NS": return LOGO_NS;
        case "PS1": return LOGO_PS1;
        case "PS2": return LOGO_PS2;
        case "PS3": return LOGO_PS3;
        case "PS4": return LOGO_PS4;
        case "PSP": return LOGO_PSP;
        case "SFC": return LOGO_SFC;
        case "SNES": return LOGO_SNES;
        case "SS": return LOGO_SS;
        case "UMD": return LOGO_UMD;
        case "Vita": return LOGO_Vita;
        case "Wii U": return LOGO_Wii_U;
        case "Wii": return LOGO_Wii;
        case "WSC": return LOGO_WSC;
        case "Xbox": return LOGO_Xbox;
        default: return LOGO_Xbox
    }
    
    //return "/src/images/consoles/"+tag+".png"
}