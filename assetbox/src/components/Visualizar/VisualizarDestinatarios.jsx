import React, { useState, useEffect} from 'react';
import "./visualizar.css";
import imgadd from "./imgadd.png"
import docadd from "./docadd.png"
import axios from 'axios';

class ViewAtivo {
  constructor(numero, tipo, localizacao, status, destinatario, titulo, complemento, marca, capacidade, modelo, condicoes, n_serie,
              fornecedor, aquisicao, fabricacao, tamanho, validade, nfe, url, observacoes) {
      this.numero = numero;
      this.tipo = tipo;
      this.localizacao = localizacao;
      this.status = status;
      this.destinatario = destinatario;
      this.titulo = titulo;
      this.complemento = complemento;
      this.marca = marca;
      this.capacidade = capacidade;
      this.modelo = modelo;
      this.condicoes = condicoes;
      this.n_serie = n_serie;
      this.fornecedor = fornecedor;
      this.aquisicao = aquisicao;
      this.fabricacao = fabricacao;
      this.tamanho = tamanho;
      this.validade = validade;
      this.nfe = nfe;
      this.url = url;
      this.observacoes = observacoes;
  }
}

function VisualizarDestinatarios ({setTela}) {
  const [dadosAtivo, setDadosAtivo] = useState({
    numeroAtivo : '',
    tipoAtivo :'',
    localizacaoAtivo : '',
    statusAtivo : '',
    destinatarioAtivo : '',
    tituloAtivo : '',
    complementoAtivo : '',
    marcaAtivo : '',
    modeloAtivo : '',
    serieAtivo : '',
    valorAtivo : '',
    tamanhoAtivo : '',
    capacidadeAtivo : '',
    qtdadeAtivo : '',
    usoAtivo : '',
    fornecedorAtivo : '',
    fabricacaoAtivo : '',
    validadeAtivo : '',
    urlAtivo : '',
    nfeAtivo : '',
    comentarioAtivo : ''
  })

  useEffect((id) => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost8080/ativo/${id}`);
        const dados = response.data; 
        setDadosAtivo(dados);
      } catch (error) {
        console.error(`Erro ao buscar dados do ativo ${id}:`, error);
      }
    };
    fetchData();
  }, []);


  function handleDelete(id) {
    axios.delete(`http://localhost:8080/ativos/${id}`).then((resposta) => {
        console.log(resposta.data);
    }); 
};

  return (
  <body>
    <div class='page-full'>
      <div class='field'>
      <h2>Destinatário: </h2>
      </div>
      <h1 className='has-text-weight-light'>Dados</h1>
      <div class="columns m-3">

      <div class="column is-half">
      <form>
        <div className='columns'>
          
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
          </div>
        
        </form>
        </div>
        </div>
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
      <p class="control">
        <button class="button is-danger" type="submit" formMethod='POST' onClick={(id) => handleDelete(`http://localhost8080/ativo/deletar/${id}`)}>
          Deletar
        </button>
      </p>
      <p class="control">
        <button class="button is-light" onClick={() => setTela('Ativos')}>
          Voltar
          </button>
      </p>
    
    </div>
  
  </div>


  </body>
  

  


  );
}

export default VisualizarDestinatarios;