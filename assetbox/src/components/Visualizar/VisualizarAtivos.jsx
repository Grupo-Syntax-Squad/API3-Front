import React, { useState, useEffect } from 'react';
import "./visualizar.css";
import docadd from "./docadd.png"
import axios from 'axios';

class ViewDestinatario {
  constructor(numero, tipo, localizacao, status, destinatario, titulo, complemento, marca, capacidade, modelo, condicoes, n_serie,
    fornecedor, aquisicao, fabricacao, tamanho, validade, nfe, url, observacoes) {
    this.numero = numero;
    this.tipo = tipo;
    this.localizacao = localizacao;
    this.status = status;
    this.destinatario = destinatario;
    this.titulo = titulo;
    this.complemento = complemento;
    this.marca = marca;
    this.capacidade = capacidade;
    this.modelo = modelo;
    this.condicoes = condicoes;
    this.n_serie = n_serie;
    this.fornecedor = fornecedor;
    this.aquisicao = aquisicao;
    this.fabricacao = fabricacao;
    this.tamanho = tamanho;
    this.validade = validade;
    this.nfe = nfe;
    this.url = url;
    this.observacoes = observacoes;
  }
}

function VisualizarAtivos({ setTela }) {
  const [dadosAtivo, setDadosAtivo] = useState({})
  const [imageUrl, setImageUrl] = useState('');
  const id = localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      console.log(id);
      try {
        const response = await axios.get(`http://localhost:8000/ativo/${Number(id)}`);
        const dados = response.data;
        setDadosAtivo(dados);
        setImageUrl(`http://localhost:8000/imagem/${dados.ati_imagem_id}`);
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
    

  function handleDelete(id) {
      axios.delete(`http://localhost:8000/ativo/${id}`)
        .then((resposta) => {
          console.log(resposta.data);
          window.location.reload()
        })
        .catch((error) => {
          console.error("Erro ao deletar ativo:", error);
        });
  }
  return (
    <body>
      <div class='page-full'>
        <div class='field'>
          <h2>{dadosAtivo.ati_titulo}</h2>
        </div>
        <h1 className='has-text-weight-light'>Dados</h1>
        <div class="columns m-3">

          <div class="column is-half has-text-centered"> <img src={imageUrl} alt="Ativo" style={{ width: '100%', height: '100%' }} />
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
                    disabled

                  />
                </div>
                <div class="field column">
                  <label class="form-label">Tipo</label><br />
                  <div class="select is-small">
                    <select class="is-hovered" value={dadosAtivo.ati_tipo_id} disabled>
                      <option value={dadosAtivo.ati_tipo_id?.tip_id}>{dadosAtivo.ati_tipo_id?.tip_titulo}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='columns'>
                <div class="field column">
                  <label class="form-label">Localização</label><br />
                  <div class="select is-small">
                    <select class="is-hovered" value={dadosAtivo.ati_localizacao_id} disabled>
                      <option>{dadosAtivo.ati_localizacao_id?.loc_titulo}</option>
                      <option></option>
                    </select>
                  </div>
                </div>
                <div class="field column">
                  <label class="formn-label">Status</label><br />
                  <div class="select is-small">
                    <select class="is-hovered" value={dadosAtivo.ati_status} disabled>
                      <option>{dadosAtivo.ati_status}</option>
                      <option></option>
                    </select>
                  </div>
                </div>
              </div>


              <div className="field" >
                <label className="form-label">Destinatário</label>
                <input
                  class="input is-small"
                  type="text"
                  value='Em andamento'
                  disabled
                />
              </div>


              <div className="field" >
                <label className="form-label">Titulo</label>
                <input
                  class="input is-small"
                  type="text"
                  value={dadosAtivo.ati_titulo}
                  disabled
                />
              </div>

              <div className="field" >
                <label className="form-label">Complemento</label>

                <input
                  class="input is-small"
                  type="text"
                  rows="4"
                  value={dadosAtivo.ati_complemento}
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
                  <label className="form-label">Marca</label>

                  <input
                    class="input is-small"
                    type="text"
                    value={dadosAtivo.ati_marca}
                    disabled
                  />
                </div>
                <div className="field column" >
                  <label className="form-label">Modelo</label>

                  <input
                    class="input is-small"
                    type="text"
                    value={dadosAtivo.ati_modelo}
                    disabled
                  />
                </div>
                <div className="field column" >
                  <label className="form-label">Nº de Série</label>

                  <input
                    class="input is-small"
                    type="text"
                    value={dadosAtivo.ati_numero_serie}
                    disabled

                  />
                </div>
                <div className="field column" >
                  <label className="form-label">Valor de Aquisição</label>

                  <input
                    class="input is-small"
                    type="text"
                    value={dadosAtivo.ati_preco_aquisicao}
                    disabled

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
                    disabled

                  />
                </div>

                <div className="field column" >
                  <label className="form-label">Capacidade</label>

                  <input
                    class="input is-small"
                    type="text"
                    value={dadosAtivo.ati_capacidade}
                    disabled

                  />
                </div>
                <div className="field column" >
                  <label className="form-label">Quantidade</label>

                  <input
                    class="input is-small"
                    type="text"
                    value={dadosAtivo.ati_quantidade}
                    disabled
                  />
                </div>

                <div class="field column">
                  <label class="form-label">Fornecedor</label><br />
                  <div class="select is-small">
                    <select class="is-hovered" value={dadosAtivo.ati_localizacao_id} disabled>
                      <option>{dadosAtivo.ati_localizacao_id?.loc_titulo}</option>
                      <option></option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='columns'>
                <div className="field column" >
                  <label className="form-label">Data de Fabricação</label>

                  <input
                    class="input is-small"
                    type="date"
                    value={dadosAtivo.ati_data_fabricacao}
                    disabled
                  />
                </div>
                <div className="field column " >
                  <label className="form-label">Data de Expiração</label>

                  <input
                    class="input is-small"
                    type="date"
                    value={dadosAtivo.ati_data_expiracao}
                    disabled
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
                    disabled

                  />
                </div>

                <div className="field" >
                  <label className="form-label">Url do Ativo</label>

                  <input
                    class="input is-small"
                    type="text"
                    value={dadosAtivo.ati_url}
                    disabled

                  />
                </div>
                <div className="field" >
                  <label className="form-label">Observações</label>

                  <input
                    class="input is-small"
                    type="text"
                    value={dadosAtivo.ati_observacao}
                    disabled
                  />
                </div>
              </form>
            </div>

            <div className='container'>
              <h1>Documentos</h1>
              <div class="container column is-half has-text-centered"><img src={docadd} alt="docadd" style={{ width: '100px', height: '100px' }} />
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
              <div id='popupdelecao' style={{display: 'none', height: '200px', backgroundColor: '#FFFFFF', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '50%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px'}}>
    <p className='is-size-4-desktop is-size-6-mobile has-text-weight-bold' style={{color: '#3A7D8E'}}>Tem certeza de que quer deletar este Ativo?</p>
    <div className='is-flex  is-justify-content-space-evenly'>  
      <button className='has-text-white is-size-4 p-3 mt-3 ' style={{backgroundColor:'#C21D1D', borderRadius: '40px'}} onClick={() => handleDelete(id)}>
        <p className='is-size-4-desktop is-size-6-mobile' onClick={handleDelete}>Deletar</p>
        </button>
        <button className='has-text-white is-size-4 p-3 mt-3' style={{ backgroundColor:'#959292', borderRadius: '40px',}} onClick={exibirPopUpDelecao}>
        <p className='is-size-4-desktop is-size-6-mobile'>Cancelar</p>
        </button>
    </div>
    </div>
    <div id='popupconfirmacao' style={{display: 'none', height: '200px', backgroundColor: '#367E90', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '40%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px'}}>
    <p className='has-text-white is-size-3-desktop is-size-4-mobile'>Ativo deletado com sucesso!</p>
    <button className='has-text-white is-size-4 p-3 mt-3' style={{marginLeft: '60%', backgroundColor:'#459EB5', borderRadius: '100%'}}>
      <p className='is-size-4' onClick={() => setTela('Ativos')}>OK</p>
      </button>
    </div>
      </div>
    </body>
  );
}

export default VisualizarAtivos;