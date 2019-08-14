import React from 'react';
import Nav from './Aplication/Nav.js';
import ListStores from './Aplication/ListStores';
import Footer from './Mainpage/Footer';
import Car from './Aplication/Car';
import './Aplication/style.css';

class Aplication extends React.Component {
render(){
    return (
    <div className="Main1">
        <Nav/>
        <div className="main2">
          <ListStores {...this.props}/>
          <Car/>
        </div>
        <Footer/>
    </div>
  );
  }
}

export default Aplication;
