import React, { useState, useEffect} from 'react';
import "./visualizar.css";
import imgadd from "./imgadd.png"
import docadd from "./docadd.png"
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

function VisualizarDestinatarios ({setTela}) {
  const [dadosDestinatario, setDadosDestinatario] = useState({
    nome: '',
    telefone: '',
    email: '',
    senha: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
  })

  useEffect((id) => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost8080/destinatario/${id}`);
        const dados = response.data; 
        setDadosDestinatario(dados);
      } catch (error) {
        console.error(`Erro ao buscar dados do destinatário ${id}:`, error);
      }
    };
    fetchData();
  }, []);


  function handleDelete(id) {
    axios.delete(`http://localhost:8080/destinatarios/${id}`).then((resposta) => {
        console.log(resposta.data);
    }); 
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
              value={dadosDestinatario.nome}
              
            />
          </div>
          <div class="field column">
          <label class="form-label is-size-5">Telefone</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosDestinatario.telefone}
              
            />
          </div>
          <div class="field column">
          <label class="form-label is-size-5">E-mail</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosDestinatario.email}
              
            />
          </div>
          <div class="field column">
          <label class="form-label is-size-5">Senha</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosDestinatario.senha}
              
            />
          </div>
            <h1 className='has-text-weight-light is-size-4'>Endereço</h1>
            
            <div class="field column">
          <label class="form-label is-size-5">Rua</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosDestinatario.rua}
              
            />
          </div>
          <div class="field column">
          <label class="form-label is-size-5">Número</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosDestinatario.numero}
              
            />
          </div>
          <div class="field column">
          <label class="form-label is-size-5">Complemento</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosDestinatario.complemento}
              
            />
          </div>
          <div class="field column">
          <label class="form-label is-size-5">Bairro</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosDestinatario.bairro}
              
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Cidade</label>
              <input
                class="input is-small"
                type="text"
                placeholder='Digite um Número:'
                value={dadosDestinatario.cidade}
                
              />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">UF</label>
              <input
                class="input is-small"
                type="text"
                placeholder='Digite um Número:'
                value={dadosDestinatario.uf}
                
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
   



            <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <button class="button is-danger" type="submit" formMethod='POST' onClick={(id) => handleDelete(`http://localhost8080/ativo/deletar/${id}`)}>
          Deletar
        </button>
      </p>
      <p class="control">
        <button class="button is-light" onClick={() => setTela('Destinatários')}>
          Voltar
          </button>
      </p>
    
    </div>
  
  </div>


  </body>
  

  


  );
}

export default VisualizarDestinatarios;