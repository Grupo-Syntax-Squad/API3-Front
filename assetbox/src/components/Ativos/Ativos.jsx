import React, { useEffect, useState } from 'react';
import Filtro from '../../assets/img/filtro.svg';
import "./ativos.css";

//essa é a função que irá buscar os ativos na API ela está comentada pois não temos uma API para buscar os ativos
// function Ativos() {
//     const [assets, setAssets] = useState([]);

// useEffect(() => {
//     //   getAssets().then(setAssets);
// }, []);


//criei um array de objetos para simular a resposta da API
const Ativos = ({setTela}) => {
    const assets = [
        { id: 1, description: 'Ativo 1', status: 'Ativo' },
        { id: 2, description: 'Ativo 2', status: 'Inativo' },
        { id: 3, description: 'Ativo 3', status: 'Ativo' },
        { id: 4, description: 'Ativo 4', status: 'Ativo' },
        { id: 5, description: 'Ativo 5', status: 'Ativo' },
        { id: 6, description: 'Ativo 6', status: 'Ativo' },
        { id: 7, description: 'Ativo 7', status: 'Ativo' },
        { id: 8, description: 'Ativo 8', status: 'Ativo' },
        { id: 9, description: 'Ativo 9', status: 'Ativo' },
        { id: 10, description: 'Ativo 10', status: 'Ativo' },
        { id: 11, description: 'Ativo 11', status: 'Ativo' },
        { id: 12, description: 'Ativo 12', status: 'Ativo' },
    ];

    return (
        <body>
            <button class="button is-primary m-5 ml-6"style={{ backgroundColor: '#367E90', color: '#fff' }} onClick={() => setTela('CadastroAtivos')}>Cadastrar Ativo</button>
            <div class='page-full' style={{ backgroundColor: '#fff' }}>
                <div class='field'>
                    <div class="columns filtro" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                        <div class="column is-one-fifth" style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={Filtro} style={{ margin: '0.5rem' }}></img><label className='filtros' style={{ marginRight: '1rem' }}>ID:</label>
                            <input class="input is-small" type="text" placeholder='Digite um ID:' style={{ flexGrow: 1 }} />
                        </div>
                        <div class="column is-two-fifths" style={{ display: 'flex', alignItems: 'center' }}>
                            <label className='filtros' style={{ marginRight: '1rem' }}>Titulo:</label>
                            <input class="input is-small" type="text" placeholder='Digite um Nome:' style={{ flexGrow: 7 }} />
                        </div>
                        <div class="column is-one-fifth" style={{ display: 'flex', alignItems: 'center' }}>
                            <label className='filtros' style={{ marginRight: '1rem' }}>Status:</label>
                            <input class="input is-small" type="text" placeholder='Digite um ID:' style={{ flexGrow: 1 }} />
                        </div>
                        <div class="column is-one-fifth">
                            <button class="button is-primary m-2" style={{ backgroundColor: '#459EB5', color: '#fff' }}>Aplicar Filtros</button>
                        </div>
                    </div>
                </div>
                <div class="columns indice" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div class="column is-one-third ml-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <label className='indices'>Número</label>
                    </div>
                    <div class="column is-one-third ml-2 mr-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <label className='indices'>Título</label>
                    </div>
                    <div class="column is-one-third mr-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <label className='indices'>Status</label>
                    </div>
                </div>

                <div style={{ padding: '0 1rem' }}>
                {/*aqui eu percorro o array de objetos e crio um card para cada objeto*/}
                {assets.map((asset) => (
                    <div key={asset.id} className='asset ' style={{ display: 'flex', justifyContent: 'center' }}>
                        <div class="column is-one-third ml-2 dado-ativo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <p>{asset.id}</p>
                        </div>
                        <div class="column is-one-third ml-2 mr-2 dado-ativo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <p> {asset.description}</p>
                        </div>
                        <div class="column is-one-third mr-2 dado-ativo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <p> {asset.status}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </body>
    );
}
export default Ativos;

