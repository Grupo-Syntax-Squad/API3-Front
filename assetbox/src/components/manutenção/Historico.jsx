import React, { useState, useEffect } from 'react';
import './historico.css';
import axios from 'axios';

const Historico = ({ setTela, ativoId }) => {
    const [manutencoes, setManutencoes] = useState([]);
    const id = localStorage.getItem('id');
    const [ativo, setAtivo] = useState(null); // Para armazenar os detalhes do ativo

    useEffect(() => {
        axios.get('http://localhost:8000/historicosManutencao')
            .then(response => {
                setManutencoes(response.data);
            })
            .catch(error => {
                console.error('Houve um erro ao buscar as manutenções!', error);
            });
    }, []);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/ativos/${id}`)
                .then(response => {
                    setAtivo(response.data);
                })
                .catch(error => {
                    console.error('Houve um erro ao buscar os detalhes do ativo!', error);
                });
        }
    }, [id]);

    console.log("Manutencoes:", manutencoes);
    console.log("Ativo ID:", ativo);

    return (
        <div className="tela columns">
            <div className="listas column">
                <button className="button is-light" onClick={() => setTela('Ativos')}>Voltar</button>
                {ativo && (
                    <div>
                        <h2>Detalhes do Ativo</h2>
                        <p>Titulo: {ativo.ati_titulo}</p>
                        <p>ID: {ativo.ati_id}</p>
                        <p>Numero de Série: {ativo.ati_numero_serie}</p>
                    </div>
                )}
                <label className="textarea tela-content">
                    <div>
                        <h2>Manutenções</h2>
                        {manutencoes.map((manut, index) => (
                            // Verifica se o ID do ativo dentro de man_ativo_id é igual ao ID do ativo atual
                            manut.his_ativo_id && manut.his_ativo_id.ati_id === ativo.ati_id && (
                                <div key={index}>
                                    <strong>Data da manutenção:</strong>{manut.man_data}<br/>
                                    <strong>Horario da manutenção:</strong>{manut.man_horario}<br/>
                                    <strong>Descrição da Manutenção:</strong> {manut.man_atividade}<br />
                                    <strong>Status:</strong> {manut.man_status}<br />
                                    <strong>Responsável:</strong> {manut.man_responsavel}<br />
                                    <br></br>
                                </div>
                            )
                        ))}
                    </div>
                </label>
            </div>
        </div>
    );
};

export default Historico;
