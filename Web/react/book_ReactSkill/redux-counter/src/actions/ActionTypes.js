/**
 * Action 종류를 선언합니다.
 * 앞에 export를 붙이면 나중에 이것들을 사용할 때, 
 * import * as types from './ActionTypes'로 불러올 수 있다.
 * 액션을 선언할 때는 이처럼 대문자로 선언하면 된다.
 */



export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const SET_COLOR = 'SET_COLOR';

export const CREATE = 'CREATE';
export const REMOVE = 'REMOVE';