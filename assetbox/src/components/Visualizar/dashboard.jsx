import React, { useState, useEffect, useRef } from 'react';
import "./visualizar.css";
import { Chart } from 'chart.js/auto';
import axios from 'axios';

export default function Dashboard({ setTela }) {
    const [filiais, setFiliais] = useState([]);
    const [statusData, setStatusData] = useState({
        manutencao: 0,
        ocioso: 0,
        operacao: 0,
        desativado: 0
    });
    const [modalOpen, setModalOpen] = useState(false);
    const chartRefs = useRef([]);
    const charts = useRef([]);

    // Fetch the list of filiais
    const fetchFiliais = async () => {
        try {
            const response = await axios.get('http://localhost:8000/filiais');
            setFiliais(response.data);
        } catch (error) {
            console.error('Erro ao buscar filiais:', error);
        }
    };

   
    const fetchStatusData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/status');
            setStatusData(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados do status:', error);
        }
    };

    useEffect(() => {
        fetchFiliais();
        fetchStatusData();
    }, []);

    useEffect(() => {
        const chartData = [
            {
                label: 'Em Manutenção',
                value: statusData.manutencao,
                color: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'Ocioso',
                value: statusData.ocioso,
                color: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
            },
            {
                label: 'Em Operação',
                value: statusData.operacao,
                color: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Desativado',
                value: statusData.desativado,
                color: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
            },
        ];

        chartData.forEach((data, index) => {
            if (charts.current[index]) {
                charts.current[index].destroy();
            }

            const ctx = chartRefs.current[index].getContext('2d');
            charts.current[index] = new Chart(ctx, {
                type: 'bar', 
                data: {
                    labels: [data.label],
                    datasets: [{
                        label: data.label,
                        data: [data.value],
                        backgroundColor: data.color,
                        borderColor: data.borderColor,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
    }, [statusData]);

    const abrirHelp = () => {
        setModalOpen(true);
    };

    const fecharHelp = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className='flex w-screen h-screen'>
                <div className=' h-fit w-1/6 rounded-br-2xl text-sm md:text-base'>
                    <div className='m-3'>
                        <h3 className='mb-3 has-text-black'>Visualizar Por Filial</h3>
                        {filiais.map((filial, index) => (
                            <div key={index} className=''>
                                <input type="checkbox" id={`filial-${index}`} />
                                <label htmlFor={`filial-${index}`}>{filial.fil_nome}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col w-full items-center p-6'>
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
                        {['manutencao', 'ocioso', 'operacao', 'desativado'].map((status, index) => (
                            <div key={index} className=' h-1/2 w-2/3 md:w-1/3 content-center text-center hover:scale-105 transition-all'>
                                <canvas ref={el => chartRefs.current[index] = el}></canvas>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="help-button">
                <button className="shadow-button button button-effect is-primary m-5 ml-6 is-rounded is-size-4" onClick={abrirHelp}>?</button>
                <div className={`modal ${modalOpen ? 'is-active' : ''}`}>
                    <div className="modal-background" onClick={fecharHelp}></div>
                    <div className="modal-content">
                        <div className="box ajuda m-6 has-text-white">
                            <button className="delete is-pulled-right" aria-label="close" onClick={fecharHelp}></button>
                            <p>Esta é a <span className='has-text-weight-bold'>Pagina de Cadastro da Manutenção</span>,  Preencha os dados nescessários referentes à manutenção. OBSERVAÇÃO: No campo "Endereço" cadastre o endereço do local onde a manutenção será realizada, caso a manutenção seja feita na própria empresa, coloque o endereço da empresa, para os casos em que a manutenção será feita em uma loja técnica, oficina etc. Cadastre o endereço respectivo. No campo "Atividade": Informe a atividade que será feita, por exemplo: "Troca de peças", "Limpeza", "Calibração" etc.</p>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={fecharHelp}></button>
                </div>
            </div>
        </>
    );
}
