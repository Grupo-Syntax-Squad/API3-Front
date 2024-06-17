import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';

export default function Dashboard({ setTela }) {
    const [filiais, setFiliais] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [statusData, setStatusData] = useState({
        manutencao: 0,
        ocioso: 0,
        operacao: 0,
        desativado: 0
    });
    const [ativosPorLocalizacao, setAtivosPorLocalizacao] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const chartRef = useRef();
    const chartLocalizacaoRef = useRef();
    const [loading, setLoading] = useState(true);

    const fetchValorTotal = async () => {
        try {
            const response = await axios.get("http://localhost:8000/dashboard/valorTotal");
            setValorTotal(response.data);
        } catch (error) {
            console.error('Erro ao buscar valor total:', error);
        }
    };

    const fetchQuantidadeTotal = async () => {
        try {
            const response = await axios.get("http://localhost:8000/dashboard/quantidadeTotal");
            setQuantidadeTotal(response.data);
        } catch (error) {
            console.error('Erro ao buscar quantidade total:', error);
        }
    };

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
            const response = await axios.get('http://localhost:8000/dashboard/status');
            let statusDataHandler = {
                manutencao: 0,
                ocioso: 0,
                operacao: 0,
                desativado: 0
            };
            response.data.forEach(entity => {
                switch (entity.nome) {
                    case "EM_MANUTENCAO":
                        statusDataHandler.manutencao = entity.quantidade;
                        break;
                    case "OCIOSO":
                        statusDataHandler.ocioso = entity.quantidade;
                        break;
                    case "EM_OPERACAO":
                        statusDataHandler.operacao = entity.quantidade;
                        break;
                    case "DESATIVADO":
                        statusDataHandler.desativado = entity.quantidade;
                        break;
                    default:
                        break;
                }
            });
            setStatusData(statusDataHandler);
            createStatusChart(statusDataHandler); // Chama a função para criar o gráfico quando os dados estiverem disponíveis
        } catch (error) {
            console.error('Erro ao buscar dados do status:', error);
        }
    };

    const fetchAtivosPorLocalizacao = async () => {
        try {
            const response = await axios.get('http://localhost:8000/dashboard/localizacao');
            setAtivosPorLocalizacao(response.data);
            createLocalizacaoChart(response.data); // Chama a função para criar o gráfico quando os dados estiverem disponíveis
        } catch (error) {
            console.error('Erro ao buscar ativos por localização:', error);
        }
    };

    useEffect(() => {
        fetchFiliais();
        fetchStatusData();
        fetchValorTotal();
        fetchQuantidadeTotal();
        fetchAtivosPorLocalizacao();

        setLoading(false);
    }, []);

    const createStatusChart = (data) => {
        if (chartRef.current && data) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Em Manutenção', 'Ocioso', 'Em Operação', 'Desativado'],
                    datasets: [{
                        label: 'Quantidade de Ativos por Status',
                        data: [data.manutencao, data.ocioso, data.operacao, data.desativado],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                font: {
                                    size: 14,
                                }
                            }
                        }
                    }
                }
            });
        }
    };

    const createLocalizacaoChart = (data) => {
        if (chartLocalizacaoRef.current && data.length > 0) {
            const ctx = chartLocalizacaoRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.nome),
                    datasets: [{
                        label: 'Quantidade de Ativos por Localização',
                        data: data.map(item => item.quantidade),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                font: {
                                    size: 14,
                                }
                            }
                        }
                    }
                }
            });
        }
    };

    const abrirHelp = () => {
        setModalOpen(true);
    };

    const fecharHelp = () => {
        setModalOpen(false);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <div className='flex w-screen h-screen'>
                <div className='flex flex-col w-full items-center p-6'>
                    <div className='flex gap-6 p-1'>
                        <section className='bg-white rounded-lg text-center p-2 hover:scale-105 transition-all background-azul px-5'>
                            <label htmlFor="">Valor Total</label>
                            <h1 className='has-text-weight-bold is-size-4 has-text-white'>{valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                        </section>
                        <section className='bg-white rounded-lg text-center p-2 hover:scale-105 transition-all background-azul px-5'>
                            <label className='' htmlFor="">Quantidade Total</label>
                            <h1 className='has-text-weight-bold is-size-4 has-text-white'>{quantidadeTotal}</h1>
                        </section>
                    </div>
                    <div className='flex flex-wrap w-full h-full pt-6 gap-2 justify-center'>
                        <div className=' h-1/2 w-2/3 md:w-1/3 content-center text-center transition-all'>
                            <h1 className='text-black'>Ativos por Status</h1>
                            <canvas ref={chartRef}></canvas>
                        </div>
                        <div className=' h-1/2 w-2/3 md:w-1/3 content-center text-center transition-all'>
                            <h1 className='text-black'>Ativos por Localização</h1>
                            <canvas ref={chartLocalizacaoRef}></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div className="help-button">
                <button className="shadow-button button button-effect is-primary m-5 ml-6 ajuda-botao is-size-4" onClick={abrirHelp}>?</button>
                <div className={`modal ${modalOpen ? 'is-active' : ''}`}>
                    <div className="modal-background" onClick={fecharHelp}></div>
                    <div className="modal-content">
                        <div className="box ajuda m-6 has-text-white">
                            <p>Esta é a <span className='has-text-weight-bold'>Pagina do dashboard</span>,  Aqui você pode ver graficamente a situação e localização dos ativos, facilitando o controle de dados da empresa e suas filiais.  </p>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={fecharHelp}></button>
                </div>
            </div>
        </>
    );
}
