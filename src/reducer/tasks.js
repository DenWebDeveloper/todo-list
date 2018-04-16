import {LOGIN_USER_TASK,SAVE_TASK_INFO,DELETE_TASK_INFO} from '../constants/constants';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER_TASK:
            localStorage.setItem('login',action.data.login);
            return Object.assign({},{
                tasks: action.data.tasks,
                login: action.data.login
            });

        case SAVE_TASK_INFO:
            const {id,title,description,date,done} = action.taskInfo;
            state.tasks[id] = {title,description,date,done};

            return  [{},...state];
        case DELETE_TASK_INFO:
            delete state.tasks[action.id];
            return [{},...state];


        default:
            return state;
    }
};




