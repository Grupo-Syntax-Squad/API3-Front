import React, { useState } from 'react';
import "./cadastro.css";
import imgadd from "./imgadd.png"
import docadd from "./docadd.png"

function CadastroDestinatarios ({setTela}) {
  // Definindo estados para armazenar os dados do ativo
  const [numeroAtivo, setNumAtivo] = useState('');
  const [tipoAtivo, setTipoAtivo] = useState('');
  const [localizacaoAtivo, setLocalizacaoAtivo] = useState('');
  const [statusAtivo, setStatusAtivo] = useState('');
  const [destinatarioAtivo, setDestinatarioAtivo] = useState('');
  const [tituloAtivo, setTituloAtivo] = useState('');
  const [complementoAtivo, setComplementoAtivo] = useState('');
  const [marcaAtivo, setMarcaAtivo] = useState('');
  const [modeloAtivo, setModeloAtivo] = useState('');
  const [serieAtivo, setSerieAtivo] = useState('');
  const [valorAtivo, setValorAtivo] = useState('');
  const [tamanhoAtivo, setTamanhoAtivo] = useState('');
  const [capacidadeAtivo, setCapacidadeAtivo] = useState('');
  const [qtdadeAtivo, setQuantidadeAtivo] = useState('');
  const [usoAtivo, setUsoAtivo] = useState('');
  const [fornecedorAtivo, setFornecedorAtivo] = useState('');
  const [fabricacaoAtivo, setFabricacaoAtivo] = useState('');
  const [validadeAtivo, setValidadeAtivo] = useState('');
  const [nfeAtivo, setNfeAtivo] = useState('');
  const [urlAtivo, setUrlAtivo] = useState('');
  const [comentarioAtivo, setComentarioAtivo] = useState('');




  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode enviar os dados do ativo para o backend ou fazer outras operações
    console.log("Dados do ativo:", { numeroAtivo, tipoAtivo, localizacaoAtivo, statusAtivo, destinatarioAtivo, tituloAtivo, complementoAtivo });
    // Limpar os campos do formulário após o envio
    setNumAtivo('');
    setTipoAtivo('');
    setLocalizacaoAtivo('');
    setStatusAtivo('');
    setDestinatarioAtivo('');
    setTituloAtivo('');
    setComplementoAtivo('');
  };

  return (
  <body>
    <div class='page-full'>
      <div class='field'>
      <h2>Destinatário: </h2>
      </div>
      <h1 className='has-text-weight-light'>Dados</h1>

      <form>
          
          <div class="field column ">
            <label class="form-label">Nome</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              // value={dadosAtivo.numeroAtivo}
              
            />
          </div>
          <div class="field column">
          <label class="form-label">Telefone</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              // value={dadosAtivo.numeroAtivo}
              
            />
          </div>
          <div class="field column">
          <label class="form-label">E-mail</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              // value={dadosAtivo.numeroAtivo}
              
            />
          </div>
          <div class="field column">
          <label class="form-label">Senha</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              // value={dadosAtivo.numeroAtivo}
              
            />
          </div>
        
        </form>

            <h1>Endereço</h1>
            <form>
            <div class="field column">
          <label class="form-label">Rua</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              // value={dadosAtivo.numeroAtivo}
              
            />
          </div>
          <div class="field column">
          <label class="form-label">Número</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              // value={dadosAtivo.numeroAtivo}
              
            />
          </div>
          <div class="field column">
          <label class="form-label">Complemento</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              // value={dadosAtivo.numeroAtivo}
              
            />
          </div>
          <div class="field column">
          <label class="form-label">Bairro</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              // value={dadosAtivo.numeroAtivo}
              
            />
          </div>
          <div class="field column">
          <label class="form-label">Cidade</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              // value={dadosAtivo.numeroAtivo}
              
            />
          </div>
          <div class="field column">
          <label class="form-label">UF</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              // value={dadosAtivo.numeroAtivo}
              
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
        <button class="button is-light" onClick={() => setTela('Ativos')}>
          Cancelar
          </button>
      </p>
    
    </div>
  
  </div>
  </body>
  

  


  );
}

export default CadastroDestinatarios;