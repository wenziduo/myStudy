import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import myReducers from './containers/reducers.js';
import './index.css';
import Layout from './component/layout/Layout';
import registerServiceWorker from './registerServiceWorker'
let store = createStore(myReducers);

const BasicExample = () => (
    <Router>
        <div style={{"width":"100%","height":"100%"}}>
            <Route path="/" component={Layout}/>
        </div>
    </Router>
);

ReactDOM.render(<Provider store={store}><BasicExample /></Provider>, document.getElementById('root'));
registerServiceWorker();
