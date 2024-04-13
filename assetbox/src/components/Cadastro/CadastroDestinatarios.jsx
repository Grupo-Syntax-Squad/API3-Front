import React, { useState } from 'react';
import "./cadastro.css";

function CadastroDestinatarios ({setTela}) {
  // Definindo estados para armazenar os dados do ativo
  const [nomeDestinatario, setNomeDestinatario] = useState('');
  const [telefoneDestinatario, setTelefoneDestinatario] = useState('');
  const [emailDestinatario, setEmailDestinatario] = useState('');
  const [senhaDestinatario, setSenhaDestinatario] = useState('');
  const [ruaDestinatario, setRuaDestinatario] = useState('');
  const [numeroDestinatario, setNumeroDestinatario] = useState('');
  const [complementoDestinatario, setComplementoDestinatario] = useState('');
  const [bairroDestinatario, setBairroDestinatario] = useState('');
  const [cidadeDestinatario, setCidadeDestinatario] = useState('');
  const [ufDestinatario, setUfDestinatario] = useState('');


  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode enviar os dados do ativo para o backend ou fazer outras operações
    console.log("Dados do ativo:", { nomeDestinatario, telefoneDestinatario, emailDestinatario, senhaDestinatario, ruaDestinatario, numeroDestinatario, complementoDestinatario, bairroDestinatario, cidadeDestinatario, ufDestinatario });
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
              placeholder='Digite um Número:'
              value={nomeDestinatario}
              onChange={(event) => setNomeDestinatario(event.target.value)}
            />
          </div>
          <div class="field column">
          <label class="form-label is-size-5">Telefone</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={telefoneDestinatario}
              onChange={(event) => setTelefoneDestinatario(event.target.value)}
              
            />
          </div>
          <div class="field column">
          <label class="form-label is-size-5">E-mail</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={emailDestinatario}
              onChange={(event) => setEmailDestinatario(event.target.value)}
              
            />
          </div>
          <div class="field column">
          <label class="form-label is-size-5">Senha</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={senhaDestinatario}
              onChange={(event) => setSenhaDestinatario(event.target.value)}
              
            />
          </div>
            <h1 className='has-text-weight-light is-size-4'>Endereço</h1>
            
            <div class="field column">
          <label class="form-label is-size-5">Rua</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={ruaDestinatario}
              onChange={(event) => setRuaDestinatario(event.target.value)}
              
            />
          </div>
          <div class="field column">
          <label class="form-label is-size-5">Número</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={numeroDestinatario}
              onChange={(event) => setNumeroDestinatario(event.target.value)}
              
            />
          </div>
          <div class="field column">
          <label class="form-label is-size-5">Complemento</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={complementoDestinatario}
              onChange={(event) => setComplementoDestinatario(event.target.value)}
              
            />
          </div>
          <div class="field column">
          <label class="form-label is-size-5">Bairro</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={bairroDestinatario}
              onChange={(event) => setBairroDestinatario(event.target.value)}
              
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Cidade</label>
              <input
                class="input is-small"
                type="text"
                placeholder='Digite um Número:'
                value={cidadeDestinatario}
                onChange={(event) => setCidadeDestinatario(event.target.value)}
                
              />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">UF</label>
              <input
                class="input is-small"
                type="text"
                placeholder='Digite um Número:'
                value={ufDestinatario}
                onChange={(event) => setUfDestinatario(event.target.value)}
                
              />
          </div>
            </form>
            <div class="field is-grouped is-grouped-centered">
    </div>
    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <button class="button is-primary" type="submit" formMethod='POST'>
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