import React, { useState, useEffect } from 'react';
import "./visualizar.css";
import docadd from "./docadd.png"
import axios from 'axios';

function VisualizarManutencao({ setTela }) {

  const [dadosManutencao, setDadosManutencao] = useState({})
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
            <h2>{dadosManutencao.man_titulo}</h2>
          </div>
          <h1 className='has-text-weight-light'>Dados</h1>
          <div class="columns m-3">

            <div class="column is-half">
              <form>
                <div className='columns'>

                  <div class="field column ">
                    <label class="form-label">atividade</label>
                    <input
                      class="input is-small"
                      type="text"
                      value={dadosManutencao.man_atividade}
                      disabled

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
                      <select class="is-hovered" value={dadosManutencao.ati_localizacao_id} disabled>
                        <option>{dadosManutencao.ati_localizacao_id?.loc_titulo}</option>
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
                    value={dadosManutencao.ati_titulo}
                    disabled
                  />
                </div>

                <div className="field" >
                  <label className="form-label">Complemento</label>

                  <input
                    class="input is-small"
                    type="text"
                    rows="4"
                    value={dadosManutencao.man_complemento}
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
                    <label className="form-label">horario</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosManutencao.man_horario}
                      disabled
                    />
                  </div>
                  <div className="field column" >
                    <label className="form-label">data</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosManutencao.man_data}
                      disabled
                    />
                  </div>
                  <div className="field column" >
                    <label className="form-label"> ativo id</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosManutencao.man_ativo_id}
                      disabled

                    />
                  </div>
                  <div className="field column" >
                    <label className="form-label"> cidade</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosManutencao.man_cidade}
                      disabled

                    />
                  </div>
                </div>

                <div className='columns'>
                  <div className="field column" >
                    <label className="form-label">cep</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosManutencao.man_cep}
                      disabled

                    />
                  </div>

                  <div className="field column" >
                    <label className="form-label">estado</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosManutencao.man_uf}
                      disabled

                    />
                  </div>
                  <div className="field column" >
                    <label className="form-label">rua</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosManutencao.man_rua}
                      disabled
                    />
                  </div>

                </div>

                <div className='columns'>
                  <div className="field column" >
                    <label className="form-label">bairro</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosManutencao.man_bairro}
                      disabled
                    />
                  </div>
                </div>

              </div>
            </div>

            <div class="field is-grouped is-grouped-centered">
              <p class="control">
                <button class="button is-danger" type="submit" onClick={exibirPopUpDelecao}>
                  Deletar
                </button>

              </p>
              <p class="control">
                <button class="button is-light" onClick={() => setTela('Ativos')}>
                  Voltar
                </button>
              </p>
            </div>

          </div>
          <div id='popupdelecao' style={{ display: 'none', height: '200px', backgroundColor: '#FFFFFF', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '50%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px' }}>
            <p className='is-size-4-desktop is-size-6-mobile has-text-weight-bold' style={{ color: '#3A7D8E' }}>Tem certeza de que quer deletar este Ativo?</p>
            <div className='is-flex  is-justify-content-space-evenly'>
              <button className='has-text-white is-size-4 p-3 mt-3 ' style={{ backgroundColor: '#C21D1D', borderRadius: '40px' }} onClick={() => handleDelete(id)}>
                <p className='is-size-4-desktop is-size-6-mobile' onClick={handleDelete}>Deletar</p>
              </button>
              <button className='has-text-white is-size-4 p-3 mt-3' style={{ backgroundColor: '#959292', borderRadius: '40px', }} onClick={exibirPopUpDelecao}>
                <p className='is-size-4-desktop is-size-6-mobile'>Cancelar</p>
              </button>
            </div>
          </div>
          <div id='popupconfirmacao' style={{ display: 'none', height: '200px', backgroundColor: '#367E90', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '40%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px' }}>
            <p className='has-text-white is-size-3-desktop is-size-4-mobile'>Ativo deletado com sucesso!</p>
            <button className='has-text-white is-size-4 p-3 mt-3' style={{ marginLeft: '60%', backgroundColor: '#459EB5', borderRadius: '100%' }}>
              <p className='is-size-4' onClick={() => setTela('Ativos')}>OK</p>
            </button>
          </div>
        </div>
      </body>
    );
  }
}

export default VisualizarManutencao;
