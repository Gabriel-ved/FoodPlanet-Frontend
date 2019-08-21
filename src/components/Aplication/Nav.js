import React from 'react';
import {Link} from 'react-router-dom';


export default function Nav(){
    const account = JSON.parse(localStorage.getItem('@FoodPlanet:user'))
    async function Sair(){
      await window.localStorage.removeItem('@FoodPlanet:token');
      await window.localStorage.removeItem('@FoodPlanet:user');
    }
    return(
        <div>
        <header className="header1">
          <Link to="/app/">
            <img id="img" src={require('./a.png')} alt=""/>
          </Link>
          <nav>
            <ul className="menu">
              <li>
                <a href="/information">Lojas</a>
              </li>
              <li>
                <a href="/contact">Produtos</a>
              </li>
              <li>
                <div className="btn-group">
                    <button type="button" className="account" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img className='imgAccount' src={account ? account.url : require('./imagens/default.png')} alt='imagem da conta'/>
                    </button>
                    <div className="dropdown-menu">
                        <Link to="/account">Conta</Link>
                        <div className="dropdown-divider"></div>
                        <a onClick={Sair} className="dropdown-item" href="/">Sair</a>
                    </div>
                </div>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    )
}