import React, { useState, useEffect } from 'react';
import AssetsIcon from '../../assets/img/Asset.svg'
import LogoIcon from '../../assets/img/AssetBoxLogo.svg'
// import DashboardIcon from '../../assets/img/Graph.svg'
import MainteinIcon from '../../assets/img/Maintein.svg'
import SettingsIcon from '../../assets/img/Settings.svg'
import UserIcon from '../../assets/img/User.svg'
import Notify from '../../assets/img/Notifications.svg'
import Exit from '../../assets/img/Deslogar.svg'
import Edit from '../../assets/img/Editar.svg'
import './menu.css';
import axios from 'axios';


function Menu(props) {
  const [showLogout, setShowLogout] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [empresa, setEmpresa] = useState('');
  const [showNotify, setShowNotify] = useState(false);


  const handleSettingsClick = () => {
    setShowLogout(prevShowLogout => !prevShowLogout);
  };

  const Matriz = async()  => {
    try{
      const response = await axios.get('http://localhost:8000/matriz')
      setEmpresa(response.data.mat_nome_fantasia)
    }catch (error) {
      console.error(`Erro ao buscar empresa`, error);
    }
  }

  useEffect(() => {
    Matriz();
  }, []);


  const handleLogout = (e) => {
    alert('Você está sendo deslogado, até a próxima!')
    setTimeout(() => {
      localStorage.removeItem('token');
      props.seletorView("Login", e)
      window.location.reload();
    }, 3000);
  }

    const handleNotifyClick = () => {
    setShowNotify(prevShowNotify => !prevShowNotify);
  };

  if (empresa === '') {
    return (
      'AssetBox'
    )
  }
  

  return (
    <div>
      <div className="navbar shadow-menu is-flex is-justify-content-space-between custom-background" role="navigation" aria-label="main navigation">
        <div className='navbar-brand'>
          <img src={LogoIcon} class='pl-6 pr-0' alt="AssetBox" onClick={(e) => props.seletorView('Home', e)} />
          <span className="navbar-brand has-text-white navbar-item mr-2 is-size-3 p-0 has-text-weight-bold empresa is-clickable" 
          href="" onClick={(e) => props.seletorView('Home', e)}>{empresa}</span>
        </div>
        
        <div className={`navbar-burger custom-background burger ${showMenu ? 'is-active' : ''}`} aria-label="menu" aria-expanded={showMenu ? 'true' : 'false'} onClick={() => setShowMenu(!showMenu)}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>

        <div className={`navbar-menu ${showMenu ? 'is-active' : ''}`}>
          <div className="navbar-menu is-flex is-justify-content-space-evenly" id="navMenu">
            <p className="nav-item is-flex px-4 is-size-5 has-text-weight-bold my-0 is-clickable" href='' onClick={(e) => props.seletorView('Ativos', e)}>
              <img src={AssetsIcon} class='img' alt="Ativos" />
              <p class='navbar-item has-text-white'> Ativos </p>
            </p>
            <p className="navbar-item is-flex px-4 is-size-5 has-text-weight-bold my-0 " href=' ' onClick={(e) => props.seletorView('Usuarios', e)}>
              <img src={UserIcon} class='mr-3' alt="Destinatários" />
              <p class='navbar-item has-text-white'>Usuários</p>
            </p>
            <p className="navbar-item is-flex px-4 is-size-5 has-text-weight-bold my-0 mx-1" href=' ' onClick={(e) => props.seletorView('Manutenções', e)}>
              <img src={MainteinIcon} class='mr-3' alt="Manutenções" />
              <p class='navbar-item has-text-white'>Manutenção</p>
            </p>
            {/* <a className="navbar-item pr-6 pl-6 is-size-5 has-text-weight-bold my-0 mx-1" >
                <img src={DashboardIcon} class='mr-3' alt="Dashboard" />
                Dashboard
              </a> */}

          </div>
          {<div className="navbar-end">
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-active">
              <p className="img" onClick={handleNotifyClick}><img src={Notify} alt="notificações" /></p>
              {showNotify && (
                <div className='dropdown navbar-dropdown is-right mr-1 px-5 '>
                  <button className='navbar-item' onClick={e => props.seletorView("AtivoPendente", e)}>Ativos pendentes </button>
                  <button className='navbar-item' onClick={e => props.seletorView("ManutencaoPendente", e)}>manutenções pendentes</button>
                </div>
              )}
            </div>
          </div>
          </div>}
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-active">
              <p className="navbar-item" onClick={handleSettingsClick} ><img src={SettingsIcon} alt="configurações" /></p>
              {showLogout && (
                <div className='navbar-dropdown is-right'>
                  <button className='navbar-item' onClick={e => props.seletorView("MeusDados", e)}>Meus Dados <img className='is-flex ml-1'src={Edit} alt='Ícone de acesso ao Meus Dados'/></button>
                  <button className='navbar-item is-flex' onClick={e => handleLogout(e)}>Sair<img className='is-flex ml-1'src={Exit} alt='Ícone de Logout'/></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>


  );

}



export default Menu;
