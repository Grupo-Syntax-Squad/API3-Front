import React, { useState } from 'react';
import "./cadastro.css";
import axios from 'axios';
import handleEmail from '../../utils/handleEmail';
import handleTelefone from '../../utils/handleTelefone';
import Validador from '../../utils/validadorCpf';

function CadastroAdministrador({ setTela }) {
    const [adm_nome, setNomeAdministrador] = useState('');
    const [adm_email, setEmailAdministrador] = useState('');
    const [adm_telefone, setTelefoneAdministrador] = useState('');
    const [adm_senha, setSenhaAdministrador] = useState('');
    const [adm_cpf, setCPFAdministrador] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const abrirHelp = () => {
        setShowPopup(true)
    };
  
  
    const fecharHelp = () => {
        setShowPopup(false)
    };
  

    const validador = new Validador();
    const handleEmailChange = (event) => {
        const email = event.target.value;
        setEmailAdministrador(email);
    };

    const handleTelefoneChange = (event) => {
        const telefone = event.target.value;
        const telefoneFormatado = handleTelefone(telefone);
        setTelefoneAdministrador(telefoneFormatado);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validador.validarCPF(adm_cpf)){
            window.alert("CPF inválido!")
            return;
        }
        const camposObrigatorios = [adm_nome, adm_email, adm_telefone, adm_senha, adm_cpf];
        const camposVazios = camposObrigatorios.some(campo => !campo);

        if (camposVazios) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Verifica se o e-mail está vazio
        if (adm_email.trim() === '') {
            window.alert('O e-mail não pode estar vazio.');
            return;
        }

        // Verifica se o e-mail é válido
        if (!handleEmail(adm_email)) {
            window.alert('E-mail inválido.');
            return;
        }

        
        const abrirHelp = () => {
            setShowPopup(true)
        };


        const fecharHelp = () => {
            setShowPopup(false)
        };   
        


        const dadosAdministrador = {
            adm_nome: adm_nome,
            adm_email: adm_email,
            adm_senha: adm_senha,
            adm_telefone: adm_telefone,
            adm_cpf: adm_cpf
        };
        console.log(dadosAdministrador);
        let response = await axios.post('http://localhost:8000/autenticacao/registrar', dadosAdministrador);

        console.log("Administrador:", response.data);

        setShowPopup(true); // Exibe o pop-up após o cadastro
        setNomeAdministrador('');
        setTelefoneAdministrador('');
        setEmailAdministrador('');
        setSenhaAdministrador('');
        setCPFAdministrador('');
    };

    return (
        <body>
            <div className='page-full h-screen shadow-button'>
                <div className='field'>
                    <h2 class="titulo-cadastro p-2">Cadastro de Administrador</h2>
                </div>
                <form onSubmit={handleSubmit} className="m-6" >

                    <div className="column is-flex is-flex-direction-column m-3 is-justify-content-center is-align-items-center">

                        <h3 className=' is-size-4 has-text-black'>Dados</h3>

                        <div className="field column is-two-thirds">
                            <label className="form-label is-size-5">Nome: <span className='has-text-danger'>*</span></label>
                            <input
                                className="input is-small"
                                type="text"
                                placeholder='Digite o nome:'
                                value={adm_nome}
                                onChange={(event) => setNomeAdministrador(event.target.value)}
                            />
                        </div>

                        <div className="field column is-two-thirds">
                            <label className="form-label is-size-5">Telefone: <span className='has-text-danger'>*</span></label>
                            <input
                                className="input is-small"
                                type="text"
                                placeholder='Digite o número de telefone:'
                                value={adm_telefone}
                                onChange={handleTelefoneChange}
                            />
                        </div>

                        <div className="field column is-two-thirds">
                            <label className="form-label is-size-5">E-mail: <span className='has-text-danger'>*</span></label>
                            <input
                                className="input is-small"
                                type="text"
                                placeholder='Digite o email:'
                                value={adm_email}
                                onChange={handleEmailChange}
                            />
                        </div>

                        <div className="field column is-two-thirds">
                            <label className="form-label is-size-5">Senha: <span className='has-text-danger'>*</span></label>
                            <input
                                className="input is-small"
                                type="text"
                                placeholder='Crie uma senha:'
                                value={adm_senha}
                                onChange={(event) => setSenhaAdministrador(event.target.value)}
                            />
                        </div>

                        <div className="field column is-two-thirds">
                            <label className="form-label is-size-5">CPF: <span className='has-text-danger'>*</span></label>
                            <input
                                className="input is-small"
                                type="text"
                                placeholder='Digite o CPF:'
                                value={adm_cpf}
                                onChange={(event) => setCPFAdministrador(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="field is-grouped is-grouped-centered">
                        <p className="control">
                            <button className="button is-primary" type="submit">
                                Cadastrar
                            </button>
                        </p>
                        <p className="control">
                            <button style={{backgroundColor: "red"}}className="button" onClick={() => setTela('Usuarios')}>
                                Cancelar
                            </button>
                        </p>
                    </div>

                    {showPopup && (
                        <div>
                        <div className="modal-background" onClick={fecharHelp}></div>
                        <div className="modal-content">

                            <div className="box ajuda m-3 has-text-white">
                                <p className='has-text-weight-bold' >Administrador Cadastrado com sucesso!</p>
                                <button class="delete is-pulled-right" aria-label="close" onClick={fecharHelp}></button>
                            </div>

                        </div>
                        <button className="modal-close is-large" aria-label="close" onClick={fecharHelp}></button>
                    </div>
                    )}
                </form>
            </div>
        </body>
    );
}

export default CadastroAdministrador;
