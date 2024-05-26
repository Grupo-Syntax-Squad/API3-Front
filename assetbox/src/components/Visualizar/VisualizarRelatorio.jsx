import React, { useState, useEffect } from 'react';
import "./visualizar.css";
import { getRelatorio } from '../../services/relatorioService';

function Relatorio({ setTela }) {
    const [data, setData] = useState('');

    const fetchData = async () => {
        const relatorio = await getRelatorio(1);
        setData(relatorio);
        console.log(relatorio);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <body>
            <div class='page-full'>
                <img src={''} className='img' alt="Ativos" />
                <h1 className='has-text-weight-light'>Data:{ }</h1>
                <br />
                <h1 className='has-text-weight-light'>`NomeEmpresa - NomeFilial - UFFilail`</h1>
                <div class="columns m-3">
                    <div class="column">
                        <table>
                            <tr>
                                <th>Ativo</th>
                                <th>Quantidade</th>
                                <th>Valor R$</th>
                            </tr>
                            <tr>
                                <th>
                                    Em Operação
                                </th>
                                <td>
                                    {data.quantidadeOperacao}
                                </td>
                                <td>
                                    {data.valorOperacao}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Em Manutenção
                                </th>
                                <td>
                                    {data.quantidadeManutencao}
                                </td>
                                <td>
                                    {data.valorManutencao}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Ativos Ociosos
                                </th>
                                <td>
                                    {data.quantidadeOcioso}
                                </td>
                                <td>
                                    {data.valorOcioso}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Ativos Inativos
                                </th>
                                <td>
                                    {data.quantidadeInativado}
                                </td>
                                <td>
                                    {data.valorInativado}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Com Funcionários
                                </th>
                                <td>
                                    {data.quantidadeComFuncionario}
                                </td>
                                <td>
                                    {data.valorComFuncionario}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Próximos da Manutenção
                                </th>
                                <td>
                                    {data.quantidadeProximosManutencao}
                                </td>
                                <td>
                                    {data.valorProximosManutencao}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </body>);
}
export default Relatorio;
