import React, { Component } from 'react';

export default class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        // this binding is necessary to make 'this' work in the callback
        this.handleClick = this.handleClick.bind(this);       
    }

    handleClick() {
        this.setState(function(prevState) {
            return {
                isToggleOn: !prevState.isToggleOn
            };
        });
    }

    render() {
        return (
            // In javascript, class methods are not bound by default
            // If you forget to bind this.handleClick and pass it to onClick
            // this will be undefined when the function is actually called
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}