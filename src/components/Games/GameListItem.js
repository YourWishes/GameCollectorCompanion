import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import AppUtils from '../../utils/AppUtils';

import * as Games from '../../actions/games';
import * as Consoles from '../../actions/consoles';

class GameListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let d = this.props.data;
        let bars = [];
        
        //Game Condition
        if(d.gameWear) {
            let conditionClass = Games.getClassFromWear(d.gameWear);
            bars.push(<div className={"bar " + conditionClass} key="gameWear"></div>);
        } else {
            bars.push(<div className="bar blank" key="gameWear"></div>);
        }
        
        if(d.manualWear) {
            let conditionClass = Games.getClassFromWear(d.manualWear);
            bars.push(<div className={"bar " + conditionClass} key="manualWear"></div>);
        } else {
            bars.push(<div className="bar blank" key="manualWear"></div>);
        }
        
        if(d.caseWear) {
            let conditionClass = Games.getClassFromWear(d.caseWear);
            bars.push(<div className={"bar " + conditionClass} key="caseWear"></div>);
        } else {
            bars.push(<div className="bar blank" key="caseWear"></div>);
        }
        
        bars.push(<div className={"bar bar-console console-"+d.console} key="console"></div>);
        
        let notes = [];
        if(d.inclusion) {
            notes.push(<FontAwesome name="diamond" key="inclusion"/>);
        }
        
        if(d.wear) {
            notes.push(<FontAwesome name="exclamation" key="wear" />);
        }
        
        return (
            <Link className="list-item" to={"/games/view/"+d.id} onClick={AppUtils.vibrate}>
                <div className="inner">
                    <div className="title">
                        <div className="icons">
                            <div className="flag"><img src={Games.getFlagFromRegion(d.region)} /></div>
                            <div className="logo"><img src={Consoles.getLogoFromTag(d.console)} /></div>
                        </div>
                        {d.name}
                        <div className="sm-icons">
                            {notes}
                        </div>
                        <div className="clear-fix"></div>
                    </div>
                    
                    <div className="bars">{bars}</div>
                </div>
            </Link>
        );
    }
}

export default GameListItem;