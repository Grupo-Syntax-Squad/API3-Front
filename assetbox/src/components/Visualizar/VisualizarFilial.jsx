import { useEffect, useState } from "react";
import React from 'react';
import Filtro from '../../assets/img/filtro.svg';
import axios from "axios";

function VisualizarFilial({ setTela }) {
    const [nome, setNome] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [edit, setEdit] = useState(false);
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [cidade, setCidade] = useState("");
    const id = localStorage.getItem('id');
    const [endereco, setEndereco] = useState ([]);

    const handleEdit = () => edit ? setEdit(false) : setEdit(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/filiais/${id}`);
                const data = response.data;
                setNome(data.fil_nome);
                setEmail(data.fil_email);
                setTelefone(data.fil_telefone);
                setCnpj(data.fil_cnpj);
                setCep(data.fil_cep);  
                setRua(data.fil_rua);  
                setNumero(data.fil_numero); 
                setCidade(data.fil_cidade);
                setEndereco(data.fil_endereco)
            } catch (error) {
                console.log("Erro:", error);
                setTela("Home");
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
                fil_telefone: telefone,
                fil_cnpj: cnpj,
                fil_cep: cep, 
                fil_rua: rua, 
                fil_numero: numero,  
                fil_cidade: cidade  
            };

            const response = await axios.put(`http://localhost:8000/filiais/${id}`, dataPUT);
            handleEdit();
        } catch (error) {
            if (error.response.status == 400) window.alert(error.response.data);
            else window.alert("Ocorreu algum erro no sistema!");
        }
    }

    const handleCancelarEditar = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:8000/filiais/${id}`);
            const data = response.data;
            setNome(data.fil_nome);
            setEmail(data.fil_email);
            setTelefone(data.fil_telefone);
            setCnpj(data.fil_cnpj);
            setCep(data.fil_cep); 
            setRua(data.fil_rua);  
            setNumero(data.fil_numero); 
            setCidade(data.fil_cidade);  
        } catch (error) {
            console.log("Erro:", error);
            setTela("Home");
        }

        handleEdit();
    }

    return (
        <div className="columns m-3 h-screen">
            <div className="card" style={{ width: '200%' }}>
                <header className="card-header">
                    <p className="card-header-title">Visualizar Filial</p>
                    <button className="card-header-icon" aria-label="more options">
                        <span className="icon">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </header>

                <div className="card-content">
                    <div className="content">
                        <div className="columns m-3">
                            <div className="column is-half">
                                <div className="field">
                                    <label htmlFor="email" className="label has-text-black">Nome da Filial: </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            value={nome}
                                            disabled={!edit}
                                            onChange={e => setNome(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="CNPJ" className="label has-text-black">CNPJ: </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            value={cnpj}
                                            disabled={!edit}
                                            onChange={e => setCnpj(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="Telefone" className="label has-text-black">Telefone: </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            value={telefone}
                                            disabled={!edit}
                                            onChange={e => setTelefone(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="Email" className="label has-text-black">Email: </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            value={email}
                                            disabled={!edit}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="column is-half">
                                <h5 className="has-text-black is-size-4" style={{ width: '200%', textAlign: 'left', marginBottom: '30px' }}>Localização Matriz</h5>
                                <div className="field">
                                    <label htmlFor="cep" className="label has-text-black">CEP: </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            value={endereco.end_cep}
                                            disabled={!edit}
                                            onChange={e => setCep(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="nome" className="label has-text-black">Cidade: </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            value={endereco.end_cidade}
                                            disabled={!edit}
                                            onChange={e => setCidade(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="Rua" className="label has-text-black">Rua: </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            value={endereco.end_rua}
                                            disabled={!edit}
                                            onChange={e => setRua(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="numero" className="label has-text-black">Número: </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            value={endereco.end_numero}
                                            disabled={!edit}
                                            onChange={e => setNumero(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                        {edit && <button type="submit" onClick={handleAtualizarDados} className="button is-primary">Atualizar dados</button>}
                        {!edit && <button type="submit" onClick={handleEdit} className="button is-primary">Editar dados</button>}
                    </div>
                    <div className="control">
                        {edit && <button onClick={handleCancelarEditar} className="button">Cancelar</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualizarFilial;