import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Account from './Account';
import Data from './Data';
import User from './User'
import { connect } from 'react-redux'

class Main extends Component {
    state = {
        value: 0
    }
    
    render() {
        return (
            <div>
                <AppBar>
                    <Tabs value={this.state.value} onChange={(event, value) => this.setState({ value })}>
                        <Tab label='Account' />
                        <Tab disabled={this.props.loginSuccess} label='Data' />
                        <Tab disabled={this.props.loginSuccess} label='User' />
                    </Tabs>
                </AppBar>
                {this.state.value === 0 && <Account />}
                {this.state.value === 1 && <Data />}
                {this.state.value === 2 && <User />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginSuccess: state.loginSuccess
    }
}

export default connect(mapStateToProps)(Main)
