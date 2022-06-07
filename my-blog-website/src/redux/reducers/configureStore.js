import { createStore } from 'redux';
import reducers from './index';
import thunk from "redux-thunk";
import { applyMiddleware } from 'redux';

export default function configureStore(){
    return createStore(reducers,applyMiddleware(thunk))
}