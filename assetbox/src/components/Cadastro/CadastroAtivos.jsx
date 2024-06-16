import React, { useEffect, useState } from 'react';
import "./cadastro.css";
import imgadd from "./imgadd.png"
import docadd from "./docadd.png"
import adicionar from "./adicionar.svg"
import axios from 'axios';
import CadastroTipo from './CadastroTipo';
import CadastroLocalizacao from './CadastroLocalizacao';
import { getFiliais, getFilial } from '../../services/filialService';

function CadastroAtivos({ setTela }) {
  // Definindo estados para armazenar os dados do ativo
  const [ati_localizacao, setLocalizacaoAtivo] = useState('');
  const [ati_tipo, setTipoAtivo] = useState('');
  const [ati_status, setStatusAtivo] = useState('0');
  const [ati_complemento, setComplementoAtivo] = useState('');
  const [ati_destinatario_id, setDestinatarioAtivo] = useState(null);
  const [ati_marca, setMarcaAtivo] = useState('');
  const [ati_modelo, setModeloAtivo] = useState('');
  const [ati_numero_serie, setSerieAtivo] = useState('');
  const [ati_data_expiracao, setExpiracaoAtivo] = useState('');
  const [ati_previsao_manutencao, setPrevisaoManutencaoAtivo] = useState('');
  const [ati_preco_aquisicao, setValorAtivo] = useState('');
  const [ati_chave_nf_e, setNfeAtivo] = useState('');
  const [ati_observacao, setComentarioAtivo] = useState('');
  const [ati_url, setUrlAtivo] = useState('');
  const [ati_numero, setNumAtivo] = useState('');
  const [ati_manutencoes_feitas, setManutencoesFeitasAtivo] = useState('');
  const [ati_ultima_manutencao, setUltimaManutencaoAtivo] = useState('');
  const [ati_ano_fabricacao, setFabricacaoAtivo] = useState('');
  const [ati_titulo, setTituloAtivo] = useState('');
  const [ati_capacidade, setCapacidadeAtivo] = useState('');
  const [ati_tamanho, setTamanhoAtivo] = useState('');
  const [ati_data_cadastro, setCadastroAtivo] = useState(new Date());
  const [ati_data_validade, setValidadeAtivo] = useState('');
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [documentoSelecionado, setDocumentoSelecionado] = useState(null);


  const [localizacoes, setLocalizacoes] = useState([]);
  const [localizacoesMatriz, setLocalizacoesMatriz] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [destinatarios, setDestinatarios] = useState([]);
  const [filiais, setFiliais] = useState([]);

  const [carregando, setCarregando] = useState(true);

  const [mostrarTipo, setMostrarTipo] = useState(false);
  const handleTipoClick = () => mostrarTipo ? setMostrarTipo(false) : setMostrarTipo(true);

  const [mostrarLocalizacao, setMostrarLocalizacao] = useState(false);
  const handleLocalizacaoClick = () => mostrarLocalizacao ? setMostrarLocalizacao(false) : setMostrarLocalizacao(true);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get('http://localhost:8000/localizacoes');
      let locaisMatriz = response.data.filter(localizacao => localizacao.loc_filial_id === null);
      let locaisFilial = response.data.filter(localizacao => localizacao.loc_filial_id !== null);
      setLocalizacoesMatriz(locaisMatriz);
      setLocalizacoes(locaisFilial);

      response = await axios.get('http://localhost:8000/tipos');
      setTipos(response.data);

      response = await axios.get('http://localhost:8000/destinatarios');
      setDestinatarios(response.data);

      response = await getFiliais();
      setFiliais(response);

      setCarregando(false);
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
    const file = event.target.files[0];
    const fileExtension = file.name.split('.').pop().toLowerCase();
  
    if (fileExtension == "jpeg" || fileExtension == "png") {
      setImagemSelecionada(file);
      console.log("era pra funfar, mas n funfou")
    } else {
      alert('Por favor, selecione um arquivo de imagem JPEG ou PNG.');
      event.target.value = null; // Limpa o campo de arquivo
    }  };

  const handleDocumentoChange = (event) => {
    const file = event.target.files[0];
    const fileExtension = file.name.split('.').pop().toLowerCase();
  
    if (fileExtension == "pdf") {
      setDocumentoSelecionado(file);
      console.log("era pra funfar, mas n funfou")
    } else {
      alert('Por favor, selecione um arquivo tipo pdf.');
      event.target.value = null; // Limpa o campo de arquivo
    }  }

  const [modalOpen, setModalOpen] = useState(false);

  const abrirHelp = () => {
      setModalOpen(true);
  };

  const fecharHelp = () => {
      setModalOpen(false);
  };
  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    const camposObrigatorios = [ati_numero, ati_tipo, ati_status, ati_preco_aquisicao, ati_chave_nf_e, ati_titulo];
    const camposVazios = camposObrigatorios.some(campo => !campo);

    if (camposVazios) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    let response;
    let ati_imagem_id = null;
    if (imagemSelecionada != null) {
      //Enviando imagem
      const formData = new FormData();
      formData.append('file', imagemSelecionada);
      response = await axios.post('http://localhost:8000/imagens', formData);
      ati_imagem_id = response.data;
    }

    let ati_documento_id = null;
    if (documentoSelecionado != null) {
      //Enviando Documento
      const formData = new FormData();
      formData.append('file', documentoSelecionado);
      response = await axios.post('http://localhost:8000/documentos', formData);
      ati_documento_id = response.data
    }

    let ati_localizacao_id = localizacoes.find(localizacao => ati_localizacao == localizacao.loc_id);
    let filialId = null;
    if (ati_localizacao_id.loc_filial_id !== null) {
      filialId = ati_localizacao_id.loc_filial_id;
    };

    let ati_filial_id = null;
    if (filialId !== null) {
      ati_filial_id = await getFilial(filialId);
    }
    console.log(ati_filial_id);

    let ati_tipo_id = tipos.find(tipo => ati_tipo == tipo.tip_id);

    // Enviando ativo
    const ativoData = {
      ati_localizacao_id,
      ati_tipo_id,
      ati_status,
      ati_complemento,
      ati_destinatario_id,
      ati_marca,
      ati_modelo,
      ati_numero_serie,
      ati_data_expiracao,
      ati_previsao_manutencao,
      ati_preco_aquisicao,
      ati_chave_nf_e,
      ati_url,
      ati_numero,
      ati_manutencoes_feitas,
      ati_ultima_manutencao,
      ati_ano_fabricacao,
      ati_titulo,
      ati_capacidade,
      ati_tamanho,
      ati_data_cadastro,
      ati_imagem_id,
      ati_documento_id,
      ati_observacao,
      ati_filial_id
    };
    console.log(ativoData);

    response = await axios.post('http://localhost:8000/ativos', ativoData);
    exibirPopUp();

    // Limpar campos
    setLocalizacaoAtivo('');
    setTipoAtivo('');
    setDestinatarioAtivo(null);
    setStatusAtivo('0');
    setMarcaAtivo('');
    setModeloAtivo('');
    setSerieAtivo('');
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
    setDocumentoSelecionado(null)
  };

  if (carregando) {
    return (
      <body>
        <div class='page-full'>
          <h1 className='has-text-weight-light'>Carregando...</h1>
        </div>
      </body>);
  }

  return (
    <body>
      <div class="help-button"><button class=" shadow-button button button-effect is-primary m-5 ml-6 ajuda-botao is-size-4">?</button></div>
      <div class=' page-full shadow-button'>
        <div class='field'>
          <h2 class="titulo-cadastro">Cadastro de Ativos</h2>
        </div>

        <div class="columns m-3">
          <div class="column is-half has-text-centered"> <img src={imgadd} alt="imgadd" style={{ width: '100px', height: '100px' }} />
            <div>
              <input className='image-button' type='file' id='img' name="img" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>

          <div class="mid-page">
            <div class="columns m-3">
              <form onSubmit={handleSubmit}>

                <div class="field">
                  <label class="label ">Código do Ativo <span className='has-text-danger'>*</span></label>
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
                  <label class="label ">Tipo <span className='has-text-danger'>*</span></label>
                  <div class="select is-small">
                    {tipos && tipos.length > 0 ? (
                      <select class="is-hovered" onChange={e => setTipoAtivo(e.target.value)}>
                        <option value="" disabled selected>Selecione um tipo</option>
                        {tipos.map((tipo) => <option key={tipo.tip_titulo} value={tipo.tip_id}>{tipo.tip_titulo}</option>)}
                      </select>
                    ) : (
                      <p>Nenhum tipo disponível</p>
                    )}
                  </div>
                  <img src={adicionar} style={{ marginLeft: '10px', width: '15%' }} title="Cadastrar novo tipo" onClick={handleTipoClick} />
                </div>

                <div class="field">
                  <label class="label ">Localização</label>
                  <div class="select is-small">
                    {localizacoes && localizacoes.length > 0 ? (
                      <select class="is-hovered" onChange={e => setLocalizacaoAtivo(e.target.value)}>
                        <option value="" disabled selected>Selecione uma localização</option>

                        {localizacoesMatriz.map((localizacao) => <option key={localizacao.loc_titulo} value={localizacao.loc_id}>{localizacao.loc_titulo} - Matriz</option>)}

                        {localizacoes.map((localizacao) => <option key={localizacao.loc_titulo} value={localizacao.loc_id}>{localizacao.loc_titulo} - {filiais.find(filial => filial.fil_id === localizacao.loc_filial_id).fil_nome}</option>)}
                      </select>
                    ) : (
                      <p>Nenhuma localização disponível</p>
                    )}
                  </div>
                </div>
                <div class="field">
                  <label class="label ">Status <span className='has-text-danger'>*</span></label>
                  <div class="select is-small">
                    <select class="is-hovered" onChange={e => setStatusAtivo(e.target.value)}>
                      <option value="" disabled selected>Selecione um status</option>
                      <option value="0" selected>Em operação</option>
                      <option value="1">Ocioso</option>
                      <option value="2">Em manutenção</option>
                      <option value="3">Desativado</option>
                    </select>
                  </div>
                </div>
                <div className="field" >
                  <label className="label ">Destinatário</label>
                  {destinatarios && destinatarios.length > 0 ? (
                    <div class="select is-small">
                      <select class="is-hovered" onChange={e => setDestinatarioAtivo(destinatarios.find(destinatario => destinatario.des_nome === e.target.value))}>
                        <option value={null} selected>Selecione um destinatário</option>
                        {destinatarios.map((destinatario) => <option key={destinatario.des_nome} value={destinatario.des_nome}>{destinatario.des_nome}</option>)}
                      </select>
                    </div>
                  ) : (
                    <p>Nenhum destinatário disponível</p>
                  )}
                </div>
                <div className="field" >
                  <label className="form-label ">Titulo <span className='has-text-danger'>*</span></label>
                  <input
                    class="input is-small"
                    type="text"
                    title="Digite um nome para o ativo"
                    placeholder='Insira o Título:'
                    value={ati_titulo}
                    onChange={(event) => setTituloAtivo(event.target.value)}
                  />
                  <div className="field" >
                    <label className="form-label">Complemento</label>
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
              </form>
            </div>
          </div>
        </div>
        <h1>Características</h1>
        <div class="mid-page" >
          <div class="columns m-3">
            <div class="column is-half">
              <form onSubmit={handleSubmit}>
                <div className="field" >
                  <label className="form-label">Marca</label>
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
                  <label className="form-label">Modelo</label>
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
                  <label className="form-label ">Nº de Série <span className='has-text-danger'>*</span></label>
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
                  <label className="form-label">Valor de Aquisição <span className='has-text-danger'>*</span></label>
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
                  <label className="form-label">Tamanho</label>

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
                  <label className="form-label">Capacidade</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite a capacidade do ativo, ex: 500GB, 1TB, 50kg, etc."
                    placeholder='Insira a Capacidade do Ativo:'
                    value={ati_capacidade}
                    onChange={(event) => setCapacidadeAtivo(event.target.value)}
                  />
                </div>
                <div className="field" >
                  <label className="form-label">Ano de Fabricação</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="digite o ano de fabricação do ativo"
                    placeholder='Insira o ano de Fabricação:'
                    value={ati_ano_fabricacao}
                    onChange={(event) => setFabricacaoAtivo(event.target.value)}
                  />
                </div>
                <div className="field" >
                  <label className="form-label">Data de Expiração</label>
                  <input
                    class="input is-small"
                    type="date"
                    placeholder='Insira a Data de Validade:'
                    value={ati_data_expiracao}
                    onChange={(event) => setExpiracaoAtivo(event.target.value)}
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
              <input className='image-button' type='file' id='doc' name="doc" accept="doc/*" onChange={handleDocumentoChange} />
            </div>
          </div>

          <div class='column is-half'>
            <form className='documentos-ativo' onSubmit={handleSubmit}>
              <div className="field" >
                <label className="form-label">Chave NFe <span className='has-text-danger'>*</span></label>
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
                <label className="form-label">Url do Ativo</label>

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
                <label className="form-label">Observações</label>

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
            <button style={{ backgroundColor: "red" }} class="button is-light" onClick={() => setTela('Ativos')}>
              Cancelar
            </button>
          </p>
          <div id='popup' className='pop-up' style={{ display: 'none', height: '200px', backgroundColor: '#367E90', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '40%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px' }}>
            <p className='has-text-white is-size-3-desktop is-size-4-mobile pt-5 pb-5'>Ativo Cadastrado com sucesso!</p>
            <button className='has-text-white is-size-4 p-3 mt-3' style={{ marginLeft: '60%', backgroundColor: '#459EB5', borderRadius: '100%' }} onClick={() => exibirPopUp()}>
              <p className='is-size-4' onClick={() => setTela('Ativos')}>OK</p>
            </button>
          </div>

        </div>
      </div>
      {mostrarTipo && <CadastroTipo handleTipoClick={handleTipoClick} setTipos={setTipos} />}
      {mostrarLocalizacao && <CadastroLocalizacao handleLocalizacaoClick={handleLocalizacaoClick} setLocalizacoes={setLocalizacoes} />}
      <div className="help-button">
        <button className="shadow-button button button-effect is-primary m-5 ml-6 is-rounded is-size-4" onClick={abrirHelp}>?</button>

        <div className={`modal ${modalOpen ? 'is-active' : ''}`}>
          <div className="modal-background" onClick={fecharHelp}></div>
          <div className="modal-content">


            <div className="box ajuda m-6 has-text-white">
              <button class="delete is-pulled-right" aria-label="close" onClick={fecharHelp}></button>
              <p>Esta é a <span className='has-text-weight-bold'>Pagina de Cadastro do Ativo</span>,  Preencha os dados nescessários referentes ao ativo. DICA: Caso nescessário cadastrar um novo tipo para o ativo, clique no botão "+" para cadastrar um novo tipo. Para cadastrar o ativo em uma localização que não esteja disponível, você precisara entrar em contato com o usuário que possuir as credenciais root. Somente ele poderá cadastrar uma nova localização.</p>
            </div>

          </div>
          <button className="modal-close is-large" aria-label="close" onClick={fecharHelp}></button>
        </div>
      </div>
    </body>
  );
}

export default CadastroAtivos;