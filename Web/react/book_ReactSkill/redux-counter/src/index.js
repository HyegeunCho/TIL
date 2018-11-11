/**
 * 스토어는 리덕스에서 가장 핵심적인 인스턴스
 * 스토어 안에 현재 상태가 내장되어 있고, 상태를 업데이트할 때마다 구독 중인 함수들을 호출
 * 리액트에서 스토어를 생성할 때는 보통 프로젝트의 엔트리 포인트인 src/index.js 파일에서 생성
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import './index.css';

// 리덕스 관련 불러오기
import {createStore} from 'redux';
import reducers from './reducers';

/**
 * Provider는 react-redux 라이브러리에 내장된 리액트 애플리케이션에 손쉽게 스토어를 연동할 수 있도록 도와주는 컴포넌트
 */
import {Provider} from 'react-redux';

// 스토어 생성
const store = createStore(reducers, window.devToolsExtension && window.devToolsExtension());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
