import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUserTask} from '../../AC/index';

class Form extends Component {

    state = {
        login: '',
        type: 'registration'
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log("login");
        this.props.dispatch(loginUserTask({login: this.state.login, type: this.state.type}));
    }

    handleChange(name, e) {
        e.preventDefault();
        this.setState({
            [name]: e.target.value
        })
    }

    render() {
        return (
            <div className='container pt-5'>
                <div className='row justify-content-center aling-items-center'>
                    <div className='col-md-6'>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className='form-group'>
                                <input type='text' className='form-control' name='login' value={this.state.login}
                                       onChange={this.handleChange.bind(this, 'login')} placeholder='Ваш логін'/>
                            </div>
                            <div className='input-group mb-3'>
                                <div className='input-group-prepend'>
                                    <label className='input-group-text'>Створити чи Увійти</label>
                                </div>
                                <select value={this.state.type} className='custom-select'
                                        onChange={this.handleChange.bind(this, 'type')} name='type'>
                                    <option value='registration'>Увійти</option>
                                    <option value='create'>Створити</option>
                                </select>
                            </div>
                            <div className='form-group'>
                                <input className='btn btn-success' type='submit' value='Відправити'/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(null, dispatch => ({
    dispatch
}))(Form)