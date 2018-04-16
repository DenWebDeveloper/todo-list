import React, {Component} from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import './style.css';
import './bootstrap.css';
import moment from 'moment';
import Navigation from "../Navigation";
import {connect} from "react-redux";

BigCalendar.momentLocalizer(moment);

class Calendar extends Component {

    state = {
        filterType: 'all',
        eventsCalendar: null
    };

    getEvents(type) {
        const tasks = this.props.tasks;
        const events = [];

        for (let key in tasks) {
            if (tasks.hasOwnProperty(key)) {
                events.push({
                    id: key,
                    title: tasks[key].title,
                    allDay: true,
                    start: new Date(tasks[key].date.from),
                    end: new Date(tasks[key].date.to),
                    done: tasks[key].done || false
                });
            }
        }
        if (type === 'init') {
            return events
        }

        this.setState({
            eventsCalendar: events
        });

    }

    Event({event}) {
        const typeFilter = this.props.match.params.typeFilter || this.state.filterType;
        if (typeFilter === 'done' && event.done === true) {
            return (
                <div className="my-event progress-bar bg-success">
                    <strong>{event.title}</strong>
                </div>
            )
        } else if (typeFilter === 'in-work' && !moment(event.end).isBefore(new Date()) && event.done !== true) {
            return (
                <div className='my-event progress-bar bg-warning'>
                    <strong>{event.title}</strong>
                </div>
            )
        } else if (typeFilter === 'all' && event.done === true) {
            return (
                <div className=" my-event done-ccc">
                    <strong>{event.title}</strong>
                </div>
            )
        } else if (typeFilter === 'all' && moment(event.end).isBefore(new Date()) && event.done !== true) {
            return (
                <div className=" my-event red">
                    <strong>{event.title}</strong>
                </div>
            )
        } else if (typeFilter === 'all' && event.done === true) {
            return (
                <div className='my-event progress-bar bg-success'>
                    <strong>{event.title}</strong>
                </div>
            )
        } else if (typeFilter === 'all') {
            return (
                <div className='my-event'>
                    <strong>{event.title}</strong>
                </div>
            )
        } else {
            return null
        }
    }

    clickTask(e) {
        this.props.history.replace(`/task/${e.id}`)
    }



    componentWillMount() {
        console.log(this.getEvents('init'));
    }

    render() {
        return (
            <div>
                <Navigation/>
                    <BigCalendar
                        popup
                        events={this.getEvents('init')}
                        defaultView="month"
                        showMultiDayTime
                        defaultDate={new Date()}
                        onSelectEvent={this.clickTask.bind(this)}
                        components={{
                            event: this.Event.bind(this)
                        }}

                    />
            </div>
        )
    }
}

export default connect(state => {
    return {tasks: state.data.tasks}
}, null)(Calendar)