import { createSelector } from 'reselect';

const domain = state => state;

export const selectIsLogin = () =>createSelector(
    domain,
    substate => substate.isLogin
);