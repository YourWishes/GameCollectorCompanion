export const SET_TITLE = "SET_TITLE";
export const SET_BACK = "SET_BACK";
export const SET_TITLE_AND_BACK = "SET_TITLE_AND_BACK";

export function setTitle(text) {
    return {
        type: SET_TITLE,
        text
    }
}

export function setBack(back) {
    return {
        type: SET_BACK,
        back: back
    }
}

export function setTitleAndBack(title, back) {
    return {
        type: SET_TITLE_AND_BACK,
        title,
        back: back
    }
}