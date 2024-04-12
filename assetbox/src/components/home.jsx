import React from 'react';
import LogoIcon from '../assets/img/AssetBoxLogo.svg'
import './home.css';
function Home(){
    return(
        <div className='logo-container'>
            <img src={LogoIcon} class='logo' alt="AssetBox Logo"/>
        </div>
    )
}
export default Home;