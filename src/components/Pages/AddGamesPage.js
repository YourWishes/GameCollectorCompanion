import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';

import AppUtils from '../../utils/AppUtils';

import * as DB from '../../db/index';
import * as Games from '../../actions/games';
import * as Navigation from '../../actions/navigation';

const REGIONS = [
    "PAL-AU/NZ",
    "PAL-EU",
    "NTSC-J",
    "NTSC-K",
    "NTSC-U/C",
    "Region Free"
];

const WEARS = [
    "Sealed",
    "Great",
    "Good",
    "Ok",
    "Bad",
    "Very Bad",
    "No",
    "N/A"
];

//Keep in mind that if a game id is passed in t

export class AddGamesPage extends Component {
    constructor(props, context) {
        super(props, context);
    }
	
	componentDidMount() {
	}
	
	componentWillUnmount() {
	}
    
    onSubmit(e) {
        e.preventDefault();
        if(!this.refs.title || this.refs.title.value == "") {
            alert("Please enter a game title.");
            return;
        }
        
        let game = {
            id: this.existingGame && this.existingGame.id ? this.existingGame.id : DB.uuid(),
            name: this.refs.title.value,
            console: this.refs.console.value,
            region: this.refs.region.value,
            gameWear: this.refs.gameWear.value,
            manualWear: this.refs.manualWear.value,
            caseWear: this.refs.caseWear.value
        };
        
        if(this.refs.inclusion.value != "") game.inclusion = this.refs.inclusion.value;
        if(this.refs.wear.value != "") game.wear = this.refs.wear.value;
        
        if(this.existingGame) {
            this.props.saveGame(game);
            this.goPage("/games/view/"+game.id);
        } else {
            this.props.addGame(game);
            this.goPage("/games/view/"+game.id);
        }
    }
    
    goPage(to) {
        const { history } = this.context.router;
        const { replace } = this.props;

        if (replace) {
            history.replace(to);
        } else {
            history.push(to);
        }
    }
    
    renderForm(existingGame) {
        this.existingGame = existingGame;
        let pcon = this.props.consoles.sort(function(a,b) {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });
        let consoles = [];
        let regions = [];
        let wears = [];
        
        for(var i = 0; i < pcon.length; i++) {
            let c = pcon[i];
            consoles.push(<option key={i} value={c.tag}>{c.name}</option>);
        }
        
        for(var i = 0; i < REGIONS.length; i++) {
            let r = REGIONS[i];
            regions.push(<option key={i} value={r}>{r}</option>);
        }
        
        for(var i = 0; i < WEARS.length; i++) {
            wears.push(<option key={i} value={WEARS[i]}>{WEARS[i]}</option>);
        }
        
        if(existingGame) {
            this.props.setNavigation("Editing Game", "/games/view/"+existingGame.id);
        } else {
            this.props.setNavigation("Adding Game", "/games");
        }
        
        return (
            <div className="page page-add-games">
                <div className="loader"></div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" placeholder="Game Title" ref="title" defaultValue={existingGame && existingGame.name ? existingGame.name : ""} />
                    <select ref="console" defaultValue={existingGame && existingGame.console ? existingGame.console : ""}>
                        {consoles}
                    </select>
                    <select ref="region" defaultValue={existingGame && existingGame.region ? existingGame.region : ""}>
                        {regions}
                    </select>
                    
                    <label><br /></label>
                    
                    <label>Game Disc/Cartridge</label>
                    <select ref="gameWear" defaultValue={existingGame && existingGame.gameWear ? existingGame.gameWear : ""}>
                        {wears}
                    </select>
                    <label>Manual/Insets</label>
                    <select ref="manualWear" defaultValue={existingGame && existingGame.manualWear ? existingGame.manualWear : ""}>
                        {wears}
                    </select>
                    <label>Case/Box</label>
                    <select ref="caseWear" defaultValue={existingGame && existingGame.caseWear ? existingGame.caseWear : ""}>
                        {wears}
                    </select>
                    
                    <label><br /></label>
                    
                    <textarea rows="4" placeholder="Inclusion Notes" ref="inclusion" defaultValue={existingGame && existingGame.inclusion ? existingGame.inclusion : ""}>
                    </textarea>
                    
                    <label><br /></label>
                    
                    <textarea rows="4" placeholder="Wear Notes" ref="wear" defaultValue={existingGame && existingGame.wear ? existingGame.wear : ""}>
                    </textarea>
                    
                    <label><br /></label>
                    
                    <button type="submit" className="btn btn-add" onClick={AppUtils.vibrate}>
                        {existingGame ? "Save Game" : "Add Game"}
                    </button>
                </form>
            </div>
        );
    }

    render() {
        return this.renderForm(null);
    }
}

AddGamesPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export const mapStateToProps = function(state) {
    return {
        games: state.games,
        consoles: state.consoles
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        addGame: function(e) {
            DB.addGame(e);
            dispatch(Games.addGame(e));
        },
        saveGame: function(e) {
            DB.editGame(e);
            dispatch(Games.editGame(e));
        },
        setNavigation(title,back) {
            dispatch(Navigation.setTitleAndBack(title,back));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGamesPage);