import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import './data.css'
import { GET_SENSER_BY_FARM_ID, GET_SENSER_BY_DEVICE_ID } from '../api/const'
import { getData } from '../api'
export default class InputField extends Component {
    state = {
        value: ''
    }
    handleInputChange(value) {
        this.setState({ value })
        const { type } = this.props
        this.props.onHandleInput(value, type)
    }

    onClear() {
        this.setState({ value: '' })
    }

    render() {
        const { placeholder, type } = this.props
        return (
            <Input
                value={this.state.value}
                style={{ padding: 5, paddingLeft: 5, marginLeft: 10 }}
                disableUnderline={true}
                className='input'
                required={true}
                placeholder={placeholder}
                onChange={(event) =>
                    this.handleInputChange(event.target.value)
                    // this.props.handleInput(event.target.value)
                    // this.setState({ farm_id: event.target.value })
                } />
        );
    }
}
