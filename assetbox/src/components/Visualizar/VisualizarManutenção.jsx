import React, { useState, useEffect } from 'react';
import "./visualizar.css";
import docadd from "./docadd.png"
import axios from 'axios';

function VisualizarManutencao({ setTela }) {
  const [dadosManutencao, setDadosManutencao] = useState({})
  const [carregando, setCarregando] = useState(true);

  const [manAtividade, setManAtividade] = useState('');
  const [manData, setManData] = useState(new Date());
  const [manHorario, setManHorario] = useState('');
  const [manResponsavel, setManResponsavel] = useState('');
  const [manObservacoes, setManObservacoes] = useState('');
  const [manCep, setManCep] = useState('');
  const [manRua, setManRua] = useState('');
  const [manNumero, setManNumero] = useState('');
  const [manCidade, setManCidade] = useState('');
  const [manBairro, setManBairro] = useState('');
  const [manUf, setManUf] = useState('');


  const id = localStorage.getItem('id');

  const todos_status = ["AGUARDANDO_MANUTENCAO", "EM_MANUTENCAO", "ADIADA", "CANCELADA", "CONCLUIDA"];
  const [status, setStatus] = useState("");

  const [edit, setEdit] = useState(false);
  const handleEdit = () => edit ? setEdit(false) : setEdit(true);
  const handleAtualizarStatus = () => {
    try {
      dadosManutencao.man_status = status;
      dadosManutencao.man_atividade = manAtividade;
      dadosManutencao.man_data = manData;
      dadosManutencao.man_horario = manHorario;
      dadosManutencao.man_responsavel = manResponsavel;
      dadosManutencao.man_observacoes = manObservacoes;
      dadosManutencao.man_endereco_id.end_cep = manCep;
      dadosManutencao.man_endereco_id.end_rua = manRua;
      dadosManutencao.man_endereco_id.end_numero = manNumero;
      dadosManutencao.man_endereco_id.end_cidade = manCidade;
      dadosManutencao.man_endereco_id.end_bairro = manBairro;
      dadosManutencao.man_endereco_id.end_uf = manUf;
      const response = axios.put(`http://localhost:8000/manutencoes/${Number(id)}`, dadosManutencao);
      handleEdit();
    } catch (error) {
      window.alert("Ocorreu um erro ao tentar atualizar o status da manutenção!");
      console.log(error)
    }
  }

  const handleCancelarEdicao = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/manutencoes/${Number(id)}`);
      const dados = response.data;
      setDadosManutencao(dados);
      setStatus(String(todos_status.indexOf(dados.man_status)));
      setManAtividade(dados.man_atividade)
      setManData(dados.man_data)
      setManHorario(dados.man_horario)
      setManResponsavel(dados.man_responsavel)
      setManObservacoes(dados.man_observacoes)
      setManCep(dados.man_endereco_id.end_cep)
      setManRua(dados.man_endereco_id.end_rua)
      setManNumero(dados.man_endereco_id.end_numero)
      setManCidade(dados.man_endereco_id.end_cidade)
      setManBairro(dados.man_endereco_id.end_bairro)
      setManUf(dados.man_endereco_id.end_uf)
    } catch (error) {
      console.error(`Erro ao buscar dados da manutenção ${id}:`, error);
    }
    handleEdit();
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log("Id:", id);
      try {
        const response = await axios.get(`http://localhost:8000/manutencoes/${Number(id)}`);
        const dados = response.data;
        setCarregando(false);
        setDadosManutencao(dados);
        setStatus(String(todos_status.indexOf(dados.man_status)));
        setManAtividade(dados.man_atividade)
        setManData(dados.man_data)
        setManHorario(dados.man_horario)
        setManResponsavel(dados.man_responsavel)
        setManObservacoes(dados.man_observacoes)
        setManCep(dados.man_endereco_id.end_cep)
        setManRua(dados.man_endereco_id.end_rua)
        setManNumero(dados.man_endereco_id.end_numero)
        setManCidade(dados.man_endereco_id.end_cidade)
        setManBairro(dados.man_endereco_id.end_bairro)
        setManUf(dados.man_endereco_id.end_uf)
      } catch (error) {
        console.error(`Erro ao buscar dados da manutenção ${id}:`, error);
      }
    };

    fetchData();
  }, []);
  function exibirPopUpDelecao() {
    var popup = document.getElementById('popupdelecao');
    if (popup.style.display === 'none') {
      popup.style.display = 'block';
    } else {
      popup.style.display = 'none';
    }
  }
  function exibirPopUpConfirmacao() {
    var popup = document.getElementById('popupconfirmacao');
    if (popup.style.display === 'none') {
      popup.style.display = 'block';
    } else {
      popup.style.display = 'none';
    }
  }


  function handleDelete(id) {
    axios.delete(`http://localhost:8000/manutencoes/${id}`)
      .then((resposta) => {
        console.log(resposta.data);
        window.location.reload()
      })
      .catch((error) => {
        console.error("Erro ao deletar a manutenção:", error);
      });
  }

  if (carregando) {
    <div>Carregando...</div>
  } else {
    return (
      <body>
        <div class='page-full'>
          <div class='field'>
            <h2>Manutenção do Ativo: {dadosManutencao.man_ativo_id.ati_titulo}</h2>
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
                      value={manAtividade}
                      onChange={e => setManAtividade(e.target.value)}
                      disabled={!edit}

                    />
                  </div>
                  <div class="field column">
                    <label class="form-label">Status</label><br />
                    <div class="select is-small">
                      <select class="is-hovered" disabled={!edit} on onChange={e => setStatus(e.target.value)}>
                        {
                          dadosManutencao.man_status === "AGUARDANDO_MANUTENCAO" ? <option value="0" selected>Aguardando Manutenção</option> : <option value="0">Aguardando Manutenção</option>
                        }
                        {
                          dadosManutencao.man_status === "EM_MANUTENCAO" ? <option value="1" selected>Em Manutenção</option> : <option value="1">Em Manutenção</option>
                        }
                        {
                          dadosManutencao.man_status === "ADIADA" ? <option value="2" selected>Adiada</option> : <option value="2">Adiada</option>
                        }
                        {
                          dadosManutencao.man_status === "CANCELADA" ? <option value="3" selected>Cancelada</option> : <option value="3">Cancelada</option>
                        }
                        {
                          dadosManutencao.man_status === "CONCLUIDA" ? <option value="4" selected>Concluída</option> : <option value="4">Concluída</option>
                        }
                      </select>
                    </div>
                  </div>
                </div>

                <div className='columns'>
                  <div class="field column">
                    <label class="form-label">Localização do ativo</label><br />
                    <div class="select is-small">
                      <select class="is-hovered" value={dadosManutencao.man_ativo_id.ati_localizacao_id} disabled>
                        <option>{dadosManutencao.man_ativo_id.ati_localizacao_id?.loc_titulo}</option>
                        <option></option>
                      </select>
                    </div>
                  </div>

                </div>


                <div className="field" >
                  <label className="form-label">Responsável da manutenção</label>
                  <input
                    class="input is-small"
                    type="text"
                    value={manResponsavel}
                    onChange={e => setManResponsavel(e.target.value)}
                    disabled={!edit}
                  />
                </div>


                <div className="field" >
                  <label className="form-label">Titulo do ativo</label>
                  <input
                    class="input is-small"
                    type="text"
                    value={dadosManutencao.man_ativo_id.ati_titulo}
                    disabled
                  />
                </div>

                <div className="field" >
                  <label className="form-label">Observações</label>

                  <input
                    class="input is-small"
                    type="text"
                    rows="4"
                    value={manObservacoes}
                    placeholder={manObservacoes === null || manObservacoes === undefined || manObservacoes === "" ? "Sem observações" : manObservacoes}
                    onChange={e => setManObservacoes(e.target.value)}
                    disabled={!edit}
                  />
                </div>
              </form>
            </div>
            <div className='column is-half'>
              <div className="field column" >
                <label className="form-label">Horário</label>

                <input
                  class="input is-small"
                  type="time"
                  value={manHorario}
                  onChange={e => setManHorario(e.target.value)}
                  disabled={!edit}
                />
              </div>
              <div className="field column" >
                <label className="form-label">Data</label>

                <input
                  class="input is-small"
                  type="text"
                  value={new Date(manData).toDateString()}
                  onChange={e => setManData(e.target.value)}
                  disabled={!edit}
                />
              </div>
              <div className="field column" >
                <label className="form-label">ID do ativo</label>

                <input
                  class="input is-small"
                  type="text"
                  value={dadosManutencao.man_ativo_id.ati_id}
                  disabled={!edit}

                />
              </div>
            </div>
          </div>

          <h1 className='has-text-weight-light'>Endereço da manutenção</h1>

          <div class="mid-page" >

            <div class="columns m-3">
              <div class="column">
                <div className='columns'>

                  <div className="field column" >
                    <label className="form-label">CEP</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={manCep}
                      onChange={e => setManCep(e.target.value)}
                      disabled={!edit}

                    />
                  </div>

                  <div className="field column" >
                    <label className="form-label">Rua</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={manRua}
                      onChange={e => setManRua(e.target.value)}
                      disabled={!edit}
                    />
                  </div>

                  <div className="field column" >
                    <label className="form-label">Número</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={manNumero}
                      onChange={e => setManNumero(e.target.value)}
                      disabled={!edit}
                    />
                  </div>
                </div>

                <div className='columns'>
                  <div className="field column" >
                    <label className="form-label">Cidade</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={manCidade}
                      onChange={e => setManCidade(e.target.value)}
                      disabled={!edit}

                    />
                  </div>
                  <div className="field column" >
                    <label className="form-label">Bairro</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={manBairro}
                      onChange={e => setManBairro(e.target.value)}
                      disabled={!edit}
                    />
                  </div>
                  <div className="field column" >
                    <label className="form-label">UF</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={manUf}
                      onChange={e => setManUf(e.target.value)}
                      disabled={!edit}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-grouped is-grouped-centered">
              {!edit &&
                <>
                  <p class="control">
                    <button class="button is-danger" type="submit" onClick={exibirPopUpDelecao}>
                      Deletar
                    </button>
                  </p>
                  <p class="control">
                    <button class="button is-light" onClick={handleEdit}>
                      Atualizar status
                    </button>
                  </p>
                  <p class="control">
                    <button class="button is-light" onClick={() => setTela('Ativos')}>
                      Voltar
                    </button>
                  </p>
                </>
              }
              {edit &&
                <>
                  <p class="control">
                    <button class="button is-light" onClick={handleAtualizarStatus}>
                      Confirmar atualização
                    </button>
                  </p>
                  <p class="control">
                    <button class="button is-danger" type="submit" onClick={handleCancelarEdicao}>
                      Cancelar
                    </button>
                  </p>
                </>
              }
            </div>

          </div>
          <div id='popupdelecao' style={{ display: 'none', height: '200px', backgroundColor: '#FFFFFF', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '50%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px' }}>
            <p className='is-size-4-desktop is-size-6-mobile has-text-weight-bold' style={{ color: '#3A7D8E' }}>Tem certeza de que quer deletar este Ativo?</p>
            <div className='is-flex  is-justify-content-space-evenly'>
              <button className='has-text-white is-size-4 p-3 mt-3 ' style={{ backgroundColor: '#C21D1D', borderRadius: '40px' }} onClick={() => handleDelete(id)}>
                <p className='is-size-4-desktop is-size-6-mobile' onClick={handleDelete}>Cancelar Manutenção</p>
              </button>
              <button className='has-text-white is-size-4 p-3 mt-3' style={{ backgroundColor: '#959292', borderRadius: '40px', }} onClick={exibirPopUpDelecao}>
                <p className='is-size-4-desktop is-size-6-mobile'>Voltar</p>
              </button>
            </div>
          </div>
          <div id='popupconfirmacao' style={{ display: 'none', height: '200px', backgroundColor: '#367E90', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '40%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px' }}>
            <p className='has-text-white is-size-3-desktop is-size-4-mobile'>manutenção cancelada com sucesso!</p>
            <button className='has-text-white is-size-4 p-3 mt-3' style={{ marginLeft: '60%', backgroundColor: '#459EB5', borderRadius: '100%' }}>
              <p className='is-size-4' onClick={() => setTela('Manutenção')}>OK</p>
            </button>
          </div>
        </div>
      </body>
    );
  }
}

export default VisualizarManutencao;
