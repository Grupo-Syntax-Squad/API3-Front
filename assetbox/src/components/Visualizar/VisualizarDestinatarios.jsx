import React, { useState, useEffect } from 'react';
import "./visualizar.css";
import axios from 'axios';

class ViewDestinatario {
  constructor(nome, telefone, email, senha, rua, numero, complemento, bairro, cidade, uf) {
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.senha = senha;
    this.rua = rua;
    this.numero = numero;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cidade = cidade;
    this.uf = uf;
  }
}

function VisualizarDestinatarios({ setTela }) {
  const [dadosDestinatario, setDadosDestinatario] = useState({})
  const [dadosEndereco, setDadosEndereco] = useState({})
  const id = localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/destinatario/${id}`);
        const dados = response.data;
        setDadosDestinatario(dados);
        setDadosEndereco(dados.des_endereco_id);
      } catch (error) {
        console.error(`Erro ao buscar dados do destinatário ${id}:`, error);
      }
    };
    fetchData();
  }, []);
  
  function exibirPopUpDelecao() {
    var popup = document.getElementById('popupdelecao');
    if (popup.style.display === 'none') {
        popup.style.display = 'block';
    } else {
        popup.style.display = 'none';
    }
}

function exibirPopUpConfirmacao() {
  var popup = document.getElementById('popupconfirmacao');
  if (popup.style.display === 'none') {
      popup.style.display = 'block';
  } else {
      popup.style.display = 'none';
  }
}


  function handleDelete() {
    axios.delete(`http://localhost:8000/deletar/destinatario/${id}`).then((resposta) => {
      console.log(resposta.data);
      exibirPopUpDelecao();
      exibirPopUpConfirmacao();
    })
    .catch((error) => {
      console.error("Erro ao deletar destinatário:", error);
    });
}

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
              value={dadosDestinatario.des_nome}
              disabled
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Telefone</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosDestinatario.des_telefone}
              disabled
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">E-mail</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosDestinatario.des_email}
              disabled
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Senha</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosDestinatario.des_senha}
              disabled
            />
          </div>
          <h1 className='has-text-weight-light is-size-4'>Endereço</h1>

          <div class="field column">
            <label class="form-label is-size-5">Rua</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosEndereco.end_rua}
              disabled
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Número</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosEndereco.end_numero}
              disabled
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Complemento</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosEndereco.end_complemento}
              disabled
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Bairro</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosEndereco.end_bairro}
              disabled
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Cidade</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosEndereco.end_cidade}
              disabled
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">UF</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosEndereco.end_uf}
              disabled
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">CEP</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosEndereco.end_cep}
              disabled
            />
          </div>
        </form>
        <div class="field is-grouped is-grouped-centered">
        </div>
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <button class="button is-danger" type="submit" formMethod='POST' onClick={exibirPopUpDelecao}>
              Deletar
            </button>
          </p>
          <p class="control">
            <button class="button is-light" onClick={() => setTela('Destinatarios')}>
              Voltar
            </button>
          </p>
        </div>
      <div id='popupdelecao' style={{display: 'none', height: '200px', backgroundColor: '#FFFFFF', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '50%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px'}}>
    <p className='is-size-4-desktop is-size-6-mobile has-text-weight-bold' style={{color: '#3A7D8E'}}>Tem certeza de que quer deletar este Destinatário?</p>
    <div className='is-flex  is-justify-content-space-evenly'>  
      <button className='has-text-white is-size-4 p-3 mt-3 ' style={{backgroundColor:'#C21D1D', borderRadius: '40px'}} onClick={() => handleDelete()}>
        <p className='is-size-4-desktop is-size-6-mobile' onClick={handleDelete}>Deletar</p>
        </button>
        <button className='has-text-white is-size-4 p-3 mt-3' style={{ backgroundColor:'#959292', borderRadius: '40px',}} onClick={exibirPopUpDelecao}>
        <p className='is-size-4-desktop is-size-6-mobile'>Cancelar</p>
        </button>
    </div>
    </div>
    <div id='popupconfirmacao' style={{display: 'none', height: '200px', backgroundColor: '#367E90', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '40%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px'}}>
    <p className='has-text-white is-size-3-desktop is-size-4-mobile'>Destinatário deletado com sucesso!</p>
    <button className='has-text-white is-size-4 p-3 mt-3' style={{marginLeft: '60%', backgroundColor:'#459EB5', borderRadius: '100%'}}>
      <p className='is-size-4' onClick={() => setTela('Destinatarios')}>OK</p>
      </button>
    </div>
      </div>
    </body>
  );
}

export default VisualizarDestinatarios;