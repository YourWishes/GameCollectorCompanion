import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

import {connect} from 'react-redux';
import GameListItem from './GameListItem';

class GamesList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            count: 90000
        };//TODO: Scroll events aren't firing properly on PhoneGap, just load all the games for the time being
        
        this.onScroll = function(e) {
            let p = window.getScrollY()/(document.documentElement.scrollHeight-window.innerHeight);//Short-hand
            if(p > 0.9) {
                if(this.state.count === this.props.games.length) {
                    
                } else {
                    let newCount = this.state.count*2;
                    if(newCount > this.props.games.length) newCount = this.props.games.length;
                    this.setState({
                        count: newCount
                    });
                }
            }
        }.bind(this);
    }
	
	componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
        document.addEventListener('touchmove', this.onScroll);
	}
	
	componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
        document.removeEventListener('touchmove', this.onScroll);
	}

    render() {
        let gamesList = [];
        let games = [];
        
        //First, get the games list from the reducer
        if(this.props.games && typeof this.props.games === typeof []) gamesList = this.props.games;
        
        //Awesome, now we can sort, filter, etc. however we like!
        
        if(this.props.search) {
            let searchLower = this.props.search.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
            
            //TODO: Search could be smarter, this is fine for now though.
            gamesList = gamesList.filter(function(e) {
                let name = e.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
                
                let NC = name.contains(searchLower);
                return NC;
            });
        } else {
        }
        
        //Sorting
        gamesList.sort(function(a,b) {
            let aLower = a.name.toLowerCase();
            let bLower = b.name.toLowerCase();
            
            if(aLower.startsWith("the")) aLower = aLower.replace("the", "");
            if(bLower.startsWith("the")) bLower = bLower.replace("the", "");
            
            while(aLower.startsWith(" ")) {aLower = aLower.replace(" ", "");}
            while(bLower.startsWith(" ")) {bLower = bLower.replace(" ", "");}
            
            if(aLower < bLower) return -1;
            if(aLower> bLower) return 1;
            return 0; 
        });
        
        for(var i = 0; i < Math.min(gamesList.length, this.state.count); i++) {
            games.push(<GameListItem data={gamesList[i]} key={i} search={this.props.search ? this.props.search : ""} />);
        }
        
        return (
            <div className="games-list">
                {games}
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        games: state.games
    }
}

export default connect(mapStateToProps)(GamesList);
