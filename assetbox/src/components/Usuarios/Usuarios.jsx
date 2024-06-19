import React, { useEffect, useState } from 'react';
import Filtro from '../../assets/img/filtro.svg';
import './usuarios.css';
import axios from 'axios';

const Usuarios = ({ setTela }) => {
    const [destinatarios, setdestinatarios] = useState([]);
    const [administradores, setAdministradores] = useState([])
    const [filtroNome, setNomes] = useState('')
    const [isRoot, setIsRoot] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const destinatariosResponse = await axios.get('http://localhost:8000/destinatarios');
                setdestinatarios(destinatariosResponse.data);

                const administradoresResponse = await axios.get('http://localhost:8000/administradores');
                const admins = administradoresResponse.data.filter(administrador => administrador.status === "ATIVO");
                setAdministradores(admins);

                const userEmail = localStorage.getItem("userEmail");
                setIsRoot(userEmail === "admin@gmail.com");
            } catch (error) {
                console.error('There was an error!', error);
            }
        };

        fetchData();
    }, []);

    const handleClick = (id) => {
        localStorage.setItem('id', id);
        setTela(`VisualizarDestinatarios`);
    };

    const handleClickAdm = (id) => {
        localStorage.setItem('id', id);
        setTela(`VisualizarAdministradores`);
    };


    const [modalOpen, setModalOpen] = useState(false);

    const abrirHelp = () => {
        setModalOpen(true);
    };

    const fecharHelp = () => {
        setModalOpen(false);
    };

    const dadosFiltrados2 = administradores.filter(administrador => {
        return (filtroNome === '' || administrador.adm_nome.toLowerCase().includes(filtroNome.toLowerCase()));
    });
    const dadosFiltrados = destinatarios.filter(destinatario => {
        return (filtroNome === '' || destinatario.des_nome.toLowerCase().includes(filtroNome.toLowerCase()));
    });

    return (
        <body>
            <div class='page-full h-screen' style={{ backgroundColor: 'transparent', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                <button class="button button-effect is-primary m-5 ml-6 is-rounded is-size-4 shadow-button" onClick={() => setTela('CadastroDestinatarios')}>Cadastrar Destinatário</button>
                {isRoot && (
                    <button class="button button-effect is-primary m-5 ml-6 is-rounded is-size-4 shadow-button" onClick={() => setTela('CadastroAdministrador')}> Cadastrar Administrador</button>
                )}
                {!isRoot && (
                    ""
                )}
                <div class='page-full' style={{ backgroundColor: '#459EB5', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                    <div class='field'>
                        <div class="columns filtro mx-0" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            <div class="column is-full pr-6" style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={Filtro} class="mr-6" alt='filter'></img><label className='filtros mx-1 has-text-white has-text-weight-medium mr-3'>Nome</label>
                                <input class="input is-small is-half is-flex-grow-1 is-rounded border-none" type="text" placeholder='Digite o nome do usuário' value={filtroNome} onChange={e => setNomes(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div class="columns indice m-0 is-flex is-justify-content-center border-radius-top" >
                        <div class="column is-one-third ml-2 is-flex is-justify-content-center is-align-items-center " >
                            <label className='has-text-white is-size-4
                            has-text-weight-medium'>Usuários</label>
                        </div>
                    </div>

                    <div class='p-0'>

                        {destinatarios.length === 0 && administradores.length === 0 ? (
                            <div className='asset is-flex is-justify-content-center'>
                                <div className='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium' style={{ width: '200%' }}>
                                    <p className='has-text-black'>Nenhum Usuário Cadastrado</p>
                                </div>
                            </div>
                        ) : (
                            <div className='asset flex-wrap is-justify-content-center'>

                                {dadosFiltrados2.map((administrador) => {
                                    if (administrador.adm_id === 1 && administradores.length === 0 && destinatarios.length === 0) {
                                        return <div className='asset is-flex is-justify-content-center'>
                                            <div className='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium' style={{ width: '200%' }}>
                                                <p className='has-text-black'>Nenhum Usuário Cadastrado</p>
                                            </div>
                                        </div>
                                    } if (administrador.adm_id !== 1) {
                                        return (
                                            <div className='SemHover p-2 is-one-third mr-2 dado-ativo is-flex is-align-items-center ml-6 has-text-weight-medium'>
                                                <div onClick={() => handleClickAdm(administrador.adm_id)} className='des' class=' des is-flex is-justify-content-center'>
                                                    <a class='SemHover is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium' href='##'>
                                                        <p className='has-text-black'>{administrador.adm_nome} | Administrador</p>
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}

                                {dadosFiltrados.map((destinatario) => {
                                    return (
                                        <div className='SemHover p-2 is-one-third mr-2 dado-ativo is-flex is-align-items-center ml-6 has-text-weight-medium'>
                                            <div onClick={() => handleClick(destinatario.des_id)} className='des' class=' des is-flex is-justify-content-center'>
                                                <a class='SemHover is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium' href='##'>
                                                    <p className='has-text-black'>{destinatario.des_nome} | Destinatário</p>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {/*aqui eu percorro o array de objetos e crio um card para cada objeto*/}
                    </div>

                </div>
            </div>
            <div className="help-button">
                <button className="shadow-button button button-effect is-primary m-5 ml-6 ajuda-botao is-size-4" onClick={abrirHelp}>?</button>

                <div className={`modal ${modalOpen ? 'is-active' : ''}`}>
                    <div className="modal-background" onClick={fecharHelp}></div>
                    <div className="modal-content">


                        <div className="box ajuda m-6 has-text-white ajuda-content">
                            <p>Este é o <span className='has-text-weight-bold'>Painel de Usuários</span>, Aqui você visualizará todos os <span className='has-text-weight-bold'>Destinatários</span> e <span className='has-text-weight-bold'>Administradores</span> cadastrados.
                            Para cadastrar um novo usuário, clique no botão <span className='has-text-weight-bold'>Cadastrar Destinatário</span> para cadastrar um novo destinatário.<span className='has-text-weight-bold'>Cadastrar Administrador</span> para cadastrar um novo administrador.
                                </p>

                        </div>

                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={fecharHelp}></button>
                </div>
            </div>
        </body >
    );
}
export default Usuarios;

