import React, {Component} from 'react';
import DayPicker, {DateUtils} from 'react-day-picker';

import 'react-day-picker/lib/style.css';
import "./style.css"


class MiniCalendar extends Component {

    state = {
        from: this.props.date.from ||undefined,
        to: this.props.date.to || undefined,
    };

    handleDayClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        range.to && range.from ? this.props.getDate(range): this.props.getDate({});
        this.setState(range);
    }

    handleResetClick() {
        this.setState({
            from: undefined,
            to: undefined,
        });
    }

    render() {
        const {from, to} = this.state;
        const modifiers = {start: from, end: to};
        return (
            <div className="RangeExample">
                <p>
                    {!from && !to && 'Please select the first day.'}
                    {from && !to && 'Please select the last day.'}
                    {from &&
                    to &&
                    `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
                    {from &&
                    to && (
                        <button className="btn" onClick={this.handleResetClick.bind(this)}>
                            Сброс
                        </button>
                    )}
                </p>
                <DayPicker
                    className="Selectable"
                    numberOfMonths={2}
                    selectedDays={[from, {from, to}]}
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick.bind(this)}
                />
            </div>
        );
    }
}

export default MiniCalendar;