import React from 'react';
import './editarempresa.css';
function EditarFilial({ setTela }) {
    //só um modelo de como está a pagina de cadastro de filial, talvez dê para implemnetar na página de visualização geral da empresa, uma vez que da pra fazer usando os cards para cadastro e update
    return (
        <body className="m-2">
            <h1 className="has-text-black is-size-4" >Painel da Filial</h1>
            <form className="is-flex is-justify-content-space-around" style={{ borderRadius: '50px', backgroundColor: "rgb(230, 230, 230)" }}>
                <div className='is-flex is-flex-direction-column' style={{ marginTop: '30px' }}>
                    <h1 className="has-text-black is-size-4" style={{ textAlign: 'center', marginBottom: '30px' }} >Dados das Filiais</h1>
                    <div class="columns m-3">
                        <div class="card" style={{width:'200%'}}>
                            <header class="card-header">
                                <p class="card-header-title">Cadastrar Filial</p>
                                <button class="card-header-icon" aria-label="more options">
                                    <span class="icon">
                                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </header>
                            <details>
                                <summary>Clique aqui</summary>
                                <div class="card-content">
                                    <div class="content">
                                        <div class="columns m-3">
                                            <div class="column is-half">
                                                <div className="field" >
                                                    <label htmlFor="email" className="label has-text-black">Nome da Filial: </label>
                                                    <div className="">
                                                        <input />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="telefone" className="label has-text-black">Telefone: </label>
                                                    <div className="">
                                                        <input />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='column is-half'>
                                                <h5 className="has-text-black is-size-4" style={{ width: '200%', textAlign: 'left', marginBottom: '30px' }} >Localização Matriz</h5>
                                                <div className="field">
                                                    <label htmlFor="cep" className="label has-text-black">CEP da Matriz: </label>
                                                    <div className="">
                                                        <input />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="nome" className="label has-text-black">Cidade Matriz </label>
                                                    <div className="">
                                                        <input />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="endereco" className="label has-text-black">Endereço Matriz: </label>
                                                    <div className="">
                                                        <input />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="numero" className="label has-text-black">Número da Matriz: </label>
                                                    <div className="">
                                                        <input />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <footer class="card-footer">
                                    <a href="#" class="card-footer-item">Save</a>
                                    <a href="#" class="card-footer-item">Edit</a>
                                    <a href="#" class="card-footer-item">Delete</a>
                                </footer>
                            </details>
                        </div>
                    </div>
                </div>
            </form>

            <div className='is-flex is-align-items-center is-justify-content-center'>
                <button className="button is-primary" style={{ margin: '2%' }}>Salvar</button>
                <button className="button is-danger" style={{ margin: '2%' }} onClick={() => setTela('Home')}>Cancelar</button>
            </div>



        </body >
    );
}
export default EditarFilial;