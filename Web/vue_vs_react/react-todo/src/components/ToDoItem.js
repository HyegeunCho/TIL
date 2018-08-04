import React, {Component} from 'react';
import './ToDoItem.css';

class ToDoItem extends Component {
    render() {
        return (
            <div className="ToDoItem">
                <p className="ToDoItem-Text">{this.props.item}</p>
                <div className="ToDoItem-Delete" onClick={this.props.deleteItem}>-</div>
            </div>
        )
    }
}

export default ToDoItem;