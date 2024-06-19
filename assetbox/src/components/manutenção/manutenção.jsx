import React, { useState, useEffect } from 'react';
import Filtro from '../../assets/img/filtro.svg';
import axios from 'axios';

const Manutencao = ({ setTela }) => {
    const [manutencoes, setMaintein] = useState([]);
    const [filtroHorario, setFiltroHorario] = useState('');
    const [filtroAtivo, setFiltroAtivo] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/manutencoes')
            .then(response => {
                setMaintein(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleClick = (id) => {
        localStorage.setItem('id', id)
        setTela(`VisualizarManutenção`);
    };

    const [modalOpen, setModalOpen] = useState(false);

    const abrirHelp = () => {
        setModalOpen(true);
    };

    const fecharHelp = () => {
        setModalOpen(false);
    };


    const dadosFiltrados = manutencoes.filter(manut => {
        return (filtroHorario === '' || String(manut.man_horario).includes(filtroHorario)) &&
            (filtroAtivo === '' || String(manut.man_id).includes(filtroAtivo)) &&
            (filtroStatus === '' || manut.man_status.toLowerCase().includes(filtroStatus.toLowerCase()));
    });

    return (
        <body>

            <div className='page-full h-screen' style={{ backgroundColor: 'transparent', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                <button className="button button-effect is-primary m-5 ml-6 is-rounded is-size-4 shadow-button" onClick={() => setTela('VisualizarAgendamento')}>Cadastrar Manutenção</button>
                <div className='page-full ' style={{ backgroundColor: '#459EB5', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                    <div className='field'>
                        <div className="columns filtro mx-0" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            <div className="column is-two-fifths is-flex is-align-items-center " style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={Filtro} className="mx-1" alt='filter'></img><label className='filtros mx-1 has-text-white has-text-weight-medium mr-3'>Horário</label>
                                <input className="input is-small is-flex-grow-2 is-rounded border-none" type="time" placeholder='Digite um horário' value={filtroHorario} onChange={(e) => setFiltroHorario(e.target.value)} />
                            </div>
                            <div className="column is-two-fifths is-flex is-align-items-center">
                                <label className='filtros mx-1 has-text-white has-text-weight-medium mr-3' >ID</label>
                                <input className="input is-small is-flex-grow-3 is-rounded border-none" type="text" placeholder='Digite o ID da manutenção' value={filtroAtivo} onChange={(e) => setFiltroAtivo(e.target.value)} />
                            </div>
                            <div className="column is-one-fifth is-flex is-align-items-center">
                                <label className='filtros mx-1 has-text-white has-text-weight-medium mr-3'>Status</label>
                                <input className="input is-small is-flex-grow-2 is-rounded border-none" type="text" placeholder='Digite um Status' value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="columns titulo-none indice m-0 is-flex is-justify-content-center border-radius-top titulos-manutencao" >
                        <div className="column is-one-fifth ml-2 is-flex is-justify-content-center is-align-items-center  ">
                            <label className='has-text-white is-size-4 has-text-weight-medium'>Data</label>
                        </div>
                        {/* <div className="column is-one-fifth ml-2 mr-2 is-flex is-justify-content-center is-align-items-center">
                            <label className='has-text-white is-size-4 has-text-weight-medium'>Horário</label>
                        </div> */}
                        <div className="column is-one-third mr-2 is-flex is-justify-content-center is-align-items-center">
                            <label className='has-text-white is-size-4 has-text-weight-medium'>ID Manutenção</label>
                        </div>
                        <div className="column is-one-fifth mr-2 is-flex is-justify-content-center is-align-items-center">
                            <label className='has-text-white is-size-4 has-text-weight-medium'>Status</label>
                        </div>
                    </div>
                    <div className='p-0'>
                        {manutencoes.length === 0 && (
                            <div className='asset is-flex is-justify-content-center'>
                                <div className='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium' style={{ width: '100%' }}>
                                    <p className='has-text-black'>Nenhuma manutenção cadastrada</p>
                                </div>
                            </div>
                        )}
                        {dadosFiltrados.map((manutencao) => (
                            <div key={manutencao.man_id} onClick={() => handleClick(manutencao.man_id)} className='asset is-flex is-justify-content-center'>
                                
                                <div className='SemHover column is-one-fifth mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium'>
                                    <p className='has-text-black'>{new Date(manutencao.man_data).toLocaleDateString()}</p>
                                </div>
                                {/* <div className='SemHover column is-one-fifth mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium'>
                                    <p className='has-text-black'>{manutencao.man_horario}</p>
                                </div> */}
                                <div className='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium'>
                                    <p className='has-text-black'>{manutencao.man_id}</p>
                                </div>
                                <div className='SemHover column is-one-fifth mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium'>
                                    <p className='has-text-black'>{manutencao.man_status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="help-button">
                <button className="shadow-button button button-effect is-primary m-5 ml-6 ajuda-botao is-size-4" onClick={abrirHelp}>?</button>

                <div className={`modal ${modalOpen ? 'is-active' : ''}`}>
                    <div className="modal-background" onClick={fecharHelp}></div>
                    <div className="modal-content">


                        <div className="box ajuda m-6 has-text-white ajuda-content">
                            <p>Este é o <span className='has-text-weight-bold'>Painel de Manutenções</span>,  Aqui você você visualiza todas as <span className='has-text-weight-bold'>Manutenções cadastradas.</span> Dica: Para encontrar a manutenção desejada mais facilmente você poderá filtrar as manutenções que deseja visualizar digitando nos campos Horário, ID e/ou Status!
                            Você poderá cadastrar uma nova manutenção clicando no botão
                            <span className='has-text-weight-bold'>Cadastrar Manutenção</span>, acima do Painel.
                                </p>
                                 
                        </div>

                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={fecharHelp}></button>
                </div>
            </div>
        </body >
    );
}
export default Manutencao;
