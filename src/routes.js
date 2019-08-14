import React from 'react';
import Aplication from './components/Aplication.js';
import Main from './components/Main.js';
import Information from './components/Information.js';
import Contact from './components/Contact.js';
import StepRegistration from './components/StepRegistration.js'
import isAuthen from './auth';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/reduxStore';

const PrivateRoute = props =>(
       isAuthen() ? (
            <Route {...props}/>
        ):(
            <Redirect to={{pathname:'/',state:{from:props.location}}}/>
        )
)
const Routes =()=>(
    <BrowserRouter>
        <Switch>
            <Route exact path='/information' component={Information} />
            <Route exact path='/contact' component={Contact} />
            <Provider store={store}>
                <Route exact path='/' component={Main} />
                <Route exact path='/step' component={StepRegistration}/>
                <PrivateRoute path='/app/:page?' component={Aplication}/>
                <PrivateRoute path='/details/:id?' component={Aplication}/>
                <PrivateRoute path='/car' component={Aplication}/>
                <PrivateRoute path='/account' component={Aplication}/>
                <PrivateRoute path='/dashboard' component={Aplication}/>                
            </Provider>
        </Switch>
    </BrowserRouter>
)
export default Routes;
