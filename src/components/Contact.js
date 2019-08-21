import React from 'react';
import Footer from './Mainpage/Footer';
import Nav from './Mainpage/Nav.js';

export default function Contact(){
    return(
        <div className="Contact">
            <header>
                <Nav/>
            </header>
            <section style={container}>
                <div style={container2} >
                    <h2 style={{fontWeight:'bold',marginBottom: 14}}>Contato</h2>
                    <img style={{height: 200,borderRadius:100,border: '5px solid #fff'}} src={require('./Information/Gituhb-perfil.jfif')} alt="imagem de perfil github"/>
                    <p style={{color: '#FFF',fontSize: 18}}>Esse projeto foi feito apenas para aprender</p>
                    <p style={{color: '#FFF',fontSize: 18}}>Gabriel <a style={{color:'#0BA7F4',fontSize:18}} href="https://github.com/Gabriel-ved">Github</a></p>
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