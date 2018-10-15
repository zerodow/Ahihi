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
                            {data.sensors_data.map(row => {
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