import React from 'react';
import Footer from './Mainpage/Footer';
import Nav from './Mainpage/Nav.js';

export default function Information(){
    return(
        <div className="Information">
            <Nav/>
            <section style={container}>
                <div style={container2} >
                    <h2 style={{fontWeight:'bold'}}>Informações</h2>
                    <p style={{color: '#FFF',fontSize: 18}}>A Foodplanet e uma marca ficticia que simula uma plataforma de venda e compra de produtos.</p>
                    <p style={{color: '#FFF',fontSize: 18}}>Feito por Gabriel <a style={{color:'#0BA7F4',fontSize:18}} href="https://github.com/Gabriel-ved">Github</a></p>
                    <h4>Ultilizando as tecnologias: </h4>
                    <div>
                        <ul  style={lista}>
                            <li>
                                <a style={{color:'#0BA7F4',fontSize:18}} href="https://github.com/facebook/react">
                                    <img
                                    style={{height:40}}
                                    src={require("./Information/React-icon.png")}
                                    alt="react icon"/>
                                    <br/>
                                    Reactjs
                                </a>
                            </li>
                            <li>
                                <a style={{color:'#0BA7F4',fontSize:18}} href="https://github.com/axios/axios">
                                    <img style={{height:40}}
                                    src={require("./Information/Axios.png")}
                                    alt="axios icon"/>
                                    <br/>
                                    Axios
                                </a>
                            </li>
                            <li>
                                <a style={{color:'#0BA7F4',fontSize:18}} href="https://github.com/react-dropzone/react-dropzone">
                                    <img 
                                    style={{height:40}} 
                                    src={require("./Information/Dropzone.png")} 
                                    alt="dropzone icon"/>
                                    <br/>
                                    React dropzone
                                </a>
                            </li>
                            
                            <li>
                                <a style={{color:'#0BA7F4',fontSize:18}} href="https://github.com/ReactTraining/react-router">
                                    <img
                                    style={{height:40}}
                                    src={require("./Information/Router.png")}
                                    alt="router icon"/>
                                    <br/>
                                    React router dom
                                </a>
                            </li>
                        </ul>   
                    </div>
                    
                </div>
            </section>
            <Footer/>
        </div>
    )
}

const container={
    display: 'flex',
    height:600,
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    
    
}
const container2={
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#fff',
    backgroundColor: 'rgb(66,66,66,0.5)',
    borderRadius: 30,
    width: 700,
    height: 400,
    textAlign: 'center',
    padding: 50
}
const lista={
    fontSize:14,
    height: 80,
    width: 500,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
}