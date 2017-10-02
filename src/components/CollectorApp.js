import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
const FontAwesome = require('font-awesome/css/font-awesome.css');

import Navbar from './Navbar/Navbar';

import HomePage from './Pages/HomePage';
import GamesPage from './Pages/GamesPage';
import AddGamesPage from './Pages/AddGamesPage';
import ViewGamePage from './Pages/ViewGamePage';
import EditGamesPage from './Pages/EditGamesPage';

class CollectorApp extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <HashRouter>
                <div>
                    <Navbar />
                    <Switch>
                        <Route exact path="/"  component={HomePage} />
                        <Route exact path="/games" component={GamesPage} />
                        <Route exact path="/games/add" component={AddGamesPage} />
                        <Route exact path="/games/view/:game" component={ViewGamePage} />
                        <Route exact path="/games/edit/:game" component={EditGamesPage} />
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default CollectorApp;