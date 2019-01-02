/**
 * 액션을 만들때마다 객체를 생성하기 번거로우므로
 * 액션 생성 함수를 만든다.
 * () => ({})은 function() { return {}}과 동일한 의미
 */

import * as types from './ActionTypes';

export const create = (color) => ({
    type: types.CREATE, 
    color
});

export const remove = () => ({
    type: types.REMOVE
});

// 특정 카운터에 액션을 보낼 수 있도록 index 파라미터를 추가 

export const increment = (index) => ({
    type: types.INCREMENT, 
    index
});

export const decrement = (index) => ({
    type: types.DECREMENT, 
    index

});

// 다른 액션 생성자와 달리 파라미터를 갖고 있다.
export const setColor = ({index, color}) => ({
    type: types.SET_COLOR, 
    index,
    color
});
