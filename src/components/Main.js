import React from 'react';
import Login from './Mainpage/Login';
import Jumpbox from './Mainpage/Jumpbox';
import Footer from './Mainpage/Footer';
import Nav from './Mainpage/Nav.js';
import './Mainpage/caraio.css';

class Main extends React.Component {
render(){
    return (
    <div className="Main">
        <Nav/>
        <div className="main">
          <Jumpbox/>
          <Login/>
        </div>
        <Footer/>
    </div>
  );
  }
}

export default Main;
