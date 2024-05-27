import { useEffect, useState } from "react";
import Menu from "./Navegação/Menu";
import Ativos from "./Ativos/Ativos";
import VisualizarAtivos from "./Visualizar/VisualizarAtivos";
import VisualizarDestinatarios from "./Visualizar/VisualizarDestinatarios";
import CadastroAtivos from "./Cadastro/CadastroAtivos";
import CadastroManutenção from "./Cadastro/CadastroManutenção";
import CadastroDestinatarios from "./Cadastro/CadastroDestinatario";
import Login from "./Login/Login";
import Calendario from "./Manutenção/Calendario";
import Home from "./home";
import Manutencao from "./Manutenção/manutenção";
import VisualizarManutencao from "./Visualizar/VisualizarManutenção";
import axios from "axios";
import CadastroAdministrador from "./Cadastro/CadastroAdmin";
import Usuarios from "./Usuarios/Usuarios";
import Historico from "./Manutenção/Historico";
import EditarManutencao from "./Editar/editarManutecao";
import ManutencaoPendente from "./Notificacao/ManutencaoPendente";
import AtivoPendente from "./Notificacao/AtivoPendente";
import VisualizarAdministradores from "./Visualizar/VisualizarAdministradores";
import MeusDados from "./Visualizar/MeusDados";
import MenuRoot from "./Navegação/MenuRoot";
import EditarEmpresa from "./Root/EditarEmpresa";
import EditarFilial from "./Root/EditarFilial";
import VisualizarFilial from "./Visualizar/VisualizarFilial";
import AtivoExpirado from "./Notificacao/AtivoExpirado";
import NotFound from "./NotFound/page";
import Relatorio from "./Visualizar/VisualizarRelatorio";

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
        setTela(valor);
    }

    const botoes = ['Home', 'Usuarios', 'Ativos', 'Manutenções', 'Dashboard', 'Configurações'];

    const construirView = () => {

        if (verificacaoToken) {
            switch (tela) {
                case 'Home':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <Home setTela={setTela} />
                        </>
                    );
                case 'EditarFilial':
                    if (root) {
                        return (
                            <>
                                <MenuRoot seletorView={selecionarView} botoes={botoes} />
                                <EditarFilial setTela={setTela} />
                            </>
                        )
                    } else {
                        return (
                            <Login setTela={setTela} />
                        )
                    }
                case 'EditarEmpresa':
                    if (root) {
                        return (
                            <>
                                <MenuRoot seletorView={selecionarView} botoes={botoes} />
                                <EditarEmpresa setTela={setTela} />
                            </>
                        )
                    } else {
                        return (
                            <Login setTela={setTela} />
                        )
                    }
                case 'Ativos':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <Ativos setTela={setTela} />
                        </>
                    );
                case 'CadastroAtivos':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <CadastroAtivos setTela={setTela} />
                        </>
                    );
                case 'CadastroDestinatarios':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <CadastroDestinatarios setTela={setTela} />
                        </>
                    );
                case 'CadastroAdministrador':
                    if (root) {
                        return (
                            <>
                                <MenuRoot seletorView={selecionarView} botoes={botoes} />
                                <CadastroAdministrador setTela={setTela} />
                            </>
                        );
                    } else {
                        return (
                            <Login setTela={setTela} />
                        )
                    }
                case 'VisualizarAtivo':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <VisualizarAtivos setTela={setTela} />
                        </>
                    );
                case 'VisualizarDestinatarios':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <VisualizarDestinatarios setTela={setTela} />
                        </>
                    );
                case 'VisualizarAdministradores':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <VisualizarAdministradores setTela={setTela} />
                        </>
                    );
                case 'Usuarios':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <Usuarios setTela={setTela} />
                        </>
                    );
                case 'Manutenções':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <Manutencao setTela={setTela} />
                        </>
                    );
                case 'CadastroManutenção':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <CadastroManutenção setTela={setTela} />
                        </>
                    );
                case 'VsualizarAgendamento':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <Calendario setTela={setTela} />
                        </>
                    );
                case 'VisualizarHistManut':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <Historico setTela={setTela} />
                        </>
                    );
                case 'ManutencaoPendente':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <ManutencaoPendente setTela={setTela} />
                        </>
                    );
                case 'AtivoExpirado':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <AtivoExpirado setTela={setTela} />
                        </>
                    );
                case 'AtivoPendente':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <AtivoPendente setTela={setTela} />
                        </>
                    );
                case 'VisualizarManutenção':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <VisualizarManutencao setTela={setTela} />
                        </>
                    );
                case 'EditarManutencao':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            <EditarManutencao setTela={setTela} />
                        </>
                    );
                case 'MeusDados':
                    if (root) {
                        return (
                            <NotFound />
                        );
                    } else {
                        return (
                            <>
                                <Menu seletorView={selecionarView} botoes={botoes} />
                                <MeusDados setTela={setTela} />
                            </>
                        );
                    }
                case 'Dashboard':
                    return (
                        <>
                            {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />}
                            {/* <Serviços tema="#5eb4fc" red="#fc6464" green="#00ff00" /> */}
                        </>
                    );
                case 'Relatorio':
                    return (
                        <>
                            <div className="no-print">
                                {root ? <MenuRoot seletorView={selecionarView} botoes={botoes} /> : <Menu seletorView={selecionarView} botoes={botoes} />
                                }
                            </div>
                            <Relatorio setTela={setTela} />
                        </>
                    );
                default:
                    return (
                        <NotFound />
                    );
            }
        } else {
            return (
                <Login setTela={setTela} />
            )
        }
    }

    return (
        construirView()
    );
}
