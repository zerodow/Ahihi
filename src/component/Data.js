import React, { Component } from 'react';
import { connect } from 'react-redux'

class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
           <h1>Data</h1>
        );
    }
}

export default connect()(Data)