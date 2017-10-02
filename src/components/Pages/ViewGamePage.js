import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';

import AppUtils from '../../utils/AppUtils';

import * as DB from '../../db/index';
import * as Games from '../../actions/games';
import * as Consoles from '../../actions/consoles';
import * as Navigation from '../../actions/navigation';

import WiiLogo from '../../images/consoles/Wii.png';

class ViewGamePage extends Component {
    constructor(props) {
        super(props);
    }
    
    wear(n, w) {
        if(w) {
            let conditionClass = Games.getClassFromWear(w);
            return(
                <div className={"wear " + conditionClass} key={n}>
                    <span>
                        {n}<br />
                        {w}
                    </span>
                </div>
            );
        } else {
            return (
                <div className="wear blank" key={n}>
                    <span>{n}</span>
                </div>
            );
        }
    }
    
    confirmDelete(e) {
        AppUtils.vibrate();
        let confirm = window.confirm("Are you sure you want to remove this game?");
        if(!confirm) return;
        this.goPage("/games");
        this.props.deleteGame(e);
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

    render() {
        let id = this.props.match.params.game;
        let d = this.props.games.find(e => {
            return e.id === id;
        });
        
        if(!d) {
            //Game not found
            this.props.setNavigation("Game not found", "/games");
            return (
                <div className="page page-view-game">
                    Error, game not found.
                </div>
            );
        }
        this.props.setNavigation(d.name, "/games");
        
        let c = this.props.consoles.find(e => {
            return e.tag === d.console;
        });
    
        let wears = [];
        wears.push(this.wear("Game", d.gameWear));
        wears.push(this.wear("Manual", d.manualWear));
        wears.push(this.wear("Case", d.caseWear));
        
        let notes = [];
        if(d.wear) {
            notes.push(<div className="subtitle" key="notes-wear-subtitle">Wear</div>);
            notes.push(
                <div className="notes wear" key="notes-wear">
                    {d.wear}
                </div>
            );
        }
        if(d.inclusion) {
            notes.push(<div className="subtitle" key="notes-inclusion-subtitle">Includes</div>);
            notes.push(
                <div className="notes inclusion" key="notes-inclusion">
                    {d.inclusion}
                </div>
            );
        }
        
        
        //TODO: Probably the only todo in this application at the moment...
        //So the Consoles are dynamically managed, therefore we can't require the
        //Console image very well, so in that case we really just have to reply on old
        //fashioned http locations...
        //Possible (unexplored) alternatives:
        // - Don't store consoles in the DB perhaps...
        // - add a redux for the images in the consoles?
        // - suicide is always an option
        return (
            <div className="page page-view-game">
                <div className="inner">
                    <div className="title">
                        <div className="icons">
                            <Link to={"/games/edit/"+d.id} onClick={AppUtils.vibrate}><FontAwesome name="pencil" /></Link>
                            <div onClick={this.confirmDelete.bind(this, d)} ><FontAwesome name="trash" /></div>
                        </div>
                        {d.name}
                    </div>
                    <div className="box console">
                        <div className="icon logo">
                            <img src={Consoles.getLogoFromTag(d.console)} />
                        </div>
                        {c.name}
                    </div>
                    <div className="box region">
                        <div className="icon flag">
                            <img src={Games.getFlagFromRegion(d.region)} />
                        </div>
                        {d.region}
                    </div>
                </div>
                
                {wears}
                
                <div className="inner">
                    {notes}
                </div>
            </div>
        );
    }
}

ViewGamePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = function(state) {
    return {
        games: state.games,
        consoles: state.consoles
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        deleteGame: function(e) {
            DB.deleteGame(e);
            dispatch(Games.deleteGame(e));
        },
        setNavigation(title,back) {
            dispatch(Navigation.setTitleAndBack(title,back));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewGamePage);
