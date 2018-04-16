import React, {Component} from 'react';
import MiniCalendar from '../MiniCalendar';
import moment from 'moment';

import {connect} from 'react-redux';
import {deleteTaskInfo, saveTaskInfo} from '../../AC';
import './style.css'

class Task extends Component {

    constructor(props) {
        super(props);
        this.state = this.setInitState();
    }

    setInitState() {
        if (this.props.tasks[this.props.match.params.id]) {
            return {
                alert: false,
                login: '',
                title: this.props.tasks[this.props.match.params.id].title || '',
                description: this.props.tasks[this.props.match.params.id].description || '',
                date: this.props.tasks[this.props.match.params.id].date || {},
                redirect: false
            }
        } else {
            return {
                alert: false,
                login: '',
                title: '',
                description: '',
                date: {},
                redirect: false
            }
        }
    }


    handleChange(inputTitle, e) {
        e.preventDefault();
        this.setState({
            [inputTitle]: e.target.value
        })
    }

    getDate(date) {
        this.setState({
            date
        });
    }

    handleTask(type, checkDone) {
        switch (type) {
            case 'save':
                if (this.state.date.from.toString().length > 6 && this.state.date.to.toString().length > 6 && this.state.title.length !== 0) {
                    this.props.dispatch(saveTaskInfo({
                        id: this.props.match.params.id,
                        title: this.state.title,
                        description: this.state.description,
                        date: {to:this.state.date.to, from:this.state.date.from},
                        done: checkDone || false
                    },this.props.login));
                    this.setState({
                        alert: true
                    });
                }
                return null;

            case 'delete':
                this.props.dispatch(deleteTaskInfo(this.props.match.params.id,this.props.login));
                return null;
            case 'check-done':
                return null;
            default:
                return null
        }

    }

    parseDate(date) {
        const from = date.from ? new Date(date.from) : null;
        const to = date.to ? new Date(date.to) : null;

        return {to, from}
    }

    back() {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className='task-form container p-3 '>
                {this.state.alert ? <div className='alert alert-success' role='alert'>
                    <h4 className='alert-heading'>Всі зміни збережено</h4>
                </div> : null}
                <form>
                    <div className='form-group'>
                        <input type='text' className='form-control' value={this.state.title}
                               onChange={this.handleChange.bind(this, 'title')} placeholder='Назва задачі'/>
                    </div>
                    <div className='form-group'>
                        <div>Дата выполнения</div>
                        <MiniCalendar date={this.parseDate(this.state.date)} getDate={this.getDate.bind(this)}/>
                    </div>
                    <div className='form-group'>
                        <label>Описание</label>
                        <textarea className='form-control' value={this.state.description}
                                  onChange={this.handleChange.bind(this, 'description')} rows='3'/>
                    </div>
                </form>
                <div className=' mb-3 mt-3'>
                    <div className='row justify-content-around'>
                        <button type='button' onClick={this.back.bind(this)}
                                className='btn btn-info'>Повернутись назад
                        </button>
                        <button type='button' onClick={this.handleTask.bind(this, 'save', true)}
                                className='btn btn-success'>Відзначити виконаним
                        </button>
                        <button type='button' onClick={this.handleTask.bind(this, 'delete')}
                                className='btn btn-danger'>Видалити
                        </button>
                        <button type='button' onClick={this.handleTask.bind(this, 'save', null)}
                                className='btn btn-warning'>Зберегти
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        tasks: state.data.tasks,
        login: state.data.login
    }
}, dispatch => ({
    dispatch
}))(Task)