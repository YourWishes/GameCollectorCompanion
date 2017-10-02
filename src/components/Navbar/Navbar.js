import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import Router from 'react-router';

import { setTitle } from './../../actions/navigation';

import AppUtils from '../../utils/AppUtils';

class Navbar extends Component {
    constructor(props) { 
        super(props);
        
        this.backButtonHandler = this.onBackButton.bind(this);
    }
    
    onBackButton() {
        AppUtils.vibrate();
        if(!(this.props.back)) {
            if(navigator && navigator.app && navigator.app.exitApp) navigator.app.exitApp();
        } else {
            this.goPage(this.props.back);
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
    
    componentDidMount() {
        document.addEventListener("backbutton", this.backButtonHandler, false);
    }
    
    componentWillUnmount() {
        document.removeEventListener("backbutton", this.backButtonHandler, false);
    }
    
    render() {
        let backButton;
        
        if(this.props.back && this.props.back != null) {
            backButton = <Link to={this.props.back} className="backButton btn" onClick={AppUtils.vibrate}><FontAwesome name="chevron-left" /></Link>;
        } else {
            backButton = <div></div>;
        }
        
        let menuButton = (
            <div className="menu btn right"><FontAwesome name="bars" /></div>
        );
        
        return (
            <div className="navbar">
                {backButton}
                <div className="app-title">
                    {this.props.title}
                    <title>{this.props.title}</title>
                </div>
                {menuButton}
            </div>
        );
    }
}

Navbar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = function(state) {
    return {
        title: state.navigation.title,
        back: state.navigation.back
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
