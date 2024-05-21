import { useEffect, useState } from "react";
import React from 'react';
import Filtro from '../../assets/img/filtro.svg';
import axios from "axios";

function VisualizarFilial({ setTela }) {
    const [nome, setNome] = useState("");
    const [CNPJ, setCNPJ] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [edit, setEdit] = useState(false);
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [cidade, setCidade] = useState("");

    const [endereco, setEndereco] = useState ([]);

    const handleEdit = () => setEdit(true);
    const handleCancelarEditar = () => setEdit(false);
    const handleAtualizarDados = (e) => {
        e.preventDefault();
        // Adicione aqui a lógica para atualizar os dados
        setEdit(false);
    };

    return (
        <div className="columns m-3">
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
                                                value={CNPJ}
                                                disabled={!edit}
                                                onChange={e => setCNPJ(e.target.value)}
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
                                                value={""}
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
                                                value={""}
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
                                                value={""}
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
                                                value={""}
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

