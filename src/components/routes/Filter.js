import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import List from '../List';

class Filters extends Component {

    render() {
        return (
            <div>
                <Route path='/filters/:type' render={List} exact/>
            </div>
        )
    }
}

export default Filters;