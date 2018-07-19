import React, {Component} from 'react';

function FormattedDate(props) {
    return (
        <h2>It is {props.date.toLocaleTimeString()}.</h2>
    );
}

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    // lifecycle hooks
    componentDidMount() {
        this.timerID = setInterval(()=>this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <FormattedDate date={this.state.date}/>
            </div>
        )
    }
}

