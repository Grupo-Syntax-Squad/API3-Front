import React, { useEffect, useState } from 'react';
import Filtro from '../../assets/img/filtro.svg';
import axios from 'axios';

const Manutencao = ({ setTela }) => {
    const [manutencoes, setMaintein] = useState([]);

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


    return (
        <body>
            <div class='page-full' style={{ backgroundColor: 'transparent', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                <button class="button is-primary m-5 ml-6 is-rounded is-size-4" style={{ backgroundColor: '#367E90', color: '#fff' }} onClick={() => setTela('CadastroManutenção')}>Cadastrar Manutenção</button>
                <div class='page-full' style={{ 
                    backgroundColor: '#459EB5', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                    <div class='field'>
                        <div class="columns filtro mx-0" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            <div class="column is-one-fifth" style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={Filtro} class="mx-1" alt='filter'></img><label className='filtros mx-1 has-text-white has-text-weight-medium mr-3'>Data</label>
                                <input class="input is-small is-flex-grow-1 is-rounded" type="date" placeholder='Digite uma data:' />
                            </div>
                            <div class="column is-one-fifth is-flex is-align-items-center">
                                <label className='filtros mx-1 has-text-white has-text-weight-medium mr-3'>Horário</label>
                                <input class="input is-small is-flex-grow-2 is-rounded" type="time" placeholder='Digite um horário:' />
                            </div>
                            <div class="column is-two-fifths is-flex is-align-items-center">
                                <label className='filtros mx-1 has-text-white has-text-weight-medium mr-3' >Ativo</label>
                                <input class="input is-small is-flex-grow-3 is-rounded" type="text" placeholder='Digite o titulo do ativo' />
                            </div>
                            <div class="column is-one-fifth is-flex is-align-items-center">
                                <label className='filtros mx-1 has-text-white has-text-weight-medium mr-3'>Status</label>
                                <input class="input is-small is-flex-grow-2 is-rounded" type="text" placeholder='Digite um Status:' />
                            </div>
                            
                        </div>
                    </div>
                    <div class="columns indice m-0 is-flex is-justify-content-center border-radius-top" >
                        <div class="column is-one-fifth ml-2 is-flex is-justify-content-center is-align-items-center">
                            <label className='has-text-white is-size-4 has-text-weight-medium'>Data</label>
                        </div>
                        <div class="column is-one-fifth ml-2 mr-2 is-flex is-justify-content-center is-align-items-center">
                            <label className='has-text-white is-size-4 has-text-weight-medium'>Horário</label>
                        </div>
                        <div class="column is-one-third mr-2 is-flex is-justify-content-center is-align-items-center">
                            <label className='has-text-white is-size-4 has-text-weight-medium'>Ativo</label>
                        </div>
                        <div class="column is-one-fifth mr-2 is-flex is-justify-content-center is-align-items-center">
                            <label className='has-text-white is-size-4 has-text-weight-medium'>Status</label>
                        </div>
                    </div>

                      
                    <div class='p-0'>
                    {manutencoes.length === 0 && (
                    <div className='asset is-flex is-justify-content-center'>
                        <div className='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium' style={{ width: '100%' }}>
                            <p className='has-text-black'>Nenhuma manutenção Cadastrada</p>
                        </div>
                    </div>
                )}
                        {/*aqui eu percorro o array de objetos e crio um card para cada objeto*/}
                        {manutencoes.map((manutencao) => (
                            <div key={manutencao.man_id} onClick={() => handleClick(manutencao.man_id)} className='asset' class='asset is-flex is-justify-content-center'>
                                <div class='SemHover column is-one-fifth mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium'>
                                    <p className='has-text-black'>{manutencao.man_data}</p>
                                </div>
                                <div class='SemHover column is-one-fifth mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium'>
                                    <p className='has-text-black'> {manutencao.man_horario}</p>
                                </div>
                                <div class='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium'>
                                    <p className='has-text-black'> {manutencao.man_ativo_id}</p>
                                </div>
                                <div class='SemHover column is-one-fifth mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium'>
                                    <p className='has-text-black'> {manutencao.man_status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </body >
    );
}
export default Manutencao;

