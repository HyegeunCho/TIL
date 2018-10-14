import React, { Component } from 'react';
import PropType from 'prop-types';

class MyComponent extends Component {
    static defaultProps = {
        name: '기본 이름'
    };

    static propTypes = {
        name: PropType.string,
        age: PropType.number.isRequired
    };

    state = {
        number: 0
    };

    constructor(props) {
        super(props);
        // this.state = {
        //     number: 0
        // }
    }

    render() {
        return(
            <div>
                <p>안녕하세요. 내 이름은 {this.props.name} 입니다.</p>
                <p>저는 {this.props.age}살입니다.</p>
                <p>숫자: {this.state.number}</p>
                <button onClick={()=>this.setState({number: this.state.number + 1})}>더하기</button>
            </div>
        )
    }
}

// MyComponent.propTypes = {
//     name: PropType.string // name prop의 타입을 문자열로 지정합니다. 
// }
// MyComponent.defaultProps = {
//     name: '기본 이름'
// };
export default MyComponent;