// 성능 최적화를 위해  shouldComponentUpdate 라이프 사이클 메서드를 사용하기 위해 class 로 구현 

import React, {Component} from 'react';
import styles from './TodoItem.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class TodoItem extends Component {

    render() {
        // 비구조화 할당을 통해 this.props 안에 있는 각 객체들의 레퍼런스 생성 
        const {done, children, onToggle, onRemove} = this.props;
        return (
            <div className={cx('todo-item')} onClick={onToggle}>
                <input className={cx('tick')} type='checkbox' checked={done} readOnly/>
                <div className={cx('text', {done})}>{children}</div>
                <div className={cx('delete')} onClick={(e) => {
                    onRemove();
                    e.stopPropagation();
                }}>[지우기]</div>
            </div>
        );
    }
}

export default TodoItem;