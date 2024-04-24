import React, { useEffect, useState } from 'react';
import Filtro from '../../assets/img/filtro.svg';
import './ativos.css';
import axios from 'axios';

const Ativos = ({ setTela }) => {
    const [assets, setAssets] = useState([]);
    const [filtroId, setFiltroId] = useState('');
    const [filtroTitulo, setFiltroTitulo] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/ativos')
            .then(response => {
                setAssets(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleClick = (id) => {
        localStorage.setItem('id', id)
        setTela(`VisualizarAtivo`);
    };

    const dadosFiltrados = assets.filter(asset => {
    return (filtroId === '' || String(asset.ati_id).includes(filtroId)) && (filtroTitulo === '' || asset.ati_titulo.toLowerCase().includes(filtroTitulo.toLowerCase())) && (filtroStatus === '' || asset.ati_status.toLowerCase().includes(filtroStatus.toLowerCase()));
  });


    return (
        <body>
            <div class='page-full' style={{ backgroundColor: 'transparent', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                <button class="button is-primary m-5 ml-6 is-rounded is-size-4" style={{ backgroundColor: '#367E90', color: '#fff' }} onClick={() => setTela('CadastroAtivos')}>Cadastrar Ativo</button>
                <div class='page-full' style={{ 
                    backgroundColor: '#459EB5', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                    <div class='field'>
                        <div class="columns filtro mx-0" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            <div class="column is-one-fifth" style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={Filtro} class="mx-1" alt='filter'></img><label className='filtros mx-1 has-text-white has-text-weight-medium mr-3'>ID</label>
                                <input class="input is-small is-flex-grow-1 is-rounded" type="text" placeholder='Digite um ID:' value={filtroId} onChange={e => setFiltroId(e.target.value)} />
                            </div>
                            <div class="column is-two-fifths is-flex is-align-items-center">
                                <label className='filtros mx-1 has-text-white has-text-weight-medium mr-3' >Titulo</label>
                                <input class="input is-small is-flex-grow-3 is-rounded" type="text" placeholder='Digite um titulo:' value={filtroTitulo} onChange={e => setFiltroTitulo(e.target.value)} />
                            </div>
                            <div class="column is-one-fifth is-flex is-align-items-center">
                                <label className='filtros mx-1 has-text-white has-text-weight-medium mr-3'>Status</label>
                                <input class="input is-small is-flex-grow-2 is-rounded" type="text" placeholder='Digite um Status:' value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div class="columns indice m-0 is-flex is-justify-content-center border-radius-top" >
                        <div class="column is-one-third ml-2 is-flex is-justify-content-center is-align-items-center">
                            <label className='has-text-white is-size-4
                            has-text-weight-medium'>Número</label>
                        </div>
                        <div class="column is-one-third ml-2 mr-2 is-flex is-justify-content-center is-align-items-center">
                            <label className='has-text-white is-size-4 has-text-weight-medium'>Título</label>
                        </div>
                        <div class="column is-one-third mr-2 is-flex is-justify-content-center is-align-items-center">
                            <label className='has-text-white is-size-4 has-text-weight-medium'>Status</label>
                        </div>
                    </div>

                      
                    <div class='p-0'>
                    {assets.length === 0 && (
                    <div className='asset is-flex is-justify-content-center'>
                        <div className='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium'>
                            <p className='has-text-black'>Nenhum Ativo Cadastrado</p>
                        </div>
                    </div>
                )}
                        {/*aqui eu percorro o array de objetos e crio um card para cada objeto*/}
                        {dadosFiltrados.map((asset) => (
                            <div key={asset.ati_id} onClick={() => handleClick(asset.ati_id)} className='asset' class='asset is-flex is-justify-content-center'>
                                <div class='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium'>
                                    <p className='has-text-black'>{asset.ati_id}</p>
                                </div>
                                <div class='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium'>
                                    <p className='has-text-black'> {asset.ati_titulo}</p>
                                </div>
                                <div class='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium'>
                                    <p className='has-text-black'> {asset.ati_status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </body >
    );
}
export default Ativos;

