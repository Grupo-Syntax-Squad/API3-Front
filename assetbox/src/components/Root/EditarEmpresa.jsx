import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './editarempresa.css';
import CadastroLocalizacaoFilial from '../Cadastro/CadastroLocalizacaoFilial';
import adicionar from './adicionar.svg';
import matriz from '../../assets/img/matriz.png'
import filial from '../../assets/img/filial.png'
import { postFilial } from '../../services/filialService';
import { getLocalizacoes, postLocalizacao } from '../../services/localizacaoService';
import handleEmail from '../../utils/handleEmail';
import handleTelefone from '../../utils/handleTelefone';
import { postEndereco, putEndereco } from '../../services/enderecoService';
import { getMatriz, postMatriz, putMatriz } from '../../services/matrizService';

function EditarEmpresa({ setTela }) {
    const [matrizAlreadyExist, setMatrizAlreadyExist] = useState(false);
    const [editMatriz, setEditMatriz] = useState(false);

    //Dados Matriz
    const [localizacao, SubmitLocalizacao] = useState([]);
    const [matrizNome, setNomeMatriz] = useState("");
    const [matrizNomeFicticio, setNomeFicticio] = useState("");
    const [matrizCNPJ, setCNPJMatriz] = useState("");
    const [matrizTel, setTelefoneMatriz] = useState("");
    const [matrizEmail, setEmailMatriz] = useState("");
    const [matrizCEP, setCEPMatriz] = useState("");
    const [matrizRua, setRuaMatriz] = useState("");
    const [matrizNumero, setNumeroMatriz] = useState("");
    const [matrizBairro, setBairroMatriz] = useState("");
    const [matrizCidade, setCidadeMatriz] = useState("");
    const [matrizEstado, setEstadoMatriz] = useState("");

    const [mostrarLocalizacaoMatriz, setMostrarLocalizacaoMatriz] = useState(false);
    const [matrizLocalizacoes, setLocalizacoesMatriz] = useState([]);
    const showPopUpMatriz = () => mostrarLocalizacaoMatriz ? setMostrarLocalizacaoMatriz(false) : setMostrarLocalizacaoMatriz(true);

    // Dados Filial
    const [filialNome, setNomeFilial] = useState("");
    const [filialCNPJ, setCNPJFilial] = useState("");
    const [filialCEP, setCEPFilial] = useState("");
    const [filialRua, setRuaFilial] = useState("");
    const [filialNumero, setNumeroFilial] = useState("");
    const [filialBairro, setBairroFilial] = useState("");
    const [filialCidade, setCidadeFilial] = useState("");
    const [filialEstado, setEstadoFilial] = useState("");
    const [filialTelefone, setTelefoneFilial] = useState("");
    const [filialEmail, setEmailFilial] = useState("");

    const [mostrarLocalizacaoFilial, setMostrarLocalizacaoFilial] = useState(false);
    const [filialLocalizacoes, setLocalizacoesFilial] = useState([]);
    const showPopUpFilial = () => mostrarLocalizacaoFilial ? setMostrarLocalizacaoFilial(false) : setMostrarLocalizacaoFilial(true);

    const adicionarLocalizacaoFilial = (localizacao) => {
        filialLocalizacoes.push(localizacao);
    }

    const adicionarLocalizacaoMatriz = (localizacao) => {
        matrizLocalizacoes.push(localizacao);
    }

    const handleEmailMatrizChange = (event) => {
        const email = event.target.value;
        setEmailMatriz(email);
    };

    const handleTelefoneMatrizChange = (event) => {
        const telefone = event.target.value;
        const telefoneFormatado = handleTelefone(telefone);
        setTelefoneMatriz(telefoneFormatado);
    };

    const handleCepMatriz = async (event) => {
        const cep = event.target.value;
        setCEPMatriz(cep);

        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                const data = response.data;
                if (data.erro) {
                    window.alert("CEP inválido!, por favor, digite um cep válido")
                    setRuaMatriz("");
                    setBairroMatriz("");
                    setCidadeMatriz("");
                    setEstadoMatriz("");
                    setNumeroMatriz("");
                    setCEPMatriz("");
                } else {
                    setRuaMatriz(data.logradouro);
                    setCidadeMatriz(data.localidade);
                    setEstadoMatriz(data.uf);
                    setBairroMatriz(data.bairro);
                    setCEPMatriz(data.cep);
                }
            } catch (error) {
                window.alert('CEP inesistente!', error);
            }
        }
        if (cep.length > 8) {
            setRuaMatriz("");
            setBairroMatriz("");
            setCidadeMatriz("");
            setEstadoMatriz("");
            setNumeroMatriz("");
        }
    };

    useEffect(() => {
        const handleMatrizAlreadyExist = async () => {
            const matriz = await getMatriz();
            if (matriz) {
                setMatrizAlreadyExist(true);

                // Matriz
                setNomeMatriz(matriz.mat_razao_social);
                setNomeFicticio(matriz.mat_nome_fantasia);
                setCNPJMatriz(matriz.mat_cnpj);
                setTelefoneMatriz(matriz.mat_telefone);
                setEmailMatriz(matriz.mat_email);

                // Endereço
                setCEPMatriz(matriz.mat_endereco.end_cep);
                setRuaMatriz(matriz.mat_endereco.end_rua);
                setNumeroMatriz(matriz.mat_endereco.end_numero);
                setBairroMatriz(matriz.mat_endereco.end_bairro);
                setCidadeMatriz(matriz.mat_endereco.end_cidade);
                setEstadoMatriz(matriz.mat_endereco.end_uf);

                // Localizações
                const localizacoesGet = await getLocalizacoes();
                const localizacoes = localizacoesGet
                    .filter(localizacao => localizacao.loc_filial_id === null)
                    .map(localizacao => ({ id: localizacao.loc_id, titulo: localizacao.loc_titulo }));

                setLocalizacoesMatriz(localizacoes.map(localizacao => localizacao.titulo));
            }
        }
        handleMatrizAlreadyExist();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const camposObrigatorios = [matrizNome, matrizNomeFicticio, matrizTel, matrizEmail, matrizCEP];
        const camposVazios = camposObrigatorios.some(campo => !campo);

        if (camposVazios) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (matrizEmail.trim() === '') {
            window.alert('O e-mail não pode estar vazio.');
            return;
        }

        if (!handleEmail(matrizEmail)) {
            window.alert('E-mail inválido.');
            return;
        }

        const EnderecoMatriz = {
            end_rua: matrizRua,
            end_numero: matrizNumero,
            end_cep: matrizCEP,
            end_uf: matrizEstado,
            end_bairro: matrizBairro,
            end_cidade: matrizCidade
        }

        let endereco = await postEndereco(EnderecoMatriz);
        console.log("POST ENDERECO", endereco);

        // Matriz
        const DadosMatriz = {
            mat_razao_social: matrizNome,
            mat_nome_fantasia: matrizNomeFicticio,
            mat_cnpj: matrizCNPJ,
            mat_telefone: matrizTel,
            mat_email: matrizEmail,
            mat_endereco: endereco
        }

        let matriz = await postMatriz(DadosMatriz);
        console.log("POST MATRIZ", matriz);

        matrizLocalizacoes.forEach(async localizacao => {
            const localizacaoData = {
                "loc_titulo": localizacao
            }
            await postLocalizacao(localizacaoData);
        });

        setNomeMatriz('');
        setBairroMatriz('');
        setNomeFicticio('');
        setCNPJMatriz('');
        setTelefoneMatriz('');
        setEmailMatriz('');
        setCEPMatriz('');
        setRuaMatriz('');
        setNumeroMatriz('');
        setCidadeMatriz('');
        setEstadoMatriz('');
        setLocalizacoesMatriz([]);
    }



    const handleCepFilial = async (event) => {
        const cepfilial = event.target.value;
        setCEPFilial(cepfilial);

        if (cepfilial.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cepfilial}/json/`);
                const datafilial = response.data;
                if (datafilial.erro) {
                    window.alert("CEP inválido!, por favor, digite um cep válido")
                    setRuaFilial("");
                    setBairroFilial("");
                    setCidadeFilial("");
                    setEstadoFilial("");
                    setNumeroFilial("");
                    setCEPFilial("");
                } else {
                    setRuaFilial(datafilial.logradouro);
                    setCidadeFilial(datafilial.localidade);
                    setEstadoFilial(datafilial.uf);
                    setBairroFilial(datafilial.bairro);
                    setCEPFilial(datafilial.cep);
                }
            } catch (error) {
                window.alert('CEP inválido!', error);
            }
        }
        if (cepfilial.length > 8) {
            setRuaFilial("");
            setBairroFilial("");
            setCidadeFilial("");
            setEstadoFilial("");
            setNumeroFilial("");
        }
    };


    const handleSubmitFilial = async (event) => {
        event.preventDefault();

        if (filialEmail.trim() === '') {
            window.alert('O e-mail não pode estar vazio.');
            return;
        }

        if (!handleEmail(filialEmail)) {
            window.alert('E-mail inválido.');
            return;
        }

        const EnderecoFilial = {
            end_cep: filialCEP,
            end_rua: filialRua,
            end_numero: filialNumero,
            end_bairro: filialBairro,
            end_cidade: filialCidade,
            end_uf: filialEstado,
        }

        let response = await axios.post("http://localhost:8000/enderecos", EnderecoFilial);

        //Filial
        const DadosFilial = {
            fil_nome: filialNome,
            fil_cnpj: filialCNPJ,
            fil_telefone: filialTelefone,
            fil_email: filialEmail,
            fil_endereco: response.data
        }
        let filial = await postFilial(DadosFilial);

        filialLocalizacoes.forEach(async localizacaoNome => {
            let DadosLocalizacao = {
                "loc_titulo": localizacaoNome,
                "loc_filial_id": filial.fil_id
            }
            await postLocalizacao(DadosLocalizacao);
        })


        setNomeFilial('');
        setCNPJFilial('');
        setCEPFilial('');
        setRuaFilial('');
        setNumeroFilial('');
        setBairroFilial('');
        setCidadeFilial('');
        setEstadoFilial('');
        setTelefoneFilial('');
        setEmailFilial('');
        setLocalizacoesFilial([]);
    }

    const handlePutMatriz = async (event) => {
        event.preventDefault();

        let matriz = await getMatriz();
        const matrizEnderecoId = matriz.mat_endereco.end_id;

        const camposObrigatorios = [matrizNome, matrizNomeFicticio, matrizTel, matrizEmail, matrizCEP];
        const camposVazios = camposObrigatorios.some(campo => !campo);

        if (camposVazios) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (matrizEmail.trim() === '') {
            window.alert('O e-mail não pode estar vazio.');
            return;
        }

        if (!handleEmail(matrizEmail)) {
            window.alert('E-mail inválido.');
            return;
        }

        const EnderecoMatriz = {
            end_rua: matrizRua,
            end_numero: matrizNumero,
            end_cep: matrizCEP,
            end_uf: matrizEstado,
            end_bairro: matrizBairro,
            end_cidade: matrizCidade
        }

        let endereco = await putEndereco(matrizEnderecoId, EnderecoMatriz);
        console.log("PUT ENDEREÇO MATRIZ", endereco);

        // Matriz
        const DadosMatriz = {
            mat_razao_social: matrizNome,
            mat_nome_fantasia: matrizNomeFicticio,
            mat_cnpj: matrizCNPJ,
            mat_telefone: matrizTel,
            mat_email: matrizEmail,
            mat_endereco: endereco
        }

        matriz = await putMatriz(DadosMatriz);
        console.log("PUT MATRIZ", matriz);

        // matrizLocalizacoes.forEach(async localizacao => {
        //     const localizacaoData = {
        //         "loc_titulo": localizacao
        //     }
        //     await putLocalizacao(localizacaoData);
        // });

        setEditMatriz(false);
    }

    //  style={{ borderRadius: '50px', backgroundColor: "rgb(230, 230, 230)" }}
    return (
        <div>
            <div className="m-2 columns ">
                <form onSubmit={handleSubmit} className="column ">
                    <h3 className=" has-text-centered has-text-weight-medium is-size-4 mb-5">Painel da Empresa</h3>
                    <div className="column m-3 ">
                        <div className="column p-5 shadow-button" style={{ borderRadius: '50px', backgroundColor: "rgb(230, 230, 230)" }}>
                            <div className="field">
                                <img style={{ color: 'red' }} src={matriz} class='image is-96x96 container' alt="AssetBox Logo" />
                                <label htmlFor="razao-social" className="label has-text-black">Razão Social da Empresa:</label>
                                <div className="control">
                                    <input value={matrizNome} onChange={(event) => setNomeMatriz(event.target.value)} placeholder="Digite a razão social da empresa" className="input" disabled={matrizAlreadyExist && !editMatriz} />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="nome-fantasia" className="label has-text-black">Nome Fantasia:</label>
                                <div className="control">
                                    <input value={matrizNomeFicticio} onChange={(event) => setNomeFicticio(event.target.value)} placeholder="Digite o nome fantasia da empresa" className="input" disabled={matrizAlreadyExist && !editMatriz} />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="cnpj" className="label has-text-black">CNPJ:</label>
                                <div className="control">
                                    <input value={matrizCNPJ} onChange={(event) => setCNPJMatriz(event.target.value)} placeholder="Digite o CNPJ da empresa" className="input" disabled={matrizAlreadyExist && !editMatriz} />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="email" className="label has-text-black">Email:</label>
                                <div className="control">
                                    <input value={matrizEmail} onChange={handleEmailMatrizChange} placeholder="Digite o email da empresa" className="input" disabled={matrizAlreadyExist && !editMatriz} />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="telefone" className="label has-text-black">Telefone:</label>
                                <div className="control">
                                    <input value={matrizTel} onChange={handleTelefoneMatrizChange} placeholder="Digite o telefone da empresa" className="input" disabled={matrizAlreadyExist && !editMatriz} />
                                </div>
                                <h3 className="has-text-black is-size-5 mb-5" style={{ textAlign: 'center' }}>Endereço Matriz</h3>
                                <div className="field">
                                    <label htmlFor="cep" className="label has-text-black">CEP:</label>
                                    <div className="control">
                                        <input value={matrizCEP} onChange={handleCepMatriz} placeholder="Digite o CEP da matriz" className="input" disabled={matrizAlreadyExist && !editMatriz} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="rua" className="label has-text-black">Rua:</label>
                                    <div className="control">
                                        <input value={matrizRua} onChange={(event) => setRuaMatriz(event.target.value)} placeholder="Digite a rua da matriz" className="input" disabled={matrizAlreadyExist && !editMatriz} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="numero" className="label has-text-black">Número:</label>
                                    <div className="control">
                                        <input value={matrizNumero} onChange={(event) => setNumeroMatriz(event.target.value)} placeholder="Digite o número da matriz" className="input" disabled={matrizAlreadyExist && !editMatriz} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="bairro" className="label has-text-black">Bairro:</label>
                                    <div className="control">
                                        <input value={matrizBairro} onChange={(event) => setBairroMatriz(event.target.value)} placeholder="Digite o bairro da matriz" className="input" disabled={matrizAlreadyExist && !editMatriz} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="cidade" className="label has-text-black">Cidade:</label>
                                    <div className="control">
                                        <input value={matrizCidade} onChange={(event) => setCidadeMatriz(event.target.value)} placeholder="Digite a cidade da matriz" className="input" disabled={matrizAlreadyExist && !editMatriz} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="estado" className="label has-text-black">Estado:</label>
                                    <div className="control">
                                        <input value={matrizEstado} onChange={(event) => setEstadoMatriz(event.target.value)} placeholder="Digite o estado da matriz" className="input" disabled={matrizAlreadyExist && !editMatriz} />
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control pr-3">
                                    <label htmlFor="local" className="label has-text-black is-flex">Localizações Matriz:
                                        <img src={adicionar} className='ml-2 image is-24x24' onClick={(event) => showPopUpMatriz()} alt='Ícone adicionar localização matriz' />
                                    </label>
                                    <div>
                                        {matrizLocalizacoes.map(localizacao => {
                                            return (
                                                <p className='has-text-black'>{localizacao}</p>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            {matrizAlreadyExist && editMatriz === false &&
                                <div className='field'>
                                    <button className="shadow-button button button-effect is-info mt-3" onClick={() => setEditMatriz(true)}>Editar Matriz</button>
                                </div>
                            }

                            {matrizAlreadyExist && editMatriz &&
                                <div>
                                    <button className="shadow-button button button-effect is-info mt-3" onClick={handlePutMatriz}>Salvar Alterações</button>
                                    <button className="shadow-button button button-effect is-info mt-3" onClick={() => setEditMatriz(false)}>Cancelar alterações</button>
                                </div>
                            }

                            {!matrizAlreadyExist &&
                                <div className="field">
                                    <button className="shadow-button button button-effect is-info mt-3" onClick={() => SubmitLocalizacao([localizacao])}>Cadastrar Matriz</button>
                                </div>
                            }
                        </div>
                    </div>
                </form>
                {/* cadastro da filial */}
                <form onSubmit={handleSubmitFilial} className="column">
                    <h3 className=" is-size-4 mb-5 has-text-weight-medium" style={{ textAlign: 'center' }}>Filial</h3>
                    <div className=" column m-3 ">
                        <div className="column p-6 shadow-button" style={{ borderRadius: '50px', backgroundColor: "rgb(230, 230, 230)" }}>
                            <img src={filial} class='image is-64x64  container' alt="AssetBox Logo" />
                            <div className="field">
                                <div className="control">
                                    <label htmlFor="local" className="label has-text-black">Nome da Filial:</label>
                                    <input value={filialNome} onChange={(event) => setNomeFilial(event.target.value)} placeholder="Digite o nome da filial" className="input" />
                                </div>
                                <div className="control">
                                    <label htmlFor="local" className="label has-text-black">CNPJ Filial:</label>
                                    <input value={filialCNPJ} onChange={(event) => setCNPJFilial(event.target.value)} placeholder="Digite o cnpj da filial" className="input" />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="email" className="label has-text-black">Email:</label>
                                <div className="control">
                                    <input value={filialEmail} onChange={e => setEmailFilial(e.target.value)} placeholder="Digite o email da filial" className="input" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control pr-3">
                                    <label htmlFor="local is-flex" className="label has-text-black">Telefone Filial: </label>
                                    <input value={filialTelefone} onChange={(event) => setTelefoneFilial(event.target.value)} placeholder="Digite o telefone da filial" className="input" />
                                </div>
                                <div className="control">
                                    <label htmlFor="local is-flex" className="label has-text-black">CEP Filial: </label>
                                    <input value={filialCEP} onChange={handleCepFilial} placeholder="Digite o cep da filial" className="input" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control pr-3">
                                    <label htmlFor="local" className="label has-text-black">Rua Filial:</label>
                                    <input value={filialRua} onChange={(event) => setRuaFilial(event.target.value)} placeholder="Digite o rua da filial" className="input" />
                                </div>
                                <div className="control">
                                    <label htmlFor="local" className="label has-text-black">Numero Filial: </label>
                                    <input value={filialNumero} onChange={(event) => setNumeroFilial(event.target.value)} placeholder="Digite o número da filial" className="input" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control pr-3">
                                    <label htmlFor="local" className="label has-text-black">Cidade Filial:</label>
                                    <input value={filialCidade} onChange={(event) => SubmitLocalizacao(event.target.value)} placeholder="Digite o cidade da filial" className="input" />
                                </div>
                                <div className="control">
                                    <label htmlFor="local" className="label has-text-black">Estado Filial:</label>
                                    <input value={filialEstado} onChange={(event) => SubmitLocalizacao(event.target.value)} placeholder="Digite o estado da filial" className="input" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control pr-3">
                                    <label htmlFor="local" className="label has-text-black is-flex">Localizações Filial:
                                        <img src={adicionar} className='ml-2 image is-24x24' onClick={(event) => showPopUpFilial()} alt='Ícone adicionar localização filial' />
                                    </label>
                                    <div>
                                        {filialLocalizacoes.map(localizacao => {
                                            return (
                                                <p className='has-text-black'>{localizacao}</p>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <button className="shadow-button button button-effect is-info mt-5" onClick={e => handleSubmitFilial(e)}>Cadastrar Filial</button>
                        </div>
                    </div>
                </form>

            </div>
            {/* <div className='columns container m-5'>
                <button className="button is-primary mx-0 " onClick={() => setTela('Home')}>Finalizar Cadastro</button>
                <button style={{ backgroundColor: 'red' }} className="button mx-2 " onClick={() => setTela('Home')}>Cancelar</button>
            </div> */}
            {mostrarLocalizacaoFilial && <CadastroLocalizacaoFilial handleLocalizacaoClick={showPopUpFilial} adicionarLocalizacao={adicionarLocalizacaoFilial} />}
            {mostrarLocalizacaoMatriz && <CadastroLocalizacaoFilial handleLocalizacaoClick={showPopUpMatriz} adicionarLocalizacao={adicionarLocalizacaoMatriz} />}
        </div>
    );
}

export default EditarEmpresa;
