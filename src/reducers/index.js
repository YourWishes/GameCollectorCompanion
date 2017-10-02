'use strict';

import {combineReducers} from 'redux';
import navigation from './navigation';
import consoles from './consoles';
import games from './games';

const reducer = combineReducers({
    navigation,
    consoles,
    games
});

export default reducer;