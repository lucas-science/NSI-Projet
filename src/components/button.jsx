import React, { Component } from 'react';



export default class button extends Component {
    render(){
        return(
            <button className={this.props.className} onClick={this.props.onClick} value={this.props.value}>
                <p>{this.props.value}</p>
            </button>
        );
    }
}