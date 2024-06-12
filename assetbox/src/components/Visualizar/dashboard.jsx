import React, { useState, useEffect } from 'react';
import "./visualizar.css";
import Chart from 'chart.js/auto';
import axios from 'axios';

export default function Dashboard({ setTela }) {
    const [mes, setMes] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    //   const pegarDados = async () => {
    //     try {
    //       const response = await axios.get(`http://localhost:8000/dashboard/${month}`);
    //       setMes(response.data.adm_nome);
    //       setEmail(response.data.adm_email);
    //       setSenha(response.data.adm_senha);
    //       setTelefone(response.data.adm_telefone);
    //       setCpf(response.data.adm_cpf);
    //     } catch (error) {
    //       console.error(`Erro ao buscar dados do administrador ${id}:`, error);
    //     }
    //   }


    //   useEffect(() => {
    //     pegarDados();
    //   }, []);
    const abrirHelp = () => {
        setModalOpen(true);
    };

    const fecharHelp = () => {
        setModalOpen(false);
    };

    return (
        <>
            <body className='flex w-screen h-screen '>
                <div className='bg-black h-fit w-1/6 rounded-br-2xl text-sm md:text-base'>
                    <div className='m-3'>
                        <h3 className='mb-3'>Visualizar Por Filial</h3>
                        <div className='flex'>
                            <input type="checkbox" />
                            <label htmlFor="">Nome da Filial</label>
                        </div>
                        <div className=''>
                            <input type="checkbox" />
                            <label htmlFor="">Nome da Filial</label>
                        </div>
                        <div className=''>
                            <input type="checkbox" />
                            <label htmlFor="">Nome da Filial</label>
                        </div>
                        <div className=''>
                            <input type="checkbox" />
                            <label htmlFor="">Nome da Filial</label>
                        </div>
                        <div className=''>
                            <input type="checkbox" />
                            <label htmlFor="">Nome da Filial</label>
                        </div>
                    </div>
                </div>
                <div class='flex flex-col w-full  items-center p-6'>
                    <div className='flex gap-6 p-1'>
                        <section className='bg-white rounded-lg text-center p-2 hover:scale-105 transition-all'>
                            <label htmlFor="">Valor Total</label>
                            <h1 className='has-text-weight-light is-size-4'>R$ValorTotal</h1>
                        </section>
                        <section className='bg-white rounded-lg text-center p-2 hover:scale-105 transition-all'>
                            <label className='' htmlFor="">Quantidade Total</label>
                            <h1 className='has-text-weight-light is-size-4'>QuantidadeTotal</h1>
                        </section>
                    </div>
                    <div className='flex flex-wrap w-full h-full pt-6 gap-2 justify-center'>
                        <div className='bg-black h-1/2 w-2/3 md:w-1/3 content-center text-center'>gráfico
                        </div>
                        <div className='bg-black h-1/2 w-2/3 md:w-1/3 content-center text-center' >gráfico
                        </div>
                        <div className='bg-black h-1/2 w-2/3 md:w-1/3 content-center text-center'>gráfico
                        </div>
                        <div className='bg-black h-1/2 w-2/3 md:w-1/3 content-center text-center'>gráfico
                        </div>

                    </div>
                </div>
            </body>
            <div className="help-button">
                <button className="shadow-button button button-effect is-primary m-5 ml-6 is-rounded is-size-4" onClick={abrirHelp}>?</button>

                <div className={`modal ${modalOpen ? 'is-active' : ''}`}>
                    <div className="modal-background" onClick={fecharHelp}></div>
                    <div className="modal-content">


                        <div className="box ajuda m-6 has-text-white">
                            <button class="delete is-pulled-right" aria-label="close" onClick={fecharHelp}></button>
                            <p>Esta é a <span className='has-text-weight-bold'>Pagina de Cadastro da Manutenção</span>,  Preencha os dados nescessários referentes à manutenção. OBSERVAÇÃO: No campo "Endereço" cadastre o endereço do local onde a manutenção será realizada, caso a manutenção seja feita na própria empresa, coloque o endereço da empresa, para os casos em que a manutenção será feita em uma loja técnica, oficina etc. Cadastre o endereço respectivo. No campo "Atividade": Informe a atividade que será feita, por exemplo: "Troca de peças", "Limpeza", "Calibração" etc.</p>
                        </div>

                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={fecharHelp}></button>
                </div>
            </div>
        </>
    );
}
