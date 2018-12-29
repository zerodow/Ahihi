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
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chart from './Chart'
import './data.css'
import InputField from './InputField';
import { getAllSensor, getData } from '../api'
import { GET_SENSER_BY_FARM_ID, GET_SENSER_BY_DEVICE_ID, PH_SENSOR, TEMP_SENSOR, TDS_SENSOR, HUMI_SENSOR } from '../api/const';

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
        // {
        //     label: "My Second dataset",
        //     fillColor: "rgba(151,187,205,0.2)",
        //     strokeColor: "rgba(151,187,205,1)",
        //     pointColor: "rgba(151,187,205,1)",
        //     pointStrokeColor: "#fff",
        //     pointHighlightFill: "#fff",
        //     pointHighlightStroke: "rgba(151,187,205,1)",
        //     data: [28, 48, 40, 19, 86, 27, 90]
        // }
    ]
};

class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            device_id: '',
            farm_id: '',
            isLoading: true,
            isLoadChart: true,
            dataChart: []
        }
    }

    getAll(isAddData) {
        getAllSensor('get-sensers', this.state.page,
            (res) => {
                this.setState({ data: res, isLoading: false })
            },
            (error) => console.log(error)
        )
    }

    /**
     * Hàm này sẽ chạy sau khi render giao diện lần đầu tiên 
     */
    componentWillMount() {
        this.getAll(false)
    }

    getData(value, type) {
        if (type === GET_SENSER_BY_DEVICE_ID) {
            this.setState({ device_id: value })
            getData(type, value,
                (res) => {
                    // console.log(res)
                    if (res) {
                        this.setState({
                            data: res
                        })
                    }

                },
                (error) => {
                    alert('No invalid data')
                    console.log('error')
                })
        } else {
            this.setState({ farm_id: value })
            getData(type, value,
                (res) => {
                    if (res) {
                        this.setState({
                            data: res
                        })
                    }
                },
                (error) => {
                    alert('No invalid data')
                    console.log('error')
                })
        }
    }

    loadMore() {

    }

    renderGroupsInput() {
        return (
            <Grid style={{ flexDirection: 'row' }}>
                <FormGroup row>
                    <FormGroup className='input_element'>
                        <InputField
                            placeholder={'Nhập farm id'}
                            onHandleInput={(value, type) => this.getData(value, type)}
                            type={GET_SENSER_BY_FARM_ID}
                        />
                    </FormGroup>
                    <FormGroup className='input_element'>
                        <InputField
                            placeholder={'Nhập device id'}
                            nHandleInput={(value, type) => this.getData(value, type)}
                            type={GET_SENSER_BY_DEVICE_ID}
                        />
                    </FormGroup>
                </FormGroup>
            </Grid>

        )
    }

    renderData() {
        return (
            <Grid style={{ padding: 5, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Paper >
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
                        <TableBody style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
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
                <Grid
                    container
                    style={{ marginTop: 5 }}
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Button
                        variant="contained"
                        className='button'
                        style={{ backgroundColor: 'white', color: 'green', width: '10%' }}
                        onClick={() => this.loadMore()}
                    >
                        Load more
                    </Button>
                </Grid>
            </Grid>
        )
    }

    renderTable() {
        return (
            <Grid style={{ justifyContent: 'center' }}>
                {this.renderGroupsInput()}
                {this.state.isLoading
                    ? <Grid
                        container
                        style={{ marginTop: 5 }}
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <CircularProgress />
                    </Grid>
                    : this.renderData()
                }
            </Grid>
        )
    }

    renderChart() {
        const { data } = this.state
        if (data && data.length !== 0) {
            return (
                <Grid
                    style={{ flex: 1 }}
                    alignItems='center'
                    direction='column'>
                    <Chart data={data} type={PH_SENSOR} />
                    <Chart data={data} type={TEMP_SENSOR} />
                    <Chart data={data} type={TDS_SENSOR} />
                    <Chart data={data} type={HUMI_SENSOR} />
                </Grid>
            )
        } else {
            return null
        }
    }

    render() {
        return (
            <div>
                <FormGroup style={styles.container} row>
                    <Grid style={{ flex: 2, }}>
                        {this.renderTable()}
                    </Grid>
                    <Grid style={{ flex: 1, paddingLeft: 10, paddingTop: 50 }}>
                        {this.renderChart()}
                    </Grid>
                </FormGroup>
            </div>
        );
    }
}

const styles = {
    container: {
        width: window.innerWidth,
        // height: window.innerHeight,
        backgroundColor: 'white'
    }
}

export default connect()(Data)

