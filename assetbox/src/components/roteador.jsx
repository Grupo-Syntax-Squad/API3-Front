import { useEffect, useState } from "react";
import Menu from "./Navegação/Menu";
import Ativos from "./Ativos/Ativos";
import VisualizarAtivos from "./Visualizar/VisualizarAtivos";
import VisualizarDestinatarios from "./Visualizar/VisualizarDestinatarios";
import CadastroAtivos from "./Cadastro/CadastroAtivos";
import CadastroManutenção from "./Cadastro/CadastroManutenção";
import CadastroDestinatarios from "./Cadastro/CadastroDestinatario";
import Login from "./Login/Login";
import Calendario from "./manutenção/Calendario";
import Home from "./home";
import Manutencao from "./manutenção/manutenção";
import VisualizarManutencao from "./Visualizar/VisualizarManutenção";
import axios from "axios";
import CadastroAdministrador from "./Cadastro/CadastroAdmin";
import Usuarios from "./Usuarios/Usuarios";
import Historico from "./manutenção/Historico";
import EditarManutencao from "./Editar/editarManutecao";
import VisualizarAdministradores from "./Visualizar/VisualizarAdministradores";
import MeusDados from "./Visualizar/MeusDados";
import MenuRoot from "./Navegação/MenuRoot";
import EditarEmpresa from "./Root/EditarEmpresa";
import EditarFilial from "./Root/EditarFilial";

