import * as contants from './contants';

export const setIsLogin = isLogin => ({
    type: contants.IS_LOGIN,
    payload: isLogin
})