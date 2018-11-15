import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';

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
    state={
        data: data
    }
    /**
     * Hàm này sẽ chạy sau khi render giao diện lần đầu tiên 
     */
    componentDidMount() {
        fetch('http://localhost:3001/saveSensers', {//link api
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
                console.log('oki')
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <FormGroup style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <h1>Data</h1>
                </FormGroup>
                <Paper >
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

            </div>
        );
    }
}

export default connect()(Data)