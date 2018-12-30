import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import InputField from './InputField';
import Button from '@material-ui/core/Button';

import { GET_SENSER_BY_FARM_ID, GET_SENSER_BY_DEVICE_ID, PH_SENSOR, TEMP_SENSOR, TDS_SENSOR, HUMI_SENSOR, GET_ABOVE } from '../api/const';
export default class FormSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            farm_id: '',
            device_id: '',
            is_get_sensor_by_farm_id: false,
            is_get_sensor_by_device_id: false,
            is_get_above: false
        };
    }

    getData(value, type) {
        if (type === GET_SENSER_BY_DEVICE_ID && value && value !== '') {
            console.log('1')
            this.setState({ is_get_sensor_by_device_id: true, device_id: value })
        } else if (type === GET_SENSER_BY_FARM_ID && value && value !== '') {
            console.log('2')
            this.setState({ is_get_sensor_by_farm_id: true, farm_id: value })
        } else if (type === GET_SENSER_BY_DEVICE_ID && value == '') {
            console.log('3')
            this.setState({ is_get_sensor_by_device_id: false, device_id: '' })
        } else if (type === GET_SENSER_BY_FARM_ID && value == '') {
            console.log('4')
            this.setState({ is_get_sensor_by_farm_id: false, farm_id: '' })
        } else {
            console.log('5')
            console.log('value', value)
            console.log('type', type)
        }
    }

    search() {
        const { device_id, farm_id, is_get_sensor_by_device_id, is_get_sensor_by_farm_id } = this.state
        let type = ''
        let value = ''
        if (is_get_sensor_by_device_id && is_get_sensor_by_farm_id) {
            type = GET_ABOVE
            value = {
                'device_id': device_id,
                'farm_id': farm_id
            }
            this.props.onValueSearch(type, value)
            return
        }
        if (is_get_sensor_by_farm_id) {
            type = GET_SENSER_BY_FARM_ID
            value = farm_id
            this.props.onValueSearch(type, value)
            return
        }
        if (is_get_sensor_by_device_id) {
            type = GET_SENSER_BY_DEVICE_ID
            value = device_id
            this.props.onValueSearch(type, value)
            return
        }
        if(!is_get_sensor_by_device_id && !is_get_sensor_by_farm_id){
            this.props.onClear()
        }

    }

    clear() {
        this.setState({
            farm_id: '',
            device_id: '',
            is_get_sensor_by_farm_id: false,
            is_get_sensor_by_device_id: false,
            is_get_above: false
        })
        this.refs.InputDeviceId.onClear()
        this.refs.InputFarmId.onClear()
        this.props.onClear()
    }

    render() {
        return (
            <Grid direction='row' alignItems='center' justify='center' container style={{ marginBottom: 10, marginTop: 10, marginLeft: 10, height: 50 }}>
                <InputField
                    ref={'InputFarmId'}
                    placeholder={'Nhập farm id'}
                    onHandleInput={(value, type) => this.getData(value, type)}
                    onClear={() => this.setState({ farm_id: '', is_get_sensor_by_farm_id: false, })}
                    type={GET_SENSER_BY_FARM_ID}
                />

                <InputField
                    ref={'InputDeviceId'}
                    placeholder={'Nhập device id'}
                    onHandleInput={(value, type) => this.getData(value, type)}
                    onClear={() => this.setState({ device_id: '', is_get_sensor_by_device_id: false, })}
                    type={GET_SENSER_BY_DEVICE_ID}
                />

                <Button
                    variant="contained"
                    style={{ backgroundColor: '#83C87A', color: 'white', width: '10%', height: 45, marginLeft: 10 }}
                    onClick={() => this.search()}
                >
                    Search
                </Button>

                <Button
                    variant="contained"
                    style={{ backgroundColor: '#83C87A', color: 'white', width: '10%', height: 45, marginLeft: 10 }}
                    onClick={() => this.clear()}
                >
                    Clear
                </Button>

            </Grid>
        );
    }
}
