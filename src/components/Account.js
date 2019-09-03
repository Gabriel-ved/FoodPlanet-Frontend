import React from 'react';
import AccountClient from './Account/AccountClient.js';
import AccountStore from './Account/AccountStore.js';
import Nav from './Aplication/Nav.js';
import Footer from './Mainpage/Footer.js';

export default function Account(){
  const account = JSON.parse(localStorage.getItem('@FoodPlanet:user'))
  console.log(account)
  return(
    <div className="Main1">
        <Nav/>
        {account.cnpj === undefined ? <AccountClient/> :<AccountStore/>}
        <Footer/>
    </div>
  )
}
