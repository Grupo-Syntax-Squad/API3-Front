import React, { useState } from 'react';
import "./cadastro.css";
import axios from 'axios';

function CadastroDestinatarios({ setTela }) {
  // Destinatário
  const [des_nome, setNomeDestinatario] = useState('');
  const [des_telefone, setTelefoneDestinatario] = useState('');
  const [des_email, setEmailDestinatario] = useState('');
  const [des_senha, setSenhaDestinatario] = useState('');

  // Endereço
  const [end_rua, setRuaDestinatario] = useState('');
  const [end_numero, setNumeroDestinatario] = useState('');
  const [end_complemento, setComplementoDestinatario] = useState('');
  const [end_bairro, setBairroDestinatario] = useState('');
  const [end_cidade, setCidadeDestinatario] = useState('');
  const [end_uf, setUfDestinatario] = useState('');
  const [end_cep, setCEPDestinatario] = useState('');


  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Cadastrando o endereço
    const dadosEndereco = {
      end_rua,
      end_numero,
      end_complemento,
      end_bairro,
      end_cidade,
      end_uf,
      end_cep
    };
    
    console.log("Endereço:");
    console.log(dadosEndereco);

    // let response = await axios.post('http://localhost:8000/endereco', dadosEndereco);
    // const des_endereco_id = response.data;
    // console.log(des_endereco_id);

    // Cadastrando o destinatário
    const dadosDestinatario = {
      des_nome,
      des_telefone,
      des_email,
      des_senha,
      des_endereco_id: dadosEndereco
    };

    const response = await axios.post('http://localhost:8000/cadastrar/destinatario', dadosDestinatario);

    console.log("Destinatário:");
    console.log(response.data);

    // Limpar os campos do formulário após o envio
    setNomeDestinatario('');
    setTelefoneDestinatario('');
    setEmailDestinatario('');
    setSenhaDestinatario('');
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
      <div class='page-full'>
        <div class='field'>
          <h2>Destinatário: </h2>
        </div>
        <h1 className='has-text-weight-light is-size-4'>Dados</h1>

        <form>

          <div class="field column ">
            <label class="form-label is-size-5">Nome</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite o nome:'
              value={des_nome}
              onChange={(event) => setNomeDestinatario(event.target.value)}
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Telefone</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite o número de telefone:'
              value={des_telefone}
              onChange={(event) => setTelefoneDestinatario(event.target.value)}

            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">E-mail</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite o email:'
              value={des_email}
              onChange={(event) => setEmailDestinatario(event.target.value)}

            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Senha</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite a senha:'
              value={des_senha}
              onChange={(event) => setSenhaDestinatario(event.target.value)}

            />
          </div>
          <h1 className='has-text-weight-light is-size-4'>Endereço</h1>

          <div class="field column">
            <label class="form-label is-size-5">Rua</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite a rua:'
              value={end_rua}
              onChange={(event) => setRuaDestinatario(event.target.value)}

            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Número</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite o número:'
              value={end_numero}
              onChange={(event) => setNumeroDestinatario(event.target.value)}

            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Complemento</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite o complemento:'
              value={end_complemento}
              onChange={(event) => setComplementoDestinatario(event.target.value)}

            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Bairro</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite o bairro:'
              value={end_bairro}
              onChange={(event) => setBairroDestinatario(event.target.value)}

            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Cidade</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite a cidade:'
              value={end_cidade}
              onChange={(event) => setCidadeDestinatario(event.target.value)}

            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">UF</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite o UF:'
              value={end_uf}
              onChange={(event) => setUfDestinatario(event.target.value)}

            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">CEP</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite o CEP:'
              value={end_cep}
              onChange={(event) => setCEPDestinatario(event.target.value)}

            />
          </div>
        </form>
        <div class="field is-grouped is-grouped-centered">
        </div>
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <button class="button is-primary" type="submit" formMethod='POST' onClick={handleSubmit}>
              Cadastrar
            </button>
          </p>
          <p class="control">
            <button class="button is-light" onClick={() => setTela('Destinatarios')}>
              Cancelar
            </button>
          </p>

        </div>

      </div>
    </body>
  );
}

export default CadastroDestinatarios;