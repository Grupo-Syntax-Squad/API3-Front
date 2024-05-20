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
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [rua, setRua] = useState("");
  const [complemento, setComplemento] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [edit, setEdit] = useState(false);
  const [enderecoId, setEnderecoId] = useState("");
  const id = localStorage.getItem('id');
  const handleEdit = () => edit ? setEdit(false) : setEdit(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/destinatarios/${id}`);
        const dados = response.data;
        setDadosDestinatario(dados);
        setDadosEndereco(dados.des_endereco_id);
        setNome(dados.des_nome);
        setEmail(dados.des_email);
        setTelefone(dados.des_telefone);
        setCpf(dados.des_cpf);
        setRua(dados.des_endereco_id.end_rua)
        setComplemento(dados.des_endereco_id.end_complemento)
        setNumero(dados.des_endereco_id.end_numero)
        setBairro(dados.des_endereco_id.end_bairro)
        setCidade(dados.des_endereco_id.end_cidade)
        setEstado(dados.des_endereco_id.end_uf)
        setCep(dados.des_endereco_id.end_cep)
        setEnderecoId(dados.des_endereco_id.idend)
      } catch (error) {
        console.error(`Erro ao buscar dados do destinatário ${id}:`, error);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    const dadosAtualizados = {
      des_nome: nome,
      des_email: email,
      des_telefone: telefone,
      des_cpf: cpf,
      des_endereco_id: {
        id: enderecoId
      }
    }
    const enderecoAtualizado = {
      id: enderecoId,
      end_rua: rua,
      end_numero: numero,
      end_complemento: complemento,
      end_bairro: bairro,
      end_cidade: cidade,
      end_uf: uf,
      end_cep: cep
    };

    try {
      const responseEnd = await axios.put(`http://localhost:8000/enderecos/${enderecoId}`, enderecoAtualizado);
      const response = await axios.put(`http://localhost:8000/destinatarios/${id}`, dadosAtualizados);
      console.log(response.data);
      console.log(responseEnd.data);
      window.alert("Destinatário atualizado com sucesso.");
      // Atualize os dados exibidos na tela, se necessário
      setEdit(false); // Desabilita a edição após a atualização bem-sucedida
    } catch (error) {
      console.error("Erro ao atualizar destinatário:", error);
      window.alert("Erro ao atualizar destinatário.");
    }
  };

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
    axios.delete(`http://localhost:8000/destinatarios/${id}`).then((resposta) => {
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
              value={nome}
              disabled={!edit}
              onChange={e => setNome(e.target.value)}
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Telefone</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={telefone}
              disabled={!edit}
              onChange={e => setTelefone(e.target.value)}
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">E-mail</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={email}
              disabled={!edit}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">CPF</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={cpf}
              disabled={!edit}
              onChange={e => setCpf(e.target.value)}
            />
          </div>
          <h1 className='has-text-weight-light is-size-4'>Endereço</h1>

          <div class="field column">
            <label class="form-label is-size-5">Rua</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={rua}
              disabled={!edit}
              onChange={e => setRua(e.target.value)}
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Número</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={numero}
              disabled={!edit}
              onChange={e => setNumero(e.target.value)}
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Complemento</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Complemento:'
              value={complemento}
              disabled={!edit}
              onChange={e => setNome(e.target.value)}
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Bairro</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Bairro:'
              value={bairro}
              disabled={!edit}
              onChange={e => setBairro(e.target.value)}
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Cidade</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite uma Cidade:'
              value={cidade}
              disabled={!edit}
              onChange={e => setCidade(e.target.value)}
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">UF</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={uf}
              disabled={!edit}
              onChange={e => setEstado(e.target.value)}
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">CEP</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={cep}
              disabled={!edit}
              onChange={e => setCep(e.target.value)}
            />
          </div>
        </form>
        <div class="field is-grouped is-grouped-centered">
          {!edit &&
            <>
              <p class="control">
                <button class="button is-danger" type="submit" onClick={exibirPopUpDelecao}>
                  Deletar
                </button>
              </p>
              <p class="control">
                <button class="button is-light" onClick={handleEdit}>
                  Atualizar status
                </button>
              </p>
              <p class="control">
                <button class="button is-light" onClick={() => setTela('Ativos')}>
                  Voltar
                </button>
              </p>
            </>
          }
          {edit &&
            <>
              <p class="control">
                <button class="button is-light" onClick={handleUpdate}>
                  Confirmar atualização
                </button>
              </p>
              <p class="control">
                <button class="button is-danger" type="submit" onClick={handleEdit}>
                  Cancelar
                </button>
              </p>
            </>
          }
        </div>
        <div id='popupdelecao' style={{ display: 'none', height: '200px', backgroundColor: '#FFFFFF', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '50%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px' }}>
          <p className='is-size-4-desktop is-size-6-mobile has-text-weight-bold' style={{ color: '#3A7D8E' }}>Tem certeza de que quer deletar este Destinatário?</p>
          <div className='is-flex  is-justify-content-space-evenly'>
            <button className='has-text-white is-size-4 p-3 mt-3 ' style={{ backgroundColor: '#C21D1D', borderRadius: '40px' }} onClick={() => handleDelete()}>
              <p className='is-size-4-desktop is-size-6-mobile' onClick={handleDelete}>Deletar</p>
            </button>
            <button className='has-text-white is-size-4 p-3 mt-3' style={{ backgroundColor: '#959292', borderRadius: '40px', }} onClick={exibirPopUpDelecao}>
              <p className='is-size-4-desktop is-size-6-mobile'>Cancelar</p>
            </button>
          </div>
        </div>
        <div id='popupconfirmacao' style={{ display: 'none', height: '200px', backgroundColor: '#367E90', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '40%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px' }}>
          <p className='has-text-white is-size-3-desktop is-size-4-mobile'>Destinatário deletado com sucesso!</p>
          <button className='has-text-white is-size-4 p-3 mt-3' style={{ marginLeft: '60%', backgroundColor: '#459EB5', borderRadius: '100%' }} onClick={() => setTela('Destinatarios')}>
            <p className='is-size-4'>OK</p>
          </button>
        </div>
      </div>
    </body>
  );
}

export default VisualizarDestinatarios;