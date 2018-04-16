import {combineReducers} from 'redux'
import tasks from './tasks'
import {routerReducer } from 'react-router-redux'

export default combineReducers(
    {
        data: tasks,
        routing: routerReducer,
    }
);