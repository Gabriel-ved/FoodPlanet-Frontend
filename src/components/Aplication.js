import React from 'react';
import Nav from './Mainpage/Nav.js';
import ListStores from './Aplication/ListStores'
import Footer from './Mainpage/Footer';
import './Mainpage/caraio.css'

class Aplication extends React.Component {
render(){
    return (
    <div className="Main">
        <Nav/>
        <div className="main">
          <ListStores {...this.props}/>
        </div>
        <Footer/>
    </div>
  );
  }
}

export default Aplication;
