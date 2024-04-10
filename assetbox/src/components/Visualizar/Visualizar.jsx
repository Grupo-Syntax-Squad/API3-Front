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

function VisualizarAtivos ({setTela}) {
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
      <h2>Ativo: </h2>
      </div>
      <div class="columns m-3">

      <div class="column is-half has-text-centered"> <img src={imgadd} alt="imgadd"  style={{width: '100px', height: '100px'}}/> 
      <div>
      <input className='image-button' type='file' id='img' name="img" accept="image/*"/>
      </div>
      </div>

      <div class="column is-half">
      <form >
      <div className='top-one'>
        
        <div class="field">
          <label class="label">Número:</label>
          <input
            class="input is-small"
            type="text"
            placeholder='Digite um Número:'
            value={dadosAtivo.numeroAtivo}
            
          />
        </div>
        <div class="field">
          <label class="label">Tipo:</label>
        <div class="select is-small"> 
            <select class="is-hovered">
            <option></option>
            <option></option>
            </select>
        </div>
        </div>
        
        <div class="field">
          <label class="label">Localização:</label>
        <div class="select is-small"> 
            <select class="is-hovered">
            <option></option>
            <option></option>
            </select>
        </div>
        </div>
        <div class="field">
          <label class="label">Status:</label>
        <div class="select is-small"> 
            <select class="is-hovered">
            <option></option>
            <option></option>
            </select>
        </div>
        </div>

        
        <div className="field" >
          <label className="form-label">Destinatário:</label>
          <input
            class="input is-small"
            type="text"
            placeholder='Insira o Destinatário:'
            value={dadosAtivo.destinatarioAtivo}
            
            />
        </div>
        

        
        <div className="field" >
          <label className="form-label">Titulo:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira o Título:'
            value={dadosAtivo.tituloAtivo}
            
          />
        
        <div className="field" >
          <label className="form-label">Complemento:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira um Complemento:'
            rows="4"
            value={dadosAtivo.complementoAtivo}
            
          />
        </div>
        </div>
        
      </div> 
      </form>
      </div>
      </div>

      <h1>Características</h1>

      <div class="mid-page" > 
     
      <div class="columns m-3">
      

      <div class="column is-half">
      <form >
      <div className="field" >
          <label className="form-label">Marca:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Digite a Marca:'
            value={dadosAtivo.marcaAtivo}
            
          />
        </div>
        <div className="field" >
          <label className="form-label">Modelo:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Digite o Modelo:'
            value={dadosAtivo.modeloAtivo}
            
          />
        </div>
        <div className="field" >
          <label className="form-label">Nº de Série:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira o Número de Série:'
            value={dadosAtivo.serieAtivo}
            
          />
        </div>

        <div className="field" >
          <label className="form-label">Valor de Aquisição:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira o Valor de Aquisição:'
            value={dadosAtivo.valorAtivo}
            
          />
        </div>
        

        
        <div className="field" >
          <label className="form-label">Tamanho:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira as Dimensões do Ativo:'
            value={dadosAtivo.tamanhoAtivo}
            
          />
        </div>
        </form>
        </div>

        <div class="column is-half">
        <form >
      
        <div className="field" >
          <label className="form-label">Capacidade:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira a Capacidade do Ativo:'
            value={dadosAtivo.capacidadeAtivo}
            
          />
        </div>
        {/* <div className="field" >
          <label className="form-label">Quantidade:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira a Quantidade:'
            value={numeroAtivo}
            onChange={(event) => setNumAtivo(event.target.value)}
          />
        </div> */}
        <div className="field" >
          <label className="form-label">Condições de Uso:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Condições de Uso:'
            value={dadosAtivo.usoAtivo}
            
          />
        </div>
        
        
        
        <div class="field">
          <label class="label">Fornecedor:</label>
        <div class="select is-small"> 
            <select class="is-hovered">
            <option></option>
            <option></option>
            </select>
        </div>
        </div>
        <div className="field" >
          <label className="form-label">Data de Fabricação:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira a Data de Fabricação:'
            value={dadosAtivo.fabricacaoAtivo}
            
          />
        </div>
        <div className="field" >
          <label className="form-label">Data de Validade:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira a Data de Validade:'
            value={dadosAtivo.validadeAtivo}
            
          />
        </div>
        </form>
        </div>
      
      </div>
      </div>
      
      
      

      <h1>Documentos</h1>
      <div className="columns m-3">

      
      <div class="column is-half has-text-centered"><img src={docadd} alt="docadd"  style={{width: '100px', height: '100px'}} />.
      <div>
      <input className='image-button' type='file' id='doc' name="doc" accept="doc/*"/>
      </div>
      </div>
      

     
      <div class='column is-half'>
      <form className='documentos-ativo'>
      <div className="field" >
          <label className="form-label">Chave NFe:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira a Chave NFe:'
            value={dadosAtivo.nfeAtivo}
            
          />
        </div>

        <div className="field" >
          <label className="form-label">Url do Ativo:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira a Url do Ativo:'
            value={dadosAtivo.urlAtivo}
            
          />
        </div>
        <div className="field" >
          <label className="form-label">Observações:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Escreva aqui as Observações:'
            value={dadosAtivo.comentarioAtivo}
          />
        </div>
        </form>
      </div>
      
    </div>
   
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

export default VisualizarAtivos;