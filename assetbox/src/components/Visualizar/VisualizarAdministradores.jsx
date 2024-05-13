import React, { useState, useEffect } from 'react';
import "./visualizar.css";
import axios from 'axios';

function VisualizarAdministradores({ setTela }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [edit, setEdit] = useState(false);
  const handleEdit = () => edit ? setEdit(false) : setEdit(true);

  const id = localStorage.getItem('id');

  const pegarDados = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/administradores/${id}`);
      setNome(response.data.adm_nome);
      setEmail(response.data.adm_email);
      setSenha(response.data.adm_senha);
      setTelefone(response.data.adm_telefone);
      setCpf(response.data.adm_cpf);
    } catch (error) {
      console.error(`Erro ao buscar dados do administrador ${id}:`, error);
    }
  }

  const atualizarDados = async () => {
    const putData = {
      adm_nome: nome,
      adm_email: email,
      adm_senha: senha,
      adm_telefone: telefone,
      adm_cpf: cpf
    }
    try {
      const response = await axios.put(`http://localhost:8000/administradores/${id}`, putData);
      console.log(response.status);
      window.alert("Administrador atualizado com sucesso.");
      handleEdit();
    } catch (error) {
      error.response.status == 400 ? window.alert(error.response.data) : window.alert("Erro ao atualizar o administrador.");
      await pegarDados();
    }
  }

  useEffect(() => {
    pegarDados();
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


  async function handleDelete() {
    try {
      const response = await axios.delete(`http://localhost:8000/administradores/${id}`);
      window.alert("Administrador deletado com sucesso!");
      setTela("Usuarios");
    } catch (error) {
      if (error.response.status == 400) window.alert(error.response.data);
      else window.alert("Ocorreu um erro ao tentar deletar o administrador.");
    }
  }

  return (
    <body>
      <div class='page-full'>
        <div class='field'>
          <h2>Administrador: </h2>
        </div>
        <h1 className='has-text-weight-light is-size-4'>Dados</h1>

        <form>

          <div class="field column ">
            <label class="form-label is-size-5">Nome</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite o seu nome:'
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
              placeholder='Digite o seu numero de telefone:'
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
              placeholder='Digite o seu email:'
              value={email}
              disabled={!edit}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div class="field column">
            <label class="form-label is-size-5">Senha</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite uma senha:'
              value={senha}
              disabled={!edit}
              onChange={e => setSenha(e.target.value)}
            />
          </div>
          {/* <div class="field column">
            <label class="form-label is-size-5">Senha</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite um Número:'
              value={dadosDestinatario.des_senha}
              disabled
            />
          </div> */}

          <div class="field column">
            <label class="form-label is-size-5">CPF</label>
            <input
              class="input is-small"
              type="text"
              placeholder='Digite o seu cpf:'
              value={cpf}
              disabled={!edit}
              onChange={e => setCpf(e.target.value)}
            />
          </div>

        </form>
        <div class="field is-grouped is-grouped-centered">
        </div>
        <div class="field is-grouped is-grouped-centered">
          {!edit &&
            <>
              <p class="control">
                <button class="button is-danger" type="submit" formMethod='POST' onClick={exibirPopUpDelecao}>
                  Deletar
                </button>
              </p>
              <p>
                <button class="button is-light" onClick={handleEdit}>
                  Atualizar dados
                </button>
              </p>
              <p class="control">
                <button class="button is-light" onClick={() => setTela('Destinatarios')}>
                  Voltar
                </button>
              </p>
            </>
          }
          {edit &&
            <>
              <p class="control">
                <button class="button is-primary" type="submit" formMethod='POST' onClick={atualizarDados}>
                  Confirmar atualização
                </button>
              </p>
              <p class="control">
                <button class="button is-danger" type="submit" formMethod='POST' onClick={async e => {await pegarDados(); handleEdit()}}>
                  Cancelar
                </button>
              </p>
            </>
          }
        </div>
        <div id='popupdelecao' style={{ display: 'none', height: '200px', backgroundColor: '#FFFFFF', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '50%', alignContent: 'center', justifyContent: 'center', borderRadius: '10px' }}>
          <p className='is-size-4-desktop is-size-6-mobile has-text-weight-bold' style={{ color: '#3A7D8E' }}>Tem certeza de que quer deletar este Administrador?</p>
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
          <p className='has-text-white is-size-3-desktop is-size-4-mobile'>Administrador deletado com sucesso!</p>
          <button className='has-text-white is-size-4 p-3 mt-3' style={{ marginLeft: '60%', backgroundColor: '#459EB5', borderRadius: '100%' }} onClick={() => setTela('Destinatarios')}>
            <p className='is-size-4'>OK</p>
          </button>
        </div>
      </div>
    </body>
  );
}

export default VisualizarAdministradores;