import React from 'react';
import Aplication from './components/Aplication.js';
import Main from './components/Main.js';
import Information from './components/Information.js';
import Contact from './components/Contact.js';
import StepRegistration from './components/StepRegistration.js';
import Details from './components/Details';
import isAuthen from './auth';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/reduxStore';
import Account from './components/Account';

const PrivateRoute = props =>(
       isAuthen() ? (
            <Route {...props}/>
        ):(
            <Redirect to={{pathname:'/',state:{from:props.location}}}/>
        )
)

//TODO: information done!
//TODO: contact done!
//TODO: main done!
//TODO: step done!
//TODO: app 90%
//TODO: details 100%
//TODO: car 70%
//TODO: account 100%
//TODO: dashboard 90%


const Routes =()=>(
    <BrowserRouter>
        <Switch>
            <Route exact path='/information' component={Information}/>
            <Route exact path='/contact' component={Contact} />
            <Provider store={store}>
                <Route exact path='/' component={Main} />
                <Route exact path='/step' component={StepRegistration}/>
                <PrivateRoute path='/app/:page?' component={Aplication}/>
                <PrivateRoute path='/details/:id?' component={Details}/>
                <PrivateRoute path='/car' component={Aplication}/>
                <PrivateRoute path='/account' component={Account}/>
                <PrivateRoute path='/dashboard' component={Aplication}/>
            </Provider>
        </Switch>
    </BrowserRouter>
)
export default Routes;
