import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './data.css'
import InputField from './InputField';
import { getData, getAllSensor } from '../api'
import { GET_SENSER_BY_FARM_ID, GET_SENSER_BY_DEVICE_ID } from '../api/const';

const LineChart = require("react-chartjs").Line;
var chart = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1
        }

        this.handleScroll = this.handleScroll.bind(this)
    }

    getAll() {
        getAllSensor('get-sensers', this.state.page,
            (res) => {
                console.log(Object.assign(this.state.data, res))
                this.setState({ data: Object.assign(this.state.data, res) })
            },
            (error) => console.log(error)
        )
    }
    /**
     * Hàm này sẽ chạy sau khi render giao diện lần đầu tiên 
     */
    componentDidMount() {
        this.getAll()
    }

    handleScroll = (event) => {
        if (window.scrollY > window.innerHeight / 2) {
            console.log(true)
            this.setState({ page: 2 }, () => this.getAll())

        }
    }

    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    getData(data) {
        if (data) {
            this.setState({ data })
        } else {
            alert('No invalid data')
            this.getAll()
        }
    }

    renderGroupsInput() {
        return (
            <Grid style={{ flexDirection: 'row' }}>
                <FormGroup row>
                    <FormGroup className='input_element'>
                        <InputField
                            placeholder={'Nhập farm id'}
                            onHandleInput={(data) => this.getData(data)}
                            type={GET_SENSER_BY_FARM_ID}
                        />
                    </FormGroup>
                    <FormGroup className='input_element'>
                        <InputField
                            placeholder={'Nhập device id'}
                            onHandleInput={(data) => this.getData(data)}
                            type={GET_SENSER_BY_DEVICE_ID}
                        />
                    </FormGroup>
                    <FormGroup className='input_element'>
                        <Button
                            variant="contained"
                            className='button'
                            style={{ backgroundColor: '#83C87A', color: 'white', width: '60%' }}
                            onClick={() => this.login()}
                        >
                            Tìm kiếm
                        </Button>
                    </FormGroup>
                </FormGroup>
            </Grid>

        )
    }

    renderData() {
        return (
            <Grid style={{ padding: 5 }}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Farm id</TableCell>
                                <TableCell>Device id</TableCell>
                                <TableCell>Sensor id</TableCell>
                                <TableCell>Sensor name</TableCell>
                                <TableCell>Sensor value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {this.state.data.map(row => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.farm_id}</TableCell>
                                        <TableCell>{row.device_id}</TableCell>
                                        <TableCell>{row.sensor_id}</TableCell>
                                        <TableCell>{row.sensor_name}</TableCell>
                                        <TableCell>{row.sensor_value}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        )
    }

    renderTable() {
        return (
            <Grid style={{ justifyContent: 'center' }}>
                {this.renderGroupsInput()}
                {this.renderData()}
            </Grid>
        )
    }

    renderChart() {
        return (
            <LineChart data={chart} width="600" height="250" />
        )
    }

    render() {
        return (
            <FormGroup style={styles.container} row>
                <Grid style={{ flex: 2, }}>
                    {this.renderTable()}
                </Grid>
                {/* <Grid style={{ flex: 1, paddingLeft: 10, paddingTop: 30 }}>
                    <LineChart data={chart} width={window.innerWidth / 3 - 40} height="250" />
                </Grid> */}
            </FormGroup>
        );
    }
}

const styles = {
    container: {
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 'white'
    }
}

export default connect()(Data)

