import React, { useState } from 'react';
import AssetsIcon from '../../assets/img/Asset.svg'
import LogoIcon from '../../assets/img/AssetBoxLogo.svg'
import DashboardIcon from '../../assets/img/Graph.svg'
import MainteinIcon from '../../assets/img/Maintein.svg'
import SettingsIcon from '../../assets/img/Settings.svg'
import UserIcon from '../../assets/img/User.svg'
import Notify from '../../assets/img/Notifications.svg'
import './menu.css';


function Menu(props) {
  const [showLogout, setShowLogout] = useState(false);


  const handleSettingsClick = () => {
    setShowLogout(prevShowLogout => !prevShowLogout);
  };

  const handleLogout = () => {
    alert('Você está sendo deslogado, até a próxima!')
    setTimeout(() => {
      localStorage.removeItem('token');
      window.location.reload();
    }, 3000);
  }

  return (
    <div>
      <nav className={`navbar  m-0 custom-background `} role="navigation" aria-label="main navigation">
        <img src={LogoIcon} class='navbar-brand pl-6 pr-0' alt="AssetBox" onClick={(e) => props.seletorView('Home', e)} />
        <span className="navbar-brand has-text-white navbar-item mr-2 is-size-3 p-0 has-text-weight-bold empresa is-clickable" href="" onClick={(e) => props.seletorView('Home', e)}>AssetBox</span>
        {/* <a role="button" className={`navbar-burger `} onClick={toggleMenu} aria-label="menu" aria-expanded={isActive ? 'true' : 'false'} href='##'>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a> */}
        <div className='container'>
          <div className={`navbar-menu is-flex is-justify-content-space-evenly`} id="navMenu">
            <p className={`nav-item is-flex pr-6 pr-8 pl-6 is-size-5 has-text-weight-bold my-0 is-clickable`} href='' onClick={(e) => props.seletorView('Ativos', e)}>
              <img src={AssetsIcon} class='mr-2' alt="Ativos" />
              <p class='navbar-item has-text-white'> Ativos </p>
            </p>
            <p className="nav-item is-flex pr-6 pl-6 is-size-5 has-text-weight-bold my-0 " href=' ' onClick={(e) => props.seletorView('Destinatarios', e)}>
              <img src={UserIcon} class='mr-3' alt="Destinatários" />
              <p class='navbar-item has-text-white'>Usuários</p>
            </p>
            <p className="navbar-item pr-6 pl-6 is-size-5 has-text-weight-bold my-0 mx-1" href=' ' onClick={(e) => props.seletorView('Manutenções', e)}>
              <img src={MainteinIcon} class='mr-3' alt="Manutenções" />
              <p class='navbar-item has-text-white'>Manutenção</p>
            </p>
            {/* <a className="navbar-item pr-6 pl-6 is-size-5 has-text-weight-bold my-0 mx-1" >
                <img src={DashboardIcon} class='mr-3' alt="Dashboard" />
                Dashboard
              </a> */}

          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <p className="navbar-item" ><img src={Notify} alt="configurações" /></p>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <p className="navbar-item" onClick={handleSettingsClick} ><img src={SettingsIcon} alt="configurações" /></p>
              {showLogout && (
                <div>
                  <button onClick={handleLogout}>Deslogar</button> {/* handleLogout is a function that logs the user out */}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>


  );

}



export default Menu;
