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
import Chart from '../component/Chart'
import '../component/data.css'
import { getAllSensor, getData } from '../api'
import { GET_SENSER_BY_FARM_ID, GET_SENSER_BY_DEVICE_ID, PH_SENSOR, TEMP_SENSOR, TDS_SENSOR, HUMI_SENSOR, GET_ABOVE } from '../api/const';
import FormSearch from '../component/FormSearch';

class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            device_id: '',
            farm_id: '',
            isLoading: true,
            isLoadMore: false
        }
    }

    //lấy dữ liệu
    getAll() {
        getAllSensor('get-sensers', this.state.page,
            (res) => {
                console.log(res)
                this.setState({ data: res, isLoading: false })
            },
            (error) => console.log(error)
        )
    }

    //xử lý dữ liệu trả về danh sách mong muốn
    handleData(res) {
        let arr = res.map(item => {
            let time = new Date(parseFloat(item.createDate))
            let newTime = `${time.getHours()}:${time.getUTCMinutes() < 10 ? "0" + time.getUTCMinutes() : time.getUTCMinutes()}  ${time.getDate()}/${time.getUTCMonth() + 1}/${time.getFullYear()}`
            let name = item.sensor_name
            let newName = name.slice(0, name.toString().length - 2)
            return {
                ...item,
                createDate: newTime,
                sensor_name: newName
            }
        })

        return arr
    }

    /**
     * Hàm này sẽ chạy sau khi render giao diện lần đầu tiên 
     */
    componentWillMount() {
        this.getAll()
    }

    //search 
    getData(type, value) {
        getData(type, value, 1,
            (res) => {
                if (res) {
                    this.setState({
                        data: res,
                        page: 1
                    })
                }
            },
            (error) => {
                alert('No invalid data')
                console.log('error')
            })
    }

    //xử lý load more
    loadMore() {
        this.setState({ isLoadMore: true })
        const { device_id, farm_id } = this.state
        if (device_id == '' && farm_id == '') {
            getAllSensor('get-sensers', this.state.page + 1,
                (res) => {
                    this.setState({ data: this.state.data.concat(res), isLoading: false, page: this.state.page + 1, isLoadMore: false },()=>console.log(this.state.data))
                },
                (error) => this.setState({ isLoadMore: false })
            )
        } else if (device_id !== '' && device_id) {
            getData(GET_SENSER_BY_DEVICE_ID, device_id, this.state.page + 1,
                (res) => {
                    this.setState({ data: this.state.data.concat(res), isLoading: false, page: this.state.page + 1, isLoadMore: false },()=>console.log(this.state.data))
                },
                (error) => this.setState({ isLoadMore: false })
            )
        } else {
            getData(GET_SENSER_BY_FARM_ID, farm_id, this.state.page + 1,
                (res) => {
                    this.setState({ data: this.state.data.concat(res), isLoading: false, page: this.state.page + 1, isLoadMore: false },()=>console.log(this.state.data))
                },
                (error) => this.setState({ isLoadMore: false })
            )
        }
    }

    //xử lý tên
    handleName(name) {
        return name.slice(0, name.toString().length - 2)
    }

    //xử lý time
    handleTime(time) {
        let newTime = new Date(parseFloat(time))

        return `${newTime.getHours()}:${newTime.getUTCMinutes() < 10 ? "0" + newTime.getUTCMinutes() : newTime.getUTCMinutes()}  ${newTime.getDate()}/${newTime.getUTCMonth() + 1}/${newTime.getFullYear()}`
    }

    //render table
    renderData() {
        return (
            <Grid style={{ padding: 5, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Paper >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Farm id</TableCell>
                                <TableCell>Device id</TableCell>
                                <TableCell>Time</TableCell>
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
                                        <TableCell>{this.handleTime(row.createDate)}</TableCell>
                                        <TableCell>{this.handleName(row.sensor_name)}</TableCell>
                                        <TableCell>{Math.floor(row.sensor_value * 10) / 10}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                {this.state.data.length !== 0
                    ? (this.state.isLoadMore
                        ? <Grid
                            container
                            style={{ marginTop: 5 }}
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <CircularProgress size={20} />
                        </Grid>
                        : <Grid
                            container
                            style={{ marginTop: 5 }}
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Button
                                variant="contained"
                                className='button'
                                style={{ backgroundColor: 'white', color: 'green', width: '20%' }}
                                onClick={() => this.loadMore()}
                            >
                                Load more
                </Button>
                        </Grid >)
                    : <Grid
                        container
                        style={{ marginTop: 5 }}
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <h3 style={{ color: 'black' }}>
                            Data invalid
                </h3>
                    </Grid>
                }
            </Grid>
        )
    }

    //xử lý button clear
    clear() {
        this.setState({
            page: 1,
            device_id: '',
            farm_id: '',
            isLoading: true,
        })
        this.getAll()
    }

    //render khung hiển thị dữ liệu
    renderTable() {
        return (
            <Grid style={{ justifyContent: 'center' }}>
                <FormSearch
                    //xử lý nút search
                    onValueSearch={(type, value) => this.getData(type, value)}
                    //xử lý nút clear
                    onClear={() => this.clear()}
                />
                {this.state.isLoading
                    ? <Grid
                        container
                        style={{ marginTop: 5 }}
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <CircularProgress size={20} />
                    </Grid>
                    : this.renderData()
                }
            </Grid>
        )
    }

    //render chart
    renderChart() {
        if (this.state.data && this.state.data.length !== 0) {
            return (
                <Grid
                    style={{ flex: 1 }}
                    alignItems='center'
                    direction='column'>
                    <Chart data={this.state.data} type={PH_SENSOR} />
                    <Grid
                        container
                        style={{ marginTop: 5 }}
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <h3 style={{ color: 'black' }}>
                            Ph Chart
                </h3>
                    </Grid>
                    <Chart data={this.state.data} type={TEMP_SENSOR} />
                    <Grid
                        container
                        style={{ marginTop: 5 }}
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <h3 style={{ color: 'black' }}>
                            Temp Chart
                </h3>
                    </Grid>
                    <Chart data={this.state.data} type={TDS_SENSOR} />
                    <Grid
                        container
                        style={{ marginTop: 5 }}
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <h3 style={{ color: 'black' }}>
                            TDS Chart
                </h3>
                    </Grid>
                    <Chart data={this.state.data} type={HUMI_SENSOR} />
                    <Grid
                        container
                        style={{ marginTop: 5 }}
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <h3 style={{ color: 'black' }}>
                            Humi Chart
                </h3>
                    </Grid>
                </Grid>
            )
        } else {
            return null
        }
    }

    //render chính
    render() {
        return (
            <FormGroup style={styles.container} row>
                <Grid style={{ flex: 2, }}>
                    {this.renderTable()}
                </Grid>
                <Grid style={{ flex: 1, paddingLeft: 10, paddingTop: 50 }}>
                    {this.renderChart()}
                </Grid>
            </FormGroup>
        );
    }
}

//css
const styles = {
    container: {
        width: window.innerWidth,
        backgroundColor: 'white'
    }
}

export default connect()(Data)

