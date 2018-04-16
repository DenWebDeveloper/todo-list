import {DELETE_TASK_INFO, LOGIN_USER_TASK, SAVE_TASK_INFO} from '../constants/constants';
import {push} from 'react-router-redux';
import axios from 'axios';

export function loginUserTask(data) {
    return dispatch => {
        axios.post(`http://localhost:1234/auth`, data)
            .then(res => {
                localStorage.setItem('username', res.data.login);
                dispatch(push('/'));
                return dispatch({
                type: LOGIN_USER_TASK,
                data:res.data.tasks
            })})
    }
}

export function saveTaskInfo(taskInfo,login) {
    return dispatch => {
        dispatch(push('/'));
        axios.put(`http://localhost:1234/task/`,{login,data:taskInfo})
            .then(() => {
                return dispatch({
                    type: SAVE_TASK_INFO,
                    taskInfo
                })})
    }
}

export function deleteTaskInfo(id,login) {
    console.log(login);
    return dispatch => {
        axios.delete(`http://localhost:1234/task/`,{data:{id,login}})
            .then(() => {
                dispatch(push('/'));
                return dispatch({
                    type: DELETE_TASK_INFO,
                    id
                })})
    }
}
