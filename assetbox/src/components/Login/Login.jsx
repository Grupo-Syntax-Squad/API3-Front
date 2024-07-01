import React, { useState } from 'react';
import './login.css';
import logo from '../../assets/img/Logo.svg';
import axios from 'axios';

const Login = ({ setTela }) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Passou aqui!")
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
            localStorage.setItem("token", null)
        }
    }

    return (
        <form className='fundo h-screen is-flex is-align-items-center is-justify-content-center '>
            <div className='is-flex is-justify-content-center'>
                <img src={logo} className='is-centered pb-4' alt="" />
            </div>
            <div className='tela-login is-flex is-justify-content-center h-1/2' style={{
                backgroundColor: 'rgba(217, 217, 217, 0.2)', width: '80%'
            }}>
                <div className='field-login flex flex-col m-auto'>
                    <div className='is-flex justify-content-center'>
                        <h3 className=' is-flex is-size-2 has-text-weight-bold m-auto'>Login</h3>
                    </div>
                    <div>
                        <p className='mt-6 ml-6 is-size-4 has-text-weight-medium entra'>E-mail</p>
                        <input className="input-cinza mb-3 is-medium is-flex-grow-4 is-rounded" type="text" placeholder='Digite seu E-mail' style={{ width: '100%' }} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <p className='mt-2 ml-6 is-size-4 has-text-weight-medium entra'>Senha</p>
                        <input className="input-cinza mb-6 is-medium is-flex-grow-4 is-rounded" type="password" placeholder='Digite sua Senha' style={{ width: '100%' }} onChange={(e) => setSenha(e.target.value)} required />
                    </div>
                    <button className='button is-flex m-auto' style={{ backgroundColor: '#D9D9D9', color: '#6a6a6a' }} onClick={e => handleSubmit(e)}>Entrar</button>
                </div>
            </div>

        </form >)
}
export default Login;