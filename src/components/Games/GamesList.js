import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

import {connect} from 'react-redux';
import GameListItem from './GameListItem';

class GamesList extends Component {
    constructor(props) {
        super(props);
    }
	
	componentDidMount() {
	}
	
	componentWillUnmount() {
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
                return name.contains(searchLower);
            });
        } else {
        }
        
        //Sorting
        gamesList.sort(function(a,b) {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0; 
        });
        
        for(var i = 0; i < gamesList.length; i++) {
            games.push(<GameListItem data={gamesList[i]} key={i} />);
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
