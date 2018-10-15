import React, { Component } from 'react';
import { connect } from 'react-redux'
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

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FormGroup style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <h1>User</h1>
                </FormGroup>
                <FormGroup style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Paper style={{ width: '60%', }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Permission</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ justifyContent: 'center', alignItems: 'center' }}>
                                {data.sensors_data.map(row => {
                                    return (
                                        <TableRow>
                                            <TableCell>1</TableCell>
                                            <TableCell>2</TableCell>
                                            <TableCell>3</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>

                </FormGroup>
            </div>
        );
    }
}

export default connect()(User)