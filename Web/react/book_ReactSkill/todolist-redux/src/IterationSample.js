import React, {Component} from 'react';

class IterationSample extends Component {

    state = {
        names: ['snowman', 'ice', 'snow', 'wind'],
        name: '',
    };

    handleRemove = (index) => {
        // 편의상  name의 레퍼런스를 미리 만든다.
        const {names} = this.state;

        // 배열을 자르는 내장함수 slice와 전개 연산자(...)을 사용하여 index번째 값을 제외한 값들을 배열에 넣는다.
        this.setState({
            //names: [...names.slice(0, index), ...names.slice(index + 1, names.length)]
            names: names.filter((item, i) => i != index)
        });
    }

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
            (name, index) => (
                <li 
                    key={index}
                    onDoubleClick={() => this.handleRemove(index)}>
                    {name}
                </li>)
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