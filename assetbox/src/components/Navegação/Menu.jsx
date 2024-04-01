import React, { useState } from 'react';
import AssetsIcon from '../../assets/img/Asset.svg'
import LogoIcon from '../../assets/img/AssetBoxLogo.svg'
import DashboardIcon from '../../assets/img/Graph.svg'
import MainteinIcon from '../../assets/img/Maintein.svg'
import SettingsIcon from '../../assets/img/Settings.svg'
import UserIcon from '../../assets/img/User.svg'
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
          <img src={LogoIcon} class=' navbar-item pl-6 pr-0' alt="AssetBox" />
          <a className="navbar-item mr-2 is-size-3 p-0 has-text-weight-bold" href="#">Empresa</a>
          <a role="button" className={`navbar-burger ${isActive ? 'is-active' : ''}`} onClick={toggleMenu} aria-label="menu" aria-expanded={isActive ? 'true' : 'false'}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`} id="navMenu">
          <div className="navbar-start is-left mr-1 is-flex ml-auto">

            <a className="navbar-item pr-6 pl-6 is-size-4 has-text-weight-bold">
            <img src={UserIcon} class='mr-3'alt="Usuários" />
              Usuários
            </a>

            <a className="navbar-item pr-6 pl-6 is-size-4 active has-text-weight-bold">
            <img src={AssetsIcon} class='mr-3' alt="Ativos" />
              Ativos
            </a>

            <a className="navbar-item pr-6 pl-6 is-size-4 has-text-weight-bold">
            <img src={MainteinIcon} class='mr-3' alt="Manutenções" />
              Manutenções
            </a>
            <a className="navbar-item pr-6 pl-6 is-size-4 has-text-weight-bold">
            <img src={DashboardIcon} class='mr-3' alt="Dashboard" />
              Dashboard
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <a className="navbar-item" href="#"><img src={SettingsIcon} alt="" /></a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Menu;
