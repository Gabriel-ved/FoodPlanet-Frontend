import React from 'react';
import './caraio.css';

class Nav extends React.Component {
  render() {
    return (
      <div>
        <header className="header">
        <a href="/"><img id="img" src={require('./a.png')} alt=""/></a>
          <nav>
            <ul className="menu">
              <li>
                <a href="/information">Informações</a>
              </li>
              <li>
                <a href="/contact">Contato</a>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}

export default Nav;