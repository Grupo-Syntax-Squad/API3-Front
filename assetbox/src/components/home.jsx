import React from 'react';
import { useState } from 'react';
import LogoIcon from '../assets/img/AssetBoxLogo.svg'
import './home.css';
function Home(){
    const [modalOpen, setModalOpen] = useState(false);

    const abrirHelp = () => {
        setModalOpen(true);
    };

    const fecharHelp = () => {
        setModalOpen(false);
    };
    return(
        <div className='logo-container'>
            <img src={LogoIcon} class='logo' alt="AssetBox Logo"/>
            <div className="help-button">
                <button className="shadow-button button button-effect is-primary m-5 ml-6 is-rounded is-size-4" onClick={abrirHelp}>?</button>

                <div className={`modal ${modalOpen ? 'is-active' : ''}`}>
                    <div className="modal-background" onClick={fecharHelp}></div>
                    <div className="modal-content">


                        <div className="box ajuda m-6 has-text-white">
                            <button class="delete is-pulled-right" aria-label="close" onClick={fecharHelp}></button>
                            <p>Este é o <span className='has-text-weight-bold'>Painel Inicial</span>,  o seu ponto de partida no AssetBox. Aqui você receberá alertas importantes referentes à expiração de ativos assim que se logar. NÃO deixe de agendar uma manutenção para o ativo prestes a ser expirado, isso poderá afetar o bom funcionamento do ativo! Na parte superior você encontra o Menu dee navegação com as seguintes opções: <span className='has-text-weight-bold'>Usuários</span>,<span className='has-text-weight-bold'>Ativos</span>, <span className='has-text-weight-bold'>Manutenção</span>, <span className='has-text-weight-bold'>Dashboard</span>, <span className='has-text-weight-bold'>Notificações</span> e <span className='has-text-weight-bold'>Configurações</span>.
                            Você poderá cadastrar uma nova manutenção clicando no botão
                            <span className='has-text-weight-bold'>Cadastrar Manutenção</span>, acima do Painel.
                                </p>
                                 
                        </div>

                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={fecharHelp}></button>
                </div>
            </div>
        </div>
    )
}
export default Home;