import React, { useEffect, useState } from 'react';
import "./cadastro.css";
import axios from 'axios';

function CadastroManutenção({ setTela }) {
  const [man_endereco_id, setManEnderecoId] = useState('');
  const [man_atividade, setManAtividade] = useState('');
  const [man_data, setManData] = useState('');
  const [man_horario, setManHora] = useState('');
  const [man_localizacao, setManLocalizacao] = useState('');
  const [man_status, setManStatus] = useState('');
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
  const [ativoSelecionado, setAtivo] = useState({
    "ati_localizacao_id": {
      "loc_titulo": ""
    }
  });
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar a exibição do pop-up

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get('http://localhost:8000/ativos');
        setAtivos(response.data);

        // Se quiser reativar a busca de localizações e tipos:
        // response = await axios.get('http://localhost:8000/localizacoes');
        // setLocalizacoes(response.data);

        // response = await axios.get('http://localhost:8000/tipos');
        // setTipos(response.data);

        // response = await axios.get('http://localhost:8000/responsavel');
        // setManResponsavel(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleCepChange = async (event) => {
    const cep = event.target.value;
    setManCep(cep);

    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;
        setManRua(data.logradouro);
        setManBairro(data.bairro);
        setManCidade(data.localidade);
        setManUf(data.uf);
        setManCep(data.cep);
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Criar o endereço
      const enderecoData = {
        end_rua: man_rua,
        end_bairro: man_bairro,
        end_cidade: man_cidade,
        end_uf: man_uf,
        end_numero: man_numero,
        end_cep: man_cep,
        end_complemento: man_complemento
      };
      const enderecoResponse = await axios.post('http://localhost:8000/enderecos', enderecoData);

      // Criar a manutenção
      const manutencaoData = {
        man_endereco_id: enderecoResponse.data,
        man_atividade,
        man_data,
        man_horario,
        man_localizacao: ativoSelecionado.ati_localizacao_id,
        man_ativo_id: ativoSelecionado,
        man_status,
        man_responsavel
      };
      const manutencaoResponse = await axios.post('http://localhost:8000/manutencoes', manutencaoData);
      console.log(manutencaoResponse.data);

      setShowPopup(true); // Exibir o pop-up após o cadastro

      // Limpar campos
      setManEnderecoId('');
      setManAtividade('');
      setManData('');
      setManHora('');
      setManLocalizacao('');
      setManId('');
      setManAtivoId('');
      setManStatus('');
      setManResponsavel('');
      setManObs('');
      setManCep('');
      setManRua('');
      setManNumero('');
      setManBairro('');
      setManCidade('');
      setManUf('');
      setManComplemento('');
      setManQuantidade(1);
    } catch (error) {
      console.error('Erro ao cadastrar manutenção:', error);
    }
  };

  const handlerAtivo =
    (e) => {
      setManAtivoId(e.target.value);
      let ativoSelecionado = ativos.find(ativo => ativo.ati_id === e.target.value);
      setAtivo(ativoSelecionado);
      console.log(ativoSelecionado);
    };

  return (
    <body>
      <div className='page-full'>
        <div className='field'>
          <h2>Cadastro de Manutenção</h2>
        </div>
        <div className="columns m-3">
          <div className="column is-half">
            <form onSubmit={handleSubmit}>
              <div className='top-one'>
                <div className="field">
                  <label className="label has-text-black">Status: <span className='has-text-danger'></span></label>
                  <div className="select is-small">
                    <select className="is-hovered" onChange={e => setManStatus(e.target.value)}>
                      <option value="0">Aguardando Manutenção</option>
                      <option value="1">Em Manutenção</option>
                      <option value="2">Adiada</option>
                      <option value="3">Cancelada</option>
                      <option value="4">Concluída</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-black">Data da manutenção:</label>
                  <input
                    className="input is-small"
                    type="date"
                    placeholder='Insira a Data da manutenção:'
                    value={man_data}
                    onChange={(event) => setManData(event.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="label has-text-black">Horário: <span className='has-text-danger'></span></label>
                  <input
                    className="input is-small"
                    type="text"
                    title="Digite o horário que a manutenção ocorrerá"
                    placeholder='Digite o horário:'
                    value={man_horario}
                    onChange={(event) => setManHora(event.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="label has-text-black">Atividade: <span className='has-text-danger'></span></label>
                  <input
                    className="input is-small"
                    type="text"
                    title="Digite a descrição da manutenção"
                    placeholder='Insira a descrição da manutenção:'
                    value={man_atividade}
                    onChange={(event) => setManAtividade(event.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="label has-text-black">Ativo: <span className='has-text-danger'></span></label>
                  {ativos && ativos.length > 0 ? (
                    <div className="select is-small">
                      <select className="is-hovered" onChange={e => handlerAtivo(e)}>
                        {ativos.map((ativo) => (
                          <option key={ativo.ati_id} value={ativo.ati_id}>{ativo.ati_id} {ativo.ati_titulo}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <p className='has-text-black'>Nenhum ativo disponível</p>
                  )}
                </div>
                <div className="field">
                  <label className="label has-text-black">Responsável:</label>
                  <input
                    className="input is-small"
                    type="text"
                    title="Digite o responsável pela manutenção"
                    placeholder='Insira o responsável pela manutenção'
                    value={man_responsavel}
                    onChange={(event) => setManResponsavel(event.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="label has-text-black">Localização:</label>
                  <input
                    className="input is-small"
                    type="text"
                    title="Digite a localização"
                    placeholder='Insira a Localização:'
                    value={ativoSelecionado.ati_localizacao_id.loc_titulo}
                    onChange={(event) => setManLocalizacao(event.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="label has-text-black">Observações:</label>
                  <input
                    className="input is-small"
                    type="text"
                    placeholder='Insira um Complemento:'
                    title="Digite um complemento para a manutenção"
                    rows="4"
                    value={man_obs}
                    onChange={(event) => setManObs(event.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='mid-page'>
          <div className="columns m-3">
            <div className="column is-half">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="field">
                    <label className="label has-text-black">CEP:</label>
                    <input
                      className="input is-small"
                      type="text"
                      title="Digite o CEP onde será realizada a manutenção"
                      placeholder='Digite o CEP:'
                      value={man_cep}
                      onChange={handleCepChange}
                    />
                  </div>
                  <div className="field">
                    <label className="label has-text-black">Número: <span className='has-text-danger'>*</span></label>
                    <input
                      className="input is-small"
                      type="text"
                      title="Digite o número da empresa onde será realizada a manutenção"
                      placeholder='Insira o Número:'
                      value={man_numero}
                      onChange={(event) => setManNumero(event.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label className="label has-text-black">UF:</label>
                    <input
                      className="input is-small"
                      type="text"
                      title="Digite o estado onde será realizada a manutenção"
                      placeholder='Insira a sigla do estado:'
                      value={man_uf}
                      onChange={(event) => setManUf(event.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="column is-half">
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label has-text-black">Cidade:</label>
                  <input
                    className="input is-small"
                    type="text"
                    title="Digite a cidade onde será realizada a manutenção"
                    placeholder='Insira a cidade'
                    value={man_cidade}
                    onChange={(event) => setManCidade(event.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="label has-text-black">Rua:</label>
                  <input
                    className="input is-small"
                    type="text"
                    title="Digite o nome da rua onde será realizada a manutenção"
                    placeholder='Digite a rua:'
                    value={man_rua}
                    onChange={(event) => setManRua(event.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="label has-text-black">Bairro:</label>
                  <input
                    className="input is-small"
                    type="text"
                    title="Digite o bairro onde será realizada a manutenção"
                    placeholder='Insira o Bairro:'
                    value={man_bairro}
                    onChange={(event) => setManBairro(event.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="label has-text-black">Complemento: <span className='has-text-danger'>*</span></label>
                  <input
                    className="input is-small"
                    type="text"
                    title="Digite um complemento para a manutenção"
                    placeholder='Insira um complemento:'
                    value={man_complemento}
                    onChange={(event) => setManComplemento(event.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered">
          <p className="control">
            <button className="button is-primary" type="submit" formMethod='POST' onClick={handleSubmit}>
              Cadastrar
            </button>
          </p>
          <p className="control">
            <button className="button is-light" onClick={() => setTela('Manutenções')}>
              Cancelar
            </button>
          </p>
        </div>

        {showPopup && (
          <div id='popup' className='popup' style={{ backgroundColor: '#367E90' }}>
            <p className='has-text-white is-size-3-desktop is-size-4-mobile'>Manutenção Cadastrada com sucesso!</p>
            <button className='has-text-white is-size-4 p-3 mt-3' style={{ backgroundColor: '#459EB5', borderRadius: '100%' }} onClick={() => setShowPopup(false)}>
              OK
            </button>
          </div>
        )}
      </div>
    </body>
  );
}

export default CadastroManutenção;
