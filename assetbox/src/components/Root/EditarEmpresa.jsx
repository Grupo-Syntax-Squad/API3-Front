import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './editarempresa.css';
import CadastroLocalizacaoFilial from '../Cadastro/CadastroLocalizacaoFilial';
import adicionar from './adicionar.svg';
import matriz from '../../assets/img/matriz.png'
import filial from '../../assets/img/filial.png'

function EditarEmpresa({ setTela }) {
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
    const [filialLocalizacao, setLocalizacaoFilial] = useState(false);
    const [mostrarLocalizacao, setMostrarLocalizacao] = useState(false);
    const [filialLocalizacoes, setLocalizacoesFilial] = useState([]);
    const showpopup = () => mostrarLocalizacao ? setMostrarLocalizacao(false) : setMostrarLocalizacao(true);

    const [fil_id, setFil_id] = useState(0);

    const adicionarLocalizacao = (localizacao) => {
        filialLocalizacoes.push(localizacao);
    }

    const handleTelefoneMatriz = (value) => {
        const onlyNums = value.replace(/[^\d]/g, '');

        if (onlyNums.length <= 10) {
            return onlyNums.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else {
            return onlyNums.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
    }

    const handleEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }

    const handleEmailMatrizChange = (event) => {
        const email = event.target.value;
        setEmailMatriz(email);
    };

    const handleTelefoneMatrizChange = (event) => {
        const telefone = event.target.value;
        const telefoneFormatado = handleTelefoneMatriz(telefone);
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

        let response = await axios.post("http://localhost:8000/enderecos", EnderecoMatriz);

        // Matriz
        const DadosMatriz = {
            mat_razao_social: matrizNome,
            mat_nome_fantasia: matrizNomeFicticio,
            mat_cnpj: matrizCNPJ,
            mat_telefone: matrizTel,
            mat_email: matrizEmail,
            mat_endereco: response.data
        }

        response = axios.post("http://localhost:8000/matriz", DadosMatriz);


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
                window.alert('CEP inesistente!', error);
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

        response = await axios.post("http://localhost:8000/filiais", DadosFilial);
        setFil_id(response.data.fil_id)
        filialLocalizacoes.forEach(async localizacao => {
            let DadosLocalizacao = {
                "loc_titulo": localizacao,
                "loc_filial_id": response.data.fil_id
            }
            response = await axios.post("http://localhost:8000/localizacoes", DadosLocalizacao);
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
        setLocalizacaoFilial('');
    }


    //  style={{ borderRadius: '50px', backgroundColor: "rgb(230, 230, 230)" }}
    return (
        <div>
            <div className="m-2 columns">
                <form onSubmit={handleSubmit} className="column ">
                    <h1 className="has-text-black is-size-4">Painel da Empresa</h1>
                    <div className="column m-3">
                        <div className="column p-5" style={{ borderRadius: '50px', backgroundColor: "rgb(230, 230, 230)" }}>
                            <div className="field">
                                <img src={matriz} class='image is-96x96 container' alt="AssetBox Logo" />
                                <label htmlFor="razao-social" className="label has-text-black">Razão Social da Empresa:</label>
                                <div className="control">
                                    <input value={matrizNome} onChange={(event) => setNomeMatriz(event.target.value)} placeholder="Digite a razão social da empresa" className="input" />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="nome-fantasia" className="label has-text-black">Nome Fantasia:</label>
                                <div className="control">
                                    <input value={matrizNomeFicticio} onChange={(event) => setNomeFicticio(event.target.value)} placeholder="Digite o nome fantasia da empresa" className="input" />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="cnpj" className="label has-text-black">CNPJ:</label>
                                <div className="control">
                                    <input value={matrizCNPJ} onChange={(event) => setCNPJMatriz(event.target.value)} placeholder="Digite o CNPJ da empresa" className="input" />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="email" className="label has-text-black">Email:</label>
                                <div className="control">
                                    <input value={matrizEmail} onChange={handleEmailMatrizChange} placeholder="Digite o email da empresa" className="input" />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="telefone" className="label has-text-black">Telefone:</label>
                                <div className="control">
                                    <input value={matrizTel} onChange={handleTelefoneMatrizChange} placeholder="Digite o telefone da empresa" className="input" />
                                </div>
                                <h3 className="has-text-black is-size-5 mb-5" style={{ textAlign: 'center' }}>Endereço Matriz</h3>
                                <div className="field">
                                    <label htmlFor="cep" className="label has-text-black">CEP:</label>
                                    <div className="control">
                                        <input value={matrizCEP} onChange={handleCepMatriz} placeholder="Digite o CEP da matriz" className="input" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="rua" className="label has-text-black">Rua:</label>
                                    <div className="control">
                                        <input value={matrizRua} onChange={(event) => setRuaMatriz(event.target.value)} placeholder="Digite a rua da matriz" className="input" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="numero" className="label has-text-black">Número:</label>
                                    <div className="control">
                                        <input value={matrizNumero} onChange={(event) => setNumeroMatriz(event.target.value)} placeholder="Digite o número da matriz" className="input" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="bairro" className="label has-text-black">Bairro:</label>
                                    <div className="control">
                                        <input value={matrizBairro} onChange={(event) => setBairroMatriz(event.target.value)} placeholder="Digite o bairro da matriz" className="input" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="cidade" className="label has-text-black">Cidade:</label>
                                    <div className="control">
                                        <input value={matrizCidade} onChange={(event) => setCidadeMatriz(event.target.value)} placeholder="Digite a cidade da matriz" className="input" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="estado" className="label has-text-black">Estado:</label>
                                    <div className="control">
                                        <input value={matrizEstado} onChange={(event) => setEstadoMatriz(event.target.value)} placeholder="Digite o estado da matriz" className="input" />
                                    </div>
                                </div>
                            </div>
                            <h3 className="has-text-black is-size-5 mb-5" style={{ textAlign: 'center' }}>Localizações Matriz</h3>
                            <div className="field">
                                <label htmlFor="local" className="label has-text-black">Nome do Local:</label>
                                <div className="control">
                                    <input value={localizacao} onChange={(event) => SubmitLocalizacao(event.target.value)} placeholder="Digite o nome do local" className="input" />
                                </div>
                            </div>
                            <div className="field">
                                <button className="button is-info mt-3" onClick={() => SubmitLocalizacao([localizacao])}>Cadastrar Localização</button>
                            </div>
                        </div>
                    </div>
                </form>
                {/* cadastro da filial */}
                <form onSubmit={handleSubmitFilial} className="column">
                    <h3 className="has-text-black is-size-5 mb-5" style={{ textAlign: 'center' }}>Filial</h3>
                    <div className=" column m-3">
                        <div className="column p-5" style={{ borderRadius: '50px', backgroundColor: "rgb(230, 230, 230)" }}>
                            <img src={filial} class='image is-96x96 container' alt="AssetBox Logo" />
                            <div className="field">
                                <div className="control pr-3">
                                    <label htmlFor="local is-flex" className="label has-text-black">Nome da Filial:</label>
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
                                    <input value={filialEmail} onChange={e => setEmailFilial(e.target.value)} placeholder="Digite o email da empresa" className="input" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control pr-3">
                                    <label htmlFor="local is-flex" className="label has-text-black">Telefone Filial: </label>
                                    <input value={filialTelefone} onChange={(event) => setTelefoneFilial(event.target.value)} placeholder="Digite o cep da filial" className="input" />
                                </div>
                                <div className="control">
                                    <label htmlFor="local is-flex" className="label has-text-black">CEP Filial: </label>
                                    <input value={filialCEP} onChange={handleCepFilial} placeholder="Digite o cep da filial" className="input" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control pr-3">
                                    <label htmlFor="local" className="label has-text-black">Rua Filial:</label>
                                    <input value={filialRua} onChange={(event) => setRuaFilial(event.target.value)} placeholder="Digite o nome do local" className="input" />
                                </div>
                                <div className="control">
                                    <label htmlFor="local" className="label has-text-black">Numero Filial: </label>
                                    <input value={filialNumero} onChange={(event) => setNumeroFilial(event.target.value)} placeholder="Digite o cep da filial" className="input" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control pr-3">
                                    <label htmlFor="local" className="label has-text-black">Cidade Filial:</label>
                                    <input value={filialCidade} onChange={(event) => SubmitLocalizacao(event.target.value)} placeholder="Digite o nome do local" className="input" />
                                </div>
                                <div className="control">
                                    <label htmlFor="local" className="label has-text-black">Estado Filial:</label>
                                    <input value={filialEstado} onChange={(event) => SubmitLocalizacao(event.target.value)} placeholder="Digite o nome do local" className="input" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control pr-3">
                                    <label htmlFor="local" className="label has-text-black is-flex">Localizações Filial:
                                        <img src={adicionar} className='ml-2 image is-24x24' onClick={(event) => showpopup()} />
                                    </label>
                                    <div>
                                        {filialLocalizacoes.map(localizacao => {
                                            return (
                                                <p className='has-text-black'>{localizacao}</p>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="control">
                                </div>
                            </div>
                            <button className="button is-info mt-5" onClick={e => handleSubmitFilial(e)}>Cadastrar Filial</button>
                        </div>
                    </div>
                </form>

            </div>
            <div className='columns container m-5'>
                <button className="button is-primary mx-0 " onClick={() => setTela('Home')}>Finalizar Cadastro</button>
                <button className="button is-danger mx-2 " onClick={() => setTela('Home')}>Cancelar</button>
            </div>
            {mostrarLocalizacao && <CadastroLocalizacaoFilial handleLocalizacaoClick={showpopup} adicionarLocalizacao={adicionarLocalizacao} />}
        </div>
    );
}

export default EditarEmpresa;
