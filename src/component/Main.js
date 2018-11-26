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

    componentWillReceiveProps(nextProps) {
        if (nextProps.loginSuccess) {
            this.setState({
                value: 1
            })
        }
    }

    render() {
        if (this.state.value === 0) {
            return <Account />
        } else {
            return (
                <AppBar>
                    <Tabs value={this.state.value} onChange={(event, value) => this.setState({ value })}>
                        {/* <Tab label='Account' /> */}
                        <Tab disabled={!this.props.loginSuccess} label='Data' />
                        <Tab disabled={!this.props.loginSuccess} label='User' />
                    </Tabs>
                    {this.state.value === 1 && <Data />}
                    {this.state.value === 2 && <User />}
                </AppBar>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        loginSuccess: state.loginSuccess
    }
}

export default connect(mapStateToProps)(Main)
