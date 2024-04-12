import React, { useEffect, useState } from 'react';
import Filtro from '../../assets/img/filtro.svg';
import axios from 'axios';

const Destinatarios = ({ setTela }) => {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/ativos')
          .then(response => {
            setAssets(response.data);
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      }, []);

      const handleClick = (id) => {
    setTela(`Destinatario${id}`);
  };


    return (
        <body>
            <div class='page-full' style={{ backgroundColor: 'transparent', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                <button class="button is-primary m-5 ml-6 is-rounded is-size-4" style={{ backgroundColor: '#367E90', color: '#fff' }} onClick={() => setTela('CadastroDestinatarios')}>Cadastrar Destinatário</button>
                <div class='page-full' style={{ backgroundColor: '#459EB5', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                    <div class='field'>
                        {/* <div class="columns filtro mx-0" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            <div class="column is-one-fifth" style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={Filtro} class="mx-1" alt='filter'></img><label className='filtros mx-1 has-text-white has-text-weight-medium mr-3'>ID</label>
                                <input class="input is-small is-flex-grow-1 is-rounded" type="text" placeholder='Digite um ID:'/>
                            </div>
                            <div class="column is-two-fifths is-flex is-align-items-center">
                                <label className='filtros mx-1 has-text-white has-text-weight-medium mr-3' >Titulo</label>
                                <input class="input is-small is-flex-grow-3 is-rounded" type="text" placeholder='Digite um Nome:'/>
                            </div>
                            <div class="column is-one-fifth is-flex is-align-items-center">
                                <label className='filtros mx-1 has-text-white has-text-weight-medium mr-3'>Status</label>
                                <input class="input is-small is-flex-grow-2 is-rounded" type="text" placeholder='Digite um Status:'/>
                            </div>
                            <div class="column is-one-fifth">
                                <button class="button is-primary m-2 is-rounded" style={{ backgroundColor: '#53bfdb', color: '#fff' }}>Aplicar Filtros</button>
                            </div>
                        </div> */}
                    </div>
                    <div class="columns indice m-0 is-flex is-justify-content-center" >
                        <div class="column is-one-third ml-2 is-flex is-justify-content-center is-align-items-center">
                            <label className='has-text-white is-size-4
                            has-text-weight-medium'>Destinatários</label>
                        </div>
                    </div>

                    <div class='p-0'>
                        {/*aqui eu percorro o array de objetos e crio um card para cada objeto*/}
                        {assets.map((asset) => (
                            <div key={asset.ati_id} onClick={() => handleClick(asset.id)} className='asset' class=' asset is-flex is-justify-content-center'>
                                <a class='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium' href='##'>
                                    <p>{asset.ati_id}</p>
                                </a>
                                <a class='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium' href='##'>
                                    <p> {asset.ati_titulo}</p>
                                </a>
                                <a class='SemHover column is-one-third mr-2 dado-ativo is-flex is-justify-content-center is-align-items-center has-text-weight-medium' href='##'>
                                    <p> {asset.ati_status}</p>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </body >
    );
}
export default Destinatarios;

