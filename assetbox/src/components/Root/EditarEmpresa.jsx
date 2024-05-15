import React from 'react';
import './editarempresa.css';
function EditarEmpresa({setTela}){
    return(
            <body className="m-2">
                <h1 className="has-text-black is-size-4" >Cadastro da Empresa</h1>
                <form className="is-flex is-justify-content-space-around" style={{borderRadius: '50px',backgroundColor: "rgb(230, 230, 230)"}}>
                    <div className='is-flex is-flex-direction-column' style={{marginTop: '30px'}}>
                    <h1 className="has-text-black is-size-4" style={{width: '200%', textAlign: 'left', marginBottom: '30px'}} >Dados da Filial</h1>
                        <div className="field" >
                            <label htmlFor="email" className="label has-text-black">Nome da unidade: </label>
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
    


                <div style={{marginTop: '30px', marginBottom: '30px'}}>
                    <h1 className="has-text-black is-size-4" style={{width: '200%', textAlign: 'left', marginBottom: '30px'}}>   Endereço da filial</h1>
                        <div>
                            <label htmlFor="nome" className="label has-text-black">Cep </label>
                            <div className="">
                                <input  />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="nome" className="label has-text-black">estado </label>
                            <div className="control">
                                <input  />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="nome" className="label has-text-black">Cidade </label>
                            <div className="">
                                <input  />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="nome" className="label has-text-black"> Bairro </label>
                            <div className="">
                                <input  />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="nome" className="label has-text-black"> Rua </label>
                            <div className="">
                                <input  />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label has-text-black"> Numero </label>
                            <div className="">
                                <input  />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label has-text-black"> Complemento </label>
                            <div className="">
                                <input  />
                            </div>
                        </div>
                    </div>
                </form>

                <div className='is-flex is-align-items-center is-justify-content-center'>                
                    <button className="button is-primary" style={{margin: '2%'}}>Salvar</button>
                    <button className="button is-danger" style={{margin: '2%'}} onClick={() => setTela('Home')}>Cancelar</button>
                </div>



            </body>
        );
    }
export default EditarEmpresa;