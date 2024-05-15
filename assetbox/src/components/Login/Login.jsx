import React, { useState } from 'react';
import './login.css';
import logo from '../../assets/img/Logo.svg';
import axios from 'axios';

const Login = ({ setTela }) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = async () => {
        try {

            await axios.post("http://localhost:8000/autenticacao/login", {
                email: email,
                senha: senha
            }).then(response => {
                localStorage.setItem("token", response.data[0]);
                localStorage.setItem("userEmail", email);
                localStorage.setItem("idUser", response.data[1]);
                console.log("login", localStorage.getItem("token"), "data", new Date())
                window.location.replace("http://localhost:3000")
            })
        } catch (e) {
            alert("Login falhou!")
            localStorage.setItem("token", null)
        }
    }

    return (
        <body class='fundo  is-flex is-align-items-center is-justify-content-center '>
            <div class='is-flex is-justify-content-center'>
                <img src={logo} class='is-centered pb-6' alt="" />
            </div>
            <div class='tela-login is-flex is-justify-content-center' style={{
                backgroundColor: 'rgba(217, 217, 217, 0.2)', width: '50%', height: '50%',
            }}>
                <div class='field-login is-justify-content-center m-auto'>
                    <div class='is-flex justify-content-center'>
                        <h3 class=' is-flex is-size-2 has-text-weight-bold m-auto'>Login</h3>
                    </div>
                    <div>
                        <p className='mt-6 ml-6 is-size-4 has-text-weight-medium entra'>E-mail</p>
                        <input class="input-cinza mb-6 is-medium is-flex-grow-4 is-rounded" type="text" placeholder='Digite seu E-mail:' style={{ width: '100%' }} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <p className='mt-2 ml-6 is-size-4 has-text-weight-medium entra'>Senha</p>
                        <input class="input-cinza mb-6 is-medium is-flex-grow-4 is-rounded" type="password" placeholder='Digite sua Senha:' style={{ width: '100%' }} onChange={(e) => setSenha(e.target.value)} />
                    </div>
                    <button class='button is-flex m-auto' style={{ backgroundColor: '#D9D9D9', color: '#6a6a6a' }} onClick={() => handleSubmit()}>Entrar</button>
                </div>
            </div>

        </body >)
}
export default Login;