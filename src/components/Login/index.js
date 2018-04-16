import React, {Component} from 'react'
import Form from '../Form/index'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

class Login extends Component {
    state = {
        redirectToReferrer: localStorage.getItem('login')
    };

    render() {

        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return <Form/>
    }
}

export default connect(null, dispatch => ({
    dispatch
}))(Login)