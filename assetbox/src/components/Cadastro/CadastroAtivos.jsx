import React, { useEffect, useState } from 'react';
import "./cadastro.css";
import imgadd from "./imgadd.png"
import docadd from "./docadd.png"
import axios from 'axios';

function CadastroAtivos({ setTela }) {
  // Definindo estados para armazenar os dados do ativo
  const [ati_localizacao_id, setLocalizacaoAtivo] = useState({});
  const [ati_tipo_id, setTipoAtivo] = useState({});
  const [ati_status, setStatusAtivo] = useState('');
  const [ati_complemento, setComplementoAtivo] = useState('');
  const [ati_destinatario_id, setDestinatarioAtivo] = useState('');
  const [ati_marca, setMarcaAtivo] = useState('');
  const [ati_modelo, setModeloAtivo] = useState('');
  const [ati_numero_serie, setSerieAtivo] = useState('');
  const [ati_condicoes_uso, setUsoAtivo] = useState('');
  const [ati_preco_aquisicao, setValorAtivo] = useState('');
  const [ati_tamanho, setTamanhoAtivo] = useState('');
  const [ati_capacidade, setCapacidadeAtivo] = useState('');
  const [ati_data_fabricacao, setFabricacaoAtivo] = useState('');
  const [ati_data_validade, setValidadeAtivo] = useState('');
  const [ati_chave_nf_e, setNfeAtivo] = useState('');
  const [ati_url, setUrlAtivo] = useState('');
  const [ati_observacao, setComentarioAtivo] = useState('');
  const [ati_titulo, setTituloAtivo] = useState('');
  const [ati_numero, setNumAtivo] = useState('');
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  const [localizacoes, setLocalizacoes] = useState([]);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get('http://localhost:8000/localizacoes');
      setLocalizacoes(response.data);

      response = await axios.get('http://localhost:8000/tipos');
      setTipos(response.data);
    };

    fetchData();
  }, []);

  const handleImageChange = (event) => {
    setImagemSelecionada(event.target.files[0]);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    //Enviando imagem
    const formData = new FormData();
    formData.append('file', imagemSelecionada);
    const response = await axios.post('http://localhost:8000/imagem', formData);
    const imagem = response.data;

    // Enviando ativo
    const ativoData = {
      ati_localizacao_id,
      ati_tipo_id,
      ati_status,
      ati_marca,
      ati_modelo,
      ati_numero_serie,
      ati_condicoes_uso,
      ati_preco_aquisicao: ati_preco_aquisicao,
      ati_tamanho,
      ati_capacidade,
      ati_data_fabricacao,
      ati_data_validade,
      ati_chave_nf_e,
      ati_url,
      ati_observacao,
      ati_titulo,
      ati_numero,
      ati_imagem_id: imagem.ima_id
    };

    try {
      const response = await axios.post('http://localhost:8000/cadastrar/ativo', ativoData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <body>
      <div class='page-full'>
        <div class='field'>
          <h2>Cadastro de Ativos</h2>
        </div>
        <div class="columns m-3">

          <div class="column is-half has-text-centered"> <img src={imgadd} alt="imgadd" style={{ width: '100px', height: '100px' }} />
            <div>
              <input className='image-button' type='file' id='img' name="img" accept="image/*" onChange={handleImageChange}/>
            </div>
          </div>

          <div class="column is-half">
            <form onSubmit={handleSubmit}>
              <div className='top-one'>

                <div class="field">
                  <label class="label">Número:</label>
                  <input
                    class="input is-small"
                    type="text"
                    placeholder='Digite um Número:'
                    value={ati_numero}
                    onChange={(event) => setNumAtivo(event.target.value)}
                  />
                </div>
                <div class="field">
                  <label class="label">Tipo:</label>
                  <div class="select is-small">
                    <select class="is-hovered" onChange={e => setTipoAtivo(tipos.find(tipo => tipo.tip_titulo === e.target.value))}>
                      <option value="" disabled selected>Selecione um tipo</option>
                      {tipos.map((tipo) => <option key={tipo.tip_titulo} value={tipo.tip_titulo}>{tipo.tip_titulo}</option>)}
                    </select>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Localização:</label>
                  <div class="select is-small">
                    <select class="is-hovered" onChange={e => setLocalizacaoAtivo(localizacoes.find(localizacao => localizacao.loc_titulo === e.target.value))}>
                      <option value="" disabled selected>Selecione uma localização</option>
                      {localizacoes.map((localizacao) => <option key={localizacao.loc_titulo} value={localizacao.loc_titulo}>{localizacao.loc_titulo}</option>)}
                    </select>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Status:</label>
                  <div class="select is-small">
                    <select class="is-hovered" onChange={e => setStatusAtivo(e.target.value)}>
                      <option value="0" selected>Em operação</option>
                      <option value="1">Ocioso</option>
                      <option value="2">Em manutenção</option>
                      <option value="3">Desativado</option>
                    </select>
                  </div>
                </div>

                <div className="field" >
                  <label className="form-label">Destinatário:</label>
                  <input
                    class="input is-small"
                    type="text"
                    placeholder='Insira o Destinatário:'
                    value={ati_destinatario_id}
                    onChange={(event) => setDestinatarioAtivo(event.target.value)}
                  />
                </div>

                <div className="field" >
                  <label className="form-label">Titulo:</label>

                  <input
                    class="input is-small"
                    type="text"
                    placeholder='Insira o Título:'
                    value={ati_titulo}
                    onChange={(event) => setTituloAtivo(event.target.value)}
                  />

                  <div className="field" >
                    <label className="form-label">Complemento:</label>

                    <input
                      class="input is-small"
                      type="text"
                      placeholder='Insira um Complemento:'
                      rows="4"
                      value={ati_complemento}
                      onChange={(event) => setComplementoAtivo(event.target.value)}
                    />
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>

        <h1>Características</h1>

        <div class="mid-page" >

          <div class="columns m-3">


            <div class="column is-half">
              <form onSubmit={handleSubmit}>
                <div className="field" >
                  <label className="form-label">Marca:</label>

                  <input
                    class="input is-small"
                    type="text"
                    placeholder='Digite a Marca:'
                    value={ati_marca}
                    onChange={(event) => setMarcaAtivo(event.target.value)}
                  />
                </div>
                <div className="field" >
                  <label className="form-label">Modelo:</label>

                  <input
                    class="input is-small"
                    type="text"
                    placeholder='Digite o Modelo:'
                    value={ati_modelo}
                    onChange={(event) => setModeloAtivo(event.target.value)}
                  />
                </div>
                <div className="field" >
                  <label className="form-label">Nº de Série:</label>

                  <input
                    class="input is-small"
                    type="text"
                    placeholder='Insira o Número de Série:'
                    value={ati_numero_serie}
                    onChange={(event) => setSerieAtivo(event.target.value)}
                  />
                </div>

                <div className="field" >
                  <label className="form-label">Valor de Aquisição:</label>

                  <input
                    class="input is-small"
                    type="text"
                    placeholder='Insira o Valor de Aquisição:'
                    value={ati_preco_aquisicao}
                    onChange={(event) => setValorAtivo(event.target.value)}
                  />
                </div>



                <div className="field" >
                  <label className="form-label">Tamanho:</label>

                  <input
                    class="input is-small"
                    type="text"
                    placeholder='Insira as Dimensões do Ativo:'
                    value={ati_tamanho}
                    onChange={(event) => setTamanhoAtivo(event.target.value)}
                  />
                </div>
              </form>
            </div>

            <div class="column is-half">
              <form onSubmit={handleSubmit}>

                <div className="field" >
                  <label className="form-label">Capacidade:</label>

                  <input
                    class="input is-small"
                    type="text"
                    placeholder='Insira a Capacidade do Ativo:'
                    value={ati_capacidade}
                    onChange={(event) => setCapacidadeAtivo(event.target.value)}
                  />
                </div>
                {/* <div className="field" >
          <label className="form-label">Quantidade:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira a Quantidade:'
            value={numeroAtivo}
            onChange={(event) => setNumAtivo(event.target.value)}
          />
        </div> */}
                <div className="field" >
                  <label className="form-label">Condições de Uso:</label>

                  <input
                    class="input is-small"
                    type="text"
                    placeholder='Condições de Uso:'
                    value={ati_condicoes_uso}
                    onChange={(event) => setUsoAtivo(event.target.value)}
                  />
                </div>



                <div class="field">
                  <label class="label">Fornecedor:</label>
                  <div class="select is-small">
                    <select class="is-hovered">
                      <option></option>
                      <option></option>
                    </select>
                  </div>
                </div>
                <div className="field" >
                  <label className="form-label">Data de Fabricação:</label>

                  <input
                    class="input is-small"
                    type="text"
                    placeholder='Insira a Data de Fabricação:'
                    value={ati_data_fabricacao}
                    onChange={(event) => setFabricacaoAtivo(event.target.value)}
                  />
                </div>
                <div className="field" >
                  <label className="form-label">Data de Validade:</label>

                  <input
                    class="input is-small"
                    type="text"
                    placeholder='Insira a Data de Validade:'
                    value={ati_data_validade}
                    onChange={(event) => setValidadeAtivo(event.target.value)}
                  />
                </div>
              </form>
            </div>

          </div>
        </div>




        <h1>Documentos</h1>
        <div className="columns m-3">

          <div class="column is-half has-text-centered"><img src={docadd} alt="docadd" style={{ width: '100px', height: '100px' }} />.
            <div>
              <input className='image-button' type='file' id='doc' name="doc" accept="doc/*" />
            </div>
          </div>

          <div class='column is-half'>
            <form className='documentos-ativo' onSubmit={handleSubmit}>
              <div className="field" >
                <label className="form-label">Chave NFe:</label>

                <input
                  class="input is-small"
                  type="text"
                  placeholder='Insira a Chave NFe:'
                  value={ati_chave_nf_e}
                  onChange={(event) => setNfeAtivo(event.target.value)}
                />
              </div>

              <div className="field" >
                <label className="form-label">Url do Ativo:</label>

                <input
                  class="input is-small"
                  type="text"
                  placeholder='Insira a Url do Ativo:'
                  value={ati_url}
                  onChange={(event) => setUrlAtivo(event.target.value)}
                />
              </div>
              <div className="field" >
                <label className="form-label">Observações:</label>

                <input
                  class="input is-small"
                  type="text"
                  placeholder='Escreva aqui as Observações:'
                  value={ati_observacao}
                  onChange={(event) => setComentarioAtivo(event.target.value)}
                />
              </div>
            </form>
          </div>

        </div>

        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <button class="button is-primary" type="submit" formMethod='POST' onClick={handleSubmit}>
              Cadastrar
            </button>
          </p>
          <p class="control">
            <button class="button is-light" onClick={() => setTela('Ativos')}>
              Cancelar
            </button>
          </p>

        </div>





      </div>
    </body>





  );
}

export default CadastroAtivos;