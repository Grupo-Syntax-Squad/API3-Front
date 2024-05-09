import { useEffect, useState } from "react";
import axios from "axios";

export default function MeusDados({ setTela }) {
    // Constantes
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cpf, setCpf] = useState("");
    const [edit, setEdit] = useState(false);

    // Função que altera o modo edição
    const handleEdit = () => edit ? setEdit(false) : setEdit(true);

    useEffect(() => {
        // Função para obter dados do administrador
        const fetchData = async () => {
            // Pegando o Id do Administrador
            let storageId = localStorage.getItem("idUser");

            try {
                const response = await axios.get(`http://localhost:8000/administradores/${storageId}`);
                const data = response.data;
                setNome(data.adm_nome);
                setEmail(data.adm_email);
                setSenha(data.adm_senha);
                setTelefone(data.adm_telefone);
                setCpf(data.adm_cpf);
            } catch (error) {
                console.log("Erro:", error);
                setTela("Home");
            }
        };

        fetchData(); // Chama a função de busca de dados
    }, []);

    // Função que atualiza os dados do administrador
    const handleAtualizarDados = async (e) => {
        e.preventDefault();

        // Pegando o Id do administrador
        let storageId = localStorage.getItem("idUser");

        const dataPUT = {
            adm_nome: nome,
            adm_email: email,
            adm_senha: senha,
            adm_telefone: telefone,
            adm_cpf: cpf
        }

        const response = axios.put(`http://localhost:8000/administradores/${storageId}`, dataPUT);
        console.log(response);
        handleEdit();
    }

    const handleCancelarEditar = async (e) => {
        e.preventDefault();
        // Pegando o Id do Administrador
        let storageId = localStorage.getItem("idUser");

        try {
            const response = await axios.get(`http://localhost:8000/administradores/${storageId}`);
            const data = response.data;
            setNome(data.adm_nome);
            setEmail(data.adm_email);
            setSenha(data.adm_senha);
            setTelefone(data.adm_telefone);
            setCpf(data.adm_cpf);
        } catch (error) {
            console.log("Erro:", error);
            setTela("Home");
        }

        handleEdit();
    }

    // Renderizando página
    return (
        <body className="m-2">
            <h1 className="has-text-black is-size-4">Meus dados</h1>
            <form className="form">
                <div className="field">
                    <label htmlFor="nome" className="label has-text-black">Nome: </label>
                    <div className="control">
                        <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} disabled={!edit} className="input" />
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="email" className="label has-text-black">Email: </label>
                    <div className="control">
                        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} disabled={!edit} className="input" />
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="senha" className="label has-text-black">Senha: </label>
                    <div className="control">
                        <input type="password" name="senha" value={senha} onChange={e => setSenha(e.target.value)} disabled={!edit} className="input" />
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="telefone" className="label has-text-black">Telefone: </label>
                    <div className="control">
                        <input type="tel" name="telefone" value={telefone} onChange={e => setTelefone(e.target.value)} disabled={!edit} className="input" />
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="cpf" className="label has-text-black">CPF: </label>
                    <div className="control">
                        <input type="text" name="cpf" value={cpf} onChange={e => setCpf(e.target.value)} disabled={!edit} className="input" />
                    </div>
                </div>

                <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                        {edit && <button type="submit" onClick={e => handleAtualizarDados(e)} className="button is-primary">Atualizar dados</button>}
                        {edit === false && <button type="submit" onClick={handleEdit} className="button is-primary">Editar dados</button>}
                    </div>
                    <div className="control">
                        {edit && <button onClick={e => handleCancelarEditar(e)} className="button">Cancelar</button>}
                    </div>
                </div>
            </form>
        </body>
    );
}