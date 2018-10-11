import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import './account.css'
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    login = () => {
        if (this.state.username === this.props.username && this.state.password === this.props.password) {
            alert('login success')
            this.props.dispatch({
                type:'LOGINSUCCESS',
            })
        } else {
            alert('login failed')
        }
    }

    render() {
        return (
            <div className="account">
                <h1>Account</h1>
                <FormGroup>
                    <FormGroup row>
                        <h3>Username</h3>
                        <Input
                            onChange={(event) => this.setState({ username: event.target.value })} />
                    </FormGroup>
                    <FormGroup row>
                        <h3>Password</h3>
                        <Input
                            onChange={(event) => this.setState({ password: event.target.value })} />
                    </FormGroup>
                </FormGroup>
                <Button text={"Login"} onClick={this.login}>
                    <h4>button</h4>
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        password: state.password
    }
}

export default connect(mapStateToProps)(Account)
