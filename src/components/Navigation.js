import React from 'react';
import {NavLink} from "react-router-dom";
import ID from '../helper';

const Navigation = () => {
    return(
        <div className="container p-3 border border-info mb-3 mt-3">
            <div className="row justify-content-around">
                <NavLink className="btn btn-secondary btn-lg" activeClassName="active"
                         to="/calendar/all">Все</NavLink>
                <NavLink className="btn btn-warning btn-lg" activeClassName="active"
                         to="/calendar/in-work">В роботе</NavLink>
                <NavLink className="btn btn-success btn-lg" activeClassName="active"
                         to="/calendar/done">Выполненные</NavLink>
                <NavLink className="btn btn-info btn-lg" activeClassName="active"
                         to={`/task/${ID()}`}>Поставить задачу</NavLink>
            </div>
        </div>
    )
};

export default Navigation;