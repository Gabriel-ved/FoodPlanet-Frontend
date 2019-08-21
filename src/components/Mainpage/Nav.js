import React from 'react';
import {Link} from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <div>
        <header className="header">
        <Link to="/"><img id="img" src={require('./a.png')} alt=""/></Link>
          <nav>
            <ul className="menu">
              <li>
                <Link to="/information">Informações</Link>
              </li>
              <li>
                <Link to="/contact">Contato</Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}

export default Nav;