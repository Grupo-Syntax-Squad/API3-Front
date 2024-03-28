import React, { useState } from 'react';
import './menu.css';


function Menu(props) {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <nav className={`navbar custom-background ${isActive ? 'is-active' : ''}`} role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item ml-6 is-size-5" href="#">Empresa</a>
          <a role="button" className={`navbar-burger ${isActive ? 'is-active' : ''}`} onClick={toggleMenu} aria-label="menu" aria-expanded={isActive ? 'true' : 'false'}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`} id="navMenu">
          <div className="navbar-start is-right is-flex ml-auto">
            <a className="navbar-item mr-1 ml-1 is-size-5">
              Usuários
            </a>

            <a className="navbar-item mr-1 ml-1 is-size-5">
              Ativos
            </a>

            <a className="navbar-item mr-1 ml-1 is-size-5">
              Manutenções
            </a>

            <a className="navbar-item mr-1 ml-1 is-size-5">
              Dashboard
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <a className="navbar-item" href="#">Configurações</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Menu;
