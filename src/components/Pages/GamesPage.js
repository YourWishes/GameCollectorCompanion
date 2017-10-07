import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

import GamesList from '../Games/GamesList';
import * as Navigation from '../../actions/navigation';
import AppUtils from '../../utils/AppUtils';

import * as Consoles from '../../actions/consoles';
import * as Games from '../../actions/games';

class GamesPage extends Component {
    constructor(props) {
        super(props);
        
        let search = null;
        if(this.props.match.params.search) {
            search = this.props.match.params.search;
        } else if(this.props.search && typeof this.props.search === typeof "") {
            search = this.props.search;
        }
        
        
        this.state = {
            search: search,
            menu: false
        }
    }
	
	componentDidMount() {
        this.expandMenu = function(e) {
            AppUtils.vibrate();
            this.setState({
                menu: !this.state.menu
            });
        }.bind(this);
        
        this.expandMenuButton.addEventListener('click', this.expandMenu);
	}
	
	componentWillUnmount() {
        this.expandMenuButton.removeEventListener('click', this.expandMenu);
        
        if(this.futureSetState) {
            clearTimeout(this.futureSetState);
        }
	}
    
    onChange(e) {
        //We're going to make this a future.
        if(this.futureSetState) {
            clearTimeout(this.futureSetState);
        }
        this.searchRequest = e.target.value;
        this.futureSetState = setTimeout(this.updateSearchState.bind(this), 500);
        
        this.props.history.push({
            pathname: '/games/'+e.target.value
        });
        this.props.setSearch(e.target.value);
    }
    
    updateSearchState() {
        this.setState({
            search: this.searchRequest
        });
    }
    
    refresh() {
        AppUtils.vibrate();
        this.props.refreshGames();
    }

    render() {
        this.props.setNavigation("Viewing Games", "/");
        
        return (
            <div className="page page-games">
                <form className={"search-box"+(this.state.menu?" menu-open ":"")} onSubmit={function(e) {e.preventDefault();}} >
                    <input type="text" onChange={this.onChange.bind(this)} name="search" placeholder="Search..." autoComplete="off" defaultValue={this.state.search ? this.state.search : ""}/>
                    <button className="btn search" type="submit" onClick={AppUtils.vibrate} ><FontAwesome name="search" /></button>
                    <button className="btn options" type="button" ref={(e) => {return this.expandMenuButton = e;}}>{this.state.menu ? <FontAwesome name="angle-up" /> : <FontAwesome name="angle-down" />}</button>
                </form>
                <div className={"menu-box " + (this.state.menu ? "open" : "")} ref={(i) => this.menuBox = i}>
                    <Link to="/games/add" className="btn add-game" onClick={AppUtils.vibrate}><FontAwesome name="plus" /></Link>
                    <button className="btn refresh-games" to="/games/add" onClick={this.refresh.bind(this)}><FontAwesome name="refresh" /></button>
                </div>
                <GamesList search={this.state.search} />
            </div>
        );
    }
}

GamesPage.propTypes = {
    history: React.PropTypes.object.isRequired
}

const mapStateToProps = function(state) {
    return {
        search: state.navigation.games_search
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        setNavigation(title,back) {
            dispatch(Navigation.setTitleAndBack(title,back));
        },
        refreshGames() {    
            dispatch(Consoles.fetchConsoles());
            dispatch(Games.fetchGames());
        },
        setSearch(e) {
            dispatch(Navigation.setGamesSearch(e));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GamesPage);