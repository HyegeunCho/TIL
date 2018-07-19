import React, {Component} from 'react';

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => <li>{number}</li>);

function ListItem(props) {
    const value = props.value;
    return (
        <li>{value}</li>
    );
}

export default class NumberList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numbers: props.numbers, 
            listItems: props.numbers.map((number) => 
                <ListItem value={number} key={number.toString()} />
            )
        };
    }

    render() {
        return <ul>{this.state.listItems}</ul>;
    }
}