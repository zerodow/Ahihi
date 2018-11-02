import React, { Component } from 'react';
import Input from '@material-ui/core/Input';

export default class HTextInput extends Component {
    constructor(props){
        super(props)
        this.state ={
            value : this.props.value
        }
    }

    render(){
        return(
            <div>
                <Input
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    required={this.props.required}
                    style={this.props.style}
                    onChange={(e) => this.setState({value: e.target.value})}
                ></Input>

            </div>

        )
    }
}