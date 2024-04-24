import React, { useState } from 'react';
import "./cadastro.css";
import axios from 'axios';

function CadastroDestinatarios({ setTela }) {
  const [des_nome, setNomeDestinatario] = useState('');
  const [des_email, setEmailDestinatario] = useState('');
  const [des_telefone, setTelefoneDestinatario] = useState('');
  const [des_endereco_id, setDesEnderecoId] = useState('');
  const [cep, setCep] = useState('');
  const [end_rua, setRuaDestinatario] = useState('');
  const [end_numero, setNumeroDestinatario] = useState('');
  const [end_complemento, setComplementoDestinatario] = useState('');
  const [end_bairro, setBairroDestinatario] = useState('');
  const [end_cidade, setCidadeDestinatario] = useState('');
  const [end_uf, setUfDestinatario] = useState('');
  const [end_cep, setCEPDestinatario] = useState('');
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar a exibição do pop-up

  const handleCepChange = async (event) => {
    const cep = event.target.value;
    setCep(cep);

    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;
        setRuaDestinatario(data.logradouro);
        setBairroDestinatario(data.bairro);
        setCidadeDestinatario(data.localidade);
        setUfDestinatario(data.uf);
        setCEPDestinatario(data.cep);
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dadosEndereco = {
      end_rua,
      end_numero,
      end_bairro,
      end_cidade,
      end_uf,
      end_complemento,
      end_cep
    };

    let response = await axios.post('http://localhost:8000/enderecos', dadosEndereco);
    const des_endereco_id = response.data;

    const dadosDestinatario = {
      des_nome,
      des_email,
      des_telefone,
      des_endereco_id
    };

    response = await axios.post('http://localhost:8000/destinatarios', dadosDestinatario);

    console.log("Destinatário:", response.data);

    setShowPopup(true); // Exibe o pop-up após o cadastro

    setNomeDestinatario('');
    setTelefoneDestinatario('');
    setEmailDestinatario('');
    setRuaDestinatario('');
    setNumeroDestinatario('');
    setComplementoDestinatario('');
    setBairroDestinatario('');
    setCidadeDestinatario('');
    setUfDestinatario('');
    setCEPDestinatario('');
  };

  return (
    <body>
      <div className='page-full'>
        <div className='field'>
          <h2>Destinatário: </h2>
        </div>
        <h1 className='has-text-weight-light is-size-4'>Dados</h1>
        <form onSubmit={handleSubmit}>
          <div className="field column">
            <label className="form-label is-size-5">Nome</label>
            <input
              className="input is-small"
              type="text"
              placeholder='Digite o nome:'
              value={des_nome}
              onChange={(event) => setNomeDestinatario(event.target.value)}
            />
          </div>
          <div className="field column">
            <label className="form-label is-size-5">Telefone</label>
            <input
              className="input is-small"
              type="text"
              placeholder='Digite o número de telefone:'
              value={des_telefone}
              onChange={(event) => setTelefoneDestinatario(event.target.value)}
            />
          </div>
          <div className="field column">
            <label className="form-label is-size-5">E-mail</label>
            <input
              className="input is-small"
              type="text"
              placeholder='Digite o email:'
              value={des_email}
              onChange={(event) => setEmailDestinatario(event.target.value)}
            />
          </div>
          <h1 className='has-text-weight-light is-size-4'>Endereço</h1>
          <div className="field column">
            <label className="form-label is-size-5">CEP</label>
            <input
              className="input is-small"
              type="text"
              placeholder='Digite o CEP:'
              value={cep}
              onChange={handleCepChange}
            />
          </div>
          <div className="field column">
            <label className="form-label is-size-5">Rua</label>
            <input
              className="input is-small"
              type="text"
              placeholder='Digite a rua:'
              value={end_rua}
              onChange={(event) => setRuaDestinatario(event.target.value)}
            />
          </div>
          <div className="field column">
            <label className="form-label is-size-5">Número</label>
            <input
              className="input is-small"
              type="text"
              placeholder='Digite o número:'
              value={end_numero}
              onChange={(event) => setNumeroDestinatario(event.target.value)}
            />
          </div>
          <div className="field column">
            <label className="form-label is-size-5">Complemento</label>
            <input
              className="input is-small"
              type="text"
              placeholder='Digite o complemento:'
              value={end_complemento}
              onChange={(event) => setComplementoDestinatario(event.target.value)}
            />
          </div>
          <div className="field column">
            <label className="form-label is-size-5">Bairro</label>
            <input
              className="input is-small"
              type="text"
              placeholder='Digite o bairro:'
              value={end_bairro}
              onChange={(event) => setBairroDestinatario(event.target.value)}
            />
          </div>
          <div className="field column">
            <label className="form-label is-size-5">Cidade</label>
            <input
              className="input is-small"
              type="text"
              placeholder='Digite a cidade:'
              value={end_cidade}
              onChange={(event) => setCidadeDestinatario(event.target.value)}
            />
          </div>
          <div className="field column">
            <label className="form-label is-size-5">UF</label>
            <input
              className="input is-small"
              type="text"
              placeholder='Digite o UF:'
              value={end_uf}
              onChange={(event) => setUfDestinatario(event.target.value)}
            />
          </div>
          <div className="field is-grouped is-grouped-centered">
            <p className="control">
              <button className="button is-primary" type="submit">
                Cadastrar
              </button>
            </p>
            <p className="control">
              <button className="button is-light" onClick={() => setTela('Destinatarios')}>
                Cancelar
              </button>
            </p>
          </div>
        </form>
        {showPopup && (
          <div id='popup' style={{ display: 'block', height: '200px', backgroundColor: '#367E90', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '40%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px' }}>
            <p className='has-text-white is-size-3-desktop is-size-4-mobile'>Destinatário Cadastrado com sucesso!</p>
            <button className='has-text-white is-size-4 p-3 mt-3' style={{ marginLeft: '60%', backgroundColor: '#459EB5', borderRadius: '100%' }} onClick={() => { setShowPopup(false); setCEPDestinatario(''); }}>
              <p className='is-size-4'>OK</p>
            </button>
          </div>
        )}
      </div>
    </body>
  );
}

export default CadastroDestinatarios;