export default function Roteador() {
    const [tela, setTela] = useState('Home');
    const [verificacaoToken, setVerificacaoToken] = useState("");

    const [root, setRootLogin] = useState("")

    useEffect(() => {
        verificarToken();
    }, []);

    const verificarToken = async () => {
        let token = localStorage.getItem("token");
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail === "admin@gmail.com") setRootLogin(true);
        console.log(userEmail);
        if (token === null || token === "") setVerificacaoToken(false);
        else {
            try {
                let response = await axios.post("http://localhost:8000/autenticacao/verificarToken", token);
                if (response.data) setVerificacaoToken(true);
                else {
                    localStorage.setItem("token", null);
                    setVerificacaoToken(false);
                }
            } catch (e) {
                localStorage.setItem("token", null);
                setVerificacaoToken(false);
            }
        }
    }

    const selecionarView = (valor, e) => {
        e.preventDefault()
        setTela(valor)
        console.log(valor);
    }

    const botoes = ['Home', 'Usuarios', 'Ativos', 'Manutenções', 'Dashboard', 'Configurações'];

    const construirView = () => {

        if (tela === 'Login') {
            return (
                <Login setTela={setTela} />
            )
        }

        else if (tela === 'Home') {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <Home setTela={setTela} />
                        </>
                    )
                } else {
                    return (
                        <>
                            <Menu seletorView={selecionarView} botoes={botoes} />
                            <Home setTela={setTela} />
                        </>
                    )
                }
            } else return <Login setTela={setTela} />
        }
        else if (tela === "EditarFilial"){
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <EditarFilial setTela={setTela} botoes={botoes} />
                        </>
                    )
                }
            }
        }
        else if (tela === "EditarEmpresa") {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <EditarEmpresa setTela={setTela} botoes={botoes} />
                        </>
                    )
                }
            }
        }

        else if (tela === 'Ativos') {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <Ativos setTela={setTela} botoes={botoes} />
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Menu seletorView={selecionarView} botoes={botoes} />
                            <Ativos setTela={setTela} />
                        </>
                    )
                }
            }
            else return <p>É necessário realizar o login para continuar para a página desejada!</p>
        }

        else if (tela === 'Login') {

            return (
                <>
                    <Login setTela={setTela} />
                </>
            )
        }

        else if (tela === 'CadastroAtivos') {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <CadastroAtivos setTela={setTela} />
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Menu seletorView={selecionarView} botoes={botoes} />
                            <CadastroAtivos setTela={setTela} />
                        </>
                    )
                }
            } else return <p>É necessário realizar o login para continuar para a página desejada!</p>
        }

        else if (tela === 'CadastroDestinatarios') {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <CadastroDestinatarios setTela={setTela} />
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Menu seletorView={selecionarView} botoes={botoes} />
                            <CadastroDestinatarios setTela={setTela} />
                        </>
                    )
                }
            } else return <p>É necessário realizar o login para continuar para a página desejada!</p>
        }

        else if (tela === 'CadastroAdministrador') {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <CadastroAdministrador setTela={setTela} />
                        </>
                    )
                }

            }
        }

        else if (tela === 'VisualizarAtivo') {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <VisualizarAtivos setTela={setTela} />
                        </>
                    )
                } else {
                    return (
                        <>
                            <Menu seletorView={selecionarView} botoes={botoes} />
                            <VisualizarAtivos setTela={setTela} />
                        </>
                    )
                }
            } else return <p>É necessário realizar o login para continuar para a página desejada!</p>
        }

        else if (tela === 'VisualizarDestinatarios') {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <VisualizarDestinatarios setTela={setTela} />
                        </>
                    )
                } else {
                    return (
                        <>
                            <Menu seletorView={selecionarView} botoes={botoes} />
                            <VisualizarDestinatarios setTela={setTela} />
                        </>
                    )
                }
            } else return <p>É necessário realizar o login para continuar para a página desejada!</p>
        }

        else if (tela === 'VisualizarAdministradores') {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <VisualizarAdministradores setTela={setTela} />
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Menu seletorView={selecionarView} botoes={botoes} />
                            <Usuarios setTela={setTela} />
                        </>
                    )
                }
            } else return <p>É necessário realizar o login para continuar para a página desejada!</p>
        }

        else if (tela === 'Usuarios') {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <Usuarios setTela={setTela} />
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Menu seletorView={selecionarView} botoes={botoes} />
                            <Usuarios setTela={setTela} />
                        </>
                    )
                }
            } else return <p>É necessário realizar o login para continuar para a página desejada!</p>
        }

        else if (tela === 'Manutenções') {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <Manutencao setTela={setTela} />
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Menu seletorView={selecionarView} botoes={botoes} />
                            <Manutencao setTela={setTela} />
                        </>
                    )
                }

            } else return <p>É necessário realizar o login para continuar para a página desejada!</p>
        }

        else if (tela === 'CadastroManutenção') {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <CadastroManutenção setTela={setTela} />
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Menu seletorView={selecionarView} botoes={botoes} />
                            <CadastroManutenção setTela={setTela} />
                        </>
                    )
                }

            } else return <p>É necessário realizar o login para continuar para a página desejada!</p>
        }

        else if (tela === 'VisualizarAgendamento') {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <Calendario setTela={setTela} />
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Menu seletorView={selecionarView} botoes={botoes} />
                            <Calendario setTela={setTela} />
                        </>
                    )

                }

            } else return <p>É necessário realizar o login para continuar para a página desejada!</p>
        }

        else if (tela === 'VisualizarHistManut') {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <Historico setTela={setTela} />
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Menu seletorView={selecionarView} botoes={botoes} />
                            <Historico setTela={setTela} />
                        </>
                    )
                }
            } else return <p>É necessário realizar o login para continuar para a página desejada!</p>
        }

        else if (tela === 'VisualizarManutenção') {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <VisualizarManutencao setTela={setTela} />
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Menu seletorView={selecionarView} botoes={botoes} />
                            <VisualizarManutencao setTela={setTela} />
                        </>
                    )
                }

            } else return <p>É necessário realizar o login para continuar para a página desejada!</p>
        }

        else if (tela === 'EditarManutencao') {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            <EditarManutencao setTela={setTela} />
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Menu seletorView={selecionarView} botoes={botoes} />
                            <EditarManutencao setTela={setTela} />
                        </>
                    )
                }

            } else return <p>É necessário realizar o login para continuar para a página desejada!</p>
        }

        else if (tela === 'MeusDados') {
            if (verificacaoToken) {
                return (
                    <>
                        <Menu seletorView={selecionarView} botoes={botoes} />
                        <MeusDados setTela={setTela} />
                    </>
                )
            } else return <p>É necessário realizar o login para continuar para a página desejada!</p>
        }

        else if (tela === 'Dashboard') {
            if (verificacaoToken) {
                if (root) {
                    return (
                        <>
                            <MenuRoot seletorView={selecionarView} botoes={botoes} />
                            {/* <Serviços tema="#5eb4fc" red="#fc6464" green="#00ff00" /> */}
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Menu seletorView={selecionarView} botoes={botoes} />
                            {/* <Serviços tema="#5eb4fc" red="#fc6464" green="#00ff00" /> */}
                        </>
                    )
                }
            } else return <p>É necessário realizar o login para continuar para a página desejada!</p>
        }
    }

    return (
        construirView()
    )
}