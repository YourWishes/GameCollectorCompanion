import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';

import * as DB from '../../db/index';
import * as Games from '../../actions/games';
import * as AddGamesPage from './AddGamesPage';

class EditGamesPage extends AddGamesPage.AddGamesPage {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        let game = null;
        if(this.props.match.params.game) {
            let id = this.props.match.params.game;
            game = this.props.games.find(e => {
                return e.id === id;
            });
        }
        
        if(game) {
            return this.renderForm(game);
        }
        
        return (
            <div className="page page-add-games">
                <div className="error">Game not found.</div>
            </div>
        );
    }
}

export default connect(AddGamesPage.mapStateToProps, AddGamesPage.mapDispatchToProps)(EditGamesPage);