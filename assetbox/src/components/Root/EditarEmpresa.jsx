import React, { useState } from 'react';
import './editarempresa.css';
function EditarEmpresa({ setTela }) {
    const [localizacao, SubmitLocalização] = useState('');


    //fazer lógica para salvar localização e limpar o campo que foi digitado, ou fazer aparecer o pop-up ao invés de salvar
    //precisa fazer uma página para visualização da empresa como um todo, dando os map nas informações das filial e os dados dessa página,
    // a pagina pode ser semelhante à pagina de manutenção, porém é interessante ter um 'card' para cada filial, ao clicar ele expande  e tem o botão de atualizar nele
    
    return (
        <body className="m-2">
            <h1 className="has-text-black is-size-4" >Painel da Empresa</h1>
            <form className="is-flex is-justify-content-space-around" style={{ borderRadius: '50px', backgroundColor: "rgb(230, 230, 230)" }}>
                <div className='is-flex is-flex-direction-column' style={{ marginTop: '30px' }}>
                    <h1 className="has-text-black is-size-4" style={{ textAlign: 'center', marginBottom: '30px' }} >Dados da Empresa</h1>
                    <div class="columns m-3">
                        <div class="column is-half">
                            <div className="field" >
                                <label htmlFor="email" className="label has-text-black">Razão Social da Empresa: </label>
                                <div className="">
                                    <input />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="senha" className="label has-text-black">Nome fantasia: </label>
                                <div >
                                    <input type="" />
                                </div>
                            </div>
                            <div className="field" >
                                <label htmlFor="email" className="label has-text-black">CNPJ: </label>
                                <div className="">
                                    <input />
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="senha" className="label has-text-black">Email: </label>
                                <div >
                                    <input type="" />
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
                            <h5 className="has-text-black is-size-4" style={{ width: '200%', textAlign: 'left', marginBottom: '30px' }} >Endereço Matriz</h5>
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
                                <label htmlFor="endereco" className="label has-text-black">Logradouro Matriz: </label>
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
                        <div className='column is-half'>
                            <h5 className="has-text-black is-size-4" style={{ width: '200%', textAlign: 'left', marginBottom: '30px' }} >Localizações Matriz</h5>
                            <div className="field">
                                <label htmlFor="cep" className="label has-text-black">Nome do local: </label>
                                <div className="">
                                    <input />
                                    <button className='has-text-white is-size-6 p-3 mt-3 is-flex' style={{ backgroundColor: '#459EB5', borderRadius: '20px' }} >
                                    <p className='is-size-6' onClick={() => SubmitLocalização()}>Cadastrar</p>
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className='is-flex is-align-items-center is-justify-content-center'>
                <button className="button is-primary" style={{ margin: '2%' }} onClick={() => setTela('EditFilial')}>Finalizar Cadastro</button>
                <button className="button is-danger" style={{ margin: '2%' }} onClick={() => setTela('Home')}>Cancelar</button>
            </div>
        </body>
    );
}
export default EditarEmpresa;