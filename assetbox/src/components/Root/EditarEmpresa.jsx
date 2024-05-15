import React from 'react';
import LogoIcon from '../../assets/img/AssetBoxLogo.svg'
import './editarempresa.css';
function EditarEmpresa(){
    return(
        <div className='logo-container'>
            <img src={LogoIcon} class='logo' alt="AssetBox Logo"/>
            <p className='has-text-black'>Hello ROOT</p>
        </div>
    )
}
export default EditarEmpresa;