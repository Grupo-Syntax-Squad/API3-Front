import { useState } from "react";
import Menu from "./Navegação/Menu";
import Ativos from "./Ativos/Ativos";
import VisualizarAtivos from "./Visualizar/Visualizar";
import CadastroAtivos from "./Cadastro/Cadastro";

export default function Roteador(){
    const [tela, setTela] = useState('Ativos')
    const selecionarView = (valor, e) => {
        e.preventDefault()
        setTela(valor)
        console.log(valor);
        
    }
    const botoes = ['Usuários', 'Ativos', 'Manutenções', 'Dashboard', 'Configurações'];
    const construirView = () => {
        if (tela === 'Ativos') {
            return (
                <>
                    <Menu seletorView={selecionarView} botoes={botoes} />
                    <Ativos setTela={setTela}/>
                </>
            )
        }
        else if (tela === 'CadastroAtivos') {
            return (
                <>
                    <Menu seletorView={selecionarView} botoes={botoes} />
                    <CadastroAtivos setTela={setTela} />
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
        else if (tela === 'Usuários') {
            return (
                <>
                    <Menu seletorView={selecionarView} botoes={botoes} />
                    {/* <FormularioCadastroCliente tema="#5eb4fc" azul="#5eb4fc" seletorView={selecionarView} /> */}
                </>
            )
        }
        else if (tela === 'Manutenções') {
            return (
                <>
                    <Menu seletorView={selecionarView} botoes={botoes} />
                    {/* <Produtos tema="#5eb4fc" red="#fc6464" green="#00ff00" /> */}
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