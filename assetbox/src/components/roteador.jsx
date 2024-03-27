import { useState } from "react";
import Menu from "./Menu";

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
                    <Menu seletorView={selecionarView} tema="#87c7fd" botoes={botoes} />
                    {/* <ListaCliente tema="#5eb4fc" red="#fc6464" green="#00ff00" seletorView={selecionarView} /> */}
                </>
            )
        }
        else if (tela === 'Usuários') {
            return (
                <>
                    <Menu seletorView={selecionarView} tema="#87c7fd" botoes={botoes} />
                    {/* <FormularioCadastroCliente tema="#5eb4fc" azul="#5eb4fc" seletorView={selecionarView} /> */}
                </>
            )
        }
        else if (tela === 'Manutenções') {
            return (
                <>
                    <Menu seletorView={selecionarView} tema="#87c7fd" botoes={botoes} />
                    {/* <Produtos tema="#5eb4fc" red="#fc6464" green="#00ff00" /> */}
                </>
            )
        }
        else if (tela === 'Dashboard') {
            return (
                <>
                    <Menu seletorView={selecionarView} tema="#87c7fd" botoes={botoes} />
                    {/* <Serviços tema="#5eb4fc" red="#fc6464" green="#00ff00" /> */}
                </>
            )
        } else {
            return (
                <>
                    <Menu seletorView={selecionarView} tema="#87c7fd" botoes={botoes} />
                    {/* <FormularioCadastroCliente seletorView={selecionarView} tema="#5eb4fc" azul="#5eb4fc" /> */}
                </>
            )
        }
    }

    return (
        construirView()
    )
}