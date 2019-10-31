import * as types from './../constants/ActionTypes';

var data = JSON.parse(localStorage.getItem('tasks'));

var inittialState = data ? data : '';

var myReducer = (state = inittialState, action) => {
    switch (action.types) {
        case types.LIST_ALL:
            return state;
        default:
            return state;
    }
    return state;
}

export default myReducer;