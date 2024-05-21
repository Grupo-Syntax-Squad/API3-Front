import { useEffect, useState } from "react";
import React from 'react';
import Filtro from '../../assets/img/filtro.svg';
import './editarempresa.css';
import axios from "axios";
function EditarFilial({ setTela }) {


    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [CNPJ, setCNPJ] = useState("");
    const [endereco, setEndereco] = useState("");
    const [edit, setEdit] = useState(false);
    const [assets, setAssets] = useState([]);
    const [filtroId, setFiltroId] = useState('');
    const [filtroTitulo, setFiltroTitulo] = useState('');
    const [filtroEndereco, setFiltroEndereco] = useState('');
    const handleEdit = () => edit ? setEdit(false) : setEdit(true);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`http://localhost:8000/filiais/{Id}`);
                const data = response.data;
                setNome(data.fil_nome);
                setEmail(data.fil_email);
                setCNPJ(data.fil_CNPJ);
                setTelefone(data.Fil_telefone);
                setEndereco(data.fil_endereco);
            } catch (error) {
                console.log("Erro:", error);
            }
        };

        fetchData(); 
    }, []);

    const dadosFiltrados = assets.filter(asset => {
        return (filtroId === '' || String(asset.fil_id).includes(filtroId)) && (filtroTitulo === '' || asset.fil_nome.toLowerCase().includes(filtroTitulo.toLowerCase())) && (filtroEndereco === '' || asset.fil_endereco.toLowerCase().includes(filtroEndereco.toLowerCase()));
    });
    const handleAtualizarDados = async (e) => {
        e.preventDefault();

        try {
            const dataPUT = {
                fil_nome: nome,
                fil_email: email,
                fil_endereco: endereco,
                fil_telefone: telefone,
                fil_CNPJ: CNPJ
            }

            const response = await axios.put(`http://localhost:8000/filiais/{Id}`, dataPUT);
            handleEdit();
        } catch (error) {
            if (error.response.status === 400) window.alert(error.response.data);
            else window.alert("Ocorreu algum erro no sistema!");
        }
    }

    const handleClick = (id) => {
        localStorage.setItem('id', id)
        console.log(id);
        setTela(`VisualizarFilial`);
    };

    const handleCancelarEditar = async (e) => {
        e.preventDefault();
 

        try {
            const response = await axios.get(`http://localhost:8000/filiais/{Id}`);
            const data = response.data;
            setNome(data.fil_nome);
            setEmail(data.fil_email);
            setEndereco(data.fil_endereco);
            setTelefone(data.fil_telefone);
            setCNPJ(data.fil_CNPJ);
        } catch (error) {
            console.log("Erro:", error);
        }

        handleEdit();
    }

    //só um modelo de como está a pagina de cadastro de filial, talvez dê para implemnetar na página de visualização geral da empresa, uma vez que da pra fazer usando os cards para cadastro e update
    return (
        <body className="m-2">
            <h1 className="mb-5 has-text-black is-size-4 " >Dados das Filiais </h1>
                  
                <div class="columns filtro mx-5" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                    <div class="column is-one-fifth" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={Filtro} class="mx-1" alt='filter'/>
                        <label className='filtros mx-1 has-text-white has-text-weight-medium mr-3'>ID</label>
                        <input class="input is-small is-flex-grow-1 is-rounded" type="text" placeholder='Digite um ID:' value={filtroId} onChange={e => setFiltroId(e.target.value)} />
                    </div>
                    <div class="column is-two-fifths is-flex is-align-items-center">
                        <label className='filtros mx-1 has-text-white has-text-weight-medium mr-3' >Titulo</label>
                        <input class="input is-small is-flex-grow-3 is-rounded" type="text" placeholder='Digite um titulo:' value={filtroTitulo} onChange={e => setFiltroTitulo(e.target.value)} />
                    </div>
                    <div class="column is-one-third is-flex is-align-items-center">
                        <label className='filtros mx-1 has-text-white has-text-weight-medium mr-3'>Status</label>
                        <input class="input is-small is-flex-grow-2 is-rounded" type="text" placeholder='Digite um Status:' value={filtroEndereco} onChange={e => setFiltroEndereco(e.target.value)} />
                    </div>
                </div>

                <div class="columns indice mx-5 is-flex is-justify-content-center" >
                        <div class="column is-one-third m-0 is-flex is-justify-content-center is-align-items-center">
                            <label className='has-text-white is-size-4 has-text-weight-medium'>Número</label>
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
                            <div className='asset mx-5 is-flex is-justify-content-center'>
                                <div className='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium'>
                                    <p className='has-text-black'>Nenhum Ativo Cadastrado</p>
                                </div>
                            </div>
                        )}
                    </div>

                {dadosFiltrados.map((asset) => (
                            <div key={asset.ati_id} onClick={() => handleClick(asset.fil_id)} className='asset' class='asset is-flex is-justify-content-center'>
                                <div class='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium'>
                                    <p className='has-text-black'>{asset.fil_id}</p>
                                </div>
                                <div class='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium'>
                                    <p className='has-text-black'> {asset.fil_nome}</p>
                                </div>
                                <div class='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium'>
                                    <p className='has-text-black'> {asset.fil_endereco}</p>
                                </div>
                            </div>
                        ))}
        </body >
    );


}
export default EditarFilial;