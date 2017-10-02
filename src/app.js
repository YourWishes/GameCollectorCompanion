/*
 * Copyright 2017 Dominic Masters.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");  
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/*
    BEFORE WE DO ANYTHING TOO FANCY
    We need to wait for the device to ready up... this is important for PhoneGap
    but since the deviceready event doesn't fire outside of the phonegap
    environment we need to actually see if we're in phonegap or not..
    
*/
require('./common/Number');
require('./common/Array');
require('./common/String');
require('./common/HTMLElement');
require('./common/Window');
require('./common/Object');

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducer from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReactDOM, { render } from 'react-dom';

//Import Base Components
import CollectorApp from './components/CollectorApp';
import Styles from './styles/index';
import * as DB from './db/index';

import * as Consoles from './actions/consoles';
import * as Games from './actions/games';

/**
 * Determine whether the file loaded from PhoneGap or not
 * https://stackoverflow.com/questions/8068052/phonegap-detect-if-running-on-desktop-browser
 */
const isPhoneGap = function() {
    return (window.cordova || window.PhoneGap || window.phonegap) 
    && /^file:\/{3}[^\/]/i.test(window.location.href) 
    && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
}

//Fired when the device is ready (Phone or Desktop)
const onDeviceReady = function() {
    //Device Ready, setup our data
    DB.setup().then(function() {
        beginRender();
    });
}

const beginRender = function() {
    //const store = createStore(reducer);//Create our Redux store
    const store = createStore(reducer, applyMiddleware(thunk));
    const unsubscribe = store.subscribe(() => {
        console.log(store.getState()); //For debugging we're going to track store changes.
    });
    
    store.dispatch(Consoles.fetchConsoles());
    store.dispatch(Games.fetchGames());

    //Needed for onTouchTap
    //Check this repo:
    //https://github.com/zilverline/react-tap-event-plugin
    injectTapEventPlugin();

    render((
        <Provider store={store}>
            <CollectorApp />
        </Provider>
    ), document.getElementById("app"));
}

//Now wait for the device...
if(isPhoneGap()) {document.addEventListener("deviceready", onDeviceReady, false);} else {onDeviceReady();}