import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {ConnectedRouter} from 'react-router-redux';
import history from '../history';

import Task from "./TaskForm";
import Login from "./Login/index";
import Calendar from "./Calendar/index";
import NotFound from "./routes/NotFound";
import {connect} from "react-redux";
import {loginUserTask} from "../AC";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        const login = localStorage.getItem('username');
        if (login) {
            if (Object.keys(rest.that.props.tasks || {}).length === 0) {
                console.log('login req');
                rest.that.props.dispatch(loginUserTask({login, type: 'registration'}))
            }
            return <Component {...props} />
        } else {
            return <Redirect
                to="/login"
            />
        }
    }
    }
    />
);

class Auth extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ConnectedRouter history={history}>
                <Switch>
                    <PrivateRoute path="/" component={Calendar} that={this} exact/>
                    <Route path="/login" component={Login} exact/>
                    <PrivateRoute path="/calendar/:typeFilter" component={Calendar} that={this} exact/>
                    <PrivateRoute path="/task/:id" component={Task} that={this} exact/>
                    <Route path="*" component={NotFound} exact/>
                </Switch>
            </ConnectedRouter>
        )
    }
}


export default connect((state) => {
    return {
        tasks: state.data.tasks,
    }
}, dispatch => ({
    dispatch
}))(Auth)