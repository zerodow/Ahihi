import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './data.css'

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

const data = {
    message_id: "1",
    timestamp: "2",
    farm_id: "3",
    device_id: "4",
    node_id: "5",
    sensors_data: [
        {
            sensor_id: "1",
            sensor_name: "ahihi",
            sensor_value: "1996"
        },
        {
            sensor_id: "2",
            sensor_name: "êhhe",
            sensor_value: "2000"
        },
        {
            sensor_id: "3",
            sensor_name: "ahaha",
            sensor_value: "2001"
        }
    ]
}

class Data extends Component {
    state = {
        data: data
    }
    /**
     * Hàm này sẽ chạy sau khi render giao diện lần đầu tiên 
     */
    componentDidMount() {
        fetch('https://farmproject.herokuapp.com/saveSensers', {//link api
            method: 'POST', //method
            headers: { // config header
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json()) // data trả về ngay lập tức chuyển sang json
            .then(res => { // res chính là dữ liệu đã được chuyển sang json
                // this.setState({
                //     data: res // dữ liệu trả về sẽ được gán cho state có tên data để hiển thị lên list
                // })

                // console.log(res.data)
                console.log('oki')
            })
            .catch(error => console.log(error))
    }

    renderGroupsInput() {
        return (
            <Grid style={{ flexDirection: 'row' }}>
                <FormGroup row>
                    <FormGroup className='input_element'>
                        <Input
                            style={{ padding: 5, paddingLeft: 20 }}
                            disableUnderline={true}
                            className='input'
                            required={true}
                            placeholder='Nhập farm id'
                            onChange={(event) => this.setState({ farm_id: event.target.value })} />
                    </FormGroup>
                    <FormGroup className='input_element'>
                        <Input
                            style={{ padding: 5, paddingLeft: 20 }}
                            disableUnderline={true}
                            className='input'
                            required={true}
                            placeholder='Nhập device id'
                            onChange={(event) => this.setState({ device_id: event.target.value })} />
                    </FormGroup>
                    <FormGroup className='input_element'>
                        <Input
                            style={{ padding: 5, paddingLeft: 20 }}
                            disableUnderline={true}
                            className='input'
                            required={true}
                            placeholder='Nhập node id'
                            onChange={(event) => this.setState({ node_id: event.target.value })} />
                    </FormGroup>
                    <FormGroup className='input_element'>
                        <Input
                            style={{ padding: 5, paddingLeft: 20 }}
                            disableUnderline={true}
                            className='input'
                            required={true}
                            placeholder='Nhập sensor name'
                            onChange={(event) => this.setState({ sensor_name: event.target.value })} />
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
                                <TableCell>Node_id</TableCell>
                                <TableCell>Sensor id</TableCell>
                                <TableCell>Sensor name</TableCell>
                                <TableCell>Sensor value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {this.state.data.sensors_data.map(row => {
                                return (
                                    <TableRow>
                                        <TableCell>{row.sensor_id}</TableCell>
                                        <TableCell>{row.sensor_name}</TableCell>
                                        <TableCell>{row.sensor_value}</TableCell>
                                        <TableCell>{row.sensor_value}</TableCell>
                                        <TableCell>{row.sensor_value}</TableCell>
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
            <Grid>
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
                <Grid style={{ flex: 1, backgroundColor: 'pink', paddingLeft: 10 }}>
                    <LineChart data={chart} width={window.innerWidth / 3 - 40} height="250" />
                </Grid>
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

