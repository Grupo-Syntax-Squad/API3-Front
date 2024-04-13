import React, { useState } from 'react';
import AssetsIcon from '../../assets/img/Asset.svg'
import LogoIcon from '../../assets/img/AssetBoxLogo.svg'
import DashboardIcon from '../../assets/img/Graph.svg'
import MainteinIcon from '../../assets/img/Maintein.svg'
import SettingsIcon from '../../assets/img/Settings.svg'
import UserIcon from '../../assets/img/User.svg'
import './menu.css';


function Menu(props) {

  return (
    <div>
      <nav className={`navbar  m-0 custom-background `} role="navigation" aria-label="main navigation">
            <img src={LogoIcon} class='navbar-brand pl-6 pr-0' alt="AssetBox" onClick={(e) => props.seletorView('Home', e)} />
            <p className="navbar-brand navbar-item mr-2 is-size-3 p-0 has-text-weight-bold empresa" href="##"  onClick={(e) => props.seletorView('Home', e)}>AssetBox</p>
            {/* <a role="button" className={`navbar-burger `} onClick={toggleMenu} aria-label="menu" aria-expanded={isActive ? 'true' : 'false'} href='##'>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a> */}
          <div className='container'>
            <div className={`navbar-menu is-flex is-justify-content-space-evenly`} id="navMenu">
            {/* <div className="navbar-start is-left mr-1 is-flex ml-auto"> */}
              {/* <a className="navbar-item pr-6 pl-6 is-size-5 has-text-weight-bold my-0 mx-1" href='##'>
                <img src={UserIcon} class='mr-3' alt="Usuários" />
                Usuários
              </a> */}
              <a className={`navbar-item pr-6 pr-8 pl-6 is-size-5 has-text-weight-bold my-0`} href='##' onClick={(e) => props.seletorView('Ativos', e)}>
                <img src={AssetsIcon} class='mr-3' alt="Ativos" />
                Ativos
              </a>
              <a className="navbar-item pr-6 pl-6 is-size-5 has-text-weight-bold my-0 " href='##' onClick={(e) => props.seletorView('Destinatarios', e)}>
                <img src={UserIcon} class='mr-3' alt="Destinatários" />
                Destinatários
              </a>
              {/* <a className="navbar-item pr-6 pl-6 is-size-5 has-text-weight-bold my-0 mx-1" href='##'>
                <img src={MainteinIcon} class='mr-3' alt="Manutenções" />
                Manutenções
              </a> */}
              {/* <a className="navbar-item pr-6 pl-6 is-size-5 has-text-weight-bold my-0 mx-1" href='##'>
                <img src={DashboardIcon} class='mr-3' alt="Dashboard" />
                Dashboard
              </a> */}
            
                    </div>
            {/* <div className="navbar-end">
              <div className="navbar-item">
                <a className="navbar-item" href="##"><img src={SettingsIcon} alt="" /></a>
              </div>
            </div> */}
          </div>
      </nav>
    </div>
    

  );

}



export default Menu;
