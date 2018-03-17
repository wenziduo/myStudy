import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import Address from '../address/Address';

class Layout extends Component{
    render(){
        return(
            <div id="content">
                <Route path='/address' component={Address}/>
            </div>
        )
    }
}

export default Layout