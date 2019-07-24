import React from 'react';
import Aplication from './components/Aplication.js';
import Main from './components/Main.js';
import isAuthen from './auth';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';



const PrivateRoute = ({component: Component, ...rest}) =>(
    <Route {...rest} render={props =>

       isAuthen() ? (
            <Component {...props}/>
        ):(
            <Redirect to={{pathname:'/',state:{from:props.location}}}/>
        )
    }/>
)
const Routes =()=>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <PrivateRoute exact path="/app" component={Aplication}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;
