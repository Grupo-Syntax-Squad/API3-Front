import React, { useEffect, useState } from 'react';
import "./cadastro.css";
import imgadd from "./imgadd.png"
import docadd from "./docadd.png"
import adicionar from "./adicionar.svg"
import axios from 'axios';

function CadastroAtivos({ setTela }) {
  // Definindo estados para armazenar os dados do ativo
  const [ati_localizacao_id, setLocalizacaoAtivo] = useState({});
  const [ati_tipo_id, setTipoAtivo] = useState({});
  const [ati_status, setStatusAtivo] = useState('');
  const [ati_complemento, setComplementoAtivo] = useState('');
  const [ati_destinatario_id, setDestinatarioAtivo] = useState({});
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
  const [destinatarios, setDestinatarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get('http://localhost:8000/localizacoes');
      setLocalizacoes(response.data);

      response = await axios.get('http://localhost:8000/tipos');
      setTipos(response.data);

      response = await axios.get('http://localhost:8000/destinatarios');
      setDestinatarios(response.data);
    };

    fetchData();
  }, []);

  function exibirPopUp() {
    var popup = document.getElementById('popup');
    if (popup.style.display === 'none') {
        popup.style.display = 'block';
    } else {
        popup.style.display = 'none';
    }
}

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
      ati_destinatario_id,
      ati_complemento,
      ati_imagem_id: imagem.ima_id
    };
    console.log(ativoData);
    
    try {
      const response = await axios.post('http://localhost:8000/cadastrar/ativo', ativoData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    };

    // Limpar campos
    setLocalizacaoAtivo({});
    setTipoAtivo({});
    setDestinatarioAtivo({});
    setStatusAtivo('');
    setMarcaAtivo('');
    setModeloAtivo('');
    setSerieAtivo('');
    setUsoAtivo('');
    setValorAtivo('');
    setTamanhoAtivo('');
    setCapacidadeAtivo('');
    setFabricacaoAtivo('');
    setValidadeAtivo('');
    setNfeAtivo('');
    setUrlAtivo('');
    setComentarioAtivo('');
    setTituloAtivo('');
    setNumAtivo('');
    setImagemSelecionada(null);

    exibirPopUp()
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
              <input className='image-button' type='file' id='img' name="img" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>

          <div class="column is-half">
            <form onSubmit={handleSubmit}>
              <div className='top-one'>

                <div class="field">
                  <label class="label has-text-black">Número:</label>
                  <input
                    class="input is-small"
                    type="text"
                    title="Digite um número de ordem para o ativo"
                    placeholder='Digite um Número:'
                    value={ati_numero}
                    onChange={(event) => setNumAtivo(event.target.value)}
                  />
                </div>
                <div class="field">
                  <label class="label has-text-black">Tipo:</label>
                  <div class="select is-small">
                    {tipos && tipos.length > 0 ? (
                      <select class="is-hovered" onChange={e => setTipoAtivo(tipos.find(tipo => tipo.tip_titulo === e.target.value))}>
                        <option value="" disabled selected>Selecione um tipo</option>
                        {tipos.map((tipo) => <option key={tipo.tip_titulo} value={tipo.tip_titulo}>{tipo.tip_titulo}</option>)}
                      </select>
                    ) : (
                      <p>Nenhum tipo disponível</p>
                    )}
                  </div>
                  <img src={adicionar} style={{marginLeft: '10px', width : '15%'}} title="Cadastrar novo tipo"/>
                </div>

                <div class="field">
                  <label class="label has-text-black">Localização:</label>
                  <div class="select is-small">
                    {localizacoes && localizacoes.length > 0 ? (
                      <select class="is-hovered" onChange={e => setLocalizacaoAtivo(localizacoes.find(localizacao => localizacao.loc_titulo === e.target.value))}>
                        <option value="" disabled selected>Selecione uma localização</option>
                        {localizacoes.map((localizacao) => <option key={localizacao.loc_titulo} value={localizacao.loc_titulo}>{localizacao.loc_titulo}</option>)}
                      </select>
                    ) : (
                      <p>Nenhuma localização disponível</p>
                    )}
                  </div>
                  <img src={adicionar} style={{marginLeft: '10px', width : '15%'}} title="Cadastrar nova localização"/>
                </div>
                <div class="field">
                  <label class="label has-text-black">Status:</label>
                  <div class="select is-small">
                    <select class="is-hovered" onChange={e => setStatusAtivo(e.target.value)}>
                      <option value="0" selected>Em operação</option>
                      <option value="1">Ocioso</option>
                      <option value="2">Em manutenção</option>
                      <option value="3">Desativado</option>
                    </select>
                  </div>
                  <img src={adicionar} style={{marginLeft: '10px', width : '15%'}} title="cadastrar novo status"/>
                </div>

                <div className="field" >
                  <label className="label has-text-black">Destinatário:</label>
                  {destinatarios && destinatarios.length > 0 ? (
                    <div class="select is-small">
                      <select class="is-hovered" onChange={e => setDestinatarioAtivo(destinatarios.find(destinatario => destinatario.des_nome === e.target.value))}>
                        <option value="" disabled selected>Selecione um destinatário</option>
                        {destinatarios.map((destinatario) => <option key={destinatario.des_nome} value={destinatario.des_nome}>{destinatario.des_nome}</option>)}
                      </select>
                    </div>
                  ) : (
                    <p>Nenhum destinatário disponível</p>
                  )}
                </div>

                <div className="field" >
                  <label className="form-label has-text-black ">Titulo:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite um nome para o ativo"
                    placeholder='Insira o Título:'
                    value={ati_titulo}
                    onChange={(event) => setTituloAtivo(event.target.value)}
                  />

                  <div className="field" >
                    <label className="form-label has-text-black">Complemento:</label>

                    <input
                      class="input is-small"
                      type="text"
                      placeholder='Insira um Complemento:'
                      title="Digite um complemento para o ativo, por exemplo: cor, estado de preservação, etc."
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
                  <label className="form-label has-text-black">Marca:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite a marca do ativo, ex: Dell, HP, SAMSUNG, etc."
                    placeholder='Digite a Marca:'
                    value={ati_marca}
                    onChange={(event) => setMarcaAtivo(event.target.value)}
                  />
                </div>
                <div className="field" >
                  <label className="form-label has-text-black">Modelo:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o modelo do ativo, ex: Inspiron 15, Galaxy S20, etc."
                    placeholder='Digite o Modelo:'
                    value={ati_modelo}
                    onChange={(event) => setModeloAtivo(event.target.value)}
                  />
                </div>
                <div className="field" >
                  <label className="form-label has-text-black">Nº de Série:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o número de série do ativo"
                    placeholder='Insira o Número de Série:'
                    value={ati_numero_serie}
                    onChange={(event) => setSerieAtivo(event.target.value)}
                  />
                </div>

                <div className="field" >
                  <label className="form-label has-text-black">Valor de Aquisição:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o preço do ativo"
                    placeholder='Insira o Valor de Aquisição:'
                    value={ati_preco_aquisicao}
                    onChange={(event) => setValorAtivo(event.target.value)}
                  />
                </div>



                <div className="field" >
                  <label className="form-label has-text-black">Tamanho:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o tamanho do ativo (largura,comprimento,altura) ex: 10x10x10cm"
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
                  <label className="form-label has-text-black">Capacidade:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite a capacidade do ativo, ex: 500GB, 1TB, 50kg, etc."
                    placeholder='Insira a Capacidade do Ativo:'
                    value={ati_capacidade}
                    onChange={(event) => setCapacidadeAtivo(event.target.value)}
                  />
                </div>
                {/* <div className="field" >
          <label className="form-label has-text-black">Quantidade:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira a Quantidade:'
            value={numeroAtivo}
            onChange={(event) => setNumAtivo(event.target.value)}
          />
        </div> */}
                <div className="field" >
                  <label className="form-label has-text-black">Condições de Uso:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite as condições de uso do ativo, ex: Novo, Usado, Quebrado, etc."
                    placeholder='Condições de Uso:'
                    value={ati_condicoes_uso}
                    onChange={(event) => setUsoAtivo(event.target.value)}
                  />
                </div>



                <div class="field">
                  <label class="label has-text-black">Fornecedor:</label>
                  <div class="select is-small">
                    <select class="is-hovered">
                      <option></option>
                      <option></option>
                    </select>
                  </div>
                </div>
                <div className="field" >
                  <label className="form-label has-text-black">Data de Fabricação:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="digite o ano de fabricação do ativo"
                    placeholder='Insira a Data de Fabricação:'
                    value={ati_data_fabricacao}
                    onChange={(event) => setFabricacaoAtivo(event.target.value)}
                  />
                </div>
                <div className="field" >
                  <label className="form-label has-text-black">Data de Validade:</label>

                  <input
                    class="input is-small"
                    type="date"
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
                <label className="form-label has-text-black">Chave NFe:</label>

                <input
                  class="input is-small"
                  type="text"
                  title="Digite o número da nota fiscal do ativo"
                  placeholder='Insira a Chave NFe:'
                  value={ati_chave_nf_e}
                  onChange={(event) => setNfeAtivo(event.target.value)}
                />
              </div>

              <div className="field" >
                <label className="form-label has-text-black">Url do Ativo:</label>

                <input
                  class="input is-small"
                  type="text"
                  title="Escanei o código de barras do ativo ou digite manualmente"
                  placeholder='Insira a Url do Ativo:'
                  value={ati_url}
                  onChange={(event) => setUrlAtivo(event.target.value)}
                />
              </div>
              <div className="field" >
                <label className="form-label has-text-black">Observações:</label>

                <input
                  class="input is-small"
                  type="text"
                  title="Digite observações adicionais do ativo"
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
          <div id='popup' style={{display: 'none', height: '200px', backgroundColor: '#367E90', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '40%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px'}}>
    <p className='has-text-white is-size-3-desktop is-size-4-mobile'>Ativo Cadastrado com sucesso!</p>
    <button className='has-text-white is-size-4 p-3 mt-3' style={{marginLeft: '60%', backgroundColor:'#459EB5', borderRadius: '100%'}} onClick={() => exibirPopUp()}>
      <p className='is-size-4' onClick={() => setTela('Ativos')}>OK</p>
      </button>
    </div>
    
        </div>
      </div>
    </body>
  );
}

export default CadastroAtivos;