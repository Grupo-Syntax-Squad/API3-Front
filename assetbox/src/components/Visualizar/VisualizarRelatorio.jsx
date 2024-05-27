import React, { useState, useEffect } from 'react';
import "./visualizar.css";
import { getRelatorio } from '../../services/relatorioService';
import { getMatriz } from '../../services/matrizService';
import { getFilial } from '../../services/filialService';
import Logo from "../../assets/img/AssetBoxLogo.svg";


function Relatorio({ setTela }) {
    const [data, setData] = useState({});
    const [dataAtual, setDataAtual] = useState(new Date(new Date().toUTCString()));
    const [matriz, setMatriz] = useState({});
    const [filial, setFilial] = useState({});
    const [link, setLink] = useState('');
    const [carregando, setCarregando] = useState(true);

    const gerarRelatorio = () => {
        console.log("Gerando relatório");
        window.print();
    }


    const fetchData = async () => {
        const filialId = localStorage.getItem('filialId');

        const filialGet = await getFilial(filialId);
        if (!filialGet) {
            alert("Erro ao buscar filial");
            setTela("Ativos");
        } else {
            setFilial(filialGet);
        };

        const relatorio = await getRelatorio(filialId);
        const matrizGet = await getMatriz();
        if (!matrizGet) {
            setTela("EditarEmpresa");
        } else {
            setMatriz(matrizGet);
        }
        setData(relatorio);
        console.log(relatorio, matrizGet, filialGet);
        setCarregando(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (carregando) {
        return (
            <body>
                <div class='page-full'>
                    <h1 className='has-text-weight-light'>Carregando...</h1>
                </div>
            </body>);
    }
    return (
        <body>
            <div class='page-full'>
                <img src={Logo} className='w-40 h-40' alt="Ativos" />
                <h1 className='has-text-weight-light'>Data: {dataAtual.toLocaleString('pt-BR').split(",")[0]}</h1>
                <br />
                <h1 className='has-text-weight-light'>{matriz.mat_nome_fantasia} - {filial.fil_nome} - {filial.fil_endereco.end_uf}</h1>
                <div class="flex flex-col m-3 gap-3">
                    <table className='m-auto flex flex-col w-full'>
                        <tr className='flex border basis-1/6 p-3'>
                            <th className='has-text-centered basis-1/3'>Ativo</th>
                            <th className='has-text-centered basis-1/3'>Quantidade</th>
                            <th className='has-text-centered basis-1/3'>Valor R$</th>
                        </tr>
                        <tr className='flex border basis-1/6 p-3'>
                            <th className='has-text-centered basis-1/3'>
                                Em Operação
                            </th>
                            <td className='has-text-centered basis-1/3'>
                                {data.quantidadeOperacao}
                            </td>
                            <td className='has-text-centered basis-1/3'>
                                {data.valorOperacao}
                            </td>
                        </tr>
                        <tr className='flex border basis-1/6 p-3'>
                            <th className='has-text-centered basis-1/3'>
                                Em Manutenção
                            </th>
                            <td className='has-text-centered basis-1/3'>
                                {data.quantidadeManutencao}
                            </td>
                            <td className='has-text-centered basis-1/3'>
                                {data.valorManutencao}
                            </td>
                        </tr>
                        <tr className='flex border basis-1/6 p-3'>
                            <th className='has-text-centered basis-1/3'>
                                Ativos Ociosos
                            </th>
                            <td className='has-text-centered basis-1/3'>
                                {data.quantidadeOcioso}
                            </td>
                            <td className='has-text-centered basis-1/3'>
                                {data.valorOcioso}
                            </td>
                        </tr>
                        <tr className='flex border basis-1/6 p-3'>
                            <th className='has-text-centered basis-1/3'>
                                Ativos Inativos
                            </th>
                            <td className='has-text-centered basis-1/3'>
                                {data.quantidadeInativado}
                            </td>
                            <td className='has-text-centered basis-1/3'>
                                {data.valorInativado}
                            </td>
                        </tr>
                        <tr className='flex border basis-1/6 p-3'>
                            <th className='has-text-centered basis-1/3'>
                                Com Funcionários
                            </th>
                            <td className='has-text-centered basis-1/3'>
                                {data.quantidadeComFuncionario}
                            </td>
                            <td className='has-text-centered basis-1/3'>
                                {data.valorComFuncionario}
                            </td>
                        </tr>
                        <tr className='flex border basis-1/6 p-3'>
                            <th className='has-text-centered basis-1/3'>
                                Próximos da Manutenção
                            </th>
                            <td className='has-text-centered basis-1/3'>
                                {data.quantidadeProximosManutencao}
                            </td>
                            <td className='has-text-centered basis-1/3'>
                                {data.valorProximosManutencao}
                            </td>
                        </tr>
                    </table>
                    <div className='flex justify-center'>
                        <button className='text-white no-print rounded-3xl p-2' onClick={gerarRelatorio}>Fazer download</button>
                    </div>
                </div>
            </div>
        </body>);
}
export default Relatorio;
