import React from 'react';
import {useSelector} from 'react-redux';


export default function Nav(){
    const account = useSelector(state=>state.account)
    return(
        <div>
        <header className="header1">
        <a href="/"><img id="img" src={require('./a.png')} alt=""/></a>
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
                        <a className="dropdown-item" href=".">Conta</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href=".">Sair</a>
                    </div>
                </div>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    )
}