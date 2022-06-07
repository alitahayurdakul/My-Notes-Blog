import * as actionTypes from './actionTypes'

export const setIsLogin = isLogin => ({
    type:actionTypes.IS_LOGIN,
    payload:isLogin
})