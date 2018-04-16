import {createStore, applyMiddleware} from 'redux'
import reducer from '../reducer'
import thunk from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import history from '../history'
import { composeWithDevTools } from 'redux-devtools-extension';


const enhancer = applyMiddleware(thunk, routerMiddleware(history));

const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),enhancer,{},composeWithDevTools(applyMiddleware(thunk)));

//dev only
window.store = store;

export default store