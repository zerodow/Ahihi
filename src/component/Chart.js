import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PH_SENSOR, TDS_SENSOR, TEMP_SENSOR, HUMI_SENSOR } from '../api/const';
const LineChart = require("react-chartjs").Line;

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataChart: [],
            isLoadChart: true
        };
    }

    convert(data) {
        return `${new Date(parseFloat(data)).getDate()}/${new Date(parseFloat(data)).getMonth()+1}`
    }

    componentDidMount() {
        const { type, data } = this.props

        let arr = data.filter(item => item.sensor_name == type)

        let result = arr.map(item => item.sensor_value)

        let resultTime = arr.map(item => this.convert(item.createDate))
        console.log(resultTime)

        // let time = arr[0].createDate

        // let ahihi = new Date(parseFloat(time))
        // console.log('date', ahihi)
        var chart = {
            labels: resultTime,
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: result
                },
            ]
        };

        this.setState({ dataChart: chart, isLoadChart: false })
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps)
        if (nextProps && nextProps.type && nextProps.data) {
            const { type, data } = nextProps

            let arr = data.filter(item => item.sensor_name == type)

            let result = arr.map(item => item.sensor_value)

            let resultTime = arr.map(item => this.convert(item.createDate))

            // let time = arr[0].createDate

            // let ahihi = new Date(parseFloat(time))
            // console.log('date', ahihi)
            var chart = {
                labels: resultTime,
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: result
                    },
                ]
            };

            this.setState({ dataChart: chart, isLoadChart: false })
        }

    }

    render() {
        if (this.state.isLoadChart) {
            return (
                <CircularProgress />
            )
        } else {
            return (
                <LineChart data={this.state.dataChart} width={window.innerWidth / 3 - 40} height="250" />
            );
        }

    }
}
