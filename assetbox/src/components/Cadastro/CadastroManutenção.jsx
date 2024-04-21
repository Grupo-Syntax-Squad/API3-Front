import React, { useEffect, useState } from 'react';
import "./cadastro.css";
import imgadd from "./imgadd.png"
import docadd from "./docadd.png"
import adicionar from "./adicionar.svg"
import axios from 'axios';

function CadastroManutenção({ setTela }) {
  // Definindo estados para armazenar os dados do ativo
  const [ati_localizacao, setLocalizacaoAtivo] = useState();
  const [ati_tipo, setTipoAtivo] = useState('');
  const [ati_status, setStatusAtivo] = useState('');
  const [ati_complemento, setComplementoAtivo] = useState('');
  const [ati_destinatario_id, setDestinatarioAtivo] = useState({});
  const [ati_marca, setMarcaAtivo] = useState('');
  const [ati_modelo, setModeloAtivo] = useState('');
  const [ati_numero_serie, setSerieAtivo] = useState('');
  const [ati_quantidade, setQuantidadeAtivo] = useState(1);
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
  const [ati_condicoes_uso, setUsoAtivo] = useState('');
  const [ati_data_validade, setValidadeAtivo] = useState('');
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

    let response;
    let ati_imagem_id = null;
    if (imagemSelecionada != null) {
      //Enviando imagem
      const formData = new FormData();
      formData.append('file', imagemSelecionada);
      response = await axios.post('http://localhost:8000/imagens', formData);
      ati_imagem_id = response.data;
    }

    const localizacaoData = {
      loc_titulo: ati_localizacao
    };

    response = await axios.post('http://localhost:8000/localizacoes', localizacaoData);
    const ati_localizacao_id = response.data;

    const tipoData = {
      tip_titulo: ati_tipo
    };

    response = await axios.post('http://localhost:8000/tipos', tipoData);
    const ati_tipo_id = response.data;

    
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
      ati_quantidade,
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
      ati_condicoes_uso,
      ati_observacao
    };
    console.log(ativoData);

    response = await axios.post('http://localhost:8000/ativos', ativoData);
    console.log(response.data);
    exibirPopUp();

    // Limpar campos
    setLocalizacaoAtivo('');
    setTipoAtivo('');
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
  };

  return (
    <body>
      <div class='page-full'>
        <div class='field'>
          <h2>Cadastro de Manutenção</h2>
        </div>
        <div class="columns m-3">

          <div class="column is-half">
            <form onSubmit={handleSubmit}>
              <div className='top-one'>

              <div class="field">
                  <label class="label has-text-black">Status: <span className='has-text-danger'>*</span></label>
                  <div class="select is-small">
                    <select class="is-hovered" onChange={e => setStatusAtivo(e.target.value)}>
                      <option value="0" selected>Em operação</option>
                      <option value="1">Ocioso</option>
                      <option value="2">Em manutenção</option>
                      <option value="3">Desativado</option>
                    </select>
                  </div>
                  {/* <img src={adicionar} style={{marginLeft: '10px', width : '15%'}} title="cadastrar novo status"/> */}
                </div>

                <div className="field" >
                  <label className="form-label has-text-black">Data da manutenção:</label>
                  <input
                    class="input is-small"
                    type="date"
                    placeholder='Insira a Data da manutenção:'
                    // value={man_data}
                    onChange={(event) => setExpiracaoAtivo(event.target.value)}
                  />
                </div>

                <div class="field">
                  <label class="label has-text-black">horario: <span className='has-text-danger'>*</span></label>
                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o horario que a manutenção ocorerá"
                    placeholder='Digite o horario:'
                    // value={man_hora}
                    // onChange={(event) => setNumAtivo(event.target.value)}
                  />
                </div>
                <div class="field">
                  <label class="label has-text-black">Atividade: <span className='has-text-danger'>*</span></label>
                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o número de série do ativo"
                    placeholder='Insira o a descrição da manutenção:'
                    // value={man_desc}
                    // onChange={(event) => setTipoAtivo(event.target.value)}
                  />
                  {/* <div class="select is-small">
                    {tipos && tipos.length > 0 ? (
                      <select class="is-hovered" onChange={e => setTipoAtivo(tipos.find(tipo => tipo.tip_titulo === e.target.value))}>
                        <option value="" disabled selected>Selecione um tipo</option>
                        {tipos.map((tipo) => <option key={tipo.tip_titulo} value={tipo.tip_titulo}>{tipo.tip_titulo}</option>)}
                      </select>
                    ) : (
                      <p>Nenhum tipo disponível</p>
                    )}
                  </div>
                  <img src={adicionar} style={{marginLeft: '10px', width : '15%'}} title="Cadastrar novo tipo"/> */}
                </div>

                <div class="field">
                  <label class="label has-text-black">ativo: <span className='has-text-danger'>*</span></label>
                  <div class="select is-small">
                    <select class="is-hovered" onChange={e => setStatusAtivo(e.target.value)}>
                      <option value="0" selected>ativo 1</option>
                      <option value="1">ativo 2</option>
                      <option value="2">ativo 3</option>
                    </select>
                  </div>
                  {/* <img src={adicionar} style={{marginLeft: '10px', width : '15%'}} title="cadastrar novo status"/> */}
                </div>      

                <div className="field" >
                  <label className="label has-text-black">Responsavel:</label>
                  {destinatarios && destinatarios.length > 0 ? (
                    <div class="select is-small">
                      <select class="is-hovered" onChange={e => setDestinatarioAtivo(destinatarios.find(destinatario => destinatario.des_nome === e.target.value))}>
                        <option value="" disabled selected>Selecione um destinatário</option>
                        {destinatarios.map((destinatario) => <option key={destinatario.des_nome} value={destinatario.des_nome}>{destinatario.des_nome}</option>)}
                      </select>
                    </div>
                  ) : (
                    <p>Nenhum responsavel disponível</p>
                  )}
                </div>

                <div class="field">
                  <label class="label has-text-black">Localização:</label>
                  <input
                    class="input is-small"
                    type="text"
                    title="Digite a localização"
                    placeholder='Insira a Localização:'
                    value={ati_localizacao}
                    onChange={(event) => setLocalizacaoAtivo(event.target.value)}
                  />
                  {/* <div class="select is-small">
                    {localizacoes && localizacoes.length > 0 ? (
                      <select class="is-hovered" onChange={e => setLocalizacaoAtivo(localizacoes.find(localizacao => localizacao.loc_titulo === e.target.value))}>
                        <option value="" disabled selected>Selecione uma localização</option>
                        {localizacoes.map((localizacao) => <option key={localizacao.loc_titulo} value={localizacao.loc_titulo}>{localizacao.loc_titulo}</option>)}
                      </select>
                    ) : (
                      <p>Nenhuma localização disponível</p>
                    )}
                  </div>
                  <img src={adicionar} style={{marginLeft: '10px', width : '15%'}} title="Cadastrar nova localização"/> */}
                </div>

                <div className="field" >

                  <div className="field" >
                    <label className="form-label has-text-black">Observações:</label>
                    <input
                      class="input is-small"
                      type="text"
                      placeholder='Insira um Complemento:'
                      title="Digite um complemento para a manutenção, por exemplo: problemas que não serão corrigidos, estado de preservação, etc."
                      rows="4"
                      // value={man_obs}
                      // onChange={(event) => setComplementoAtivo(event.target.value)}
                    />
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>

        <h1>Endereço</h1>

        <div class="mid-page" >

          <div class="columns m-3">


            <div class="column is-half">
              <form onSubmit={handleSubmit}>
                <div className="field" >
                  <label className="form-label has-text-black">CEP:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o cep de onde será realizada a manutenção"
                    placeholder='Digite o cep:'
                    // value={ati_marca}
                    // onChange={(event) => setMarcaAtivo(event.target.value)}
                  />
                </div>
                <div className="field" >
                  <label className="form-label has-text-black">Rua:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o nome da rua onde será realizada a manutenção"
                    placeholder='Digite a rua:'
                    // value={ati_modelo}
                    // onChange={(event) => setModeloAtivo(event.target.value)}
                  />
                </div>
                <div className="field" >
                  <label className="form-label has-text-black">Numero: <span className='has-text-danger'>*</span></label>
                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o número da emrpesa que realizará a manutenção"
                    placeholder='Insira o Número:'
                    // value={ati_numero_serie}
                    // onChange={(event) => setSerieAtivo(event.target.value)}
                  />
                </div>

                <div className="field" >
                  <label className="form-label has-text-black">Complemento: <span className='has-text-danger'>*</span></label>
                  <input
                    class="input is-small"
                    type="text"
                    title="Digite um complemento. Por exemplo: fundos, bloco, etc."
                    placeholder='Insira um complemento:'
                    // value={ati_preco_aquisicao}
                    // onChange={(event) => setValorAtivo(event.target.value)}
                  />
                </div>



                <div className="field" >
                  <label className="form-label has-text-black">Bairro:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o bairro onde será realizada a manutenção"
                    placeholder='Insira o Bairro:'
                    // value={ati_tamanho}
                    // onChange={(event) => setTamanhoAtivo(event.target.value)}
                  />
                </div>
              </form>
            </div>

            <div class="column is-half">
              <form onSubmit={handleSubmit}>

                <div className="field" >
                  <label className="form-label has-text-black">Cidade:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite a cidade onde será realizada a manutenção"
                    placeholder='Insira a cidade'
                    // value={ati_capacidade}
                    // onChange={(event) => setCapacidadeAtivo(event.target.value)}
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
                {/* <div class="field">
                  <label class="label has-text-black">Fornecedor:</label>
                  <div class="select is-small">
                    <select class="is-hovered">
                      <option></option>
                      <option></option>
                    </select>
                  </div>
                </div> */}
                <div className="field" >
                  <label className="form-label has-text-black">UF:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="diigite o estado em que será realizada a manutenção"
                    placeholder='Insira a sigla do estado:'
                    // value={ati_ano_fabricacao}
                    // onChange={(event) => setFabricacaoAtivo(event.target.value)}
                  />
                </div>
              </form>
            </div>

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
          <div id='popup' style={{ display: 'none', height: '200px', backgroundColor: '#367E90', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '40%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px' }}>
            <p className='has-text-white is-size-3-desktop is-size-4-mobile'>Ativo Cadastrado com sucesso!</p>
            <button className='has-text-white is-size-4 p-3 mt-3' style={{ marginLeft: '60%', backgroundColor: '#459EB5', borderRadius: '100%' }} onClick={() => exibirPopUp()}>
              <p className='is-size-4' onClick={() => setTela('Ativos')}>OK</p>
            </button>
          </div>

        </div>
      </div>
    </body>
  );
}

export default CadastroManutenção;