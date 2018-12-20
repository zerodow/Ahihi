import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import './data.css'
import { GET_SENSER_BY_FARM_ID, GET_SENSER_BY_DEVICE_ID } from '../api/const'
import { getData } from '../api'
export default class InputField extends Component {
    handleInputChange(value) {
        const { type } = this.props
        if(value || value !== ''){
            getData(type, value,
                (res) => {
                    this.props.onHandleInput(res)
                },
                (error) => {
                    console.log('error', error)
                }
            )
        }  
    }

    render() {
        const { placeholder, type } = this.props
        return (
            <Input
                style={{ padding: 5, paddingLeft: 20 }}
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
