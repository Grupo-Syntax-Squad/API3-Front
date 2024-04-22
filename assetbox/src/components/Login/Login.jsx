import React, { useEffect, useState } from 'react';
import './login.css';
import logo from '../../assets/img/Logo.svg';
import axios from 'axios';

const Login = ({ setTela }) => {
    const [assets, setAssets] = useState([]);
    return (
        <body class='fundo  is-flex is-align-items-center is-justify-content-center '>
            <div class='is-flex is-justify-content-center'>
                <img src={logo} class='is-centered pb-6' alt="" />
            </div>
            <div class='page-full is-flex is-justify-content-center' style={{
                backgroundColor: 'rgba(217, 217, 217, 0.2)', width: '50%', height: '50%',
                }}>
                <div class='field-login is-justify-content-center m-auto'>
                    <div class='is-flex justify-content-center'>
                        <h3 class=' is-flex is-size-3 has-text-weight-bold m-auto'>Login</h3>
                    </div>
                    <div>
                        <p className='mt-6 ml-6 is-size-4 has-text-weight-medium'>Nome</p>
                        <input class="input-cinza mb-6 is-medium is-flex-grow-4 is-rounded" type="text" placeholder='Digite seu Nome:' style={{ width: '100%' }} />
                    </div>
                    <div>
                        <p className='mt-2 ml-6 is-size-4 has-text-weight-medium'>Senha</p>
                        <input class="input-cinza mb-6 is-medium is-flex-grow-4 is-rounded" type="text" placeholder='Digite sua Senha:' style={{ width: '100%' }} />
                    </div>
                    <button class='button is-flex m-auto' style={{ backgroundColor: '#D9D9D9', color: '#6a6a6a' }}>Entrar</button>
                </div>
            </div>

        </body >)
}
export default Login;