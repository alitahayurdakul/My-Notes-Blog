import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLogin: false
}

const currencyListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.IS_LOGIN: {
            return {
                ...state,
                isLogin: action.payload
            }
        }
        default:
            return state;
    }
}

export default currencyListReducer;