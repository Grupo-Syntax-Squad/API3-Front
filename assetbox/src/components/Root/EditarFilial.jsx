import { useEffect, useState } from "react";
import React from 'react';
import './editarempresa.css';
import axios from "axios";
function EditarFilial({ setTela }) {


    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [CNPJ, setCNPJ] = useState("");
    const [endereco, setEndereco] = useState("");
    const [edit, setEdit] = useState(false);
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
            <h1 className="has-text-black is-size-4" >Painel da Filial</h1>
            <form className="is-flex is-justify-content-space-around is-flex-direction-column is-flex is-align-items-center" style={{ borderRadius: '50px', backgroundColor: "rgb(230, 230, 230)" }}>
                <div className='is-flex is-flex-direction-column' style={{ marginTop: '30px', width:'50%' }}>
                    <h1 className="has-text-black is-size-4" style={{ textAlign: 'center', marginBottom: '30px' }} >Dados das Filiais</h1>
                    <div class="columns m-3">
                        <div class="card" style={{width:'200%'}}>
                            <header class="card-header">
                                <p class="card-header-title">vizualizar Filial</p>
                                <button class="card-header-icon" aria-label="more options">
                                    <span class="icon">
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </header>
                            <details>
                                <summary>Clique aqui</summary>
                                <div class="card-content">
                                    <div class="content">
                                        <div class="columns m-3">
                                            <div class="column is-half">
                                                <div className="field" >
                                                    <label htmlFor="email" className="label has-text-black">Nome da Filial: </label>
                                                    <div className="">
                                                        <input                       
                                                            type="text"
                                                            value={nome}
                                                            disabled={!edit}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="CNPJ" className="label has-text-black">CNPJ: </label>
                                                    <div className="">
                                                        <input                                                          type="text"
                                                            value={CNPJ}
                                                            disabled={!edit}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="field">
                                                    <label htmlFor="Telefone" className="label has-text-black">Telefone: </label>
                                                    <div className="">
                                                        <input                                                          type="text"
                                                            value={telefone}
                                                            disabled={!edit}
                                                            />
                                                    </div>
                                                </div>

                                                <div className="field">
                                                    <label htmlFor="Email" className="label has-text-black">Email: </label>
                                                    <div className="">
                                                        <input                                                          type="text"
                                                            value={email}
                                                            disabled={!edit}
                                                            />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='column is-half'>
                                                <h5 className="has-text-black is-size-4" style={{ width: '200%', textAlign: 'left', marginBottom: '30px' }} >Localização Matriz</h5>
                                                <div className="field">
                                                    <label htmlFor="cep" className="label has-text-black">CEP: </label>
                                                    <div className="">
                                                        <input                                                          type="text"
                                                            value={""}
                                                            disabled={!edit}
                                                            />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="nome" className="label has-text-black">Cidade: </label>
                                                    <div className="">
                                                        <input                                                          type="text"
                                                            value={""}
                                                            disabled={!edit}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="Rua" className="label has-text-black">Rua: </label>
                                                    <div className="">
                                                        <input                                                          type="text"
                                                            value={""}
                                                            disabled={!edit}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="numero" className="label has-text-black">Número: </label>
                                                    <div className="">
                                                        <input                                                          type="text"
                                                            value={""}
                                                            disabled={!edit}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                        {edit && <button type="submit" onClick={e => handleAtualizarDados(e)} className="button is-primary">Atualizar dados</button>}
                        {edit === false && <button type="submit" onClick={handleEdit} className="button is-primary">Editar dados</button>}
                    </div>
                    <div className="control">
                        {edit && <button onClick={e => handleCancelarEditar(e)} className="button">Cancelar</button>}
                    </div>
                </div>
                            </details>

                            
                        </div>
                    </div>
                </div>

                <div className='is-flex is-flex-direction-column' style={{ marginTop: '30px', width:'50%' }}>
                    <h1 className="has-text-black is-size-4" style={{ textAlign: 'center', marginBottom: '30px' }} >Cadastro de Filial</h1>
                    <div class="columns m-3">
                        <div class="card" style={{width:'200%'}}>
                            <header class="card-header">
                                <p class="card-header-title">Cadastrar Filial</p>
                                <button class="card-header-icon" aria-label="more options">
                                    <span class="icon">
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </header>
                            <details>
                                <summary>Clique aqui</summary>
                                <div class="card-content">
                                    <div class="content">
                                        <div class="columns m-3">
                                            <div class="column is-half">
                                                <div className="field" >
                                                    <label htmlFor="email" className="label has-text-black">Nome da Filial: </label>
                                                    <div className="">
                                                        <input />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="CNPJ" className="label has-text-black">CNPJ: </label>
                                                    <div className="">
                                                        <input />
                                                    </div>
                                                </div>

                                                <div className="field">
                                                    <label htmlFor="Telefone" className="label has-text-black">Telefone: </label>
                                                    <div className="">
                                                        <input />
                                                    </div>
                                                </div>

                                                <div className="field">
                                                    <label htmlFor="Email" className="label has-text-black">Email: </label>
                                                    <div className="">
                                                        <input />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='column is-half'>
                                                <h5 className="has-text-black is-size-4" style={{ width: '200%', textAlign: 'left', marginBottom: '30px' }} >Localização Matriz</h5>
                                                <div className="field">
                                                    <label htmlFor="cep" className="label has-text-black">CEP: </label>
                                                    <div className="">
                                                        <input />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="nome" className="label has-text-black">Cidade: </label>
                                                    <div className="">
                                                        <input />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="Rua" className="label has-text-black">Rua: </label>
                                                    <div className="">
                                                        <input />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="numero" className="label has-text-black">Número: </label>
                                                    <div className="">
                                                        <input />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    <div className='is-flex is-align-items-center is-justify-content-center'>
                                        <button className="button is-primary" style={{ margin: '2%' }}onClick={() =>('')}>Salvar</button>
                                        <button className="button is-danger" style={{ margin: '2%' }} onClick={() => ('')}>Cancelar</button>
                                        <button className="button editar" style={{ margin: '2%' }} onClick={() => setTela('Home')}>voltar</button>

                                    </div>
                            </details>

                            
                        </div>
                    </div>
                </div>
            </form>

        </body >
    );
}
export default EditarFilial;