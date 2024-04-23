import { useState } from "react";
import Menu from "./Navegação/Menu";
import Ativos from "./Ativos/Ativos";
import Destinatarios from './Destinatario/Destinatarios'
import VisualizarAtivos from "./Visualizar/VisualizarAtivos";
import VisualizarDestinatarios from "./Visualizar/VisualizarDestinatarios";
import CadastroAtivos from "./Cadastro/CadastroAtivos";
import CadastroManutenção from "./Cadastro/CadastroManutenção";
import CadastroDestinatarios from "./Cadastro/CadastroDestinatarios";
import Login from "./Login/Login";
import Calendario from "./Manutenção/Calendario";
import Home from "./home";
import Manutencao from "./Manutenção/manutenção";

export default function Roteador(){
    const [tela, setTela] = useState('Home')
    const selecionarView = (valor, e) => {
        e.preventDefault()
        setTela(valor)
        console.log(valor);
        
    }
    const botoes = ['Home', 'Destinatarios', 'Ativos', 'Manutenções', 'Dashboard', 'Configurações'];
    const construirView = () => {
        if (tela === 'Home') {
            return (
                <>
                    <Menu seletorView={selecionarView} botoes={botoes} />
                    {/* <Home setTela={setTela}/> */}
                    <Calendario setTela={setTela}/>
                </>
            )
        }
        else if (tela === 'Ativos') {
            return (
                <>
                    <Menu seletorView={selecionarView} botoes={botoes} />
                    <Ativos setTela={setTela}/>
                </>
            )
        }
        else if (tela === 'Login') {
            return (
                <>
                    <Login setTela={setTela}/>
                </>
            )
        }
        else if (tela === 'CadastroAtivos') {
            return (
                <>
                    <Menu  seletorView={selecionarView} botoes={botoes} />
                    <CadastroAtivos setTela={setTela} />
                </>
            )
        }else if (tela === 'CadastroDestinatarios') {
            return (
                <>
                    <Menu seletorView={selecionarView} botoes={botoes} />
                    <CadastroDestinatarios setTela={setTela} />
                </>
            )
        }

        else if (tela === 'VisualizarAtivo') {
            return (
                <>
                    <Menu seletorView={selecionarView} botoes={botoes} />
                    <VisualizarAtivos setTela={setTela} />
                </>
            )
        }
        else if (tela === 'VisualizarDestinatarios') {
            return (
                <>
                    <Menu seletorView={selecionarView} botoes={botoes} />
                    <VisualizarDestinatarios setTela={setTela} />
                </>
            )
        }
        else if (tela === 'Destinatarios') {
            return (
                <>
                    <Menu seletorView={selecionarView} botoes={botoes} />
                    <Destinatarios setTela={setTela}/>
                </>
            )
        }
        else if (tela === 'Manutenções') {
            return (
                <>
                    <Menu seletorView={selecionarView} botoes={botoes} />
                    { <Manutencao setTela={setTela}/> }
                </>
            )
        }
        else if (tela === 'CadastroManutenção') {
            return (
                <>
                    <Menu  seletorView={selecionarView} botoes={botoes} />
                    <CadastroManutenção setTela={setTela} />
                </>
            )
        }
        else if (tela === 'Dashboard') {
            return (  <>
                    <Menu seletorView={selecionarView} botoes={botoes} />
                    {/* <Serviços tema="#5eb4fc" red="#fc6464" green="#00ff00" /> */}
                </>
            )
        } else {
            return (
                <>
                    <Menu seletorView={selecionarView} botoes={botoes} />
                    {/* <FormularioCadastroCliente seletorView={selecionarView} tema="#5eb4fc" azul="#5eb4fc" /> */}
                </>
            )
        }
    }

    return (
        construirView()
    )
}