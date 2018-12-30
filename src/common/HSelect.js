import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default class HSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value
        }
    }

    render() {
        let datas = this.props.datas != null ? this.props.datas : [];
        return (
            <div>
                <Select
                    style={this.props.style}
                    value={this.state.value}
                    onChange={(e) => this.setState({ value: e.target.value })}
                >
                    {datas.map((value, key) => {
                        return (
                            <MenuItem key={key} value={value[0]}>{value[1]}</MenuItem>
                        )
                    }
                    )}
                </Select>

            </div>

        )
    }
}