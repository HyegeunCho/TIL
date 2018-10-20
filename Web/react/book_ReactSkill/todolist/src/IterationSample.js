import React, {Component} from 'react';

class IterationSample extends Component {

    state = {
        names: ['snowman', 'ice', 'snow', 'wind'],
        name: '',
    };

    handleChange = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    handleInsert = () => {
        // names 배열에 값을 추가하고 name 값을 초기화합니다.
        this.setState({
            names: this.state.names.concat(this.state.name),
            name: '',
        });
    }
    render() {
        const nameList = this.state.names.map(
            (name, index) => (<li key={index}>{name}</li>)
        );
        
        return (
            <div>
                <input onChange={this.handleChange} value={this.state.name}></input>
                <button onClick={this.handleInsert}>Add</button>
                <ul>
                    {nameList}
                </ul>
            </div>
            
        );
    }
}

export default IterationSample;