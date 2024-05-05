import React, { useState, useEffect } from 'react';
import "./editar.css";
import axios from 'axios';

function EditarManutencao({ setTela }) {

    const [dadosManutencao, setDadosManutencao] = useState({});
    const [carregando, setCarregando] = useState(true);

    const id = localStorage.getItem('id');

    useEffect(() => {
        const fetchData = async () => {
            console.log("Id:", id);
            try {
                const response = await axios.get(`http://localhost:8000/manutencoes/${Number(id)}`);
                const dados = response.data;
                console.log(dados)
                setCarregando(false);
                setDadosManutencao(dados);
            } catch (error) {
                console.error(`Erro ao buscar dados da manutenção ${id}:`, error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDadosManutencao({ ...dadosManutencao, [name]: value });
    };

    const handleUpdate = () => {
        axios.put(`http://localhost:8000/manutencoes/${id}`, dadosManutencao)
            .then((resposta) => {
                console.log(resposta.data);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Erro ao atualizar a manutenção:", error);
            });
    };

    function exibirPopUpConfirmacao() {
        var popup = document.getElementById('popupconfirmacao');
        if (popup.style.display === 'none') {
            popup.style.display = 'block';
        } else {
            popup.style.display = 'none';
        }
    }


    if (carregando) {
        return <div>Carregando...</div>;
    } else {
        return (
            <body>
                <div class='page-full'>
                    <div class='field'>
                        <h2>{dadosManutencao.man_atividade}</h2>
                    </div>
                    <h1 className='has-text-weight-light'>Dados</h1>
                    <div class="columns m-3">

                        <div class="column is-half">
                            <form>
                                <div className='columns'>
                                    <div class="field column ">
                                        <label class="form-label">Atividade</label>
                                        <input
                                            class="input is-small"
                                            type="text"
                                            name="man_atividade"
                                            value={dadosManutencao.man_atividade}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div class="field column">
                                        <label class="form-label">Status</label><br />
                                        <div class="select is-small">
                                            <select class="is-hovered" value={dadosManutencao.man_id} disabled>
                                                <option value={dadosManutencao.man_status}>{dadosManutencao.man_status}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className='columns'>
                                    <div class="field column">
                                        <label class="form-label">Localização</label><br />
                                        <div class="select is-small">
                                            <select class="is-hovered" value={dadosManutencao.man_ativo_id.ati_localizacao_id} disabled>
                                                <option>{dadosManutencao.man_ativo_id.ati_localizacao_id?.loc_titulo}</option>
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>

                                </div>


                                <div className="field" >
                                    <label className="form-label">Responsavel</label>
                                    <input
                                        class="input is-small"
                                        type="text"
                                        value={dadosManutencao.man_responsavel}
                                        disabled
                                    />
                                </div>


                                <div className="field" >
                                    <label className="form-label">Titulo</label>
                                    <input
                                        class="input is-small"
                                        type="text"
                                        value={dadosManutencao.man_ativo_id.ati_titulo}
                                        disabled
                                    />
                                </div>

                                <div className="field" >
                                    <label className="form-label">Complemento</label>

                                    <input
                                        class="input is-small"
                                        type="text"
                                        rows="4"
                                        value={dadosManutencao.man_ativo_id.ati_complemento}
                                        disabled
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    <h1 className='has-text-weight-light'>Características</h1>

                    <div class="mid-page" >

                        <div class="columns m-3">


                            <div class="column">
                                <div className='columns'>
                                    <div className="field column" >
                                        <label className="form-label">Horário</label>

                                        <input
                                            class="input is-small"
                                            type="text"
                                            value={dadosManutencao.man_horario}
                                            disabled
                                        />
                                    </div>
                                    <div className="field column" >
                                        <label className="form-label">Data</label>

                                        <input
                                            class="input is-small"
                                            type="text"
                                            value={new Date(dadosManutencao.man_data).toDateString()}
                                            disabled
                                        />
                                    </div>
                                    <div className="field column" >
                                        <label className="form-label">ID do ativo</label>

                                        <input
                                            class="input is-small"
                                            type="text"
                                            value={dadosManutencao.man_ativo_id.ati_id}
                                            disabled

                                        />
                                    </div>
                                    <div className="field column" >
                                        <label className="form-label">Cidade</label>

                                        <input
                                            class="input is-small"
                                            type="text"
                                            value={dadosManutencao.man_endereco_id.end_cidade}
                                            disabled

                                        />
                                    </div>
                                </div>

                                <div className='columns'>
                                    <div className="field column" >
                                        <label className="form-label">CEP</label>

                                        <input
                                            class="input is-small"
                                            type="text"
                                            value={dadosManutencao.man_endereco_id.end_cep}
                                            disabled

                                        />
                                    </div>

                                    <div className="field column" >
                                        <label className="form-label">Estado</label>

                                        <input
                                            class="input is-small"
                                            type="text"
                                            value={dadosManutencao.man_endereco_id.end_uf}
                                            disabled

                                        />
                                    </div>
                                    <div className="field column" >
                                        <label className="form-label">Rua</label>

                                        <input
                                            class="input is-small"
                                            type="text"
                                            value={dadosManutencao.man_endereco_id.end_rua}
                                            disabled
                                        />
                                    </div>

                                </div>

                                <div className='columns'>
                                    <div className="field column" >
                                        <label className="form-label">Bairro</label>

                                        <input
                                            class="input is-small"
                                            type="text"
                                            value={dadosManutencao.man_endereco_id.end_bairro}
                                            disabled
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="field is-grouped is-grouped-centered">
                            <p class="control">
                                <button class="button is-light" onClick={() => setTela('Ativos')}>
                                    Voltar
                                </button>
                            </p>

                            <p class="control">
                                <button class="button is-light" onClick={handleUpdate && exibirPopUpConfirmacao}>
                                    Salvar Alterações
                                </button>
                            </p>
                        </div>
                    </div>


                    <div id='popupconfirmacao' style={{ display: 'none', height: '200px', backgroundColor: '#367E90', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '40%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px' }}>
                        <p className='has-text-white is-size-3-desktop is-size-4-mobile'>manutenção alterada com sucesso!</p>
                        <button className='has-text-white is-size-4 p-3 mt-3' style={{ marginLeft: '60%', backgroundColor: '#459EB5', borderRadius: '100%' }}>
                            <p className='is-size-4' onClick={() => setTela('Manutenção')}>OK</p>
                        </button>
                    </div>
                </div>
            </body >
        );
    }
}

export default EditarManutencao;
