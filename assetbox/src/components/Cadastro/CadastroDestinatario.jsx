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
  const [des_tip, setTipoDestinatario] = useState('');
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar a exibição do pop-up
  const [des_cpf, setCPFDestinatario] = useState('');

  const handleTelefone = (value) => {
    // Remove tudo que não for dígito
    const onlyNums = value.replace(/[^\d]/g, '');

    if (onlyNums.length <= 10) {
      // Formata para (xx) xxxx-xxxx
      return onlyNums.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      // Formata para (xx) xxxxx-xxxx
      return onlyNums.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const HandleEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setEmailDestinatario(email);
  };

  const handleTelefoneChange = (event) => {
    const telefone = event.target.value;
    const telefoneFormatado = handleTelefone(telefone);
    setTelefoneDestinatario(telefoneFormatado);
  };

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

    // Verifica se o e-mail está vazio
    if (des_email.trim() === '') {
      window.alert('O e-mail não pode estar vazio.');
      return;
    }

    // Verifica se o e-mail é válido
    if (!HandleEmail(des_email)) {
      window.alert('E-mail inválido.');
      return;
    }

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
      des_endereco_id,
      des_tip,
      des_cpf
    };

    response = await axios.post('http://localhost:8000/destinatarios', dadosDestinatario);

    console.log("Destinatário:", response.data);

    setShowPopup(true); // Exibe o pop-up após o cadastro

    setNomeDestinatario('');
    setTelefoneDestinatario('');
    setEmailDestinatario('');
    setCEPDestinatario('');
    setRuaDestinatario('');
    setNumeroDestinatario('');
    setComplementoDestinatario('');
    setBairroDestinatario('');
    setCidadeDestinatario('');
    setUfDestinatario('');
    setTipoDestinatario('');
    setCPFDestinatario('');
  };

  return (
    <body>
      <div className='page-full'>
        <div className='field'>
            <h2 class="titulo-cadastro">Cadastro de destinatário</h2>
        </div>
        <form onSubmit={handleSubmit} className="m-6" >
          <div className='columns'>

            <div className="column is-half m-3">

              <h1 className='has-text-weight-light is-size-4'>Dados</h1>

              <div className="field column">
                <label className="form-label is-size-5">Nome: <span className='has-text-danger'>*</span></label>
                <input
                  className="input is-small"
                  type="text"
                  placeholder='Digite o nome:'
                  value={des_nome}
                  onChange={(event) => setNomeDestinatario(event.target.value)}
                />
              </div>

              <div className="field column">
                <label className="form-label is-size-5">Telefone: <span className='has-text-danger'>*</span></label>
                <input
                  className="input is-small"
                  type="text"
                  placeholder='Digite o número de telefone:'
                  value={des_telefone}
                  onChange={handleTelefoneChange}
                />
              </div>

              <div className="field column">
                <label className="form-label is-size-5">E-mail: <span className='has-text-danger'>*</span></label>
                <input
                  className="input is-small"
                  type="text"
                  placeholder='Digite o email:'
                  value={des_email}
                  onChange={handleEmailChange}
                />
              </div>

              <div className="field column">
                <label className="form-label is-size-5">CPF: <span className='has-text-danger'>*</span></label>
                <input
                  className="input is-small"
                  type="text"
                  placeholder='Digite o CPF:'
                  value={des_cpf}
                  onChange={e => setCPFDestinatario(e.target.value)}
                />
              </div>
            </div>

            <div className="column is-half m-3">
              <h1 className='has-text-weight-light is-size-4'>Endereço</h1>

              <div className="field column">
                <label className="form-label is-size-5">CEP: <span className='has-text-danger'>*</span></label>
                <input
                  className="input is-small"
                  type="text"
                  placeholder='Digite o CEP:'
                  value={cep}
                  onChange={handleCepChange}
                />
              </div>

              <div className="field column">
                <label className="form-label is-size-5">Rua: <span className='has-text-danger'>*</span></label>
                <input
                  className="input is-small"
                  type="text"
                  placeholder='Digite a rua:'
                  value={end_rua}
                  onChange={(event) => setRuaDestinatario(event.target.value)}
                />
              </div>
              <div className="field column">
                <label className="form-label is-size-5">Bairro: <span className='has-text-danger'>*</span></label>
                <input
                  className="input is-small"
                  type="text"
                  placeholder='Digite o bairro:'
                  value={end_bairro}
                  onChange={(event) => setBairroDestinatario(event.target.value)}
                />
              </div>

              <div className="field column">
                <label className="form-label is-size-5">Cidade: <span className='has-text-danger'>*</span></label>
                <input
                  className="input is-small"
                  type="text"
                  placeholder='Digite a cidade:'
                  value={end_cidade}
                  onChange={(event) => setCidadeDestinatario(event.target.value)}
                />
              </div>

              <div className="field column">
                <label className="form-label is-size-5">UF: <span className='has-text-danger'>*</span></label>
                <input
                  className="input is-small"
                  type="text"
                  placeholder='Digite o UF:'
                  value={end_uf}
                  onChange={(event) => setUfDestinatario(event.target.value)}
                />
              </div>

              <div className="field column">
                <label className="form-label is-size-5">Número: <span className='has-text-danger'>*</span></label>
                <input
                  className="input is-small"
                  type="text"
                  placeholder='Digite o número:'
                  value={end_numero}
                  onChange={(event) => setNumeroDestinatario(event.target.value)}
                />
              </div>

              <div className="field column">
                <label className="form-label is-size-5">Complemento: </label>
                <input
                  className="input is-small"
                  type="text"
                  placeholder='Digite o complemento:'
                  value={end_complemento}
                  onChange={(event) => setComplementoDestinatario(event.target.value)}
                />
              </div>

            </div>
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

          {showPopup && (
            <div className='shadow-pop-up' id='popup' style={{ display: 'block', height: '200px', backgroundColor: '#367E90', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '40%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px'}}>
              <p className='has-text-white is-size-3-desktop is-size-4-mobile has-text-weight-medium'>Destinatário Cadastrado com sucesso!</p>
              <button className='has-text-white is-size-4 p-3 mt-3' style={{ marginLeft: '60%', backgroundColor: '#459EB5', borderRadius: '100%' }} onClick={() => { setShowPopup(false); setCEPDestinatario(''); }}>
                <p className='is-size-4 has-text-weight-medium'>OK</p>
              </button>
            </div>
          )}
        </form>
      </div>
    </body>
  );
}

export default CadastroDestinatarios;
