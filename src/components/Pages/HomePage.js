import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import * as DB from '../../db/index';
import * as Navigation from '../../actions/navigation';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }
	
	componentDidMount() {
	}
	
	componentWillUnmount() {
	}

    render() {
        this.props.setNavigation("Game Collection", null);
        
        return (
            <div className="page page-home">
                <div>
                    <Link to="/games">Games</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        consoles: state.consoles
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        setNavigation(title,back) {
            dispatch(Navigation.setTitleAndBack(title,back));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
