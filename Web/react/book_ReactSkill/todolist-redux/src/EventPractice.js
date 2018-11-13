import React, { Component } from 'react';

class EventPractice extends Component {

    state = {
        message: ''
    };

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    render() {
        return(
            <div>
                <h1>이벤트 연습</h1>
                <input
                    type='text'
                    name='username'
                    placeholder='유저명'
                    value={this.state.username}
                    onChange={this.handleChange}/>
                <input 
                    type='text' 
                    name='message' 
                    placeholder='anything..'
                    value={this.state.message}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                />
                <button onClick={this.handleClick}>확인</button>
            </div>
        )
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClick(e) {
        alert(`${this.state.username}:${this.state.message}`);
        this.setState({
            username: '', 
            message: ''
        });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleClick();
        }
    }
}

export default EventPractice;