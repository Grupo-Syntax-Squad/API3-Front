import React, { useEffect, useState } from 'react';
import "./cadastro.css";
import axios from 'axios';

function CadastroManutenção({ setTela }) {
  // Definindo estados para armazenar os dados do ativo
  const [man_endereco_id, setManEnderecoId] = useState();
  const [man_atividade, setManAtividade] = useState('');
  const [man_data, setManData] = useState('');
  const [man_horario, setManHora] = useState('0');
  const [man_localizacao, setManLocalizacao] = useState('');
  const [man_status, setManStatus] = useState('0');
  const [man_id, setManId] = useState('');
  const [man_ativo_id, setManAtivoId] = useState('');
  const [man_responsavel, setManResponsavel] = useState('');
  const [man_obs, setManObs] = useState('');
  const [man_cep, setManCep] = useState('');
  const [man_rua, setManRua] = useState('');
  const [man_numero, setManNumero] = useState('');
  const [man_bairro, setManBairro] = useState('');
  const [man_cidade, setManCidade] = useState('');
  const [man_uf, setManUf] = useState('');
  const [man_complemento, setManComplemento] = useState('');
  const [man_quantidade, setManQuantidade] = useState(1);
  const [localizacoes, setLocalizacoes] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [ativos, setAtivos] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [dataSelecionada, setData] = useState(new Date())
  const [ativoSelecionado, setAtivo] = useState({
    "ati_localizacao_id": {
      "loc_titulo": ""
    }
  });

  const getDataFromLocalStorage = () => {
    const dataSelecionada = new Date(localStorage.getItem('dataSelecionada')).toISOString().split("T")[0];
    setData(dataSelecionada);
    console.log("Data selecionada:", dataSelecionada);
    if (dataSelecionada) {
      // Faça o que precisar com a data recuperada
      console.log('Data selecionada:', dataSelecionada);
      // Por exemplo, você pode definir o estado com a data recuperada
      setManData(dataSelecionada);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get('http://localhost:8000/ativos');
      setAtivos(response.data);
      getDataFromLocalStorage(); // Chamando a função para recuperar os dados do localStorage
    };

    fetchData(); // Chamando a função fetchData

  }, []);



  function exibirPopUp() {
    var popup = document.getElementById('popup');
    if (popup.style.display === 'none') {
      popup.style.display = 'block';
    } else {
      popup.style.display = 'none';
    }
  }

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    const camposObrigatorios = [man_status, man_data, man_cep, man_horario, man_ativo_id, man_responsavel, man_atividade];
    const camposVazios = camposObrigatorios.some(campo => !campo);

    if (camposVazios) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    let response;
    const EnderecoData = {
      end_rua: man_rua,
      end_bairro: man_bairro,
      end_cidade: man_cidade,
      end_uf: man_uf,
      end_numero: man_numero,
      end_cep: man_cep,
      end_complemento: man_complemento
    }
    response = await axios.post('http://localhost:8000/enderecos', EnderecoData)

    const dataHoraServidor = new Date(`${man_data}T${man_horario}:00`).toISOString();
    // Enviando ativo
    const ativoData = {
      man_endereco_id: response.data,
      man_atividade,
      man_data: new Date().setDate(new Date(dataSelecionada).getDate() + 1),
      man_horario: man_horario === '' ? '00:00:00' : man_horario + ':00',
      man_localizacao: ativoSelecionado.ati_localizacao_id,
      man_ativo_id: ativoSelecionado,
      man_status,
      man_responsavel
    };

    response = await axios.post('http://localhost:8000/manutencoes', ativoData);
    console.log(response.data);
    exibirPopUp();

    // Limpar campos
    setManEnderecoId('');
    setManAtividade('');
    setData('');
    setManHora('');
    setManLocalizacao('');
    setManId('');
    setManAtivoId('');
    localStorage.setItem("dataSelecionada", "")
  };

  const handlerAtivo = (e) => {
    setManAtivoId(e.target.value);
    let ativoSelecionado = ativos.find(ativo => ativo.ati_id == e.target.value);
    setAtivo(ativoSelecionado);
  }
  const [modalOpen, setModalOpen] = useState(false);

  const abrirHelp = () => {
    setModalOpen(true);
  };

  const fecharHelp = () => {
    setModalOpen(false);
  };

  // Função para lidar com a busca de CEP
  const handleCepChange = async (event) => {
    const cep = event.target.value;
    setManCep(cep);

    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;
        if (data.erro) {
          window.alert("CEP inválido!")
          setManRua("");
          setManBairro("");
          setManCidade("");
          setManUf("");
          setManCep("");
        } else {
          setManRua(data.logradouro);
          setManBairro(data.bairro);
          setManCidade(data.localidade);
          setManUf(data.uf);
          setManCep(data.cep);
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    }
  };

  return (
    <body>

      <div class="help-button"><button class=" shadow-button button button-effect is-primary m-5 ml-6 is-rounded is-size-4">?</button></div>
      <div class='page-full shadow-button'>
        <div class='field'>
          <h2 class="titulo-cadastro p-2">Cadastro de Manutenção</h2>
        </div>
        <div class="columns m-3">
          <div class="column is-half" style={{ width: '80%' }}>
            <form onSubmit={handleSubmit}>
              <div className='top-one'>
                <div class="field">
                  <label class="label has-text-weight-normal">Status <span className='has-text-danger'>*</span></label>
                  <div class="select is-small">
                    <select class="is-hovered" onChange={e => setManStatus(e.target.value)}>
                      <option value="0" selected>Aguardando Manutenção</option>
                      <option value="1">Em Manutenção</option>
                      <option value="2">Adiada</option>
                      <option value="3">Cancelada</option>
                      <option value="4">Concluída</option>
                    </select>
                  </div>
                </div>
                <div className="field" >
                  <label className="form-label ">Data da manutenção:<span className='has-text-danger'>*</span></label>

                  <input
                    class="input is-small mt-2"
                    type="date"
                    placeholder='Insira a Data da manutenção:'
                    value={dataSelecionada}
                    onChange={(event) => setData(event.target.value)}
                  />
                </div>
                <div class="field">
                  <label class="label has-text-weight-normal">Horario da Manutenção <span className='has-text-danger'>*</span></label>
                  <input
                    class="input is-small"
                    type="time"
                    title="Digite o horario que a manutenção ocorerá"
                    placeholder='Digite o horario:'
                    value={man_horario}
                    onChange={(event) => setManHora(event.target.value)}
                  />
                </div>
                <div class="field">
                  <label class="label has-text-weight-normal">Atividade<span className='has-text-danger'>*</span></label>
                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o número de série do ativo"
                    placeholder='Insira o a descrição da manutenção:'
                    value={man_atividade}
                    onChange={(event) => setManAtividade(event.target.value)}
                  />
                </div>
                <div class="field">
                  <label class="label has-text-weight-normal">Ativo <span className='has-text-danger'>*</span></label>
                  <div class="select is-small">
                    <select class="is-hovered" onChange={e => handlerAtivo(e)}>
                      <option value={null}>Selecione um ativo </option>
                      {ativos.map((ativo) => (
                        <option value={ativo.ati_id}>{ativo.ati_id} {ativo.ati_titulo}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="field" >
                  <label className="label has-text-weight-normal">Responsável<span className='has-text-danger'>*</span></label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o responsavel da manutenção"
                    placeholder='Insira o o responsável pela manutenção'
                    value={man_responsavel}
                    onChange={(event) => setManResponsavel(event.target.value)}
                  />
                </div>
                <div class="field">
                  <label class="label has-text-weight-normal">Localização</label>
                  <input
                    class="input is-small"
                    type="text"
                    title="Digite a localização"
                    placeholder='Insira a Localização:'
                    value={ativoSelecionado.ati_localizacao_id.loc_titulo}
                    onChange={(event) => setManLocalizacao(event.target.value)}
                  />
                </div>
                <div className="field" >
                  <label className="label has-text-weight-normal">Observações</label>
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
        <div class="mid-page">
          <div class="columns m-3">
            <div class="column is-half" style={{ width: '20%' }}>
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="field" >

                    <label className="form-label">CEP:<span className='has-text-danger'>*</span></label>

                    <input
                      class="input is-small"
                      type="text"
                      title="Digite o cep de onde será realizada a manutenção"
                      placeholder='Digite o cep:'
                      value={man_cep}
                      onChange={handleCepChange}
                    />
                  </div>
                  <div className="field" >
                    <label className="form-label">Número:<span className='has-text-danger'>*</span></label>
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
                    <label className="form-label">UF:<span className='has-text-danger'>*</span></label>

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
            <div class="column is-half" style={{ width: '80%' }}>
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="form-label ">Cidade:<span className='has-text-danger'>*</span></label>

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
                  <label className="form-label">Rua:<span className='has-text-danger'>*</span></label>

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
                  <label className="form-label">Bairro:<span className='has-text-danger'>*</span></label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite o bairro onde será realizada a manutenção"
                    placeholder='Insira o Bairro:'
                    value={man_bairro}
                    onChange={(event) => setManBairro(event.target.value)}
                  />
                </div>
                <div className="field" >
                  <label className="form-label" >Complemento:</label>

                  <input
                    class="input is-small"
                    type="text"
                    title="Digite um complemento. Por exemplo: fundos, bloco, etc."
                    placeholder='Insira um complemento:'
                    value={man_complemento}
                    onChange={(event) => setManComplemento(event.target.value)}
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
            <button class="button is-light" onClick={() => setTela('Manutenções')}>
              Cancelar
            </button>
          </p>
          {showPopup && (
            <div>
              <div className="modal-background" onClick={fecharHelp}></div>
              <div className="modal-content">

                <div className="box ajuda m-3 has-text-white">
                  <p className='has-text-weight-bold' >Manutenção Cadastrada com sucesso!</p>
                  <button class="delete is-pulled-right" aria-label="close" onClick={fecharHelp}></button>
                </div>

              </div>
              <button className="modal-close is-large" aria-label="close" onClick={fecharHelp}></button>
            </div>
          )}
        </div>
      </div>
      <div className="help-button">
        <button className="shadow-button button button-effect is-primary m-5 ml-6 is-rounded is-size-4" onClick={abrirHelp}>?</button>

        <div className={`modal ${modalOpen ? 'is-active' : ''}`}>
          <div className="modal-background" onClick={fecharHelp}></div>
          <div className="modal-content">


            <div className="box ajuda m-6 has-text-white">
              <button class="delete is-pulled-right" aria-label="close" onClick={fecharHelp}></button>
              <p>Esta é a <span className='has-text-weight-bold'>Pagina de Cadastro da Manutenção</span>,  Preencha os dados nescessários referentes à manutenção. OBSERVAÇÃO: No campo "Endereço" cadastre o endereço do local onde a manutenção será realizada, caso a manutenção seja feita na própria empresa, coloque o endereço da empresa, para os casos em que a manutenção será feita em uma loja técnica, oficina etc. Cadastre o endereço respectivo. No campo "Atividade": Informe a atividade que será feita, por exemplo: "Troca de peças", "Limpeza", "Calibração" etc.</p>
            </div>

          </div>
          <button className="modal-close is-large" aria-label="close" onClick={fecharHelp}></button>
        </div>
      </div>
    </body>
  );
}

export default CadastroManutenção;
