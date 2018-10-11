import React, { Component } from 'react';
import { connect } from 'react-redux'

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <h1>History</h1>
        );
    }
}

export default connect()(History)