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


  function handleDelete() {
    const confirmDelete = window.confirm('Você realmente quer deletar este destinatário?');
    if (confirmDelete) {
    axios.delete(`http://localhost:8000/deletar/destinatario/${id}`).then((resposta) => {
      console.log(resposta.data);
      console.log("Destinatário deletado com sucesso!");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Erro ao deletar ativo:", error);
    });
    setTela('Destinatarios');
  };
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
            <button class="button is-danger" type="submit" formMethod='POST' onClick={handleDelete}>
              Deletar
            </button>
          </p>
          <p class="control">
            <button class="button is-light" onClick={() => setTela('Destinatarios')}>
              Voltar
            </button>
          </p>
        </div>
      </div>
    </body>
  );
}

export default VisualizarDestinatarios;