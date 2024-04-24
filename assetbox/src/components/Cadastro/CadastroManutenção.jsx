import React, { useEffect, useState } from 'react';
import "./cadastro.css";
import imgadd from "./imgadd.png"
import docadd from "./docadd.png"
import adicionar from "./adicionar.svg"
import axios from 'axios';

function CadastroManutenção({ setTela }) {
  // Definindo estados para armazenar os dados do ativo
  const [man_endereco_id, setManEnderecoId] = useState();
  const [man_desc, setManDesc] = useState('');
  const [man_data, setManData] = useState('');
  const [man_hora, setManHora] = useState('');
  const [man_localizacao, setManLocalizacao] = useState({});
  const [man_status, setManStatus] = useState('');
  const [man_id, setManId] = useState('');
  const [man_ativo_id, setManAtivoId] = useState('');
  const [man_responsavel, setManResponsavel] = useState('');
  const [man_imagem_id, setManImagemId] = useState();
  const [man_obs, setManObs] = useState('');
  const [man_cep, setManCep] = useState('');
  const [man_rua, setManRua] = useState('');
  const [man_numero, setManNumero] = useState ('');
  const [man_bairro, setManBairro] = useState('');
  const [man_cidade, setManCidade] = useState('');
  const [man_uf, setManUf] = useState('');
  const [man_complemento, setManComplemento] = useState('');
  const [man_quantidade, setManQuantidade] = useState(1);
  
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  const [localizacoes, setLocalizacoes] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [responsavel, setResponsavel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get('http://localhost:8000/localizacoes');
      setLocalizacoes(response.data);

      response = await axios.get('http://localhost:8000/tipos');
      setTipos(response.data);

      response = await axios.get('http://localhost:8000/responsavel');
      setManResponsavel(response.data);
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
    let man_imagem_id = null;
    if (imagemSelecionada != null) {
      //Enviando imagem
      const formData = new FormData();
      formData.append('file', imagemSelecionada);
      response = await axios.post('http://localhost:8000/imagens', formData);
      man_imagem_id = response.data;
    }

    const localizacaoData = {
      loc_titulo: man_localizacao
    };

    response = await axios.post('http://localhost:8000/localizacoes', localizacaoData);
    const man_localizacao_id = response.data;

    const descData = {
      tip_titulo: man_desc
    };

    response = await axios.post('http://localhost:8000/tipos', descData);
    const man_desc = response.data;

    
    // Enviando ativo
    const ativoData = {
      man_endereco_id,
      man_desc,
      man_data,
      man_hora,
      man_localizacao,
      man_id,
      man_ativo_id,
      man_status
    };
    console.log(ativoData);

    response = await axios.post('http://localhost:8000/manutencao', ativoData);
    console.log(response.data);
    exibirPopUp();

    // Limpar campos
    setManEnderecoId('');
    setManDesc('');
    setManData();
    setManHora('');
    setManLocalizacao('');
    setManId('');
    setManAtivoId('');
    setManStatus('');
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
                    <select class="is-hovered" onChange={e => setManStatus(e.target.value)}>
                      <option value="0" selected>Em espera</option>
                      <option value="1">em andamento</option>
                      <option value="2">concluida</option>
                    </select>
                  </div>
                  {/* <img src={adicionar} style={{marginLeft: '10px', width : '15%'}} title="cadastrar novo status"/> */}
                </div>
                </div>

                <div className="field" >
                  <label className="form-label has-text-black">Data da manutenção:</label>
                  <input
                    class="input is-small"
                    type="date"
                    placeholder='Insira a Data da manutenção:'
                    value={man_data}
                    onChange={(event) => setManData(event.target.value)}
                  />
                </div>

                <div class="field">
                  <label class="label has-text-black">horario: <span className='has-text-danger'>*</span></label>
                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o horario que a manutenção ocorerá"
                    placeholder='Digite o horario:'
                     value={man_hora}
                     onChange={(event) => setManHora(event.target.value)}
                  />
                </div>
                <div class="field">
                  <label class="label has-text-black">Atividade: <span className='has-text-danger'>*</span></label>
                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o número de série do ativo"
                    placeholder='Insira o a descrição da manutenção:'
                    value={man_desc}
                    onChange={(event) => setManDesc(event.target.value)}
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
                    <select class="is-hovered" onChange={e => setManAtivoId(e.target.value)}>
                      <option value="0" selected>ativo 1</option>
                      <option value="1">ativo 2</option>
                      <option value="2">ativo 3</option>
                    </select>
                  </div>
                  {/* <img src={adicionar} style={{marginLeft: '10px', width : '15%'}} title="cadastrar novo status"/> */}
                </div>      

                <div className="field" >
                  <label className="label has-text-black">Responsavel:</label>
                  {responsavel && responsavel.length > 0 ? (
                    <div class="select is-small">
                      <select class="is-hovered" onChange={e => setManResponsavel(responsavel.find(responsavel => responsavel.des_nome === e.target.value))}>
                        <option value="" disabled selected>Selecione um destinatário</option>
                        {responsavel.map((responsavel) => <option key={responsavel.des_nome} value={responsavel.des_nome}>{responsavel.des_nome}</option>)}
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
                    value={man_localizacao}
                    onChange={(event) => setManLocalizacao(event.target.value)}
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
                      value={man_obs}
                      onChange={(event) => setManObs(event.target.value)}
                    />
                  </div>
                </div>

              
            </form>
          </div>
        </div>

        <h1>Endereço</h1>

        <div class="mid-page" >

          <div class="columns m-3">


            <div class="column is-half" style={{width: '20%'}}>
                <form onSubmit={handleSubmit}>
                  <div>
                  <div className="field" >
                    <label className="form-label has-text-black">CEP:</label>

                    <input
                      class="input is-small"
                      type="text"
                      title="Digite o cep de onde será realizada a manutenção"
                      placeholder='Digite o cep:'
                      value={man_cep}
                      onChange={(event) => setManCep(event.target.value)}
                    />
                  </div>

                  <div className="field" >
                    <label className="form-label has-text-black">Numero: <span className='has-text-danger'>*</span></label>
                    <input
                      class="input is-small"
                      type="text"
                      title="Digite o número da emrpesa que realizará a manutenção"
                      placeholder='Insira o Número:'
                      value={man_numero}
                      onChange={(event) => setManNumero(event.target.value)}
                    />
                </div>

                <div className="field" >
                  <label className="form-label has-text-black">UF:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="diigite o estado em que será realizada a manutenção"
                    placeholder='Insira a sigla do estado:'
                    value={man_uf}
                    onChange={(event) => setManUf(event.target.value)}
                  />
                </div>
                </div>
              </form>
            </div>

            <div class="column is-half" style={{width: '80%'}}>
              <form onSubmit={handleSubmit}>

                <div className="field">
                  <label className="form-label has-text-black">Cidade:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite a cidade onde será realizada a manutenção"
                    placeholder='Insira a cidade'
                    value={man_cidade}
                    onChange={(event) => setManCidade(event.target.value)}
                  />
                </div>

                <div className="field" >
                  <label className="form-label has-text-black">Rua:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o nome da rua onde será realizada a manutenção"
                    placeholder='Digite a rua:'
                    value={man_rua}
                    onChange={(event) => setManRua(event.target.value)}
                  />
                </div>

                <div className="field" >
                  <label className="form-label has-text-black">Bairro:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o bairro onde será realizada a manutenção"
                    placeholder='Insira o Bairro:'
                    value={man_bairro}
                    onChange={(event) => setManBairro(event.target.value)}
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

              </form>
            </div>
                
          </div>
          <div className="field" style={{ marginInline: '20px', marginBottom: '20px'}}>
                  <label className="form-label has-text-black" >Complemento: <span className='has-text-danger'>*</span></label>
                  <input
                    class="input is-small"
                    type="text"
                    title="Digite um complemento. Por exemplo: fundos, bloco, etc."
                    placeholder='Insira um complemento:'
                    value={man_complemento}
                    onChange={(event) => setManComplemento(event.target.value)}
                  />
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