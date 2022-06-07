import * as constants from './contants';

const initialState = {
    isLogin: false
}

export default function store(state = initialState, action) {
    const actions = action;

    switch (actions.type) {
        case constants.IS_LOGIN: {
            return {
                ...state,
                isLogin: action.payload
            }
        }

        default:
            return state;
    }
}