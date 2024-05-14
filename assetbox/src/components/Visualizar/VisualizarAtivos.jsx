import React, { useState, useEffect } from 'react';
import "./visualizar.css";
import axios from 'axios';

function VisualizarAtivos({ setTela }) {
  const [dadosAtivo, setDadosAtivo] = useState({})
  const [imageUrl, setImageUrl] = useState(null);
  const [docUrl, setDocument] = useState(null)
  const [carregando, setCarregando] = useState(true);
  const id = localStorage.getItem('id');
  const [ativoId, setAtivoId] = useState(null);


  const todos_status = ["AGUARDANDO_MANUTENCAO", "EM_MANUTENCAO", "ADIADA", "CANCELADA", "CONCLUIDA"];
  const [status, setStatus] = useState("");


  const [edit, setEdit] = useState(false);
  const handleEdit = () => edit ? setEdit(false) : setEdit(true);
  const handleAtualizarStatus = () => {
    /* try {
      dadosManutencao.man_status = status;
      const response = axios.put(`http://localhost:8000/manutencoes/${Number(id)}`, dadosManutencao);
      console.log(response.status, response.data);
      handleEdit();
    } catch (error) {
      window.alert("Ocorreu um erro ao tentar atualizar o status da manutenção!");
      console.log(error)
    } */
  }


  useEffect(() => {
    const fetchData = async () => {
      console.log("Id:", id);
      try {
        const response = await axios.get(`http://localhost:8000/ativos/${Number(id)}`);
        const dados = response.data;
        setDadosAtivo(dados);
        if (dados.ati_imagem_id != null) {
          setImageUrl(`http://localhost:8000/imagens/${dados.ati_imagem_id.img_id}`);
        }
        if (dados.ati_documento_id != null){
          setDocument(`http://localhost:8000/documentos/${dados.ati_documento_id.documento_id}`)
        }
        console.log(dados)
        setCarregando(false);
      } catch (error) {
        console.error(`Erro ao buscar dados do ativo ${id}:`, error);
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

  const handleHistoricoClick = () => {
    setAtivoId(id);
    setTela('VisualizarHistManut');
  };

  function handleDelete(id) {
    axios.delete(`http://localhost:8000/ativos/${id}`)
      .then((resposta) => {
        console.log(resposta.data);
        window.location.reload()
      })
      .catch((error) => {
        console.error("Erro ao deletar ativo:", error);
      });
  }

  if (carregando) {
    <div>Carregando...</div>
  } else {
    return (
      <body>
        <div class='page-full'>
          <div class='field'>
            <h2>{dadosAtivo.ati_titulo}</h2>
          </div>
          <h1 className='has-text-weight-light'>Dados</h1>
          <div class="columns m-3">

            <div class="column is-half has-text-centered">
              {imageUrl == null ? <div>Ativo sem imagem</div> : <img src={imageUrl} alt="Ativo" style={{ width: '200px', height: '200px' }} />}
            </div>

            <div class="column is-half">
              <form>
                <div className='columns'>

                  <div class="field column ">
                    <label class="form-label">Número</label>
                    <input
                      class="input is-small"
                      type="text"
                      value={dadosAtivo.ati_numero}
                      disabled={!edit}

                    />
                  </div>
                  <div class="field column">
                    <label class="form-label">Tipo</label><br />
                    <div class="select is-small">
                      <select class="is-hovered" value={dadosAtivo.ati_tipo_id} disabled={!edit}>
                        <option value={dadosAtivo.ati_tipo_id?.tip_id}>{dadosAtivo.ati_tipo_id?.tip_titulo}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className='columns'>
                  <div class="field column">
                    <label class="form-label">Localização</label><br />
                    <div class="select is-small">
                      <select class="is-hovered" value={dadosAtivo.ati_localizacao_id} disabled={!edit}>
                        <option>{dadosAtivo.ati_localizacao_id?.loc_titulo}</option>
                        <option></option>
                      </select>
                    </div>
                  </div>
                  <div class="field column">
                    <label class="formn-label">Status</label><br />
                    <div class="select is-small">
                      <select class="is-hovered" on onChange={e => setStatus(e.target.value)} disabled={!edit}>
                        {
                          dadosAtivo.man_status === "AGUARDANDO_MANUTENCAO" ? <option value="0" selected>Aguardando Manutenção</option> : <option value="0">Aguardando Manutenção</option>
                        }
                        {
                          dadosAtivo.man_status === "EM_MANUTENCAO" ? <option value="1" selected>Em Manutenção</option> : <option value="1">Em Manutenção</option>
                        }
                        {
                          dadosAtivo.man_status === "ADIADA" ? <option value="2" selected>Adiada</option> : <option value="2">Adiada</option>
                        }
                        {
                          dadosAtivo.man_status === "CANCELADA" ? <option value="3" selected>Cancelada</option> : <option value="3">Cancelada</option>
                        }
                        {
                          dadosAtivo.man_status === "CONCLUIDA" ? <option value="4" selected>Concluída</option> : <option value="4">Concluída</option>
                        }
                        {/* <option>{dadosAtivo.ati_status}</option>
                        <option></option> */}
                      </select>
                    </div>
                  </div>
                </div>


                <div className="field" >
                  <label className="form-label">Destinatário</label>
                  <input
                    class="input is-small"
                    type="text"
                    value={dadosAtivo.ati_destinatario_id !== null && dadosAtivo.ati_destinatario_id.des_nome !== null ? dadosAtivo.ati_destinatario_id.des_nome : 'ativo sem destinatário'}
                    disabled={!edit}
                  />
                  {/* <div class="select is-small">
                    <select className="is-hovered" style={{ display: 'none' }} value={dadosAtivo.ati_destinatario_id.des_nome} disabled>
                      <option value={dadosAtivo.ati_destinatario_id.des_nome}></option>
                    </select>
                  </div> */}

                </div>


                <div className="field" >
                  <label className="form-label">Titulo</label>
                  <input
                    class="input is-small"
                    type="text"
                    value={dadosAtivo.ati_titulo}
                    disabled={!edit}
                  />
                </div>

                <div className="field" >
                  <label className="form-label">Complemento</label>

                  <input
                    class="input is-small"
                    type="text"
                    rows="4"
                    value={dadosAtivo.ati_complemento}
                    disabled={!edit}
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
                    <label className="form-label">Marca</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosAtivo.ati_marca}
                      disabled={!edit}
                    />
                  </div>
                  <div className="field column" >
                    <label className="form-label">Modelo</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosAtivo.ati_modelo}
                      disabled={!edit}
                    />
                  </div>
                  <div className="field column" >
                    <label className="form-label">Nº de Série</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosAtivo.ati_numero_serie}
                      disabled={!edit}

                    />
                  </div>
                  <div className="field column" >
                    <label className="form-label">Valor de Aquisição</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosAtivo.ati_preco_aquisicao}
                      disabled={!edit}

                    />
                  </div>
                </div>

                <div className='columns'>
                  <div className="field column" >
                    <label className="form-label">Tamanho</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosAtivo.ati_tamanho}
                      disabled={!edit}

                    />
                  </div>

                  <div className="field column" >
                    <label className="form-label">Capacidade</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosAtivo.ati_capacidade}
                      disabled={!edit}

                    />
                  </div>
                  <div className="field column" >
                    <label className="form-label">Quantidade</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosAtivo.ati_quantidade}
                      disabled={!edit}
                    />
                  </div>

                  {/* <div class="field column">
                    <label class="form-label">Fornecedor</label><br />
                    <div class="select is-small">
                      <select class="is-hovered" value={dadosAtivo.ati_localizacao_id} disabled>
                        <option>{dadosAtivo.ati_localizacao_id?.loc_titulo}</option>
                        <option></option>
                      </select>
                    </div>
                  </div> */}
                </div>

                <div className='columns'>
                  <div className="field column" >
                    <label className="form-label">Ano de Fabricação</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosAtivo.ati_ano_fabricacao}
                      disabled={!edit}
                    />
                  </div>
                  <div className="field column " >
                    <label className="form-label">Data de Expiração</label>

                    <input
                      class="input is-small"
                      type="date"
                      value={dadosAtivo.ati_data_expiracao}
                      disabled={!edit}
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="columns m-3">


              <div class='column is-half'>
                <form className='documentos-ativo'>
                  <div className="field" >
                    <label className="form-label">Chave NFe</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosAtivo.ati_chave_nf_e}
                      disabled={!edit}

                    />
                  </div>

                  <div className="field" >
                    <label className="form-label">Url do Ativo</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosAtivo.ati_url}
                      disabled={!edit}

                    />
                  </div>
                  <div className="field" >
                    <label className="form-label">Observações</label>

                    <input
                      class="input is-small"
                      type="text"
                      value={dadosAtivo.ati_observacao}
                      disabled={!edit}
                    />
                  </div>
                </form>
              </div>

              <div className='container'>
                <h1 className='has-text-weight-light'>Manutenção</h1>
                <div class="container column is-half has-text-centered">
                  <button class="button is-info" onClick={handleHistoricoClick}>
                    Histórico de Manutenções
                  </button>
                </div>
              </div>

              <div className='container'>
                <h1 className='has-text-weight-light'>Documentos</h1>
                <div class="container column is-half has-text-centered">
                  {docUrl == null ? <div>Ativo sem documento</div> : <button class="button is-info">
                    Donwload do Documento
                  </button>}
                </div>
              </div>

            </div>

            
            <div class="field is-grouped is-grouped-centered">
              {!edit &&
                <>
                  <p class="control">
                <button class="button is-danger" type="submit" onClick={exibirPopUpDelecao}>
                  Desativar Ativo
                </button>

              </p>
                  <p class="control">
                    <button class="button is-light" onClick={handleEdit}>
                      Atualizar Ativo
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
                    <button class="button is-danger" type="submit" onClick={handleEdit}>
                      Cancelar
                    </button>
                  </p>
                </>
              }
            </div>

            

          </div>
          <div id='popupdelecao' style={{ display: 'none', height: '200px', backgroundColor: '#FFFFFF', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '50%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px' }}>
            <p className='is-size-4-desktop is-size-6-mobile has-text-weight-bold' style={{ color: '#3A7D8E' }}>Tem certeza de que quer desativar este Ativo?</p>
            <div className='is-flex  is-justify-content-space-evenly'>
              <button className='has-text-white is-size-4 p-3 mt-3 ' style={{ backgroundColor: '#C21D1D', borderRadius: '40px' }} onClick={() => handleDelete(id)}>
                <p className='is-size-4-desktop is-size-6-mobile' onClick={handleDelete}>Desativar Ativo</p>
              </button>
              <button className='has-text-white is-size-4 p-3 mt-3' style={{ backgroundColor: '#959292', borderRadius: '40px', }} onClick={exibirPopUpDelecao}>
                <p className='is-size-4-desktop is-size-6-mobile'>Cancelar</p>
              </button>
            </div>
          </div>
          <div id='popupconfirmacao' style={{ display: 'none', height: '200px', backgroundColor: '#367E90', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '40%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px' }}>
            <p className='has-text-white is-size-3-desktop is-size-4-mobile'>Ativo desativado com sucesso!</p>
            <button className='has-text-white is-size-4 p-3 mt-3' style={{ marginLeft: '60%', backgroundColor: '#459EB5', borderRadius: '100%' }}>
              <p className='is-size-4' onClick={() => setTela('Ativos')}>OK</p>
            </button>
          </div>
        </div >
      </body >
    );
  }
}

export default VisualizarAtivos;