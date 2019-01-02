import {Map} from 'immutable';
import {handleActions, createAction} from 'redux-actions';

const SET_INPUT = 'input/SET_INPUT';

// 액션타입을 정의한 후, createAction을 사용하여 액션 생성 함수를 만든다.
export const setInput = createAction(SET_INPUT);

const initialState = Map({
    value: ''
});

// 리듀서는 handleActions를 사용하여 만든다.
export default handleActions({
    [SET_INPUT]: (state, action) => {
        return state.set('value', action.payload)
    }
}, initialState);