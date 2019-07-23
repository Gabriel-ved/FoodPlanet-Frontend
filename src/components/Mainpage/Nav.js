import React from 'react';
import './caraio.css';

class Nav extends React.Component {
  render() {
    return (
      <div>
        <header className="header">
        <a href="google.com"><img id="img" src={require('./a.png')} alt=""/></a>
          <nav>
            <ul className="menu">
              <li>
                <a href="google.com">Informações</a>
              </li>
              <li>
                <a href="google.com">Contato</a>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}

export default Nav;