import React, { useEffect, useState } from 'react';
import LogoIcon from '../assets/img/AssetBoxLogo.svg';
import AlertIcon from '../assets/img/alerta.png';
import axios from 'axios';
import './home.css';

function Home() {
    const [assets, setAssets] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/ativos')
            .then(response => {
                const assetsData = response.data;
                const ativosProximosDeExpirar = assetsData.filter(asset => {
                    const diasAteExpiracao = calculaQuantosDiasFaltam(asset.ati_data_expiracao);
                    return diasAteExpiracao <= 3 && diasAteExpiracao >= 0;
                });
                setAssets(ativosProximosDeExpirar);
                setShowPopup(ativosProximosDeExpirar.length > 0);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const calculaQuantosDiasFaltam = (expirationDate) => {
        const currentDate = new Date();
        const expDate = new Date(expirationDate);
        const diffTime = expDate - currentDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const fecharAlerta = () => {
        setShowPopup(false);
    };

    return (
        <div className='logo-container'>
            <img src={LogoIcon} className='logo' alt="AssetBox Logo" />
            {showPopup && (
                <div>
                    <div className="modal-background" onClick={fecharAlerta}></div>
                    <div className="modal-content">
                        <div className="box ajuda m-3 has-text-white alert-icon">
                            <img src={AlertIcon} className='container image is-96x96' alt="Alert Icon" />
                            {assets.map((asset, index) => (
                                <div key={index}>
                                    <p className='has-text-weight-bold'>
                                        Faltam {calculaQuantosDiasFaltam(asset.ati_data_expiracao)} dias para a expiração do ativo {asset.ati_titulo}. Renove ou agende uma manutenção!
                                    </p>
                                </div>
                            ))}
                            <button className="delete is-pulled-right" aria-label="close" onClick={fecharAlerta}></button>
                        </div>
                    </div>
                </div>
            )}
            <div className="help-button">
                <button className="shadow-button button button-effect is-primary m-5 ml-6 is-rounded is-size-4" onClick={() => setShowPopup(true)}>?</button>

                <div className={`modal ${showPopup ? 'is-active' : ''}`}>
                    <div className="modal-background" onClick={() => setShowPopup(false)}></div>
                    <div className="modal-content">
                        <div className="box ajuda m-6 has-text-white">
                            <button className="delete is-pulled-right" aria-label="close" onClick={() => setShowPopup(false)}></button>
                            <p>Este é o <span className='has-text-weight-bold'>Painel Inicial</span>, o seu ponto de partida no AssetBox. Aqui você receberá alertas importantes referentes à expiração de ativos assim que se logar. NÃO deixe de agendar uma manutenção para o ativo prestes a ser expirado, isso poderá afetar o bom funcionamento do ativo! Na parte superior você encontra o Menu de navegação com as seguintes opções: <span className='has-text-weight-bold'>Usuários</span>, <span className='has-text-weight-bold'>Ativos</span>, <span className='has-text-weight-bold'>Manutenção</span>, <span className='has-text-weight-bold'>Dashboard</span>, <span className='has-text-weight-bold'>Notificações</span> e <span className='has-text-weight-bold'>Configurações</span>. Você poderá cadastrar uma nova manutenção clicando no botão <span className='has-text-weight-bold'>Cadastrar Manutenção</span>, acima do Painel.
                            </p>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={() => setShowPopup(false)}></button>
                </div>
            </div>
        </div>
    );
}

export default Home;
