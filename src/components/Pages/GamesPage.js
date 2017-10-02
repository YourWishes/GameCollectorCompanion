import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

import GamesList from '../Games/GamesList';
import * as Navigation from '../../actions/navigation';
import AppUtils from '../../utils/AppUtils';

class GamesPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            search: null,
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
	}
    
    onChange(e) {
        this.setState({
            search: e.target.value
        });
    }

    render() {
        this.props.setNavigation("Viewing Games", "/");
        return (
            <div className="page page-games">
                <form className={"search-box"+(this.state.menu?" menu-open ":"")} onSubmit={function(e) {e.preventDefault();}} >
                    <input type="text" onChange={this.onChange.bind(this)} name="search" placeholder="Search..." autoComplete="off" />
                    <button className="btn search" type="submit" onClick={AppUtils.vibrate} ><FontAwesome name="search" /></button>
                    <button className="btn options" type="button" ref={(e) => {return this.expandMenuButton = e;}}>{this.state.menu ? <FontAwesome name="angle-up" /> : <FontAwesome name="angle-down" />}</button>
                </form>
                <div className={"menu-box " + (this.state.menu ? "open" : "")} ref={(i) => this.menuBox = i}>
                    <Link className="btn add-game" to="/games/add" onClick={AppUtils.vibrate}><FontAwesome name="plus" /></Link>
                </div>
                <GamesList search={this.state.search} />
            </div>
        );
    }
}

const mapStateToProps = function(state) {return {}}

const mapDispatchToProps = function(dispatch) {
    return {
        setNavigation(title,back) {
            dispatch(Navigation.setTitleAndBack(title,back));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GamesPage);