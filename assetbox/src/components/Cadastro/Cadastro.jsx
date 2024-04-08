import React, { useState } from 'react';
import "./cadastro.css";
import imgadd from "./imgadd.png"
import docadd from "./docadd.png"

function CadastroAtivos ({setTela}) {
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
      <h2>Cadastro de Ativos</h2>
      </div>
      <div class="columns m-3">

      <div class="column is-half"> <img src={imgadd} alt="imgadd"  style={{width: '100px', height: '100px'}}/> 
      <div>
      <input className='image-button' type='file' id='img' name="img" accept="image/*"/>
      </div>
      </div>

      <div class="column is-half">
      <form onSubmit={handleSubmit}>
      <div className='top-one'>
        
        <div class="field">
          <label class="label">Número:</label>
          <input
            class="input is-small"
            type="text"
            placeholder='Digite um Número:'
            value={numeroAtivo}
            onChange={(event) => setNumAtivo(event.target.value)}
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
            value={destinatarioAtivo}
            onChange={(event) => setDestinatarioAtivo(event.target.value)}
            />
        </div>
        

        
        <div className="field" >
          <label className="form-label">Titulo:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira o Título:'
            value={tituloAtivo}
            onChange={(event) => setTituloAtivo(event.target.value)}
          />
        
        <div className="field" >
          <label className="form-label">Complemento:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira um Complemento:'
            rows="4"
            value={complementoAtivo}
            onChange={(event) => setComplementoAtivo(event.target.value)}
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
      <form onSubmit={handleSubmit}>
      <div className="field" >
          <label className="form-label">Marca:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Digite a Marca:'
            value={marcaAtivo}
            onChange={(event) => setMarcaAtivo(event.target.value)}
          />
        </div>
        <div className="field" >
          <label className="form-label">Modelo:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Digite o Modelo:'
            value={modeloAtivo}
            onChange={(event) => setModeloAtivo(event.target.value)}
          />
        </div>
        <div className="field" >
          <label className="form-label">Nº de Série:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira o Número de Série:'
            value={serieAtivo}
            onChange={(event) => setSerieAtivo(event.target.value)}
          />
        </div>

        <div className="field" >
          <label className="form-label">Valor de Aquisição:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira o Valor de Aquisição:'
            value={valorAtivo}
            onChange={(event) => setValorAtivo(event.target.value)}
          />
        </div>
        

        
        <div className="field" >
          <label className="form-label">Tamanho:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira as Dimensões do Ativo:'
            value={tamanhoAtivo}
            onChange={(event) => setTamanhoAtivo(event.target.value)}
          />
        </div>
        </form>
        </div>

        <div class="column is-half">
        <form onSubmit={handleSubmit}>
      
        <div className="field" >
          <label className="form-label">Capacidade:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira a Capacidade do Ativo:'
            value={capacidadeAtivo}
            onChange={(event) => setCapacidadeAtivo(event.target.value)}
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
            value={usoAtivo}
            onChange={(event) => setUsoAtivo(event.target.value)}
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
            value={fabricacaoAtivo}
            onChange={(event) => setFabricacaoAtivo(event.target.value)}
          />
        </div>
        <div className="field" >
          <label className="form-label">Data de Validade:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira a Data de Validade:'
            value={validadeAtivo}
            onChange={(event) => setValidadeAtivo(event.target.value)}
          />
        </div>
        </form>
        </div>
      
      </div>
      </div>
      
      
      

      <h1>Documentos</h1>
      <div className="columns m-3">

      
      <div class="column is-half"><img src={docadd} alt="docadd"  style={{width: '100px', height: '100px'}} />.
      <div>
      <input className='image-button' type='file' id='doc' name="doc" accept="doc/*"/>
      </div>
      </div>
      

     
      <div class='column is-half'>
      <form className='documentos-ativo'onSubmit={handleSubmit}>
      <div className="field" >
          <label className="form-label">Chave NFe:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira a Chave NFe:'
            value={nfeAtivo}
            onChange={(event) => setNfeAtivo(event.target.value)}
          />
        </div>

        <div className="field" >
          <label className="form-label">Url do Ativo:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Insira a Url do Ativo:'
            value={urlAtivo}
            onChange={(event) => setUrlAtivo(event.target.value)}
          />
        </div>
        <div className="field" >
          <label className="form-label">Observações:</label>
          
          <input
            class="input is-small"
            type="text"
            placeholder='Escreva aqui as Observações:'
            value={comentarioAtivo}
            onChange={(event) => setComentarioAtivo(event.target.value)}
          />
        </div>
        </form>
      </div>
      
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

export default CadastroAtivos;