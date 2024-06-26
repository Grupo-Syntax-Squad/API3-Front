import React, { useEffect, useState } from 'react';
import Filtro from '../../assets/img/filtro.svg';
import './ativos.css';
import axios from 'axios';

const Ativos = ({ setTela }) => {
    const [assets, setAssets] = useState([]);
    const [filtroId, setFiltroId] = useState('');
    const [filtroTitulo, setFiltroTitulo] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [filiais, setFiliais] = useState([]);
    const [filialId, setFilialId] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8000/ativos')
            .then(response => {
                setAssets(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        axios.get("http://localhost:8000/filiais")
            .then(response => {
                setFiliais(response.data);
            })
            .catch(error => {
                console.error("Um erro ocorreu ao buscar filiais: ", error);
            });
    }, []);

    const handleRelatorio = async () => {
        localStorage.setItem('filialId', filialId);
        setTela('Relatorio');
    }

    const handleClick = (id) => {
        localStorage.setItem('id', id)
        console.log(id);
        setTela(`VisualizarAtivo`);
    };

    const abrirModal = () => {
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
    };

    const dadosFiltrados = assets.filter(asset => {
        return (filtroId === '' || String(asset.ati_id).includes(filtroId)) && (filtroTitulo === '' || asset.ati_titulo.toLowerCase().includes(filtroTitulo.toLowerCase())) && (filtroStatus === '' || asset.ati_status.toLowerCase().includes(filtroStatus.toLowerCase()));
    });



    const [modalOpen, setModalOpen] = useState(false);

    const abrirHelp = () => {
        setModalOpen(true);
    };

    const fecharHelp = () => {
        setModalOpen(false);
    };


    return (
        <body>

            <div class='page-full h-screen' style={{ backgroundColor: 'transparent' }}>
                <button class=" shadow-button button button-effect is-primary m-5 ml-6 is-rounded is-size-4" onClick={() => setTela('CadastroAtivos')}>Cadastrar Ativo</button>
                <button class=" shadow-button button button-effect is-primary m-5 ml-6 is-rounded is-size-4" onClick={abrirModal}>Relatório</button>


                {/* Modal */}
                <div class={`modal ${modalAberto ? 'is-active' : ''}`}>
                    <div class="modal-background"></div>
                    <div class="modal-content">
                        <div class="modal-card">
                            <header class="modal-card-head">
                                <p class="modal-card-title">Selecione uma unidade:</p>
                                <button class="delete" aria-label="close" onClick={fecharModal}></button>
                            </header>
                            <section class="modal-card-body">
                                <select name="filial" onChange={e => setFilialId(e.target.value)}>
                                    <option value={null}>Selecione a unidade</option>
                                    {filiais.map(filial => {
                                        return (
                                            <option value={filial.fil_id}>{filial.fil_nome}</option>
                                        );
                                    })}
                                </select>
                                {/* INSERIR A LISTA / MENU OU DROPDOWN */}

                            </section>
                            <footer class="modal-card-foot">
                                <div class="buttons">
                                    <button class="shadow-button button button-effect is-primary m-5 ml-6 is-rounded is-size-5" style={{ backgroundColor: '#367E90', color: '#fff' }} onClick={handleRelatorio} >Selecionar</button>
                                </div>
                            </footer>
                        </div>


                        {/* <div class="box">
<span class="icon is-large" onClick={fecharModal}>
<i class="fas fa-times"></i>
</span>
<p></p>
</div> */}
                    </div>
                    {/* <button class="modal-close is-large" aria-label="close" onClick={fecharModal}></button> */}
                </div>
                {/* Fim do Modal */}


                <div class='page-full' style={{
                    backgroundColor: '#459EB5'
                }}>
                    <div class='field'>
                        <div class="columns filtro mx-0" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            <div class="column is-one-fifth" style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={Filtro} class="mx-1" alt='filter'></img><label className='filtros mx-1 has-text-white has-text-weight-medium mr-3'>ID</label>
                                <input class="input is-small is-flex-grow-1 is-rounded border-none" type="text" placeholder='Digite um ID' value={filtroId} onChange={e => setFiltroId(e.target.value)} />
                            </div>
                            <div class="column is-two-fifths is-flex is-align-items-center">
                                <label className='filtros mx-1 has-text-white has-text-weight-medium mr-3' >Titulo</label>
                                <input class="input is-small is-flex-grow-3 is-rounded border-none" type="text" placeholder='Digite um titulo' value={filtroTitulo} onChange={e => setFiltroTitulo(e.target.value)} />
                            </div>
                            <div class="column is-one-third is-flex is-align-items-center">
                                <label className='filtros mx-1 has-text-white has-text-weight-medium mr-3'>Status</label>
                                <input class="input is-small is-flex-grow-2 is-rounded border-none" type="text" placeholder='Digite um Status' value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div class="columns indice m-0 is-flex is-justify-content-center border-radius-top" >
                        <div class="column tabela is-one-third ml-2 is-flex is-justify-content-center is-align-items-center">
                            <label className='has-text-white is-size-4 has-text-weight-medium'>Número</label>
                        </div>
                        <div class="column tabela is-one-third ml-2 mr-2 is-flex is-justify-content-center is-align-items-center">
                            <label className='has-text-white is-size-4 has-text-weight-medium'>Título</label>
                        </div>
                        <div class="column tabela is-one-third mr-2 is-flex is-justify-content-center is-align-items-center">
                            <label className='has-text-white is-size-4 has-text-weight-medium'>Status</label>
                        </div>
                    </div>

                    <div class='p-0 border-radius-button'>
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
                    <div className="help-button">
                        <button className="shadow-button button button-effect is-primary m-5 ml-6 is-size-4 ajuda-botao" onClick={abrirHelp}>?</button>

                        <div className={`modal ${modalOpen ? 'is-active' : ''}`}>
                            <div className="modal-background" onClick={fecharHelp}></div>
                            <div className="modal-content">


                                <div className="box ajuda m-3 has-text-white ajuda-content">
                                    {/* <button class="delete is-pulled-right" aria-label="close" onClick={fecharHelp}></button> */}
                                    <p>Este é o <span className='has-text-weight-bold'>Painel de Ativos</span>, Aqui você visualizará todos os ativos cadastrados. Dica: Para encontrar o ativo desejado mais facilmente você poderá filtrar os ativos que deseja visualizar digitando nos campos ID, Título e/ou Status!
                                        Você poderá cadastrar um novo ativo clicando no botão Cadastrar Novo Ativo ou gerar um relatório do mês atual clicando no botão Relatório, acima do Painel.</p>
                                </div>

                            </div>
                            <button className="modal-close is-large" aria-label="close" onClick={fecharHelp}></button>
                        </div>
                    </div>
                </div>
            </div>
        </body >
    );
}
export default Ativos;

