import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// 페이지 템플릿을 위한 컴포넌트
// 페이지의 틀, 그리고 타이틀/컨텐츠 등 속성이 설정

const PageTemplate = ({children}) => {
    return(
        <div className={cx('page-template')}>
            <h1>일정 관리</h1>
            <div className={cx('context')}>
                {children}
            </div>
        </div>
    );
};

export default PageTemplate;